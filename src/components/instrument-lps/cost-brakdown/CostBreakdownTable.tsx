"use client";
import styles from "./CostBreakdown.module.scss";
import { useQuery } from "@tanstack/react-query";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import {
  costBreakdownTableContent,
  type CostBreakdownTableContent,
} from "./costBreakdownTableContent";

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

interface Breakdown {
  instrument?: string;
  content?: CostBreakdownTableContent;
}

export default function CostBreakdownTable({
  instrument,
  content: c = costBreakdownTableContent,
}: Breakdown) {
  if (!instrument) return null;
  const asFiniteNumber = (value: unknown, fallback = 0) =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

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
  if (!Array.isArray(data?.brokers) || data.brokers.length === 0) return;

  const afterprimeCost = asFiniteNumber(
    data.brokers.find((b) => b.broker === "Afterprime")?.costPerLot,
  );
  const rebatePerLot = asFiniteNumber(data?.rebate?.rebate_usd_per_lot);

  const industryAvgCostPerLot = asFiniteNumber(
    data.brokers.find((b) => b.broker === "Industry Avg")?.costPerLot,
  );

  function multiplyAllInCost(item: number, volume: number) {
    const multiply = item * volume;
    return multiply.toFixed(2);
  }

  return (
    <div className={`${styles.costBreakDownTable}`}>
      <table cellPadding={"0"} cellSpacing={"0"} border={0}>
        <thead>
          <tr>
            <th>
              {c.volumeLine1}
              <br />
              {c.volumeLine2}
            </th>
            <th className="max-md:hidden">
              {c.netCostLine1}
              <br />
              {c.netCostLine2}
            </th>
            <th>
              {c.flowRewardsLine1}
              <sup>TM</sup>
              <br />
              (${rebatePerLot.toFixed(2)}
              {c.flowRewardsRateSuffix}
            </th>
            <th>
              {c.savedLine1}
              <br />
              {c.savedLine2}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>50</td>
            <td className="max-md:hidden">
              ${(afterprimeCost - rebatePerLot).toFixed(2)}
            </td>
            <td>${multiplyAllInCost(rebatePerLot, 50)}</td>
            <td>
              <span className="text-[#03C554]!">
                $ {((industryAvgCostPerLot - afterprimeCost) * 50).toFixed(2)}
              </span>
            </td>
          </tr>
          <tr>
            <td>200</td>
            <td className="max-md:hidden">
              ${(afterprimeCost - rebatePerLot).toFixed(2)}
            </td>
            <td>${multiplyAllInCost(rebatePerLot, 200)}</td>
            <td>
              <span className="text-[#03C554]!">
                $ {((industryAvgCostPerLot - afterprimeCost) * 200).toFixed(2)}
              </span>
            </td>
          </tr>
          <tr>
            <td>1000</td>
            <td className="max-md:hidden">
              ${(afterprimeCost - rebatePerLot).toFixed(2)}
            </td>
            <td>${multiplyAllInCost(rebatePerLot, 1000)}</td>
            <td>
              <span className="text-[#03C554]!">
                $ {((industryAvgCostPerLot - afterprimeCost) * 1000).toFixed(2)}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
