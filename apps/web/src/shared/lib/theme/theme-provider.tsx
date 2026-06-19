import { useEffect, useLayoutEffect, useState } from 'react';
import { getSystemTheme } from './get-system-theme';
import { ThemeContext, type Theme } from './theme-context';

const root = window.document.documentElement;

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

export function ThemeProvider({
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme | null) ?? defaultTheme,
  );

  useLayoutEffect(() => {
    const systemTheme = getSystemTheme();
    root.classList.add(systemTheme);
  }, []);

  useEffect(() => {
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = getSystemTheme();
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return <ThemeContext {...props} value={value} />;
}
