"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export interface InstrumentApi {
  symbol: string;
  category: string;
  path: string;
  digits: number;
  point: number;
  contractSize: number;
  currencyBase: string;
  currencyProfit: string;
  description: string;
  swapLong: number;
  swapShort: number;
  volumeMin: number;
  volumeStep: number;
}

export function useInstrument() {
  const [allIsntruments, setAllInstruments] = useState<InstrumentApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInstruments = async () => {
      try {
        const res = await axios.get(
          "https://scoreboard.argamon.com:8443/api/instruments/",
        );
        setAllInstruments(res.data);
      } catch (err: unknown) {
        const message =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchInstruments();
  }, []);

  return { allIsntruments, loading, error };
}