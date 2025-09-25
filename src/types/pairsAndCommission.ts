export interface Broker {
  broker: string;
  cost: number;
  costPerLot: number;
  savingPercentage: number;
  symbol: string;
}

export interface pairsAndCommission {
  brokers?: Broker[];
  secondBestVsAfterprimePct: number;
  top10VsAfterprimeAvgPct: number;
  industryVsAfterprimeAvgPct: number;
}
