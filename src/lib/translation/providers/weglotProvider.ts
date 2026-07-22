import type { TranslationProvider } from "../engine";
import { getWeglotCode } from "@/config/locales";

// Concrete TranslationProvider implementation for the Weglot Translation
// API. Verified wire format (confirmed against Weglot's own docs/llms-full.txt
// and a live request — this differs from Weglot's generic public examples,
// which show source_language/target_language/words/translations; the real
// endpoint takes l_from/l_to/words:[{w,t}] and returns to_words):
//
//   POST https://api.weglot.com/translate?api_key=<key>
//   { l_from, l_to, request_url, words: [{ w: "text", t: 1 }] }
//   -> { to_words: ["..."] }
const WEGLOT_API_URL =
  process.env.WEGLOT_API_URL ?? "https://api.weglot.com/translate";

// Not documented as a hard limit — kept conservative so a single oversized
// request can't take an entire page's translation down.
const WEGLOT_MAX_BATCH_SIZE = 50;

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export class WeglotProvider implements TranslationProvider {
  constructor(
    private apiKey: string,
    private sourceLocale: string = "en"
  ) {}

  async translateBatch(strings: string[], targetLocale: string): Promise<string[]> {
    if (strings.length === 0) return [];
    if (!this.apiKey) {
      throw new Error("WEGLOT_API_KEY is not set");
    }

    const weglotTarget = getWeglotCode(targetLocale);

    const chunks = chunkArray(strings, WEGLOT_MAX_BATCH_SIZE);
    const results: string[] = [];

    for (const chunk of chunks) {
      const response = await fetch(`${WEGLOT_API_URL}?api_key=${this.apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          l_from: this.sourceLocale,
          l_to: weglotTarget,
          request_url: "https://afterprime.com/",
          words: chunk.map((w) => ({ w, t: 1 })),
        }),
        // Translations rarely change day to day — cache alongside the WP fetch.
        next: { revalidate: 86400 },
      });

      if (!response.ok) {
        throw new Error(`Weglot API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const translated = data?.to_words;

      if (!Array.isArray(translated)) {
        throw new Error("Weglot API returned an unexpected response shape");
      }

      results.push(...translated);
    }

    if (results.length !== strings.length) {
      throw new Error("Weglot returned a mismatched number of translations");
    }

    return results;
  }
}
