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
  "Color-tokens": "Color",
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

// A Figma EASING variable (motion-primitives, animation-tokens) resolves to
// a cubic-bezier control-point object — the direct CSS equivalent.
function isEasingValue(value) {
  return value && typeof value === "object" && ["x1", "y1", "x2", "y2"].every((k) => typeof value[k] === "number");
}

function formatEasingValue(value) {
  const round = (n) => Math.round(n * 1000) / 1000;
  return `cubic-bezier(${round(value.x1)}, ${round(value.y1)}, ${round(value.x2)}, ${round(value.y2)})`;
}

// FLOAT variables from the Variables API come through as bare numbers
// (e.g. 8, not "8px"). Most collections are px dimensions; a couple of
// specific value families (opacity, TIMING/duration) are unitless or use
// a different unit — everything else defaults to px.
function formatScalarValue(value, name) {
  if (typeof value !== "number") return value;
  // `name` here is already kebab-transformed (e.g. "Timing/duration-fast"
  // -> "motion-primitives-timing-duration-fast"), so match on substrings,
  // not the original slash-delimited Figma path.
  if (/duration/i.test(name)) return `${value}s`;
  if (/opacity/i.test(name)) return `${value}`;
  return `${value}px`;
}

function formatValue(token) {
  const value = token.value;
  const groupName = token.path[0] || "other";
  if (isEasingValue(value)) return formatEasingValue(value);
  if (typeof value === "string") return value;
  if (typeof value === "number") return formatScalarValue(value, token.name);
  if (groupName === "effect") return formatShadowValue(value);
  if (groupName === "text" && typeof value === "object") return formatTextValue(value);
  // Fallback for anything else structured (like grid tokens): a
  // readable string rather than the default object-to-string coercion.
  return JSON.stringify(value);
}

// Multi-mode tokens (spacing/radius/typography have Desktop+Tablet+Mobile
// or Phone; color-tokens/effects have Light+Dark) fall into one of two
// real-world CSS mechanisms. Neither breakpoint is defined anywhere in
// Figma itself (modes are just names, not px thresholds) — these are
// conventional, widely-used values (matching Tailwind's md/lg-ish scale),
// not something pulled from the design file. Adjust here if the design
// system settles on different numbers.
const MEDIA_QUERY_BY_KEY = {
  dark: "@media (prefers-color-scheme: dark)",
  tablet: "@media (max-width: 1024px)",
  phone: "@media (max-width: 640px)",
};

// Base/default mode -> null (goes in the plain :root block, unprefixed
// name). Everything else maps to a media bucket above. "Phone" and
// "Mobile" are the same breakpoint under two different mode names
// depending on which Figma collection you're looking at.
const MODE_TO_MEDIA_KEY = {
  Desktop: null,
  Tablet: "tablet",
  Mobile: "phone",
  Phone: "phone",
  Light: null,
  Dark: "dark",
};

// Order matters: within a single viewport, "phone" must be declared after
// "tablet" so it wins the cascade at narrow widths where both max-width
// queries match (equal specificity, so source order decides).
const MEDIA_KEY_ORDER = ["dark", "tablet", "phone"];

function isMultiModeValue(value) {
  return (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    !isEasingValue(value) &&
    Object.keys(value).some((mode) => mode in MODE_TO_MEDIA_KEY)
  );
}

// A text token's `font:` shorthand can't carry letter-spacing (not a
// component of that CSS shorthand), so components that need it — like
// Button, which sets font-size/line-height/letter-spacing as separate
// properties rather than the shorthand — have nothing to reference.
// Emit each piece as its own `--{name}-{piece}` custom property
// alongside the shorthand line, so either usage style works.
//
// Returns [{ name, value, mediaKey }] — mediaKey is null for the base
// :root declaration, or one of MEDIA_QUERY_BY_KEY's keys.
function formatDeclarations(token) {
  const value = token.value;
  const groupName = token.path[0] || "other";

  if (isMultiModeValue(value)) {
    return Object.entries(value)
      .filter(([mode]) => mode in MODE_TO_MEDIA_KEY)
      .map(([mode, modeValue]) => ({
        name: token.name,
        value: isEasingValue(modeValue) ? formatEasingValue(modeValue) : formatScalarValue(modeValue, token.name),
        mediaKey: MODE_TO_MEDIA_KEY[mode],
      }));
  }

  const declarations = [{ name: token.name, value: formatValue(token), mediaKey: null }];

  if (groupName === "text" && value && typeof value === "object") {
    if (typeof value.fontSize === "number") declarations.push({ name: `${token.name}-font-size`, value: `${value.fontSize}px`, mediaKey: null });
    if (typeof value.lineHeightPx === "number") declarations.push({ name: `${token.name}-line-height`, value: `${value.lineHeightPx}px`, mediaKey: null });
    if (typeof value.letterSpacing === "number") declarations.push({ name: `${token.name}-letter-spacing`, value: `${value.letterSpacing}px`, mediaKey: null });
    if (value.fontFamily) declarations.push({ name: `${token.name}-font-family`, value: `"${value.fontFamily}"`, mediaKey: null });
    if (value.fontWeight) declarations.push({ name: `${token.name}-font-weight`, value: `${value.fontWeight}`, mediaKey: null });
  }

  return declarations;
}

// Groups a flat declaration list into { base, dark, tablet, phone } and
// renders each as its own :root block, base first then each @media block
// in MEDIA_KEY_ORDER — see the ordering note on MEDIA_KEY_ORDER above.
function renderDeclarationBlocks(declarations) {
  const buckets = { base: [] };
  for (const key of MEDIA_KEY_ORDER) buckets[key] = [];

  for (const decl of declarations) {
    const bucket = decl.mediaKey ? buckets[decl.mediaKey] : buckets.base;
    bucket.push(`  --${decl.name}: ${decl.value};`);
  }

  const blocks = [`:root {\n${buckets.base.join("\n")}\n}`];
  for (const key of MEDIA_KEY_ORDER) {
    if (buckets[key].length === 0) continue;
    blocks.push(`${MEDIA_QUERY_BY_KEY[key]} {\n  :root {\n${buckets[key].map((l) => `  ${l}`).join("\n")}\n  }\n}`);
  }
  return blocks.join("\n\n");
}

// The built-in "css/variables" format just does `${token.value}`,
// which prints "[object Object]" for text/effect tokens since they're
// structured, not strings. This is the same formatDeclarations() logic
// as the annotated storybook format below, minus the @tokens comments —
// a plain :root (+ @media) output for tokens.css, the file components
// import.
StyleDictionary.registerFormat({
  name: "css/variables-formatted",
  format: ({ dictionary }) => {
    const declarations = dictionary.allTokens.flatMap(formatDeclarations);
    return `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n${renderDeclarationBlocks(declarations)}\n`;
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
        const declarations = tokens.flatMap(formatDeclarations);

        return `/**\n * @tokens ${category}\n${presenterLine} */\n${renderDeclarationBlocks(declarations)}\n`;
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
