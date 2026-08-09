/**
 * Pulls published styles from a Figma file and writes them to
 * tokens/figma-tokens.json, with resolved values.
 *
 *
 * Requires two env vars:
 *   FIGMA_TOKEN     -> Figma personal access token (file_content:read scope)
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

  const output = {
    _meta: {
      source: "files-api",
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