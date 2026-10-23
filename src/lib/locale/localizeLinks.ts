import { SUPPORTED_LOCALES } from "@/config/locales";
import { localizeHref } from "./localizeHref";

// Content authors write links in WYSIWYG/rich-text fields however WordPress
// hands them out: root-relative ("/forex/eurusd"), absolute to the public
// domain ("https://afterprime.com/forex/eurusd"), or absolute to the WP
// backend host ("https://wordpress-…cloudwaysapps.com/withdraw/") when an
// editor picks a page via the link dialog. None carry the locale prefix, and
// the backend-host form sends visitors off-site entirely. Everything here is
// idempotent — running it twice on the same URL/HTML is a no-op.
// See docs/multilangual-architecture/14-CMS-Link-Localization.md.

function hostOf(url: string | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).host.toLowerCase();
  } catch {
    return null;
  }
}

const INTERNAL_HOSTS = new Set(
  [
    "afterprime.com",
    "www.afterprime.com",
    hostOf(process.env.NEXT_PUBLIC_WP_BASE_URL),
    hostOf(process.env.WORDPRESS_REST_ENDPOINT),
  ].filter((host): host is string => Boolean(host))
);

const ALREADY_LOCALE_PREFIXED = new RegExp(
  `^/(${SUPPORTED_LOCALES.join("|")})(/|$)`
);
// WP asset/admin/system paths and files (PDFs, images, etc.) are downloads or
// backend routes, not localized pages — never prefix these.
const NON_PAGE_PATH_PATTERN = /^\/(wp-content|wp-admin|wp-includes|wp-json|feed)(\/|$)|^\/xmlrpc\.php/i;
const HAS_FILE_EXTENSION = /\.[a-zA-Z0-9]{1,6}$/;
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i;

function isNonPagePath(pathname: string): boolean {
  return NON_PAGE_PATH_PATTERN.test(pathname) || HAS_FILE_EXTENSION.test(pathname);
}

// Localizes a single href value. Returns it unchanged for anything that
// isn't an internal page link (anchors, mailto:, tel:, external hosts,
// assets, already-prefixed paths).
export function localizeUrl(url: string, locale: string): string {
  const trimmed = url.trim();
  if (!trimmed || trimmed.startsWith("//")) return url;

  let path: string;
  if (ABSOLUTE_URL_PATTERN.test(trimmed)) {
    let parsed: URL;
    try {
      parsed = new URL(trimmed);
    } catch {
      return url;
    }
    if (!INTERNAL_HOSTS.has(parsed.host.toLowerCase())) return url;
    // Backend uploads (/wp-content/uploads/x.pdf) only exist on their own
    // host — keep those absolute.
    if (isNonPagePath(parsed.pathname)) return url;
    path = `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } else if (trimmed.startsWith("/")) {
    path = trimmed;
  } else {
    // "#section", "mailto:", "tel:", "javascript:", bare relative paths
    return url;
  }

  const pathname = path.split(/[?#]/)[0];
  if (isNonPagePath(pathname)) return path;
  if (ALREADY_LOCALE_PREFIXED.test(pathname)) return path;
  return localizeHref(path, locale);
}

const HREF_ATTR_PATTERN = /href=(["'])(.*?)\1/g;

// Applies localizeUrl to every href attribute in an HTML string, keeping the
// original quote style.
export function localizeHtmlLinks(html: string, locale: string): string {
  if (!html.includes("href=")) return html;
  return html.replace(HREF_ATTR_PATTERN, (match, quote: string, value: string) => {
    const localized = localizeUrl(value, locale);
    return localized === value ? match : `href=${quote}${localized}${quote}`;
  });
}

// Deep variant for whole WP/ACF objects that never pass through the
// translation engine's rehydrate step (English content). Only strings that
// contain an href attribute are touched — plain values (enums, ids, URLs in
// denylisted fields) are returned as-is, so no === comparison downstream
// can be affected. Returns the original reference wherever nothing changed,
// and never descends into non-plain objects (Dates, React elements, class
// instances).
const SCHEMA_KEY_PATTERN = /schema/i;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (!value || typeof value !== "object") return false;
  const proto = Object.getPrototypeOf(value);
  return proto === Object.prototype || proto === null;
}

export function localizeLinksDeep<T>(value: T, locale: string): T {
  if (typeof value === "string") {
    return (value.includes("href=") ? localizeHtmlLinks(value, locale) : value) as T;
  }
  if (Array.isArray(value)) {
    let changed = false;
    const items = value.map((item) => {
      const next = localizeLinksDeep(item, locale);
      if (next !== item) changed = true;
      return next;
    });
    return (changed ? items : value) as T;
  }
  if (isPlainObject(value)) {
    let changed = false;
    const result: Record<string, unknown> = {};
    for (const [key, entry] of Object.entries(value)) {
      // Raw JSON-LD strings (page_schema etc.) — same exclusion as the
      // translation walker's denylist.
      const next = SCHEMA_KEY_PATTERN.test(key) ? entry : localizeLinksDeep(entry, locale);
      if (next !== entry) changed = true;
      result[key] = next;
    }
    return (changed ? result : value) as T;
  }
  return value;
}
