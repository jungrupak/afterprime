"use client";
import { useQuery } from "@tanstack/react-query";
import styles from "./InstrumentKeyBenifit.module.scss";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";

export default function InstrumentKeyBenifits({
  instrument,
}: {
  instrument: string;
}) {
  //####
  const { data, isLoading, error } = useQuery({
    queryKey: ["instrument-rebates", instrument],
    queryFn: () => getBrokerCompareData(instrument!),
    enabled: !!instrument, //prevents undefined crash
    staleTime: 10 * 60 * 1000, // fresh for 2 minutes
    //gcTime: 10 * 60 * 1000, // cache stays for 10 minutes
  });
  //####

  const indVsAvgLowerCost = data?.industryVsAfterprimeAvgPct;
  const rebate = data?.rebate || null;
  const brokerIndAvg = data?.brokers.find((b) => b.broker === "Industry Avg");
  const brokerAp = data?.brokers.find((b) => b.broker === "Afterprime");
  const indAvgCostPerLot = brokerIndAvg?.costPerLot;
  const apCostPerLot = brokerAp?.costPerLot;
  const rebateUsd = rebate?.rebate_usd_per_lot;
  //const apCostPerlog =

  return (
    <>
      <div className={`${styles.listUi}`}>
        <h3
          className={`text-[clamp(28px_,5vw_,34px)]! font-semibold! mb-5! md:mb-10!`}
        >
          Key advantages for {instrument.toUpperCase()} traders
        </h3>
        <ul>
          {rebate !== null ? (
            <>
              <li>
                <b>{indVsAvgLowerCost?.toFixed(2)}%</b> lower cost vs Industry
                average
              </li>
              <li>
                <b>
                  Save $
                  {(
                    ((indAvgCostPerLot ?? 0) -
                      (apCostPerLot ?? 0) -
                      (rebateUsd ?? 0)) *
                    100
                  ).toFixed(2)}
                </b>{" "}
                per 100 lots vs Industry Average
              </li>
              <li>Zero commission structure</li>
              <li>Sub-50ms institutional execution</li>
              <li>
                Flow Rewards<sup>TM</sup> structural edge
              </li>
            </>
          ) : (
            <>
              <li>Zero commission structure</li>
              <li>Sub-50ms institutional execution</li>
              <li>Institutional spreads</li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}
