import { NextRequest, NextResponse } from "next/server";
import { locales, defaultLocale, isLocale } from "@/lib/i18n/config";

function detectLocale(request: NextRequest): string {
  const header = request.headers.get("accept-language") ?? "";
  for (const part of header.split(",")) {
    const code = part.split(";")[0].trim().slice(0, 2).toLowerCase();
    if (isLocale(code)) return code;
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (hasLocale) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${detectLocale(request)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // skip internals and any path with a file extension (assets, icons…)
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
