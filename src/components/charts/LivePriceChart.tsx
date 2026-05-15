"use client";

import { useMemo, useRef } from "react";
import { useLivePrices } from "@/hooks/useLivePrices";
import PriceChart from "./PriceChart";

interface LivePriceChartProps {
  symbol: string;
}

export default function LivePriceChart({ symbol }: LivePriceChartProps) {
  const { prices } = useLivePrices();
  const prevValueRef = useRef<number | null>(null);

  const liveData = useMemo(() => {
    const instrumentKey = symbol.toUpperCase();
    const data = prices?.find((p) => p.symbol === instrumentKey);

    if (!data) return null;

    return {
      time: Math.floor(Date.now() / 1000),
      value: typeof data.bestBid === "string" ? parseFloat(data.bestBid) : data.bestBid,
      bestAsk: typeof data.bestAsk === "string" ? parseFloat(data.bestAsk) : data.bestAsk,
      spread: typeof data.spread === "number" ? data.spread : 0,
    };
  }, [prices, symbol]);

  const direction = useMemo(() => {
    if (!liveData) return "neutral";
    const prev = prevValueRef.current;
    prevValueRef.current = liveData.value;
    if (prev === null) return "neutral";
    if (liveData.value > prev) return "up";
    if (liveData.value < prev) return "down";
    return "neutral";
  }, [liveData]);

  const arrow = direction === "up" ? "▲" : direction === "down" ? "▼" : "—";
  const arrowColor =
    direction === "up"
      ? "text-[#22C55E]"
      : direction === "down"
        ? "text-[#FF301D]"
        : "text-white/40";

  return (
    <div className="w-full rounded-xl border border-white/[0.07] bg-white/[0.04] backdrop-blur-xl shadow-2xl overflow-hidden">
      <div className="p-5 pb-0">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h3 className="text-lg font-semibold text-white/90 tracking-tight">
              {symbol.toUpperCase()}
            </h3>
            <span className="text-[11px] uppercase tracking-[0.15em] text-white/30 font-medium">
              Live Price
            </span>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <span className={`text-sm font-medium ${arrowColor} transition-colors duration-300`}>
                {arrow}
              </span>
              <span
                className="text-2xl font-semibold text-[#ff4520] tabular-nums tracking-tight"
                style={{ textShadow: "0 0 20px rgba(255, 69, 32, 0.25)" }}
              >
                {liveData?.value.toFixed(5) ?? "---"}
              </span>
            </div>
            <div className="flex items-center gap-3 justify-end mt-0.5">
              {liveData && (
                <>
                  <span className="text-[11px] text-white/30">
                    Ask:{" "}
                    <span className="text-white/60 font-medium">
                      {liveData.bestAsk.toFixed(5)}
                    </span>
                  </span>
                  <span className="text-[11px] text-white/30">
                    Spread:{" "}
                    <span className="text-white/60 font-medium">
                      {liveData.spread.toFixed(1)}
                    </span>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="h-[280px] w-full mt-2">
        <PriceChart liveData={liveData ?? undefined} />
      </div>
    </div>
  );
}
