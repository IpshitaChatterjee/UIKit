import StyleDictionary from "style-dictionary";

// The storybook-design-token addon reads special comments in a CSS
// file to know how to group and label tokens. This registers a
// custom output format that adds those comments automatically, so
// it stays in sync every time the Figma workflow regenerates tokens.
const PRESENTER_BY_GROUP = {
  fill: "Color",
  text: "Typography",
  effect: "Text",
  grid: "Text",
};

StyleDictionary.registerFormat({
  name: "css/design-token-annotated",
  formatter: ({ dictionary }) => {
    const groups = {};

    dictionary.allTokens.forEach((token) => {
      const groupName = token.path[0] || "other";
      groups[groupName] = groups[groupName] || [];
      groups[groupName].push(token);
    });

    return Object.entries(groups)
      .map(([groupName, tokens]) => {
        const presenter = PRESENTER_BY_GROUP[groupName] || "Text";
        const label = groupName.charAt(0).toUpperCase() + groupName.slice(1);
        const declarations = tokens
          .map((t) => `  --${t.name}: ${t.value};`)
          .join("\n");

        return `/**\n * @tokens ${label}\n * @presenter ${presenter}\n */\n:root {\n${declarations}\n}\n`;
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
          format: "css/variables",
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