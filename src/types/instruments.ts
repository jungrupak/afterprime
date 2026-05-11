export interface SessionTrade {
  open: number;
  openHours: number;
  close: number;
  closeHours: number;
  dayOfWeek: number; // 1=Mon … 5=Fri, 7=Sun (crypto)
}

export interface InstrumentData {
  symbol: string;
  description: string;
  category: string;
  path: string;
  currencyBase?: string;
  currencyProfit?: string;
  digits?: number;
  contractSize?: number;
  swap3Day?: string;
  swapLong?: number;
  swapShort?: number;
  openUtc?: string;
  closeUtc?: string;
  openDay?: string;
  closeDay?: string;
  sessionsTrades: SessionTrade[] | null;
  hasDailyBreak: boolean;
  dailyBreakStartUtc?: string;
  dailyBreakEndUtc?: string;
  sessionAsiaOpen?: string;
  sessionLondonOpen?: string;
  sessionNyOpen?: string;
  sessionOverlapStart?: string;
  sessionOverlapEnd?: string;
  is24_5: boolean;
  is24_7: boolean;
  weekendTrading: boolean;
  peakLiquiditySession?: string;
  typicalSpreadNote?: string;
  dstNote?: string;
  lastUpdated?: string;
}
