"use client";
import styles from "./CostComparison.module.scss";
import { useQuery } from "@tanstack/react-query";

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
};

interface Props {
  selectedBrokerSlug: string; // now just string ✅
}

const CACHE_TTL = 2 * 60 * 1000;

export default function CompareWithMajors({ broker }: { broker: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["cost-comparison-majors"],
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

  if (isLoading) return <p className={`text-center z-4`}>Loading..</p>;
  if (error || !data)
    return (
      <p className={`text-red text-[12px] text-center`}>Error while data..</p>
    );

  if (!broker)
    return (
      <p className={`text-red text-[16px] opacity-65`}>
        Broker did not find in Compare List..
      </p>
    );

  const MAJORS: [string, CostApiResponse][] = Object.entries(data?.items || {});
  console.log("data", MAJORS);

  return (
    <div className="ap_container_small relative z-1 w-full z-5">
      <div className={styles.costCompareTable}>
        <div
          className={`${styles.costCompareTableHead} grid grid-cols-8 gp-10 md:gap-5 max-md:hidden`}
        >
          <div className="col-span-2">FX Majors</div>
          <div className="col-span-2 text-[#ffffff]!">
            {data?.competitor_contains?.[0].toUpperCase()} <br /> Cost/lot
          </div>
          <div className="col-span-2 bg-[var(--secondary-color)] text-white!">
            Afterprime <br /> Cost/lot
          </div>
          <div className="col-span-2 text-[#ffffff]! text-right">
            <b>Cost Saved $</b>
          </div>
        </div>

        <div className={styles.compareTableBody}>
          {MAJORS.map(([symbol, item]) => (
            <div
              key={symbol}
              className={`${styles.costCompareTableRow} grid grid-cols-8 md:gap-5`}
            >
              <div className="col-span-2 max-md:col-span-12 max-md:pb-2!">
                <div data-label="Pairs">{symbol}</div>
              </div>

              <div
                className="col-span-2 max-md:col-span-3 max-md:pb-2!"
                data-label={
                  data?.competitor_contains?.[0].toUpperCase() + "(Cost/Lot)"
                }
              >
                <div>${(item?.brokers?.[1]?.costPerLot ?? 0).toFixed(2)}</div>
              </div>

              <div
                data-label="Afterprime (Cost/Lot)"
                className="col-span-2 max-md:col-span-3 md:bg-[var(--secondary-color)] text-white! max-md:px-1!"
              >
                ${(item?.brokers?.[0].costPerLot).toFixed(2)}
              </div>
              <div
                data-label="Savings"
                className="col-span-2 max-md:col-span-2 text-right"
              >
                $
                {(
                  (item?.brokers?.[1]?.costPerLot ?? 0) -
                  (item?.brokers?.[0]?.costPerLot ?? 0)
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
