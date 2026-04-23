"use client";

import { useState, useEffect } from "react";
import styles from "./CostComparison.module.scss";

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

export type CompareMajorsData = {
  competitor_contains?: string[];
  items?: Record<string, CostApiResponse>;
};

export default function CompareWithMajorsClient({
  data,
}: {
  data: CompareMajorsData;
}) {
  const [rowIndex, setRowIndex] = useState<number | null>(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(
      new Date().toLocaleDateString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
  }, []);

  const competitorName = String(data?.competitor_contains?.[0] ?? "");
  const competitorLabel = competitorName
    ? competitorName.toUpperCase()
    : "Competitor";
  const majors: [string, CostApiResponse][] = Object.entries(data?.items ?? {});

  const footerRebate = majors[0]?.[1]?.rebate?.rebate_usd_per_lot ?? null;

  return (
    <div className="ap_container_small relative z-1 w-full z-5">
      <div className={styles.costCompareTable}>
        <div
          className={`${styles.costCompareTableHead} grid grid-cols-8 gp-10 md:gap-0 max-md:hidden`}
        >
          <div className="col-span-2 text-[#ffffff]!">FX Pair</div>
          <div className="col-span-2 text-[#ffffff]!">
            {competitorLabel} <br /> Net Cost/lot
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
          {majors.map(([symbol, item], index) => {
            const rebate = item?.rebate?.rebate_usd_per_lot ?? 0;
            const competitorBroker = item?.brokers?.find(
              (brokerItem) =>
                brokerItem.broker !== "Afterprime" &&
                brokerItem.broker !== "IC Markets (cTrader)",
            );

            const competitorBrokerCostPerLot = competitorBroker?.costPerLot ?? 0;
            const competitorBrokerName = competitorBroker?.broker ?? "";
            const afterprimeCostPerLot =
              item?.brokers?.find((brokerItem) => brokerItem.broker === "Afterprime")
                ?.costPerLot ?? 0;

            return (
              <div
                key={symbol}
                className={`${styles.costCompareTableRow} grid grid-cols-8 md:gap-0 `}
              >
                <div className="col-span-2 max-md:col-span-12 max-md:pb-2!">
                  <div
                    data-label="Pairs"
                    className="flex gap-5 max-md:justify-between"
                  >
                    {symbol}
                    <div
                      className={styles.monthlyVloumeBtn}
                      onClick={() =>
                        setRowIndex((prev) => (prev === index ? null : index))
                      }
                    >
                      {index === rowIndex ? "Hide" : "Show"} By Volume
                    </div>
                  </div>
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
                {rowIndex === index && (
                  <div className="p-0! col-span-8">
                    <h4 className="font-semibold text-[16px] px-[15px] py-[10px] bg-[rgba(255_,255_,255_,.04)]">
                      Cost by Volume - {symbol}
                    </h4>
                    <div className={styles.volumeTable}>
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
                          {[50, 100, 250, 500, 1000].map((volume) => (
                            <tr key={volume}>
                              <td>{volume} lots</td>
                              <td>
                                ${(competitorBrokerCostPerLot * volume).toFixed(2)}
                              </td>
                              <td>
                                $
                                {((afterprimeCostPerLot - rebate) * volume).toFixed(
                                  2,
                                )}
                              </td>
                              <td>
                                $
                                {(
                                  (competitorBrokerCostPerLot -
                                    (afterprimeCostPerLot - rebate)) *
                                  volume
                                ).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className="text-[14px] opacity-60 mt-5">
        <p className="risk-warning-all">
          Source:{" "}
          <a href="https://www.forexbenchmark.com" target="_blank">
            <u>ForexBenchmark</u>
          </a>{" "}
          - Previous 7 Days Range | All Pairs | Incl. Commissions + Spreads.
          (Last Updated: {lastUpdated})<br />
          <br />
          {footerRebate !== null && (
            <>
              Afterprime net cost figures include Flow Rewards™ at $
              {footerRebate.toFixed(2)}/lot (round turn), applicable to eligible
              client accounts on qualifying instruments. Flow Rewards™ rates may
              vary. See <a href="/get-paid-to-trade">Flow Rewards</a> for full
              eligibility criteria.
              <br />
              Cost comparisons are based on third-party data and are for
              informational purposes only. Trading involves significant risk of
              loss. Individual trading costs will vary based on account type,
              instrument, and market conditions.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
