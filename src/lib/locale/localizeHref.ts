import { DEFAULT_LOCALE } from "@/config/locales";

// Prefixes an internal href with the active locale, skipping the prefix for
// the default locale (English stays unprefixed). Used by nav/CTA/breadcrumb
// links once locale-aware navigation is wired up (Phase 2).
export function localizeHref(href: string, locale: string): string {
  if (locale === DEFAULT_LOCALE) return href;
  return `/${locale}${href.startsWith("/") ? href : `/${href}`}`;
}
