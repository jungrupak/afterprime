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
  instrument_name:string;
  //sometimes shows error on endpoint
  error?:string;
  symbol?:string;
}

// #### Fetch function
export async function getBrokerCompareData(
  symbol: string,
){
  if (!symbol) return null;

  try {
    const res = await fetch(
      `https://feed.afterprime.com/api/symbol/${symbol.toUpperCase()}`,
      {
        next: { revalidate: 43200 }, // revalidate cache every 12 hrs       
      }
    );

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      if (body?.error !== "unsupported_symbol") {
        console.error(`API fetch failed (status ${res.status})`);
      }
      return null;
    }

    const data: BrokerIndividualDataType = await res.json();
    return data;
  } catch (err) {
    console.error("Fetch error in getBrokerCompareData:", err);
    return null; // return null if fetch throws
  }
}
