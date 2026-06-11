export const locales = ["en", "fr", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeDir: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  fr: "ltr",
  ar: "rtl",
};

export const localeNames: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "ع",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
