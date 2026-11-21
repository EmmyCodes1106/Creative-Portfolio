"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  ACCENT_STORAGE_KEY,
  DEFAULT_ACCENT,
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  isAccentId,
  isThemeMode,
  type AccentId,
  type ThemeMode,
} from "@/lib/theme";

type ThemeContextValue = {
  theme: ThemeMode;
  accent: AccentId;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setAccent: (accent: AccentId) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);
const CHANGE_EVENT = "emmycodes:appearance-change";

function subscribe(callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    const root = document.documentElement;

    if (event.key === THEME_STORAGE_KEY && isThemeMode(event.newValue)) {
      root.dataset.theme = event.newValue;
    }

    if (event.key === ACCENT_STORAGE_KEY && isAccentId(event.newValue)) {
      root.dataset.accent = event.newValue;
    }

    callback();
  };

  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

function getThemeSnapshot(): ThemeMode {
  const value = document.documentElement.dataset.theme;
  return isThemeMode(value) ? value : DEFAULT_THEME;
}

function getAccentSnapshot(): AccentId {
  const value = document.documentElement.dataset.accent;
  return isAccentId(value) ? value : DEFAULT_ACCENT;
}

function getThemeServerSnapshot(): ThemeMode {
  return DEFAULT_THEME;
}

function getAccentServerSnapshot(): AccentId {
  return DEFAULT_ACCENT;
}

function persist(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private or restricted contexts.
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getThemeServerSnapshot,
  );
  const accent = useSyncExternalStore(
    subscribe,
    getAccentSnapshot,
    getAccentServerSnapshot,
  );

  const setTheme = useCallback((next: ThemeMode) => {
    document.documentElement.dataset.theme = next;
    persist(THEME_STORAGE_KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const setAccent = useCallback((next: AccentId) => {
    document.documentElement.dataset.accent = next;
    persist(ACCENT_STORAGE_KEY, next);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({ theme, accent, setTheme, toggleTheme, setAccent }),
    [theme, accent, setTheme, toggleTheme, setAccent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
}
