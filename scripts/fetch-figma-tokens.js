/**
 * Pulls published styles AND every local variable collection from a Figma
 * file and writes them to tokens/figma-tokens.json, with resolved values.
 *
 * Requires two env vars:
 *   FIGMA_TOKEN     -> Figma personal access token
 *                      (file_content:read scope for styles;
 *                       file_variables:read scope for variables — the
 *                       Variables API additionally needs an Enterprise
 *                       Figma plan, see getLocalVariables() below)
 *   FIGMA_FILE_KEY  -> the file key from your Figma file URL
 */

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!TOKEN || !FILE_KEY) {
  console.error("Missing FIGMA_TOKEN or FIGMA_FILE_KEY env vars.");
  process.exit(1);
}

const headers = { "X-Figma-Token": TOKEN };
const BASE = "https://api.figma.com/v1";

async function getFile() {
  const res = await fetch(`${BASE}/files/${FILE_KEY}`, { headers });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Files API failed: ${res.status} ${res.statusText} - ${body}`);
  }
  return res.json();
}

// Spacing and radius (and anything else authored as a Figma Variable
// rather than a published Style) don't show up in `styles` above at
// all — they only exist in the separate Variables API. This needs an
// Enterprise plan; if the token doesn't have access the whole sync
// still succeeds, it just skips these buckets rather than failing.
async function getLocalVariables() {
  const res = await fetch(`${BASE}/files/${FILE_KEY}/variables/local`, { headers });
  if (!res.ok) {
    if (res.status === 403) {
      console.warn("Variables API returned 403 (needs an Enterprise-plan token) — skipping all variable collections.");
      return null;
    }
    const body = await res.text();
    throw new Error(`Variables API failed: ${res.status} ${res.statusText} - ${body}`);
  }
  return res.json();
}

// The base spacing scale and the semantic L1/L2/L3 tokens live in two
// separate Figma collections ("base-spacing-scale" and "spacing-tokens")
// but read as one logical "spacing" bucket — everything else buckets by
// its own (slugified) collection name, so a brand-new collection someone
// adds in Figma tomorrow shows up automatically without a code change.
const BUCKET_NAME_OVERRIDES = {
  "base-spacing-scale": "spacing",
  "spacing-tokens": "spacing",
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/^_+/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function bucketForCollection(collectionName) {
  return BUCKET_NAME_OVERRIDES[collectionName] || slugify(collectionName);
}

// Variables can reference another variable instead of holding a literal
// value (VARIABLE_ALIAS) — follow the chain to the concrete raw value,
// same as get_variable_defs' resolveAliases option does. Mode ids are
// scoped per collection, so if the alias target is in the *same*
// collection as the source (has a value for this exact modeId), use that
// mode — e.g. Responsive/rounded-s's Tablet value aliases to a different
// primitive than its Desktop value does, both within the "radius"
// collection. Only fall back to the target's own default mode when the
// alias crosses into a different collection that doesn't share this
// mode id at all (e.g. a Light/Dark color aliasing a single-mode
// primitive).
function resolveVariableValueForMode(variables, variable, modeId, depth = 0) {
  if (depth > 10) return undefined;
  const raw = variable.valuesByMode?.[modeId];
  if (raw && typeof raw === "object" && raw.type === "VARIABLE_ALIAS") {
    const target = variables[raw.id];
    if (!target) return undefined;
    const targetModeId = target.valuesByMode && modeId in target.valuesByMode ? modeId : target.__defaultModeId;
    return resolveVariableValueForMode(variables, target, targetModeId, depth + 1);
  }
  return raw;
}

// Converts a resolved raw value into the JS shape this repo's
// tokens.json expects: a hex string for COLOR, {x1,y1,x2,y2} for EASING,
// otherwise the raw value untouched.
function finalizeValue(resolvedType, raw) {
  if (raw === undefined || raw === null) return undefined;
  if (resolvedType === "COLOR" && typeof raw === "object") {
    return rgbaToHex({ r: raw.r, g: raw.g, b: raw.b, a: raw.a ?? 1 });
  }
  if (resolvedType === "EASING" && raw && typeof raw === "object") {
    const bez = raw.easingFunctionCubicBezier;
    if (bez) return { x1: bez.x1, y1: bez.y1, x2: bez.x2, y2: bez.y2 };
    return undefined;
  }
  return raw;
}

function collectVariableTokens(variablesResponse, tokens) {
  if (!variablesResponse) return;

  const { variables, variableCollections } = variablesResponse.meta || {};
  if (!variables || !variableCollections) return;

  // Stash each variable's collection default mode on itself so alias
  // resolution (which jumps between variables/collections) can look it
  // up without threading extra params through every call.
  for (const variable of Object.values(variables)) {
    const collection = variableCollections[variable.variableCollectionId];
    variable.__defaultModeId = collection?.defaultModeId;
  }

  for (const variable of Object.values(variables)) {
    const collection = variableCollections[variable.variableCollectionId];
    if (!collection) continue;

    const bucket = bucketForCollection(collection.name);
    tokens[bucket] = tokens[bucket] || {};

    const modes = collection.modes || [];
    if (modes.length <= 1) {
      const modeId = modes[0]?.modeId ?? collection.defaultModeId;
      const raw = resolveVariableValueForMode(variables, variable, modeId);
      const value = finalizeValue(variable.resolvedType, raw);
      if (value === undefined) continue;
      tokens[bucket][variable.name] = { value, description: variable.description || "" };
    } else {
      const byMode = {};
      for (const mode of modes) {
        const raw = resolveVariableValueForMode(variables, variable, mode.modeId);
        const value = finalizeValue(variable.resolvedType, raw);
        if (value !== undefined) byMode[mode.name] = value;
      }
      if (Object.keys(byMode).length === 0) continue;
      tokens[bucket][variable.name] = { value: byMode, description: variable.description || "" };
    }
  }
}

function rgbaToHex({ r, g, b, a }) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
}

// Walk the document tree once, mapping each styleId to the first
// node found that applies it, so we can read the resolved value.
function buildStyleNodeMap(node, map = {}) {
  if (node.styles) {
    for (const styleId of Object.values(node.styles)) {
      if (!map[styleId]) map[styleId] = node;
    }
  }
  if (node.children) {
    for (const child of node.children) {
      buildStyleNodeMap(child, map);
    }
  }
  return map;
}

function resolveValue(styleType, node) {
  if (!node) return null;

  switch (styleType) {
    case "FILL": {
      const paint = (node.fills || [])[0];
      if (!paint) return null;
      if (paint.type === "SOLID") {
        return rgbaToHex({ ...paint.color, a: paint.opacity ?? paint.color.a ?? 1 });
      }
      return { type: paint.type };
    }
    case "TEXT": {
      const t = node.style || {};
      return {
        fontFamily: t.fontFamily,
        fontWeight: t.fontWeight,
        fontSize: t.fontSize,
        lineHeightPx: t.lineHeightPx,
        letterSpacing: t.letterSpacing,
      };
    }
    case "EFFECT": {
      return (node.effects || []).map((e) => ({
        type: e.type,
        radius: e.radius,
        spread: e.spread,
        color: e.color ? rgbaToHex({ ...e.color, a: e.color.a ?? 1 }) : undefined,
        offset: e.offset,
      }));
    }
    case "GRID": {
      return node.layoutGrids || [];
    }
    default:
      return null;
  }
}

// Figma Styles have no concept of light/dark modes — as a workaround for
// accounts without Variables API access, dark-mode colors are published
// as a *second*, differently-named style per token ("tokens-dark/x"
// alongside "tokens/x") rather than a mode on the same style. Reunite
// each pair into the {Light, Dark} shape the rest of this pipeline (and
// style-dictionary.config.js's multi-mode formatter) already expects for
// color-tokens/effects, instead of leaving them as two unrelated flat
// "fill" entries. Runs before collectVariableTokens() so that real
// Variables data (if ever available) takes precedence over this
// Styles-based fallback for the same token name.
function pairDarkFillStyles(tokens) {
  const fill = tokens.fill;
  if (!fill) return;

  const darkNames = Object.keys(fill).filter((name) => name.startsWith("tokens-dark/"));

  for (const darkName of darkNames) {
    const bareName = darkName.slice("tokens-dark/".length);
    const lightName = `tokens/${bareName}`;
    const lightEntry = fill[lightName];
    const darkEntry = fill[darkName];
    if (!lightEntry || typeof lightEntry.value !== "string" || typeof darkEntry.value !== "string") continue;

    const targetBucket = /^(shadows|focus-ring)\//.test(bareName) ? "effects" : "color-tokens";
    tokens[targetBucket] = tokens[targetBucket] || {};
    tokens[targetBucket][bareName] = {
      value: { Light: lightEntry.value, Dark: darkEntry.value },
      description: lightEntry.description || darkEntry.description || "",
    };

    delete fill[lightName];
    delete fill[darkName];
  }
}

async function main() {
  const file = await getFile();
  const styles = file.styles || {};
  const styleIds = Object.keys(styles);

  if (styleIds.length === 0) {
    console.warn("No published styles found in this file.");
  }

  const styleNodeMap = buildStyleNodeMap(file.document);

  const tokens = {};
  let skipped = 0;

  for (const styleId of styleIds) {
    const meta = styles[styleId];
    const value = resolveValue(meta.styleType, styleNodeMap[styleId]);

    if (value === null || value === undefined) {
      console.warn(`Skipping "${meta.name}": no resolvable value found.`);
      skipped++;
      continue;
    }

    const bucket = meta.styleType.toLowerCase();
    tokens[bucket] = tokens[bucket] || {};
    tokens[bucket][meta.name] = {
      value,
      description: meta.description || "",
    };
  }

  if (skipped > 0) {
    console.warn(`Skipped ${skipped} style(s) with no resolvable value.`);
  }

  pairDarkFillStyles(tokens);

  const variablesResponse = await getLocalVariables();
  const variableBucketsBefore = new Set(Object.keys(tokens));
  collectVariableTokens(variablesResponse, tokens);
  const variableBucketCount = Object.keys(tokens).filter((k) => !variableBucketsBefore.has(k)).length;

  const output = {
    _meta: {
      source: variablesResponse
        ? `files-api (styles) + variables-api (${variableBucketCount} variable collection buckets)`
        : "files-api (styles only — variables API unavailable)",
      fetchedAt: new Date().toISOString(),
      fileKey: FILE_KEY,
    },
    ...tokens,
  };

  const fs = await import("node:fs/promises");
  await fs.mkdir("tokens", { recursive: true });
  await fs.writeFile(
    "tokens/figma-tokens.json",
    JSON.stringify(output, null, 2)
  );

  console.log(`Wrote tokens/figma-tokens.json with ${styleIds.length} styles.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});