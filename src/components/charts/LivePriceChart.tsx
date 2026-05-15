"use client";

import { useMemo } from "react";
import { useLivePrices } from "@/hooks/useLivePrices";
import PriceChart from "./PriceChart"; // The component we made previously

interface LivePriceChartProps {
  symbol: string;
}

export default function LivePriceChart({ symbol }: LivePriceChartProps) {
  const { prices } = useLivePrices();

  // 1. Isolate the specific instrument from the feed
  // 2. Format it for Lightweight Charts update()
  const liveData = useMemo(() => {
    const instrumentKey = symbol.toUpperCase();
    const data = prices?.[instrumentKey];

    if (!data) return null;

    return {
      // Lightweight charts uses Unix timestamps in seconds
      time: Math.floor(Date.now() / 1000),
      // Using 'bid' as the price point; change to 'last' if available
      value: typeof data.bid === "string" ? parseFloat(data.bid) : data.bid,
    };
  }, [prices, symbol]);

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-4">
        <h3 className="text-xl font-bold">{symbol.toUpperCase()} Live Price</h3>
        <div className="text-right">
          <span className="text-sm text-gray-500 block">Live Bid</span>
          <span className="text-2xl font-mono font-semibold text-blue-600">
            {liveData?.value.toFixed(2) || "---"}
          </span>
        </div>
      </div>

      <PriceChart liveData={liveData ?? undefined} />
    </div>
  );
}
