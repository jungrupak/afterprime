
import {useLiveQote, PriceObjects} from "@/hooks/useLiveQuote";
import { useMemo, useCallback } from "react";


export function getUSDRates() {
  const { prices, loading, error } = useLiveQote();

 
  const rateMap = useMemo(() => {
  const map: Record<string, number> = { USD: 1 };

  prices.forEach(({ symbol, bestBid, bestAsk }) => {
    if (!symbol || bestBid == null || bestAsk == null) return;

    const mid = (bestBid + bestAsk) / 2;

    if (symbol.startsWith("USD")) {
      map[symbol.slice(3)] = mid;
    } else if (symbol.endsWith("USD")) {
      map[symbol.slice(0, 3)] = 1 / mid;
    }
  });

  return map;
}, [prices]);

  /**
   * Public API
   */
  const getUSDRate = useCallback(
    (currency: string): number | undefined => {
      return rateMap[currency.toUpperCase()];
    },
    [rateMap]
  );

  return {
    getUSDRate,
    rates: rateMap,
    loading,
    error,
  };
}
