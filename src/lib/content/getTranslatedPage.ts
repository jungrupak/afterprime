import { wpFetch } from "@/utils/wpFetch";
import { DEFAULT_LOCALE } from "@/config/locales";
import { TranslationEngine } from "@/lib/translation/engine";
import { WeglotProvider } from "@/lib/translation/providers/weglotProvider";
import { InMemoryTranslationCache } from "@/lib/translation/cache";

function getWeglotApiKey(): string {
  return process.env.WEGLOT_API_KEY ?? process.env.NEXT_PUBLIC_WEGLOT_API_KEY ?? "";
}

// Module-level singleton: one engine (and its in-memory cache) per server
// instance, shared across requests — matches the Cache Layer design in
// docs/multilangual-architecture/10-Caching.md.
let engine: TranslationEngine | null = null;
function getEngine(): TranslationEngine {
  if (!engine) {
    engine = new TranslationEngine({
      provider: new WeglotProvider(getWeglotApiKey()),
      cache: new InMemoryTranslationCache(),
    });
  }
  return engine;
}

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

  return getEngine().translatePage(slug, locale) as Promise<T | null>;
}
