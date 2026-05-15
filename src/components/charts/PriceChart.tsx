"use client";

import { useEffect, useRef } from "react";
import { createChart, LineSeries, ColorType, ISeriesApi } from "lightweight-charts";

export default function PriceChart({ liveData }: { liveData?: { time: number, value: number } }) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const seriesRef = useRef<ISeriesApi<"Line"> | null>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350,
      layout: { background: { type: ColorType.Solid, color: "transparent" } },
      timeScale: { timeVisible: true, secondsVisible: true },
    });

    const lineSeries = chart.addSeries(LineSeries, {
        color: '#2962FF',
        lineWidth: 2
    });

    seriesRef.current = lineSeries;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current?.clientWidth });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, []);

  // This Effect handles the real-time "tick"
  useEffect(() => {
    if (seriesRef.current && liveData) {
      seriesRef.current.update(liveData);
    }
  }, [liveData]);

  return <div ref={chartContainerRef} />;
}
