"use client";

import { useEffect, useRef } from "react";
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

export default function PriceChart({ liveData }: { liveData?: { time: number; value: number } }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Area"> | null>(null);

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

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        chart.applyOptions({ width: entry.contentRect.width });
      }
    });
    observer.observe(chartContainerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
    };
  }, []);

  useEffect(() => {
    if (seriesRef.current && liveData) {
      seriesRef.current.update({ time: liveData.time as UTCTimestamp, value: liveData.value });
    }
  }, [liveData]);

  return <div ref={chartContainerRef} className="w-full h-full" />;
}
