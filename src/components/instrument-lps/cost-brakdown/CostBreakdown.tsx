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
                <th>
                  Cost
                  <br />
                  (Per Lot)
                </th>
                <th>
                  Flow Rewards<sup>TM</sup>
                  <br />
                  (${rebatePerLot.toFixed(2)}/lot)
                </th>
                <th>
                  All-In Cost
                  <br />
                  USD
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>50</td>
                <td>{afterprimeCost}</td>
                <td>${multiplyAllInCost(rebatePerLot, 50)}</td>
                <td>
                  <span className="text-[#03C554]!">
                    $ {((afterprimeCost - rebatePerLot) * 50).toFixed(2)}
                  </span>
                </td>
              </tr>
              <tr>
                <td>200</td>
                <td>{afterprimeCost}</td>
                <td>${multiplyAllInCost(rebatePerLot, 200)}</td>
                <td>
                  <span className="text-[#03C554]!">
                    $ {((afterprimeCost - rebatePerLot) * 200).toFixed(2)}
                  </span>
                </td>
              </tr>
              <tr>
                <td>1000</td>
                <td>{afterprimeCost}</td>
                <td>${multiplyAllInCost(rebatePerLot, 1000)}</td>
                <td>
                  <span className="text-[#03C554]!">
                    $ {((afterprimeCost - rebatePerLot) * 1000).toFixed(2)}
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
