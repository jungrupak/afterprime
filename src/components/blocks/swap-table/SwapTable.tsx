"use client";
import { useEffect, useState } from "react";
import { parse } from "papaparse";
import style from "./SwapTable.module.scss";
import type { Blocks } from "@/types/blocks";
import { useQuery } from "@tanstack/react-query";

const tabNames = [
  "FX Majors",
  "FX Minors",
  "FX Exotics",
  "Commodities",
  "Metals",
  "Crypto",
  "Indices",
];

interface InstrumentDataType {
  symbol?: string;
  path?: string;
  swapLong?: number;
  swapShort?: number;
}

export function SwapDataTabs() {
  const [activeCategory, setActiveCategory] = useState("Forex Majors");
  const { data, isLoading, error } = useQuery<InstrumentDataType[]>({
    queryKey: ["swapTable"],
    queryFn: async () => {
      const res = await fetch("/api/instruments");
      if (!res.ok) {
        throw new Error("Failed to fetch compare data");
      }
      const data = await res.json();
      return data;
    },
    staleTime: 1000 * 60 * 480,
  });

  //##
  // Filter data based on active tab
  const filteredData = data?.filter((item) => {
    if (activeCategory === "FX Majors")
      return item.path?.startsWith("Forex\\Majors");
    if (activeCategory === "FX Minors")
      return item.path?.startsWith("Forex\\Minors");
    if (activeCategory === "FX Exotics")
      return item.path?.startsWith("Forex\\Exotics");
    if (activeCategory === "Commodities")
      return item.path?.startsWith("Commodities");
    if (activeCategory === "Metals") return item.path?.startsWith("Metals");
    if (activeCategory === "Crypto") return item.path?.startsWith("Crypto");
    if (activeCategory === "Indices") return item.path?.startsWith("Indices");
    return true;
  });

  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        {/* Tabs */}
        <div className={`${style.tabnavWrapper} flex space-x-2`}>
          {tabNames.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`${style.tabItem} ${
                activeCategory === cat ? style.activeItem : ""
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        {isLoading ? (
          <p>Loading {activeCategory} data...</p>
        ) : (
          <div className={`genericTable ${style.tableParent}`}>
            <table className="min-w-full">
              <thead className="">
                <tr>
                  <th className="px-4 py-2 text-left">Instrument</th>
                  <th className="px-4 py-2 text-left">Short</th>
                  <th className="px-4 py-2 text-left">Long</th>
                </tr>
              </thead>
              <tbody>
                {filteredData?.map((row) => (
                  <tr key={row.symbol}>
                    <td className="px-4 py-2">{row.symbol}</td>
                    <td className="px-4 py-2">{row.swapShort}</td>
                    <td className="px-4 py-2">{row.swapLong}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
