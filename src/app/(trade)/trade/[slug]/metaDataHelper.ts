// import type { getBrokerCompareData } from "@/lib/getBrokersToCompare";

type MetaDataResult = {
  getpercentage: number;
  rebate: number;
  industryVsApAvgPct: number;
  top10VsAfterprimeAvgPct:number;
};

// lib/metaDataHelper.ts
const CACHE: Record<
  string,
  { value: MetaDataResult; timestamp: number }
> = {};
const CACHE_TTL = 60 * 1000; // 1 minute cache

export async function metaDataHelper(instrument: string) : Promise<MetaDataResult> {

  if (!instrument) {
    return {
      getpercentage: 0,
      rebate: 0,
      industryVsApAvgPct: 0,
      top10VsAfterprimeAvgPct:0,
    };
  }

  // Check cache first
  const key = instrument.toLowerCase();
  const cached = CACHE[key];
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
      return { getpercentage: 0, rebate: 0, industryVsApAvgPct: 0 , top10VsAfterprimeAvgPct:0};
    }

    const data = await res.json();

    const result = {
      getpercentage : data?.secondBestVsAfterprimePct ?? 0,
      rebate : data?.rebate?.rebate_usd_per_lot ?? 0,
      industryVsApAvgPct : data?.industryVsAfterprimeAvgPct ?? 0,
      top10VsAfterprimeAvgPct : data?.top10VsAfterprimeAvgPct ?? 0
    }

    // Save to cache
    CACHE[key] = { value:result, timestamp: now };
    return result;
  } catch (err) {
    console.error(`Error fetching ${instrument}:`, err);
    return { getpercentage: 0, rebate: 0, industryVsApAvgPct: 0, top10VsAfterprimeAvgPct: 0 };
  }
}
