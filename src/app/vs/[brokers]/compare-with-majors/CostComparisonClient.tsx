"use client";

import { useState, useEffect } from "react";
import styles from "./CostComparison.module.scss";
import Link from "next/link";
import {
  compareMajorsContent,
  type CompareMajorsContent,
} from "./compareMajorsContent";
import { localizeHref } from "@/lib/locale/localizeHref";

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
  broker,
  content: t = compareMajorsContent,
  locale = "en",
}: {
  broker: string;
  data: CompareMajorsData;
  content?: CompareMajorsContent;
  locale?: string;
}) {
  const [rowIndex, setRowIndex] = useState<number | null>(0);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    setLastUpdated(
      new Date().toLocaleDateString(locale === "en" ? "en-GB" : locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    );
  }, [locale]);

  const competitorName = String(data?.competitor_contains?.[0] ?? "");
  const competitorLabel = competitorName
    ? competitorName.toUpperCase()
    : t.competitorLabel;
  const majors: [string, CostApiResponse][] = Object.entries(data?.items ?? {});

  const footerRebate = majors[0]?.[1]?.rebate?.rebate_usd_per_lot ?? null;

  return (
    <div className="ap_container_small relative z-1 w-full z-5">
      <div className={styles.costCompareTable}>
        <div
          className={`${styles.costCompareTableHead} grid grid-cols-8 gp-10 md:gap-0 max-md:hidden`}
        >
          <div className="col-span-2 text-[#ffffff]!">{t.fxPair}</div>
          <div className="col-span-2 text-[#ffffff]!">
            {competitorLabel} <br /> {t.netCostLot}
          </div>
          <div className="col-span-2 bg-[var(--secondary-color)] text-white!">
            {t.afterprimeNetCostLot}
          </div>
          <div className="col-span-2 text-[#ffffff]! text-right">
            <b>
              {t.costSavings}
              <br />
              {t.vsAfterprime}
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

            const competitorBrokerCostPerLot =
              competitorBroker?.costPerLot ?? 0;
            const competitorBrokerName = competitorBroker?.broker ?? "";
            const afterprimeCostPerLot =
              item?.brokers?.find(
                (brokerItem) => brokerItem.broker === "Afterprime",
              )?.costPerLot ?? 0;

            return (
              <div
                key={symbol}
                className={`${styles.costCompareTableRow} grid grid-cols-8 md:gap-0 `}
              >
                <div className="col-span-2 max-md:col-span-12 max-md:pb-2!">
                  <div
                    data-label={t.pairsLabel}
                    className="flex gap-5 max-md:justify-between"
                  >
                    <Link
                      href={localizeHref(`/vs/${broker}/${symbol.toLowerCase()}`, locale)}
                      className={`underline decoration-dotted decoration-2 underline-offset-4`}
                    >
                      {symbol}
                    </Link>

                    <div
                      className={styles.monthlyVloumeBtn}
                      onClick={() =>
                        setRowIndex((prev) => (prev === index ? null : index))
                      }
                    >
                      {index === rowIndex ? t.hide : t.show} {t.byVolume}
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
                  data-label={t.costSavings}
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
                      {t.costByVolume.replace("{symbol}", symbol)}
                    </h4>
                    <div className={styles.volumeTable}>
                      <table>
                        <thead>
                          <tr>
                            <th>{t.volume}</th>
                            <th>{competitorBrokerName}</th>
                            <th>Afterprime</th>
                            <th>{t.saved}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[50, 100, 250, 500, 1000].map((volume) => (
                            <tr key={volume}>
                              <td>{volume} {t.lots}</td>
                              <td>
                                $
                                {(competitorBrokerCostPerLot * volume).toFixed(
                                  2,
                                )}
                              </td>
                              <td>
                                $
                                {(
                                  (afterprimeCostPerLot - rebate) *
                                  volume
                                ).toFixed(2)}
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
          {t.sourcePrefix}{" "}
          <a href="https://www.forexbenchmark.com" target="_blank">
            <u>{t.forexBenchmark}</u>
          </a>{" "}
          {t.sourceSuffix}
          {t.lastUpdatedPrefix} {lastUpdated}{t.lastUpdatedSuffix}<br />
          <br />
          {footerRebate !== null && (
            <>
              {t.flowRewardsNote.replace("${rebate}", `$${footerRebate.toFixed(2)}`)}{" "}
              <a href={localizeHref("/get-paid-to-trade", locale)}>{t.flowRewardsLink}</a>{" "}
              {t.flowRewardsNoteSuffix}
              <br />
              {t.disclaimer}
            </>
          )}
        </p>
      </div>
    </div>
  );
}
