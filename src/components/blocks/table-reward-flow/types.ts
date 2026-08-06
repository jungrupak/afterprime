export type RebateRow = {
  symbol: string;
  product: string;
  rebate_usd_per_lot: number;
};

export type TableCategory = {
  tabNav: string;
  rows: RebateRow[];
  linkSymbols?: boolean;
};
