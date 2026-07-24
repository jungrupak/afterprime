import { TranslationEngine } from "./engine";
import { WeglotProvider } from "./providers/weglotProvider";
import { InMemoryTranslationCache } from "./cache";

function getWeglotApiKey(): string {
  return process.env.WEGLOT_API_KEY ?? "";
}

// One engine (and its in-memory cache) per server instance, shared by every
// translation entry point (getTranslatedPage for WP content,
// getTranslatedStatic for hardcoded UI strings) — same cache, same provider.
let engine: TranslationEngine | null = null;

export function getSharedEngine(): TranslationEngine {
  if (!engine) {
    engine = new TranslationEngine({
      provider: new WeglotProvider(getWeglotApiKey()),
      cache: new InMemoryTranslationCache(),
    });
  }
  return engine;
}
