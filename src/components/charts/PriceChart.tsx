"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  AreaSeries,
  ColorType,
  CrosshairMode,
  LineType,
  LineStyle,
  ISeriesApi,
  type UTCTimestamp,
} from "lightweight-charts";

// Module-level history survives re-mounts and route changes
const tickHistory = new Map<string, Array<{ time: UTCTimestamp; value: number }>>();
const MAX_HISTORY = 500;
const SEED_COUNT = 150;
const TICK_INTERVAL = 5; // seconds between synthetic ticks

function generateSeedData(
  currentPrice: number,
  currentTime: number,
  count: number
): Array<{ time: UTCTimestamp; value: number }> {
  // Pip size based on price magnitude
  const pipSize =
    currentPrice < 10 ? 0.00001 : currentPrice < 100 ? 0.001 : 0.01;
  const volatility = pipSize * 2.5;

  // Random walk backwards from current price
  const prices: number[] = [currentPrice];
  for (let i = 1; i < count; i++) {
    const step = (Math.random() - 0.5) * volatility * 2;
    prices.push(prices[i - 1] - step);
  }
  prices.reverse();

  return prices.map((value, i) => ({
    time: (currentTime - (count - 1 - i) * TICK_INTERVAL) as UTCTimestamp,
    value,
  }));
}

interface PriceChartProps {
  liveData?: { time: number; value: number };
  symbol?: string;
}

export default function PriceChart({ liveData, symbol }: PriceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<ReturnType<typeof createChart> | null>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);
  const seededRef = useRef(false);
  const historyKey = symbol ?? "__default__";
  const hasExistingHistory = (tickHistory.get(historyKey)?.length ?? 0) > 1;
  const [loading, setLoading] = useState(!hasExistingHistory);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255, 255, 255, 0.5)",
        fontFamily: "Graphik, sans-serif",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.03)" },
        horzLines: { color: "rgba(255, 255, 255, 0.03)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(255, 255, 255, 0.08)",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#1A1A24",
        },
        horzLine: {
          color: "rgba(255, 255, 255, 0.08)",
          width: 1,
          style: LineStyle.Dashed,
          labelBackgroundColor: "#1A1A24",
        },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        borderColor: "rgba(255, 255, 255, 0.06)",
        tickMarkFormatter: (time: number) => {
          const date = new Date(time * 1000);
          return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          });
        },
      },
      rightPriceScale: {
        borderColor: "rgba(255, 255, 255, 0.06)",
        scaleMargins: { top: 0.1, bottom: 0.2 },
      },
      handleScroll: false,
      handleScale: false,
    });

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "#ff4520",
      topColor: "rgba(255, 69, 32, 0.35)",
      bottomColor: "rgba(255, 69, 32, 0)",
      lineWidth: 2,
      lineType: LineType.Curved,
      priceFormat: {
        type: "price",
        precision: 5,
        minMove: 0.00001,
      },
      priceLineVisible: true,
      priceLineColor: "rgba(255, 255, 255, 0.15)",
      priceLineWidth: 1,
      lastValueVisible: true,
      crosshairMarkerVisible: true,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: "#ff4520",
      crosshairMarkerBackgroundColor: "#0c0c0d",
    });

    seriesRef.current = areaSeries;
    chartRef.current = chart;

    // Seed with real accumulated history if available
    const existing = tickHistory.get(historyKey);
    if (existing && existing.length > 1) {
      areaSeries.setData(existing);
      seededRef.current = true;
      chart.timeScale().fitContent();
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        chart.applyOptions({ width: entry.contentRect.width });
      }
    });
    observer.observe(chartContainerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
      seriesRef.current = null;
      chartRef.current = null;
    };
  }, [historyKey]);

  useEffect(() => {
    if (!seriesRef.current || !liveData) return;

    const point = {
      time: liveData.time as UTCTimestamp,
      value: liveData.value,
    };

    if (!seededRef.current) {
      // First tick: generate synthetic history to fill the chart
      const seed = generateSeedData(liveData.value, liveData.time, SEED_COUNT);
      seriesRef.current.setData(seed);
      tickHistory.set(historyKey, [...seed]);
      seededRef.current = true;
      chartRef.current?.timeScale().fitContent();
      setLoading(false);
    } else {
      seriesRef.current.update(point);

      // Only append if time strictly advances (lightweight-charts setData requires monotonic times)
      const hist = tickHistory.get(historyKey) ?? [];
      const last = hist[hist.length - 1];
      if (!last || point.time > last.time) {
        if (hist.length >= MAX_HISTORY) hist.splice(0, 1);
        hist.push(point);
        tickHistory.set(historyKey, hist);
      }
    }
  }, [liveData, historyKey]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent">
          <div className="h-8 w-8 rounded-full border-2 border-white/10 border-t-[#ff4520] animate-spin" />
        </div>
      )}
      <div ref={chartContainerRef} className="w-full h-full" />
    </div>
  );
}
