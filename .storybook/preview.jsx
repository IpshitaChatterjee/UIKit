/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    designToken: {
      files: {
        colors: ['../build/css/tokens.storybook.css'],
        typography: ['../build/css/tokens.storybook.css'],
      },
    },
  },
};

export default preview;