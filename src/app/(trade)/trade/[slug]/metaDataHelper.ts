// import type { getBrokerCompareData } from "@/lib/getBrokersToCompare";

// lib/metaDataHelper.ts
const CACHE: Record<string, { value: number; timestamp: number }> = {};
const CACHE_TTL = 60 * 1000; // 1 minute cache

export async function metaDataHelper(instrument: string) {
  if (!instrument) return 0;

  // Check cache first
  const cached = CACHE[instrument.toLowerCase()];
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.value;
  }

  try {
    const res = await fetch(`https://feed.afterprime.com/api/symbol/${instrument}`, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept": "application/json",
      },
      cache: "no-store", // Always fetch fresh data
    });

    if (!res.ok) {
      console.warn(`Failed to fetch ${instrument}: ${res.status}`);
      return 0; // fallback
    }

    const data = await res.json();
    const percent = data?.secondBestVsAfterprimePct ?? 0;

    // Save to cache
    CACHE[instrument.toLowerCase()] = { value: percent, timestamp: now };
    return percent;
  } catch (err) {
    console.error(`Error fetching ${instrument}:`, err);
    return 0;
  }
}
