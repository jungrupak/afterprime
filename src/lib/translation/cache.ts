// Avoids re-running the walk -> translate -> rehydrate pipeline (and paying
// for a Weglot API call) on every request for content that hasn't changed.
// Keyed by slug + locale + the source content's modifiedAt, so a WordPress
// edit naturally produces a new key and gets re-translated automatically.

export interface TranslationCache {
  get(slug: string, locale: string, modifiedAt: string): Promise<unknown | null>;
  set(slug: string, locale: string, modifiedAt: string, data: unknown): Promise<void>;
  invalidate(slug: string): Promise<void>;
}

function cacheKey(slug: string, locale: string, modifiedAt: string): string {
  return `${slug}:${locale}:${modifiedAt}`;
}

// Phase 1 implementation: per-server-instance in-memory cache. Satisfies the
// same TranslationCache contract a Cloudflare D1-backed cache would (see
// docs/multilangual-architecture/10-Caching.md) — swapping in a D1
// implementation later requires zero changes to the Translation Engine.
export class InMemoryTranslationCache implements TranslationCache {
  private store = new Map<string, unknown>();

  async get(slug: string, locale: string, modifiedAt: string) {
    return this.store.get(cacheKey(slug, locale, modifiedAt)) ?? null;
  }

  async set(slug: string, locale: string, modifiedAt: string, data: unknown) {
    this.store.set(cacheKey(slug, locale, modifiedAt), data);
  }

  async invalidate(slug: string) {
    const prefix = `${slug}:`;
    for (const key of this.store.keys()) {
      if (key.startsWith(prefix)) this.store.delete(key);
    }
  }
}
