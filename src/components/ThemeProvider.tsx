"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Theme, getTheme, DEFAULT_THEME_ID } from "@/lib/themes";

interface ThemeContextValue {
  theme: Theme;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: getTheme(DEFAULT_THEME_ID),
  setThemeId: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

function applyThemeToDOM(theme: Theme) {
  const root = document.documentElement;
  const c = theme.colors;
  root.style.setProperty("--color-primary", c.primary);
  root.style.setProperty("--color-primary-hover", c.primaryHover);
  root.style.setProperty("--color-secondary", c.secondary);
  root.style.setProperty("--color-accent", c.accent);
  root.style.setProperty("--color-background", c.background);
  root.style.setProperty("--color-surface", c.surface);
  root.style.setProperty("--color-surface-hover", c.surfaceHover);
  root.style.setProperty("--color-text", c.text);
  root.style.setProperty("--color-text-secondary", c.textSecondary);
  root.style.setProperty("--color-text-muted", c.textMuted);
  root.style.setProperty("--color-border", c.border);
  root.style.setProperty("--color-gradient", c.gradient);
  root.style.setProperty("--color-gradient-text", c.gradientText);
}

export default function ThemeProvider({
  initialThemeId,
  children,
}: {
  initialThemeId?: string;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(
    getTheme(initialThemeId || DEFAULT_THEME_ID)
  );

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  const setThemeId = (id: string) => {
    setTheme(getTheme(id));
  };

  return (
    <ThemeContext.Provider value={{ theme, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}
