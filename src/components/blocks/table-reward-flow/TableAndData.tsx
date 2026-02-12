"use client";
import { useEffect, useState } from "react";
import Tab, { TabItem } from "@/components/ui/Tab";
import style from "./style.module.scss";
import { Blocks } from "@/types/blocks";

type SectionPropsHead = Blocks["rebate-table"];

type rabateData = {
  symbol: string;
  product: string;
  rebate_usd_per_lot: number;
};

function isRebateRow(item: unknown): item is rabateData {
  if (!item || typeof item !== "object") return false;

  const row = item as Record<string, unknown>;
  return (
    typeof row.symbol === "string" &&
    typeof row.product === "string" &&
    typeof row.rebate_usd_per_lot === "number"
  );
}

function normalizeRebatesPayload(payload: unknown): rabateData[] {
  const maybeRows = Array.isArray(payload)
    ? payload
    : payload &&
        typeof payload === "object" &&
          Array.isArray((payload as { data?: unknown }).data)
      ? (payload as { data: unknown[] }).data
      : [];

  return maybeRows.filter(isRebateRow);
}

export function TableDataRewardFlow({
  rebate_table_title,
  rebate_table_section_paragraph,
}: SectionPropsHead) {
  const [forexMajors, setForexMajors] = useState<rabateData[]>([]);
  const [forexMinors, setForexMinors] = useState<rabateData[]>([]);
  const [forexExotics, setForexExotics] = useState<rabateData[]>([]);
  const [commodityRows, setCommodityRows] = useState<rabateData[]>([]);
  const [cryptoRows, setCryptoRows] = useState<rabateData[]>([]);
  const [metalsRows, setMetalsRows] = useState<rabateData[]>([]);
  const [indicesRows, setIndicesRows] = useState<rabateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/rebates");
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        const payload = await res.json();
        const data = normalizeRebatesPayload(payload);
        if (data.length === 0) {
          throw new Error("Invalid rebate data response.");
        }

        // Forex Majors
        const forexMajors = data.filter(
          (row) => row.product === "FOREX-MAJORS",
        );
        setForexMajors(forexMajors);

        // Forex Minors
        const forexMinors = data.filter(
          (row) => row.product === "FOREX-MINORS",
        );
        setForexMinors(forexMinors);

        // Forex Exotics
        const forexExotics = data.filter(
          (row) => row.product === "FOREX-EXOTICS",
        );
        setForexExotics(forexExotics);

        // Commodities
        const commoditiesOnly = data.filter((row) =>
          row.product.startsWith("COMMODITIES"),
        );
        setCommodityRows(commoditiesOnly);

        // Crypto
        const cryptoOnly = data.filter((row) =>
          row.product.startsWith("CRYPTO"),
        );
        setCryptoRows(cryptoOnly);

        // Indices
        const indicesOnly = data.filter((row) =>
          row.product.startsWith("INDICES"),
        );
        setIndicesRows(indicesOnly);

        // Metals
        const metalsOnly = data.filter((row) =>
          row.product.startsWith("METALS"),
        );
        setMetalsRows(metalsOnly);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const placeholderText = "Flow Rewards: Expanding soon";

  return (
    <section className={`compact-section`}>
      <div className="grainy_bg"></div>
      <div className="ap_container_small">
        <div className="mb-10 md:mb-20">
          <h2 className={style.sectionTitle}>{rebate_table_title}</h2>
          {rebate_table_section_paragraph && (
            <p className="paragraph">{rebate_table_section_paragraph}</p>
          )}
        </div>

        <Tab>
          {/* Forex Tab */}
          <TabItem tabNav="FX Majors">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : forexMajors.length > 0 ? (
              <div className="genericTable overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Symbol<br/>{" "}</th>
                    <th style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: 'bold'}}>
                      Flow Rewards<sup>TM</sup><br/>(Per lot round turn)
                    </th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 50 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 100 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 250 Lots<br/>Earn</th>
                  </tr>
                </thead>
                <tbody>
                  {forexMajors.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.symbol}</td>
                      <td style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: '600'}}>
                        ${row.rebate_usd_per_lot.toFixed(2)}
                      </td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 50).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 100).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 250).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p>{placeholderText}</p>
            )}
          </TabItem>
          {/*  */}

          <TabItem tabNav="FX Minors">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : forexMinors.length > 0 ? (
              <div className="genericTable overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Symbol<br/>{" "}</th>
                    <th style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: 'bold'}}>
                      Flow Rewards<sup>TM</sup><br/>(Per lot round turn)
                    </th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 50 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 100 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 250 Lots<br/>Earn</th>
                  </tr>
                </thead>
                <tbody>
                  {forexMinors.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.symbol}</td>
                      <td style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: '600'}}>
                        ${row.rebate_usd_per_lot.toFixed(2)}
                      </td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 50).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 100).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 250).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p>{placeholderText}</p>
            )}
          </TabItem>
          {/*  */}

          <TabItem tabNav="FX Exotics">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : forexExotics.length > 0 ? (
              <div className="genericTable overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Symbol<br/>{" "}</th>
                    <th style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: 'bold'}}>
                      Flow Rewards<sup>TM</sup><br/>(Per lot round turn)
                    </th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 50 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 100 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 250 Lots<br/>Earn</th>
                  </tr>
                </thead>
                <tbody>
                  {forexExotics.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.symbol}</td>
                      <td style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: '600'}}>
                        ${row.rebate_usd_per_lot.toFixed(2)}
                      </td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 50).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 100).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 250).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p>{placeholderText}</p>
            )}
          </TabItem>
          {/*  */}

          {/* Other Tabs */}
          <TabItem tabNav="Commodities">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : commodityRows.length > 0 ? (
              <div className="genericTable overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Symbol<br/>{" "}</th>
                    <th style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: 'bold'}}>
                      Flow Rewards<sup>TM</sup><br/>(Per lot round turn)
                    </th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 50 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 100 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 250 Lots<br/>Earn</th>
                  </tr>
                </thead>
                <tbody>
                  {commodityRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.symbol}</td>
                      <td style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: '600'}}>
                        ${row.rebate_usd_per_lot.toFixed(2)}
                      </td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 50).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 100).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 250).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p>{placeholderText}</p>
            )}
          </TabItem>
          {/*  */}
          <TabItem tabNav="Metals">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : metalsRows.length > 0 ? (
              <div className="genericTable overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Symbol<br/>{" "}</th>
                    <th style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: 'bold'}}>
                      Flow Rewards<sup>TM</sup><br/>(Per lot round turn)
                    </th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 50 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 100 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 250 Lots<br/>Earn</th>
                  </tr>
                </thead>
                <tbody>
                  {metalsRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.symbol}</td>
                      <td style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: '600'}}>
                        ${row.rebate_usd_per_lot.toFixed(2)}
                      </td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 50).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 100).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 250).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p>{placeholderText}</p>
            )}
          </TabItem>
          {/*  */}
          <TabItem tabNav="Indices">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : indicesRows.length > 0 ? (
              <div className="genericTable overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Symbol<br/>{" "}</th>
                    <th style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: 'bold'}}>
                      Flow Rewards<sup>TM</sup><br/>(Per lot round turn)
                    </th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 50 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 100 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 250 Lots<br/>Earn</th>
                  </tr>
                </thead>
                <tbody>
                  {indicesRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.symbol}</td>
                      <td style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: '600'}}>
                        ${row.rebate_usd_per_lot.toFixed(2)}
                      </td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 50).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 100).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 250).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p>{placeholderText}</p>
            )}
          </TabItem>
          {/*  */}
          <TabItem tabNav="Crypto">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : cryptoRows.length > 0 ? (
              <div className="genericTable overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Symbol<br/>{" "}</th>
                    <th style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: 'bold'}}>
                      Flow Rewards<sup>TM</sup><br/>(Per lot round turn)
                    </th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 50 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 100 Lots<br/>Earn</th>
                    <th style={{width: '25%', textAlign: 'center'}}>Trade 250 Lots<br/>Earn</th>
                  </tr>
                </thead>
                <tbody>
                  {cryptoRows.map((row, idx) => (
                    <tr key={idx}>
                      <td>{row.symbol}</td>
                      <td style={{backgroundColor: 'rgb(67, 59, 249)', color: 'white', fontWeight: '600'}}>
                        ${row.rebate_usd_per_lot.toFixed(2)}
                      </td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 50).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 100).toFixed(2)}</td>
                      <td style={{textAlign: 'center'}}>${(row.rebate_usd_per_lot * 250).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            ) : (
              <p>{placeholderText}</p>
            )}
          </TabItem>
        </Tab>
      </div>
    </section>
  );
}
