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
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: 'rgba(255, 255, 255, 0.7)', // White text with 70% opacity
      },
      grid: {
        vertLines: { color: 'rgba(255, 255, 255, 0.05)' }, // Ultra-subtle vertical lines
        horzLines: { color: 'rgba(255, 255, 255, 0.05)' }, // Ultra-subtle horizontal lines
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: true,
        borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle axis border
      },
      rightPriceScale: {
        borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle axis border
      },
      handleScroll: false, // Optional: keeps chart steady on page scroll
      handleScale: false,  // Optional: keeps chart steady
    });

    const lineSeries = chart.addSeries(LineSeries, {
      color: '#FF4500', // Matches the Afterprime Orange "Apply" button
      lineWidth: 2,
      priceLineVisible: true, // Shows the horizontal line at current price
      lastValueVisible: true,
    });

    seriesRef.current = lineSeries;

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      }
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

  return <div ref={chartContainerRef} className="w-full h-full" />;
}
