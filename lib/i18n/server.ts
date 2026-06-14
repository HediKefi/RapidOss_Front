import { cookies, headers } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "./config";
import { LOCALE_COOKIE } from "./constants";

/**
 * Resolves the request's locale on the server: a previously stored cookie
 * wins, otherwise the browser's Accept-Language header, otherwise the
 * default. Used for SSR so the markup, <html lang/dir> and metadata match
 * the visitor's chosen language on a hard load.
 */
export async function getServerLocale(): Promise<Locale> {
  const stored = (await cookies()).get(LOCALE_COOKIE)?.value;
  if (stored && isLocale(stored)) return stored;

  const accept = (await headers()).get("accept-language") ?? "";
  for (const part of accept.split(",")) {
    const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (isLocale(code)) return code;
  }
  return defaultLocale;
}
