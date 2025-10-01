"use client";

import { useEffect, useState } from "react";
import Tab, { TabItem } from "@/components/ui/Tab";
import style from "./style.module.scss";
import { Blocks } from "@/types/blocks";

type SectionPropsHead = Blocks["rebate-table"];

type ForexRow = {
  symbol: string;
  product: string;
  rebate_usd_per_lot: number;
};

export function TableDataRewardFlow({
  rebate_table_title,
  rebate_table_section_paragraph,
}: SectionPropsHead) {
  const [forexRows, setForexRows] = useState<ForexRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          "https://scoreboard.argamon.com:8443/api/rebates/current"
        );
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const data: ForexRow[] = await res.json();

        // Only FOREX
        const forexOnly = data.filter((row) => row.product === "FOREX");

        // Sort alphabetically by symbol
        forexOnly.sort((a, b) => a.symbol.localeCompare(b.symbol));

        setForexRows(forexOnly);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <section>
      <div className="grainy_bg"></div>
      <div className="ap_container">
        <div className="mb-10 md:mb-20">
          <h2 className={style.sectionTitle}>{rebate_table_title}</h2>
          {rebate_table_section_paragraph && (
            <p className="paragraph">{rebate_table_section_paragraph}</p>
          )}
        </div>

        <Tab>
          {/* Forex Tab */}
          <TabItem tabNav="Forex">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : forexRows.length > 0 ? (
              <div className="genericTable overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Symbol</th>
                      <th>Rebate (USD per lot)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {forexRows.map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.symbol}</td>
                        <td>${row.rebate_usd_per_lot.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No Forex data available</p>
            )}
          </TabItem>

          {/* Other Tabs */}
          <TabItem tabNav="Commodities">
            <p>Coming soon</p>
          </TabItem>
          <TabItem tabNav="Indices">
            <p>Coming soon</p>
          </TabItem>
          <TabItem tabNav="Crypto">
            <p>Coming soon</p>
          </TabItem>
          <TabItem tabNav="Stocks">
            <p>Coming soon</p>
          </TabItem>
        </Tab>
      </div>
    </section>
  );
}
