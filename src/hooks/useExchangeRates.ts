"use client";
import { useEffect, useState } from "react";

export interface ExchangeRates {
  [key: string]: number;
}

const FALLBACK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.52,
  JPY: 149.5,
  CHF: 0.88,
  CAD: 1.36,
};

export function useExchangeRates() {
  const [rates, setRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/exchange-rates");
        const data = await response.json();
        setRates(data);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        setRates(FALLBACK_RATES);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { rates, loading };
}
