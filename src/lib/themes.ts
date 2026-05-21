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
    shadowCard: string;
    shadowMd: string;
    shadowLg: string;
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
      background: "#f7f8fa",
      surface: "#ffffff",
      surfaceHover: "#fff1f2",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#e4e9f0",
      gradient: "linear-gradient(135deg, #e11d48, #f97316)",
      gradientText: "linear-gradient(135deg, #e11d48, #f97316)",
      shadowCard: "0 1px 4px rgba(0,0,0,0.06), 0 2px 8px rgba(0,0,0,0.04)",
      shadowMd:   "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.05)",
      shadowLg:   "0 8px 32px rgba(0,0,0,0.10), 0 4px 12px rgba(0,0,0,0.06)",
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
      background: "#f5f9fd",
      surface: "#ffffff",
      surfaceHover: "#f0f9ff",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#ddeef8",
      gradient: "linear-gradient(135deg, #0ea5e9, #6366f1)",
      gradientText: "linear-gradient(135deg, #0ea5e9, #6366f1)",
      shadowCard: "0 1px 4px rgba(14,165,233,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      shadowMd:   "0 4px 16px rgba(14,165,233,0.12), 0 2px 6px rgba(0,0,0,0.05)",
      shadowLg:   "0 8px 32px rgba(14,165,233,0.14), 0 4px 12px rgba(0,0,0,0.06)",
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
      background: "#f8f6ff",
      surface: "#ffffff",
      surfaceHover: "#f5f3ff",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#e4daf8",
      gradient: "linear-gradient(135deg, #7c3aed, #ec4899)",
      gradientText: "linear-gradient(135deg, #7c3aed, #ec4899)",
      shadowCard: "0 1px 4px rgba(124,58,237,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      shadowMd:   "0 4px 16px rgba(124,58,237,0.12), 0 2px 6px rgba(0,0,0,0.05)",
      shadowLg:   "0 8px 32px rgba(124,58,237,0.14), 0 4px 12px rgba(0,0,0,0.06)",
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
      background: "#f4faf7",
      surface: "#ffffff",
      surfaceHover: "#ecfdf5",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#d8f0e8",
      gradient: "linear-gradient(135deg, #059669, #0ea5e9)",
      gradientText: "linear-gradient(135deg, #059669, #0ea5e9)",
      shadowCard: "0 1px 4px rgba(5,150,105,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      shadowMd:   "0 4px 16px rgba(5,150,105,0.12), 0 2px 6px rgba(0,0,0,0.05)",
      shadowLg:   "0 8px 32px rgba(5,150,105,0.14), 0 4px 12px rgba(0,0,0,0.06)",
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
      background: "#fdf8f3",
      surface: "#ffffff",
      surfaceHover: "#fff7ed",
      text: "#0f172a",
      textSecondary: "#475569",
      textMuted: "#94a3b8",
      border: "#f0e0d0",
      gradient: "linear-gradient(135deg, #ea580c, #e11d48)",
      gradientText: "linear-gradient(135deg, #ea580c, #e11d48)",
      shadowCard: "0 1px 4px rgba(234,88,12,0.08), 0 2px 8px rgba(0,0,0,0.04)",
      shadowMd:   "0 4px 16px rgba(234,88,12,0.12), 0 2px 6px rgba(0,0,0,0.05)",
      shadowLg:   "0 8px 32px rgba(234,88,12,0.14), 0 4px 12px rgba(0,0,0,0.06)",
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
      background: "#0b0f1a",
      surface: "#141b2d",
      surfaceHover: "#1e2840",
      text: "#f1f5f9",
      textSecondary: "#cbd5e1",
      textMuted: "#64748b",
      border: "#1e2d45",
      gradient: "linear-gradient(135deg, #6366f1, #ec4899)",
      gradientText: "linear-gradient(135deg, #818cf8, #f472b6)",
      shadowCard: "0 1px 4px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.2)",
      shadowMd:   "0 4px 16px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.3)",
      shadowLg:   "0 8px 32px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.3)",
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
