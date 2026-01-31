
export interface BrokersArray{
    broker?:string;
    symbol?:string;
    cost?:number;
    costPerLot?:number;
    savingPercentage?:number;
}

export interface Rebates{
    symbol?:string;
    product?:string;
    rebate_usd_per_lot?:number;
    effective_from?:string;
    effective_to?:string;
}

// lib/metaDataHelper.ts
export type InstrumentMeta = {
    brokers?:BrokersArray[];
    secondBestVsAfterprimePct?:number;
    top10VsAfterprimeAvgPct?:number;
    industryVsAfterprimeAvgPct?:number;
    rebate?:Rebates;
}