"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { localeDir, type Locale } from "./config";
import { dictionaries, type Dictionary } from "./dictionaries";
import { LOCALE_COOKIE } from "./constants";

interface I18nValue {
  locale: Locale;
  dict: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nValue | null>(null);

/** Mirror the active locale into the cookie (for SSR), localStorage and
 *  the document's language/direction. */
function persist(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {
    /* private mode */
  }
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
  document.documentElement.lang = locale;
  document.documentElement.dir = localeDir[locale];
}

/**
 * Language lives in context, not the URL. The server resolves the initial
 * locale from the cookie/Accept-Language and passes it in, so the first
 * render already matches the visitor's choice (no flash, no mismatch).
 */
export function I18nProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  // refresh the cookie TTL and keep document attributes in sync; runs on
  // mount and on every switch (updates external systems only)
  useEffect(() => {
    persist(locale);
  }, [locale]);

  const value: I18nValue = {
    locale,
    dict: dictionaries[locale],
    setLocale,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}

/** Sets document.title for a page; reactive to locale changes. */
export function usePageTitle(title: string) {
  useEffect(() => {
    if (title) document.title = title;
  }, [title]);
}
