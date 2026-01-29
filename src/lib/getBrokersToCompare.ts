
//#### State Type of retrieving data
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
// ####

//#######
export async function getBrokerCompareData(
  symbol: string,
): Promise<BrokerIndividualDataType | undefined> {
  try {
    const res = await fetch(
      `https://feed.afterprime.com/api/symbol/${symbol}`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch comparison data");
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to refresh data", err);
    throw new Error("Failed to fetch comparison data");
  }
}
//########
