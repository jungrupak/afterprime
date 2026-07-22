import { wpFetch } from "@/utils/wpFetch";
import { walkAndExtract } from "./objectWalker";
import { rehydrate } from "./rehydrate";
import type { TranslationCache } from "./cache";

// Any translation provider (Weglot today, potentially an LLM-based provider
// later) is a drop-in replacement as long as it satisfies this contract —
// the engine, walker, and rehydration logic never change when swapping
// providers. See docs/multilangual-architecture/06-Weglot-Provider.md.
export interface TranslationProvider {
  translateBatch(strings: string[], targetLocale: string): Promise<string[]>;
}

export interface TranslationEngineOptions {
  provider: TranslationProvider;
  cache: TranslationCache;
}

type WpPageJson = Record<string, unknown> & { modified?: string };

// Orchestrates fetch -> walk -> translate -> rehydrate -> cache for a single
// WordPress page, for a single non-default locale. Fails safe: any provider
// error, or a mismatched translated-string count, falls back to serving the
// original English content rather than breaking the page.
export class TranslationEngine {
  constructor(private options: TranslationEngineOptions) {}

  async translatePage(slug: string, locale: string): Promise<WpPageJson | null> {
    const pages = await wpFetch<WpPageJson[]>(`/pages?slug=${slug}`);
    const original = pages?.[0];
    if (!original) return null;

    const modifiedAt = original.modified ?? "unknown";

    const cached = await this.options.cache.get(slug, locale, modifiedAt);
    if (cached) return cached as WpPageJson;

    const { strings, tree } = walkAndExtract(original);

    let translated: string[];
    try {
      translated = await this.options.provider.translateBatch(strings, locale);
    } catch (err) {
      console.error("Translation failed, falling back to original", {
        slug,
        locale,
        err,
      });
      return original;
    }

    if (translated.length !== strings.length) {
      console.error("Rehydration aborted: mismatched translated string count", {
        slug,
        locale,
        expected: strings.length,
        got: translated.length,
      });
      return original;
    }

    const result = rehydrate(tree, translated) as WpPageJson;
    await this.options.cache.set(slug, locale, modifiedAt, result);
    return result;
  }
}
