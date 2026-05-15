"use client";

import { useMemo } from "react";
import { useLivePrices } from "@/hooks/useLivePrices";
import PriceChart from "./PriceChart";

interface LivePriceChartProps {
  symbol: string;
}

export default function LivePriceChart({ symbol }: LivePriceChartProps) {
  const { prices } = useLivePrices();

  const liveData = useMemo(() => {
    const instrumentKey = symbol.toUpperCase();
    const data = prices?.[instrumentKey];

    if (!data) return null;

    return {
      time: Math.floor(Date.now() / 1000),
      value: typeof data.bid === "string" ? parseFloat(data.bid) : data.bid,
    };
  }, [prices, symbol]);

  return (
    /* Glassmorphism container: darkened background with blur and subtle border */
    <div className="w-full p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {symbol.toUpperCase()} <span className="text-white/50 font-light">Live Price</span>
          </h3>
        </div>

        <div className="text-right">
          <span className="text-xs uppercase tracking-widest text-white/40 block mb-1">
            Live Bid
          </span>
          {/* Price uses the orange from your "Apply" button and a subtle glow */}
          <span
            className="text-3xl font-mono font-bold text-[#FF4500]"
            style={{ textShadow: '0 0 15px rgba(255, 69, 0, 0.3)' }}
          >
            {liveData?.value.toFixed(2) || "---"}
          </span>
        </div>
      </div>

      {/* Note: Ensure your PriceChart component is configured with:
          - layout: { background: { color: 'transparent' }, textColor: '#ffffff80' }
          - grid: { vertLines: { visible: false }, horzLines: { color: 'rgba(255,255,255,0.05)' } }
      */}
      <div className="h-[300px] w-full">
        <PriceChart liveData={liveData ?? undefined} />
      </div>
    </div>
  );
}
