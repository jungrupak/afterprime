import type { WalkedNode } from "./objectWalker";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/config/locales";

// Content authors write internal links in WYSIWYG/rich-text fields as plain
// site-root paths (href="/forex/eurusd") — WordPress has no notion of the
// Weglot locale prefix. Left as-is, clicking that link from /es/... drops
// the visitor back into English with no redirect. Rewritten here, once, at
// rehydration time, since this is the one place translated HTML strings are
// reassembled and the target locale is already known.
const HREF_ATTR_PATTERN = /href="(\/[^"]*)"/g;
const ALREADY_LOCALE_PREFIXED = new RegExp(
  `^/(${SUPPORTED_LOCALES.join("|")})(/|$)`
);
// WP asset/admin paths and files (PDFs, images, etc.) are downloads or
// backend routes, not localized pages — never prefix these.
const NON_PAGE_PATH_PATTERN = /^\/(wp-content|wp-admin|wp-json)\//i;
const HAS_FILE_EXTENSION = /\.[a-zA-Z0-9]{1,6}$/;

function localizeInternalHrefs(html: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) return html;
  return html.replace(HREF_ATTR_PATTERN, (match, path: string) => {
    if (path.startsWith("//")) return match; // protocol-relative external URL
    if (ALREADY_LOCALE_PREFIXED.test(path)) return match;
    if (NON_PAGE_PATH_PATTERN.test(path)) return match;
    if (HAS_FILE_EXTENSION.test(path)) return match;
    return `href="/${locale}${path}"`;
  });
}

// Mirror image of objectWalker's walkAndExtract: takes the walked tree plus
// a translated string array (same order/length as the original strings[])
// and rebuilds an object identical in shape to the original, with
// translated text in place of English text everywhere a string was found.
export function rehydrate(tree: WalkedNode, translated: string[], locale: string): unknown {
  switch (tree.type) {
    case "string-ref":
      return translated[tree.index];

    case "leaf":
      return tree.value;

    case "array":
      return tree.items.map((item) => rehydrate(item, translated, locale));

    case "html": {
      const joined = tree.segments
        .map((segment) => (typeof segment === "string" ? segment : translated[segment.index]))
        .join("");
      return localizeInternalHrefs(joined, locale);
    }

    case "object": {
      const result: Record<string, unknown> = {};
      for (const [key, value] of Object.entries(tree.entries)) {
        result[key] = rehydrate(value, translated, locale);
      }
      return result;
    }
  }
}
