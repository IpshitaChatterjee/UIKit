import './preview.css';

// Mirrors tokens.css's manual-override contract (see useTheme.js in the
// app): setting data-theme on the preview iframe's <html> switches the
// color-tokens/effects variables Button.css etc. read from.
function withTheme(Story, context) {
  document.documentElement.dataset.theme = context.globals.theme || 'light';
  return <Story />;
}

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  globalTypes: {
    theme: {
      description: 'Color scheme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'sun', title: 'Light' },
          { value: 'dark', icon: 'moon', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: 'light',
  },
  decorators: [withTheme],
};

export default preview;
