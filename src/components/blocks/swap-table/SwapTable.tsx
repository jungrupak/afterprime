"use client";

import { useEffect, useState } from "react";
import { parse } from "papaparse"; // ✅ correct import
import style from "./SwapTable.module.scss";
import Tab, { TabItem } from "@/components/ui/Tab";
import type { Blocks } from "@/types/blocks";

type CsvFields = Blocks["swap-table-section"];

export const csvEndpoints: Record<string, string> = {
  "Forex Majors": "https://cdn.afterprime.com/csvfiles/fx-majors.csv",
  "Forex Minors": "https://cdn.afterprime.com/csvfiles/fx-minors.csv",
  "Forex Exotic": "https://cdn.afterprime.com/csvfiles/fx-exotics.csv",
  Commodities: "https://cdn.afterprime.com/csvfiles/commodities.csv",
  Indices: "https://cdn.afterprime.com/csvfiles/cfd-indices.csv",
  Crypto: "https://cdn.afterprime.com/csvfiles/cryptocurrencies.csv?as",
};

export interface InstrumentData {
  Instrument: string;
  Short: number;
  Long: number;
}

export function SwapDataTabs() {
  const categories = Object.keys(csvEndpoints);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [data, setData] = useState<InstrumentData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCSV = async () => {
      setLoading(true);
      const url = csvEndpoints[activeCategory];
      const response = await fetch(url);
      const csvText = await response.text();

      const parsed = parse<InstrumentData>(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
      });

      setData(parsed.data);
      setLoading(false);
    };

    fetchCSV().catch(console.error);
  }, [activeCategory]);

  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        {/* Tabs */}
        <div className={`${style.tabnavWrapper} flex space-x-2`}>
          {categories.map((cat) => (
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
        {loading ? (
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
                {data.map((row) => (
                  <tr key={row.Instrument}>
                    <td className="px-4 py-2">{row.Instrument}</td>
                    <td className="px-4 py-2">{row.Short}</td>
                    <td className="px-4 py-2">{row.Long}</td>
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
