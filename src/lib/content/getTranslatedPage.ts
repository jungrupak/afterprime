import { wpFetch } from "@/utils/wpFetch";
import { DEFAULT_LOCALE } from "@/config/locales";
import { getSharedEngine } from "@/lib/translation/sharedEngine";
import { localizeLinksDeep } from "@/lib/locale/localizeLinks";

// Single entry point every page uses instead of fetching WP content
// directly. English skips translation, but rich-text links still get
// normalized (backend-host URLs -> site paths; see localizeLinks.ts); any
// other locale runs the full translation pipeline.
export async function getTranslatedPage<T = Record<string, unknown>>(
  slug: string,
  locale: string
): Promise<T | null> {
  if (locale === DEFAULT_LOCALE) {
    const pages = await wpFetch<T[]>(`/pages?slug=${slug}`);
    const page = pages?.[0];
    return page ? localizeLinksDeep(page, locale) : null;
  }

  return getSharedEngine().translatePage(slug, locale) as Promise<T | null>;
}
