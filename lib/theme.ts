"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

const getServerSnapshot = (): Theme => "dark";

export function setTheme(theme: Theme) {
  if (theme === "light") {
    document.documentElement.dataset.theme = "light";
  } else {
    delete document.documentElement.dataset.theme;
  }
  try {
    localStorage.setItem("theme", theme);
  } catch {
    /* private mode */
  }
  listeners.forEach((cb) => cb());
}

export function toggleTheme() {
  setTheme(getSnapshot() === "dark" ? "light" : "dark");
}

/** Reactive theme value; defaults to dark on the server. */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
