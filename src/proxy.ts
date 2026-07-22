import { NextRequest, NextResponse } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/config/locales";

// docs/multilangual-architecture/08-NextJS-Integration.md §8.2 — a single
// locale prefix at the root, handled via rewrite, instead of moving every
// route under app/[locale]/. Locale-prefixed URLs (e.g. /es/forex) are
// rewritten internally to the existing unprefixed route (/forex); the
// locale is passed downstream via the x-locale header (read by
// lib/locale/getRequestLocale.ts). Named proxy.ts, not middleware.ts —
// Next.js 16 renamed the file convention (middleware.ts is deprecated).
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const maybeLocale = segments[0];

  if (
    !maybeLocale ||
    !(SUPPORTED_LOCALES as readonly string[]).includes(maybeLocale) ||
    maybeLocale === DEFAULT_LOCALE
  ) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/" + segments.slice(1).join("/");

  const response = NextResponse.rewrite(url);
  response.headers.set("x-locale", maybeLocale);
  return response;
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
