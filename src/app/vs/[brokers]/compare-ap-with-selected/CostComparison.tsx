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

const brokerSlugMap = {
  tickmill: "Tickmill UK (Raw)",
  fxcm: "FXCM",
  "ic-markets": "IC Markets (Raw)",
  pepperstone: "Pepperstone UK (.r)",
  fxopen: "FXOpen (TickTrader)",
  dukascopy: "Dukascopy",
  darwinex: "Darwinex",
  "global-prime": "Global Prime",
  "markets-dot-com": "Markets.com",
  swissquote: "Swissquote",
  "top-10-avg": "Top 10 Avg",
  "industry-avg": "Industry Avg",
} as const;

const CACHE_TTL = 2 * 60 * 1000;

export default function CostComparisonWithSelected({
  selectedBrokerSlug,
}: Props) {
  const asFiniteNumber = (value: unknown, fallback = 0) =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

  // ✅ safely map slug → broker display name
  const mappedBrokerName =
    brokerSlugMap[selectedBrokerSlug as keyof typeof brokerSlugMap];

  const { data, isLoading, error } = useQuery<CostApiResponse | null>({
    queryKey: ["cost-comparison"],
    queryFn: async () => {
      try {
        const res = await fetch("https://feed.afterprime.com/api/costs", {
          next: { revalidate: 2400 },
        });

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

  if (isLoading) return <div className="text-center z-4">Loading...</div>;
  if (error || !data) return null;

  const brokerList = Array.isArray(data.brokers) ? data.brokers : [];
  if (!brokerList.length) return null;

  // ✅ always include Afterprime
  const brokersToPick = ["Afterprime"];

  // ✅ only push mapped broker if it exists
  if (mappedBrokerName) {
    brokersToPick.push(mappedBrokerName);
  }

  const pickedBrokersLists = brokerList.filter((item) =>
    brokersToPick.includes(item.broker),
  );

  const lastUpdated = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (!pickedBrokersLists.length) return null;

  return (
    <div className="ap_container_small relative z-1 w-full z-5">
      <div className={styles.costCompareTable}>
        <div
          className={`${styles.costCompareTableHead} grid grid-cols-7 gp-10 md:gap-5 max-md:hidden`}
        >
          <div className="col-span-2 text-[#ffffff]!">Broker</div>
          <div className="col-span-2 text-[#ffffff]!">Pairs</div>
          <div className="col-span-2 text-[#ffffff]!">
            Cost Per Lot
            <br />
            (Including Commission)
          </div>
          <div className="col-span-1 text-[#ffffff]! text-right">
            <b>
              % Savings
              <br />
              (vs Afterprime)
            </b>
          </div>
        </div>

        <div className={styles.compareTableBody}>
          {pickedBrokersLists.map((broker) => (
            <div
              key={broker.broker}
              className={`${styles.costCompareTableRow} ${
                broker.broker === "Afterprime" ? styles.afterprime : ""
              } grid grid-cols-7 md:gap-5`}
            >
              <div className="col-span-2 max-md:col-span-7 max-md:pb-2!">
                <div data-label="Broker">{broker.broker}</div>
              </div>

              <div
                className="col-span-2 max-md:col-span-2 max-md:pb-2!"
                data-label="Pairs"
              >
                <div>All</div>
              </div>

              <div
                data-label="Cost/Lot (Inc. Comm.)"
                className="col-span-2 max-md:col-span-3"
              >
                ${asFiniteNumber(broker.costPerLot).toFixed(2)}
              </div>

              <div
                data-label="Savings"
                className="col-span-1 max-md:col-span-2 text-right"
              >
                <b>{asFiniteNumber(broker.savingPercentage)}%</b>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[14px] opacity-60 mt-5">
        Source:{" "}
        <a href="https://www.forexbenchmark.com" target="_blank">
          <u>ForexBenchmark</u>
        </a>{" "}
        - Previous 7 Days Range | All Pairs | Incl. Commissions + Spreads. (Last
        Updated: {lastUpdated})
        {pickedBrokersLists.map((broker) => (
          <>
            {broker.broker} costs reflect spread including commission on
            standard lot. Afterprime costs include zero commission with Flow
            Rewards™ applied at standard eligible rates. Comparisons are on a
            like-for-like account basis.
          </>
        ))}
      </div>
    </div>
  );
}
