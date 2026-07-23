"use client";
import { useQuery } from "@tanstack/react-query";
import styles from "./InstrumentKeyBenifit.module.scss";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import ReactQueryProvider from "@/app/providers/ReactQueryProvider";
import {
  instrumentKeyBenifitsContent,
  type InstrumentKeyBenifitsContent as InstrumentKeyBenifitsContentType,
} from "./instrumentKeyBenifitsContent";

function InstrumentKeyBenifitsContent({
  instrument,
  content: c = instrumentKeyBenifitsContent,
}: {
  instrument: string;
  content?: InstrumentKeyBenifitsContentType;
}) {
  const { data } = useQuery({
    queryKey: ["instrument-rebates", instrument],
    queryFn: () => getBrokerCompareData(instrument!),
    enabled: !!instrument,
    staleTime: 10 * 60 * 1000,
  });

  const indVsAvgLowerCost = data?.industryVsAfterprimeAvgPct;
  const rebate = data?.rebate || null;
  const brokerIndAvg = data?.brokers.find((b) => b.broker === "Industry Avg");
  const brokerAp = data?.brokers.find((b) => b.broker === "Afterprime");
  const indAvgCostPerLot = brokerIndAvg?.costPerLot;
  const apCostPerLot = brokerAp?.costPerLot;
  const rebateUsd = rebate?.rebate_usd_per_lot;

  return (
    <div className={`${styles.listUi}`}>
      <h3
        className={`text-[clamp(28px_,5vw_,34px)]! font-semibold! mb-5! md:mb-10!`}
      >
        {c.heading.replace("{sym}", instrument.toUpperCase())}
      </h3>
      <ul>
        {rebate !== null && brokerAp ? (
          <>
            <li>
              <b>{indVsAvgLowerCost?.toFixed(2)}%</b>
              {c.lowerCostSuffix}
            </li>
            <li>
              <b>
                {c.saveLabel}
                {(
                  ((indAvgCostPerLot ?? 0) -
                    (apCostPerLot ?? 0) -
                    (rebateUsd ?? 0)) *
                  100
                ).toFixed(2)}
              </b>{" "}
              {c.savePerLotsSuffix}
            </li>
            <li>{c.zeroCommission}</li>
            <li>{c.subExecution}</li>
            <li>
              {c.flowRewardsPrefix}
              <sup>TM</sup>
              {c.flowRewardsSuffix}
            </li>
          </>
        ) : (
          <>
            <li>{c.zeroCommission}</li>
            <li>{c.subExecution}</li>
            <li>{c.institutionalSpreads}</li>
          </>
        )}
      </ul>
    </div>
  );
}

export default function InstrumentKeyBenifits({
  instrument,
  content,
}: {
  instrument: string;
  content?: InstrumentKeyBenifitsContentType;
}) {
  return (
    <ReactQueryProvider>
      <InstrumentKeyBenifitsContent instrument={instrument} content={content} />
    </ReactQueryProvider>
  );
}
