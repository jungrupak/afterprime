import { SUPPORTED_LOCALES } from "../../config/locales";

// Single source of truth for routes served with `noindex, follow`.
// - next.config.ts emits `X-Robots-Tag: noindex, follow` for NOINDEX_ROUTE_SOURCES
//   (English unprefixed + every /{locale} prefix).
// - sitemapEntries.ts drops any URL where isNoindexPath() is true, so a
//   noindex page can never appear in any sitemap.
// Relative imports only — this file is also loaded by next.config.ts.

// path-to-regexp sources (next.config.ts headers()), English / unprefixed form.
export const NOINDEX_ROUTE_SOURCES = [
  "/vs/:broker/:symbol", // /vs/{competitor}/{symbol}
] as const;

// Same routes as regex, matched against an unprefixed pathname.
const NOINDEX_PATH_PATTERNS: readonly RegExp[] = [
  /^\/vs\/[^/]+\/[^/]+\/?$/,
];

const LOCALE_PREFIX = new RegExp(`^/(${SUPPORTED_LOCALES.join("|")})(?=/|$)`);

export function isNoindexPath(pathname: string): boolean {
  const unprefixed = pathname.replace(LOCALE_PREFIX, "") || "/";
  return NOINDEX_PATH_PATTERNS.some((pattern) => pattern.test(unprefixed));
}

// Header rules for next.config.ts: one per source per locale prefix.
export function noindexHeaderRules() {
  const localePrefixes = SUPPORTED_LOCALES.filter((l) => l !== "en");
  return NOINDEX_ROUTE_SOURCES.flatMap((source) => [
    source,
    `/:locale(${localePrefixes.join("|")})${source}`,
  ]).map((source) => ({
    source,
    headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
  }));
}
