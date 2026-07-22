import { DEFAULT_LOCALE } from "@/config/locales";
import { getSharedEngine } from "@/lib/translation/sharedEngine";

// Entry point for hardcoded UI strings (nav labels, footer copy, static
// block text) that never came from WordPress and so never pass through
// getTranslatedPage. Same pipeline, same cache, same fail-safe behavior —
// `content` is any plain object of strings; `key` names it for caching
// (e.g. "footer", "header-nav").
export async function getTranslatedStatic<T>(
  key: string,
  locale: string,
  content: T
): Promise<T> {
  if (locale === DEFAULT_LOCALE) return content;
  return getSharedEngine().translateStatic(key, locale, content);
}
