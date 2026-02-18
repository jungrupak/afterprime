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
      `https://feed.afterprime.com/api/symbol/${symbol}`,
      {
        next: { revalidate: 43200 }, // revalidate cache every 12 hrs       
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
