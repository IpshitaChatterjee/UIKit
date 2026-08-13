import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'uikit-theme';

function getInitialTheme() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Mirrors tokens.css's manual-override contract: setting data-theme="dark"
 * on <html> wins over prefers-color-scheme, and data-theme="light" blocks
 * it (see the `:not([data-theme="light"])` guard in the dark media block).
 */
export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return [theme, toggleTheme];
}
