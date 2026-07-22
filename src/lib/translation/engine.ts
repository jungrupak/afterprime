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

function hashContent(content: unknown): string {
  const str = JSON.stringify(content);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return hash.toString(36);
}

// Orchestrates walk -> translate -> rehydrate -> cache for a single piece of
// content, for a single non-default locale. Fails safe: any provider error,
// or a mismatched translated-string count, falls back to the original
// (English) content rather than breaking the page. Shared by translatePage
// (WordPress content) and translateStatic (hardcoded UI strings) below.
export class TranslationEngine {
  constructor(private options: TranslationEngineOptions) {}

  private async run<T>(
    cacheKey: string,
    locale: string,
    version: string,
    original: T,
    logContext: Record<string, unknown>
  ): Promise<T> {
    const cached = await this.options.cache.get(cacheKey, locale, version);
    if (cached) return cached as T;

    const { strings, tree } = walkAndExtract(original);

    let translated: string[];
    try {
      translated = await this.options.provider.translateBatch(strings, locale);
    } catch (err) {
      console.error("Translation failed, falling back to original", {
        ...logContext,
        locale,
        err,
      });
      return original;
    }

    if (translated.length !== strings.length) {
      console.error("Rehydration aborted: mismatched translated string count", {
        ...logContext,
        locale,
        expected: strings.length,
        got: translated.length,
      });
      return original;
    }

    const result = rehydrate(tree, translated) as T;
    await this.options.cache.set(cacheKey, locale, version, result);
    return result;
  }

  async translatePage(slug: string, locale: string): Promise<WpPageJson | null> {
    const pages = await wpFetch<WpPageJson[]>(`/pages?slug=${slug}`);
    const original = pages?.[0];
    if (!original) return null;

    const modifiedAt = original.modified ?? "unknown";
    return this.run(slug, locale, modifiedAt, original, { slug });
  }

  // Translates a plain object of hardcoded UI strings (nav labels, footer
  // copy, static block text — anything not sourced from WordPress). `key`
  // identifies the content (e.g. "footer", "header-nav") and is combined
  // with a hash of `content` as the cache version, so editing the source
  // strings in code automatically invalidates the cache — no WP
  // `modifiedAt` exists for this content, so the content itself is hashed.
  async translateStatic<T>(key: string, locale: string, content: T): Promise<T> {
    const version = hashContent(content);
    return this.run(`static:${key}`, locale, version, content, { key });
  }
}
