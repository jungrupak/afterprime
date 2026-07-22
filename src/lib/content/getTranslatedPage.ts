import { wpFetch } from "@/utils/wpFetch";
import { DEFAULT_LOCALE } from "@/config/locales";
import { getSharedEngine } from "@/lib/translation/sharedEngine";

// Single entry point every page uses instead of fetching WP content
// directly. English is a pure passthrough (identical behavior/performance
// to before); any other locale runs the full translation pipeline.
export async function getTranslatedPage<T = Record<string, unknown>>(
  slug: string,
  locale: string
): Promise<T | null> {
  if (locale === DEFAULT_LOCALE) {
    const pages = await wpFetch<T[]>(`/pages?slug=${slug}`);
    return pages?.[0] ?? null;
  }

  return getSharedEngine().translatePage(slug, locale) as Promise<T | null>;
}
