import StyleDictionary from "style-dictionary";

// The storybook-design-token addon reads special comments in a CSS
// file to know how to group and label tokens. This registers a
// custom output format that adds those comments automatically, so
// it stays in sync every time the Figma workflow regenerates tokens.
// Only real presenter names the addon recognizes. Anything not
// listed here (like text/typography, which is a compound value with
// no single matching presenter) gets no @presenter line at all,
// still listed by name and value, just without a preview swatch.
const PRESENTER_BY_GROUP = {
  Colors: "Color",
  "Primitive Colors": "Color",
  Effect: "Shadow",
};

// Figma organizes color styles into two layers: raw scales (like
// fill/primitives/orange/500) and semantic names built on top of
// them (like fill/tokens/primary/base). We split those into two
// separate categories so semantic tokens, the ones components
// should actually reference, aren't buried next to the full
// primitive scale.
function getCategory(token) {
  const groupName = token.path[0] || "other";
  if (groupName === "fill") {
    return token.path[1] === "primitives" ? "Primitive Colors" : "Colors";
  }
  return groupName.charAt(0).toUpperCase() + groupName.slice(1);
}

// Fill tokens already resolve to plain hex strings, but effect and
// text tokens are structured objects (shadow offsets, font specs),
// so they need to be converted into real CSS syntax, otherwise
// they'd just print as "[object Object]" in the output.
function formatShadowValue(value) {
  const shadows = Array.isArray(value) ? value : [value];
  return shadows
    .filter((s) => s && typeof s === "object")
    .map((s) => {
      const inset = s.type === "INNER_SHADOW" ? "inset " : "";
      const x = s.offset?.x ?? 0;
      const y = s.offset?.y ?? 0;
      const blur = s.radius ?? 0;
      const spread = s.spread ?? 0;
      const color = s.color ?? "rgba(0,0,0,0.25)";
      return `${inset}${x}px ${y}px ${blur}px ${spread}px ${color}`;
    })
    .join(", ");
}

function formatTextValue(value) {
  const weight = value.fontWeight ?? "400";
  const size = value.fontSize ? `${value.fontSize}px` : "16px";
  const lineHeight = value.lineHeightPx ? `/${value.lineHeightPx}px` : "";
  const family = value.fontFamily ?? "inherit";
  return `${weight} ${size}${lineHeight} "${family}"`;
}

// Spacing and radius variables come from the Figma Variables API as
// bare numbers (e.g. 8, not "8px"), unlike fill/text/effect which
// already resolve to CSS-ready strings.
function formatDimensionValue(value) {
  return typeof value === "number" ? `${value}px` : value;
}

function formatValue(token) {
  const value = token.value;
  const groupName = token.path[0] || "other";
  if (groupName === "spacing" || groupName === "radius") return formatDimensionValue(value);
  if (typeof value === "string") return value;
  if (groupName === "effect") return formatShadowValue(value);
  if (groupName === "text" && typeof value === "object") return formatTextValue(value);
  // Fallback for anything else structured (like grid tokens): a
  // readable string rather than the default object-to-string coercion.
  return JSON.stringify(value);
}

// A text token's `font:` shorthand can't carry letter-spacing (not a
// component of that CSS shorthand), so components that need it — like
// Button, which sets font-size/line-height/letter-spacing as separate
// properties rather than the shorthand — have nothing to reference.
// Emit each piece as its own `--{name}-{piece}` custom property
// alongside the shorthand line, so either usage style works.
function formatDeclarations(token) {
  const declarations = [[token.name, formatValue(token)]];
  const value = token.value;
  const groupName = token.path[0] || "other";

  if (groupName === "text" && value && typeof value === "object") {
    if (typeof value.fontSize === "number") declarations.push([`${token.name}-font-size`, `${value.fontSize}px`]);
    if (typeof value.lineHeightPx === "number") declarations.push([`${token.name}-line-height`, `${value.lineHeightPx}px`]);
    if (typeof value.letterSpacing === "number") declarations.push([`${token.name}-letter-spacing`, `${value.letterSpacing}px`]);
    if (value.fontFamily) declarations.push([`${token.name}-font-family`, `"${value.fontFamily}"`]);
    if (value.fontWeight) declarations.push([`${token.name}-font-weight`, `${value.fontWeight}`]);
  }

  return declarations;
}

// The built-in "css/variables" format just does `${token.value}`,
// which prints "[object Object]" for text/effect tokens since they're
// structured, not strings. This is the same formatValue() logic as
// the annotated storybook format below, minus the @tokens comments —
// a plain :root block for tokens.css, the file components import.
StyleDictionary.registerFormat({
  name: "css/variables-formatted",
  format: ({ dictionary }) => {
    const declarations = dictionary.allTokens
      .flatMap(formatDeclarations)
      .map(([name, value]) => `  --${name}: ${value};`)
      .join("\n");
    return `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n:root {\n${declarations}\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: "css/design-token-annotated",
  format: ({ dictionary }) => {
    const groups = {};

    dictionary.allTokens.forEach((token) => {
      const category = getCategory(token);
      groups[category] = groups[category] || [];
      groups[category].push(token);
    });

    return Object.entries(groups)
      .map(([category, tokens]) => {
        const presenter = PRESENTER_BY_GROUP[category];
        const presenterLine = presenter ? ` * @presenter ${presenter}\n` : "";
        const declarations = tokens
          .flatMap(formatDeclarations)
          .map(([name, value]) => `  --${name}: ${value};`)
          .join("\n");

        return `/**\n * @tokens ${category}\n${presenterLine} */\n:root {\n${declarations}\n}\n`;
      })
      .join("\n");
  },
});

export default {
  source: ["tokens/figma-tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables-formatted",
        },
      ],
    },
    js: {
      transformGroup: "js",
      buildPath: "build/js/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6",
        },
      ],
    },
    storybook: {
      transformGroup: "css",
      buildPath: "build/css/",
      files: [
        {
          destination: "tokens.storybook.css",
          format: "css/design-token-annotated",
        },
      ],
    },
  },
};