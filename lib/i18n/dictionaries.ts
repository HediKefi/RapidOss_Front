import type { Locale } from "./config";
import en from "./en";

/** Widens literal types from the English source dictionary so the
 *  other locales can provide their own strings. */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends readonly (infer U)[]
      ? Widen<U>[]
      : T extends object
        ? { [K in keyof T]: Widen<T[K]> }
        : T;

export type Dictionary = Widen<typeof en>;

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("./en").then((m) => m.default),
  fr: () => import("./fr").then((m) => m.default),
  ar: () => import("./ar").then((m) => m.default),
};

export function getDictionary(locale: Locale): Promise<Dictionary> {
  return loaders[locale]();
}
