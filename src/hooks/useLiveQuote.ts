import { useState, useEffect, useMemo, useRef } from "react";

export interface PriceObjects {
  symbol: string;
  bestAsk: number;
  bestBid: number;
  spread: number;
  market: string;
  group?: string;
}

export function useLiveQote(){
    const [prices, setPrices] = useState<PriceObjects[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const res = await fetch("/api/markets");
        if (!res.ok) throw new Error("Fetch failed");

        const data = await res.json();
        setPrices(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  return { prices, loading, error };

}