"use client";
import styles from "./CostBreakdown.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

interface Breakdown {
  instrument?: string;
}

export default function CostBreakdown({ instrument }: Breakdown) {
  if (!instrument) return null;

  //####
  const { data, isLoading, error } = useQuery({
    queryKey: ["cost-comparison", instrument],
    queryFn: () => getBrokerCompareData(instrument!),
    enabled: !!instrument, //prevents undefined crash
    staleTime: CACHE_TTL, // fresh for 2 minutes
    gcTime: 1 * 60 * 1000, // cache stays for 10 minutes
  });
  //####

  //Hide this component if below condition matches
  if (data?.industryVsAfterprimeAvgPct === 0) return;
  if (data?.rebate === null) return;
  if (!data) return;

  const afterprimeCost = data?.brokers?.[0]?.costPerLot ?? 0;
  const rebatePerLot = data?.rebate?.rebate_usd_per_lot ?? 0;

  function multiplyAllInCost(item: number, volume: number) {
    const multiply = item * volume;
    return multiply.toFixed(2);
  }

  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <h2 className={`text-center font-semibold max-md:leading-[1.2]`}>
          {instrument} All-In-Cost
        </h2>
        <div className={`${styles.costBreakDownTable}`}>
          <table cellPadding={"0"} cellSpacing={"0"} border={0}>
            <thead>
              <tr>
                <th>
                  Volume
                  <br />
                  (Lots)
                </th>
                <th className="max-md:hidden">
                  Net Cost
                  <br />
                  (Lot Round Turn)
                </th>
                <th>
                  Flow Rewards<sup>TM</sup>
                  <br />
                  (${rebatePerLot.toFixed(2)}/lot)
                </th>
                <th>
                  Saved
                  <br />
                  (vs Industry Avg.)
                </th>
              </tr>
            </thead>
            <tbody>

            <tr>
              <td>50 CORRECT</td>
              <td className="max-md:hidden">{afterprimeCost}  = $5.53 not correct</td>
              <td>${multiplyAllInCost(rebatePerLot, 50)}</td>
              <td>
                <span className="text-[#03C554]!">
                  $ (Industry Avg.costPerLot-afterprimeCost) * 50 = $294 saved on 50 lots

                  ("broker":"Industry Avg","symbol":"EURGBP","cost":1.14,"costPerLot":11.41) MINUS 5.53 X 50 LOTS

                </span>
              </td>
            </tr>

            </tbody>
          </table>
        </div>

        <div className={`text-[14px] w-full text-center mt-10 opacity-65`}>
          Flow Rewards<sup>TM</sup> are credited per traded lot (round turn) and
          recorded as a separate PnL line.
        </div>
      </div>
    </section>
  );
}
