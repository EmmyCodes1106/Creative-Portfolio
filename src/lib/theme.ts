export const ACCENTS = [
  { id: "violet", label: "Violet", hex: "#7257E8" },
  { id: "blue", label: "Electric blue", hex: "#2878E8" },
  { id: "emerald", label: "Emerald", hex: "#159B75" },
  { id: "orange", label: "Orange", hex: "#E4773F" },
  { id: "rose", label: "Rose", hex: "#D65378" },
] as const;

export type AccentId = (typeof ACCENTS)[number]["id"];
export type ThemeMode = "light" | "dark";

export const DEFAULT_THEME: ThemeMode = "light";
export const DEFAULT_ACCENT: AccentId = "blue";

export const THEME_STORAGE_KEY = "emmycodes:theme";
export const ACCENT_STORAGE_KEY = "emmycodes:accent";
export const INTRO_STORAGE_KEY = "emmycodes:intro";

export function isAccentId(value: unknown): value is AccentId {
  return ACCENTS.some((accent) => accent.id === value);
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}
