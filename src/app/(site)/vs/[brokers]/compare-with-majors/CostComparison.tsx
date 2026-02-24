"use client";
import styles from "./CostComparison.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */
interface Brokers {
  broker: string;
  symbol: string;
  cost: number;
  costPerLot: number;
  savingPercentage: number;
}

type CostApiResponse = {
  brokers: Brokers[];
  secondBestVsAfterprimePct: number;
  top10VsAfterprimeAvgPct: number;
  industryVsAfterprimeAvgPct: number;
  lastUpdated?: string;
  rebate?: {
    rebate_usd_per_lot?: number;
  };
};

const CACHE_TTL = 2 * 60 * 1000;

export default function CompareWithMajors({ broker }: { broker: string }) {
  // STATES
  const [rowIndex, setRowIndex] = useState<number | null>(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["cost-comparison-majors", broker],
    enabled: !!broker,
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://feed.afterprime.com/api/majors/by-competitor?contains=${broker}`,
          {
            next: { revalidate: 80 },
          },
        );

        if (!res.ok) {
          throw new Error(`Cost API error: ${res.status}`);
        }

        return await res.json();
      } catch (err) {
        console.error("Failed to fetch compare data:", err);
        return null;
      }
    },
    staleTime: CACHE_TTL,
    gcTime: 10 * 60 * 1000,
  });

  if (!broker)
    return (
      <p className={`text-red text-[16px] opacity-65`}>
        Broker did not find in Compare List..
      </p>
    );

  if (isLoading) return <p className={`text-center z-4`}>Loading..</p>;
  if (error || !data)
    return (
      <p className={`text-red text-[12px] text-center`}>Error while data..</p>
    );

  const MAJORS: [string, CostApiResponse][] = Object.entries(data?.items || {});

  return (
    <div className="ap_container_small relative z-1 w-full z-5">
      <div className={styles.costCompareTable}>
        <div
          className={`${styles.costCompareTableHead} grid grid-cols-8 gp-10 md:gap-0 max-md:hidden`}
        >
          <div className="col-span-2 text-[#ffffff]!">FX Pair</div>
          <div className="col-span-2 text-[#ffffff]!">
            {data?.competitor_contains?.[0].toUpperCase()} <br /> Net Cost/lot
          </div>
          <div className="col-span-2 bg-[var(--secondary-color)] text-white!">
            Afterprime <br /> Net Cost/lot + Flow Rewards<sup>TM</sup>
          </div>
          <div className="col-span-2 text-[#ffffff]! text-right">
            <b>
              Cost Savings
              <br />
              (vs Afterprime)
            </b>
          </div>
        </div>

        <div className={styles.compareTableBody}>
          {MAJORS.map(([symbol, item], index) => {
            const competitorName = data?.competitor_contains?.[0] ?? "";

            const competitorBrokers =
              item?.brokers?.filter((b) =>
                String(b?.broker || "")
                  .toLowerCase()
                  .includes(competitorName.toLowerCase()),
              ) ?? [];

            const rebate = item?.rebate?.rebate_usd_per_lot ?? 0;
            const competitorBrokerCostPerLot =
              item?.brokers?.find(
                (b) =>
                  b.broker !== "Afterprime" &&
                  b.broker !== "IC Markets (cTrader)",
              )?.costPerLot ?? 0;

            const competitorBrokerName =
              item?.brokers?.find(
                (b) =>
                  b.broker !== "Afterprime" &&
                  b.broker !== "IC Markets (cTrader)",
              )?.broker ?? [];

            const afterprimeCostPerLot =
              item?.brokers?.find((b) => b.broker === "Afterprime")
                ?.costPerLot ?? 0;

            console.log(
              "Cost Per Lots",
              competitorBrokerCostPerLot,
              afterprimeCostPerLot,
            );

            return (
              <div
                key={symbol}
                className={`${styles.costCompareTableRow} grid grid-cols-8 md:gap-0 `}
                onClick={() =>
                  setRowIndex((prev) => (prev === index ? null : index))
                }
              >
                <div className="col-span-2 max-md:col-span-12 max-md:pb-2!">
                  <div data-label="Pairs">{symbol}</div>
                </div>
                <div
                  className="col-span-2 max-md:col-span-3 max-md:pb-2!"
                  data-label={`${competitorName} (Cost/Lot)`}
                >
                  <div className="flex flex-col gap-1">
                    ${competitorBrokerCostPerLot.toFixed(2)}
                  </div>
                </div>

                <div
                  data-label="Afterprime (Cost/Lot)"
                  className="col-span-2 max-md:col-span-3 md:bg-[var(--secondary-color)] text-white! max-md:px-1!"
                >
                  <b>${(afterprimeCostPerLot - rebate).toFixed(2)}</b>
                </div>

                <div
                  data-label="Cost Savings"
                  className="col-span-2 max-md:col-span-2 text-right"
                >
                  $
                  {(
                    competitorBrokerCostPerLot -
                    (afterprimeCostPerLot - rebate)
                  ).toFixed(2)}
                </div>
                {/* // Table UI */}
                {rowIndex === index && (
                  <div className={`p-0! col-span-8`}>
                    <h4
                      className={`font-semibold text-[16px] px-[15px] py-[10px] bg-[rgba(255_,255_,255_,.04)]`}
                    >
                      Monthly Cost by Volume - {symbol}
                    </h4>
                    <div className={`${styles.volumeTable}`}>
                      <table>
                        <thead>
                          <tr>
                            <th>Volume</th>
                            <th>{competitorBrokerName}</th>
                            <th>Afterprime</th>
                            <th>Saved</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>50 lot</td>
                            <td>
                              ${(competitorBrokerCostPerLot * 50).toFixed(2)}
                            </td>
                            <td>
                              $
                              {((afterprimeCostPerLot - rebate) * 50).toFixed(
                                2,
                              )}
                            </td>
                            <td>
                              $
                              {(
                                (competitorBrokerCostPerLot -
                                  (afterprimeCostPerLot - rebate)) *
                                50
                              ).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>100 lot</td>
                            <td>
                              ${(competitorBrokerCostPerLot * 100).toFixed(2)}
                            </td>
                            <td>
                              $
                              {((afterprimeCostPerLot - rebate) * 100).toFixed(
                                2,
                              )}
                            </td>
                            <td>
                              $
                              {(
                                (competitorBrokerCostPerLot -
                                  (afterprimeCostPerLot - rebate)) *
                                100
                              ).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>250 lot</td>
                            <td>
                              ${(competitorBrokerCostPerLot * 250).toFixed(2)}
                            </td>
                            <td>
                              $
                              {((afterprimeCostPerLot - rebate) * 250).toFixed(
                                2,
                              )}
                            </td>
                            <td>
                              $
                              {(
                                (competitorBrokerCostPerLot -
                                  (afterprimeCostPerLot - rebate)) *
                                250
                              ).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>500 lot</td>
                            <td>
                              ${(competitorBrokerCostPerLot * 500).toFixed(2)}
                            </td>
                            <td>
                              $
                              {((afterprimeCostPerLot - rebate) * 500).toFixed(
                                2,
                              )}
                            </td>
                            <td>
                              $
                              {(
                                (competitorBrokerCostPerLot -
                                  (afterprimeCostPerLot - rebate)) *
                                500
                              ).toFixed(2)}
                            </td>
                          </tr>
                          <tr>
                            <td>1000 lot</td>
                            <td>
                              ${(competitorBrokerCostPerLot * 1000).toFixed(2)}
                            </td>
                            <td>
                              $
                              {((afterprimeCostPerLot - rebate) * 1000).toFixed(
                                2,
                              )}
                            </td>
                            <td>
                              $
                              {(
                                (competitorBrokerCostPerLot -
                                  (afterprimeCostPerLot - rebate)) *
                                1000
                              ).toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* // Table UI */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
