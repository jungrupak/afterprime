// #### Types
interface BrokereArray {
  broker: string;
  symbol: string;
  cost: number;
  costPerLot: number;
  savingPercentage: number;
}

interface BrokerIndividualDataType {
  brokers: BrokereArray[];
  secondBestVsAfterprimePct?: number | null;
  top10VsAfterprimeAvgPct?: number | null;
  industryVsAfterprimeAvgPct?: number | null;
  rebate?: {
    symbol: string;
    product?: string;
    rebate_usd_per_lot?: number | null;
    effective_from?: string;
    effective_to?: string;
  };
}

// #### Cache time
const CACHE_TTL = 2 * 60; // in seconds (Next.js expects seconds for revalidate)

// #### Fetch function
export async function getBrokerCompareData(
  symbol: string,
): Promise<BrokerIndividualDataType | null> {
  if (!symbol) return null;

  try {
    const res = await fetch(
      `https://feed.afterprime.com/api/symbol/${symbol}`,
      {
        cache: "force-cache", // reuse cached data
        next: { revalidate: CACHE_TTL }, // revalidate cache every 2 min
      }
    );

    if (!res.ok) {
      console.error(`API fetch failed (status ${res.status})`);
      return null; // return null on failed fetch
    }

    const data: BrokerIndividualDataType = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error in getBrokerCompareData:", err);
    return null; // return null if fetch throws
  }
}
