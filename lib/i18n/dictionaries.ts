import type { Locale } from "./config";
import en from "./en";
import fr from "./fr";
import ar from "./ar";

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

/** All locales bundled for the client — language is switched in-context,
 *  so there is no per-request URL to load a single dictionary from. */
export const dictionaries: Record<Locale, Dictionary> = { en, fr, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
