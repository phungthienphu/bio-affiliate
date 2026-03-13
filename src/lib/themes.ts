export interface Theme {
  id: string;
  name: string;
  colors: {
    primary: string;
    primaryHover: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceHover: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    gradient: string;
    gradientText: string;
  };
}

export const themes: Record<string, Theme> = {
  rose: {
    id: "rose",
    name: "Rose Pink",
    colors: {
      primary: "#e11d48",
      primaryHover: "#be123c",
      secondary: "#f43f5e",
      accent: "#fb7185",
      background: "#fafafa",
      surface: "#ffffff",
      surfaceHover: "#fff1f2",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#f1f5f9",
      gradient: "linear-gradient(135deg, #e11d48, #f97316)",
      gradientText: "linear-gradient(135deg, #e11d48, #f97316)",
    },
  },
  ocean: {
    id: "ocean",
    name: "Ocean Blue",
    colors: {
      primary: "#0ea5e9",
      primaryHover: "#0284c7",
      secondary: "#38bdf8",
      accent: "#7dd3fc",
      background: "#f8fafc",
      surface: "#ffffff",
      surfaceHover: "#f0f9ff",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#f1f5f9",
      gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
      gradientText: "linear-gradient(135deg, #0ea5e9, #6366f1)",
    },
  },
  violet: {
    id: "violet",
    name: "Violet Purple",
    colors: {
      primary: "#7c3aed",
      primaryHover: "#6d28d9",
      secondary: "#8b5cf6",
      accent: "#a78bfa",
      background: "#faf5ff",
      surface: "#ffffff",
      surfaceHover: "#f5f3ff",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#f1f5f9",
      gradient: "linear-gradient(135deg, #7c3aed, #ec4899)",
      gradientText: "linear-gradient(135deg, #7c3aed, #ec4899)",
    },
  },
  emerald: {
    id: "emerald",
    name: "Emerald Green",
    colors: {
      primary: "#059669",
      primaryHover: "#047857",
      secondary: "#10b981",
      accent: "#34d399",
      background: "#f8fafb",
      surface: "#ffffff",
      surfaceHover: "#ecfdf5",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#f1f5f9",
      gradient: "linear-gradient(135deg, #059669, #0ea5e9)",
      gradientText: "linear-gradient(135deg, #059669, #0ea5e9)",
    },
  },
  sunset: {
    id: "sunset",
    name: "Sunset Orange",
    colors: {
      primary: "#ea580c",
      primaryHover: "#c2410c",
      secondary: "#f97316",
      accent: "#fb923c",
      background: "#fffbf5",
      surface: "#ffffff",
      surfaceHover: "#fff7ed",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#f1f5f9",
      gradient: "linear-gradient(135deg, #ea580c, #e11d48)",
      gradientText: "linear-gradient(135deg, #ea580c, #e11d48)",
    },
  },
  midnight: {
    id: "midnight",
    name: "Midnight Dark",
    colors: {
      primary: "#6366f1",
      primaryHover: "#4f46e5",
      secondary: "#818cf8",
      accent: "#a5b4fc",
      background: "#0f172a",
      surface: "#1e293b",
      surfaceHover: "#334155",
      text: "#f8fafc",
      textSecondary: "#cbd5e1",
      textMuted: "#64748b",
      border: "#334155",
      gradient: "linear-gradient(135deg, #6366f1, #ec4899)",
      gradientText: "linear-gradient(135deg, #818cf8, #f472b6)",
    },
  },
};

export const DEFAULT_THEME_ID = "rose";

export function getTheme(id: string): Theme {
  return themes[id] || themes[DEFAULT_THEME_ID];
}

export function getThemeList(): Theme[] {
  return Object.values(themes);
}
