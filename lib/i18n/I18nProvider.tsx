"use client";

import { useEffect, useSyncExternalStore } from "react";
import { defaultLocale, isLocale, localeDir, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";

const STORAGE_KEY = "locale";

// ---- external locale store (no setState-in-effect, SSR-safe) ----

const listeners = new Set<() => void>();
let current: Locale | null = null;

/** Resolve a stored choice, then the browser language, then the default. */
function detectLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  } catch {
    /* private mode */
  }
  const nav = navigator.language?.slice(0, 2).toLowerCase();
  if (nav && isLocale(nav)) return nav;
  return defaultLocale;
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot(): Locale {
  if (!current) current = detectLocale();
  return current;
}

const getServerSnapshot = (): Locale => defaultLocale;

function applyDocument(locale: Locale) {
  document.documentElement.lang = locale;
  document.documentElement.dir = localeDir[locale];
}

export function setLocale(next: Locale) {
  current = next;
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* private mode */
  }
  applyDocument(next);
  listeners.forEach((cb) => cb());
}

// ---- hooks ----

export interface I18n {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

export function useI18n(): I18n {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return { locale, dict: dictionaries[locale], setLocale };
}

/**
 * Keeps the document's language + direction in sync with the active
 * locale. The boot script in the layout sets these before first paint;
 * this re-applies them once React adopts the stored choice.
 */
export function I18nProvider({ children }: { children: React.ReactNode }) {
  const { locale } = useI18n();
  useEffect(() => {
    applyDocument(locale);
  }, [locale]);
  return <>{children}</>;
}

/** Sets document.title for a page; reactive to locale changes. */
export function usePageTitle(title: string) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
}
