
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
export async function getSavingCompare(
  symbol: string,
): Promise<BrokerIndividualDataType | undefined> {
  try {
    const res = await fetch(
      `/api/compare`,
      { cache: "no-store" },
    );

    if (!res.ok) {
      throw new Error("Failed to fetch saving comparison data");
    }

    return await res.json();
  } catch (err) {
    console.error("Failed to refresh data", err);
    throw new Error("Failed to fetch saving comparison data");
  }
}
//########
