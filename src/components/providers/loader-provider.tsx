"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type LoaderContextValue = {
  ready: boolean;
  setReady: (ready: boolean) => void;
};

const LoaderContext = createContext<LoaderContextValue | null>(null);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("intro-seen"),
  );

  const value = useMemo(() => ({ ready, setReady }), [ready]);

  return <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>;
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used inside LoaderProvider");
  }
  return context;
}
