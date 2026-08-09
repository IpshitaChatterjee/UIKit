/**
 * Pulls published styles from a Figma file and writes them to
 * tokens/figma-tokens.json, with resolved values (not just metadata).
 *
 * Works on any Figma plan, including personal.
 *
 * Requires two env vars:
 *   FIGMA_TOKEN     -> Figma personal access token
 *   FIGMA_FILE_KEY  -> the file key from your Figma file URL
 *                       (figma.com/file/<FILE_KEY>/...)
 */

const TOKEN = process.env.FIGMA_TOKEN;
const FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!TOKEN || !FILE_KEY) {
  console.error("Missing FIGMA_TOKEN or FIGMA_FILE_KEY env vars.");
  process.exit(1);
}

const headers = { "X-Figma-Token": TOKEN };
const BASE = "https://api.figma.com/v1";

async function getStyleList() {
  const res = await fetch(`${BASE}/files/${FILE_KEY}/styles`, { headers });
  if (!res.ok) {
    throw new Error(`Styles API failed: ${res.status} ${res.statusText}`);
  }
  const data = await res.json();
  return data.meta.styles;
}

// Figma limits how many node ids you can request at once, so fetch in batches.
async function getNodesByIds(ids) {
  const BATCH_SIZE = 50;
  const nodes = {};

  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE);
    const res = await fetch(
      `${BASE}/files/${FILE_KEY}/nodes?ids=${batch.join(",")}`,
      { headers }
    );
    if (!res.ok) {
      throw new Error(`Nodes API failed: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    Object.assign(nodes, data.nodes);
  }

  return nodes;
}

function rgbaToHex({ r, g, b, a }) {
  const toHex = (n) => Math.round(n * 255).toString(16).padStart(2, "0");
  const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  return a < 1 ? `${hex}${toHex(a)}` : hex;
}

function resolveValue(style, node) {
  const doc = node?.document;
  if (!doc) return null;

  switch (style.style_type) {
    case "FILL": {
      const paint = (doc.fills || [])[0];
      if (!paint) return null;
      if (paint.type === "SOLID") {
        return rgbaToHex({ ...paint.color, a: paint.opacity ?? paint.color.a ?? 1 });
      }
      return { type: paint.type };
    }
    case "TEXT": {
      const t = doc.style || {};
      return {
        fontFamily: t.fontFamily,
        fontWeight: t.fontWeight,
        fontSize: t.fontSize,
        lineHeightPx: t.lineHeightPx,
        letterSpacing: t.letterSpacing,
      };
    }
    case "EFFECT": {
      return (doc.effects || []).map((e) => ({
        type: e.type,
        radius: e.radius,
        color: e.color ? rgbaToHex({ ...e.color, a: e.color.a ?? 1 }) : undefined,
        offset: e.offset,
      }));
    }
    case "GRID": {
      return doc.layoutGrids || [];
    }
    default:
      return null;
  }
}

async function main() {
  const styles = await getStyleList();
  if (styles.length === 0) {
    console.warn("No published styles found in this file.");
  }

  const nodeIds = styles.map((s) => s.node_id);
  const nodes = await getNodesByIds(nodeIds);

  const tokens = {};

  for (const style of styles) {
    const bucket = style.style_type.toLowerCase();
    tokens[bucket] = tokens[bucket] || {};
    tokens[bucket][style.name] = {
      value: resolveValue(style, nodes[style.node_id]),
      description: style.description || "",
    };
  }

  const output = {
    _meta: {
      source: "styles-api",
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

  console.log(`Wrote tokens/figma-tokens.json with ${styles.length} styles.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
