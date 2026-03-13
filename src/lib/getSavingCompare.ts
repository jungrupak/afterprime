
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
}
// ####

//#######
export async function getSavingCompare(): Promise<BrokerIndividualDataType | null> {
  try {
    const res = await fetch(
      `https://feed.afterprime.com/api/costs`,
      { cache:"force-cache",
      next:{revalidate:86400} },
    );

    if (!res.ok) {
      console.error("Failed to fetch saving comparison data", res.status);
      return null;
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to refresh data", err);
    return null;
  }
}
//########
