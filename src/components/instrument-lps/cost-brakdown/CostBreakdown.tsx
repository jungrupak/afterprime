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
    gcTime: 10 * 60 * 1000, // cache stays for 10 minutes
  });
  //####

  const afterprimeCost = data?.brokers?.[0]?.cost ?? 0;
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
          {instrument} All-In-Cost (Example)
        </h2>
        <div className={`${styles.costBreakDownTable}`}>
          <table cellPadding={"0"} cellSpacing={"0"} border={0}>
            <thead>
              <tr>
                <th>Volume</th>
                <th>Raw Spread</th>
                <th>
                  Flow Rewards<sup>TM</sup>
                </th>
                <th>Net Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>50 lots</td>
                <td>Approximately ${multiplyAllInCost(afterprimeCost, 50)}</td>
                <td>${multiplyAllInCost(rebatePerLot, 50)}</td>
                <td>
                  <span className="text-[#03C554]!">
                    {afterprimeCost * 50 - rebatePerLot * 50}
                  </span>
                  USD
                </td>
              </tr>
              <tr>
                <td>200 lots</td>
                <td>${multiplyAllInCost(afterprimeCost, 200)}</td>
                <td>${multiplyAllInCost(rebatePerLot, 200)}</td>
                <td>
                  <span className="text-[#03C554]!">
                    {afterprimeCost * 200 - rebatePerLot * 200}
                  </span>
                  USD
                </td>
              </tr>
              <tr>
                <td>1000 lots</td>
                <td>${multiplyAllInCost(afterprimeCost, 1000)}</td>
                <td>${multiplyAllInCost(rebatePerLot, 1000)}</td>
                <td>
                  <span className="text-[#03C554]!">
                    {afterprimeCost * 1000 - rebatePerLot * 1000}
                  </span>
                  USD
                </td>
              </tr>
              {/* <tr>
                <td>1000</td>
                <td>broker.cost pips</td>
                <td>broker.flow_rewards/lot</td>
                <td>broker.costPerLot - rebateperinstrument</td>
              </tr> */}
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
