"use client";
import styles from "./CostComparison.module.scss";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  vsCostComparisonContent,
  type VsCostComparisonContent,
} from "./vsCostComparisonContent";
import { localizeHref } from "@/lib/locale/localizeHref";

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
  lastUpdated?: string; // optional if API provides it
};

const brokerSlugMap = {
  "Tickmill UK (Raw)": "tickmill",
  FXCM: "fxcm",
  "IC Markets (Raw)": "ic-markets",
  "Pepperstone UK (.r)": "pepperstone",
  "FXOpen (TickTrader)": "fxopen",
  Dukascopy: "dukascopy",
  Darwinex: "darwinex",
  "Global Prime": "global-prime",
  "Markets.com": "markets-dot-com",
  Swissquote: "swissquote",
  FusionMarkets: "fusion-markets",
  "Vantage FX (RAW ECN)": "vantage-fx",
  "BlackBull Markets (cTrader)": "blackbull-markets",
  FXPIG: "fxpig",
  "Tradersway (ECN)": "tradersway",
  "Doo Prime (.uk)": "doo-prime",
  "GO Markets (cTrader)": "go-markets",
  "Skilling (cTrader)": "skilling",
  "Admiral Markets UK (Prime)": "admiral-markets",
  OctaFX: "OctaFX",
  "Rakuten Australia": "rakuten",
  "FXChoice (Pro)": "fxchoice",
  "Top 10 Avg": "top-10-avg",
  "Industry Avg": "industry-avg",
} as const satisfies Record<string, string>;

export type BrokerName = keyof typeof brokerSlugMap;
export type BrokerSlug = (typeof brokerSlugMap)[BrokerName];

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

export default function CostComparison({
  content = vsCostComparisonContent,
  locale = "en",
}: {
  content?: VsCostComparisonContent;
  locale?: string;
}) {
  const asFiniteNumber = (value: unknown, fallback = 0) =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

  //####
  const { data, isLoading, error } = useQuery<CostApiResponse | null>({
    queryKey: ["cost-comparison"],
    queryFn: async () => {
      try {
        const res = await fetch("https://feed.afterprime.com/api/costs", {
          next: { revalidate: 80 },
        });
        if (!res.ok) {
          throw new Error(`Cost API error: ${res.status}`);
        }
        const data = await res.json();
        return data;
      } catch (err) {
        console.error("Failed to fetch compare data:", err);
        return null; // fail gracefully
      }
    },
    staleTime: CACHE_TTL, // fresh for 2 minutes
    gcTime: 10 * 60 * 1000, // cache stays for 10 minutes
  });
  //####

  if (isLoading) return <div>{content.loading}</div>;
  if (error) return <div>{content.failedToLoad}</div>;

  //Hide this component if below condition matches
  if (!data) return;
  if (data?.industryVsAfterprimeAvgPct === 0) return;

  const brokerList = Array.isArray(data?.brokers) ? data.brokers : [];
  if (!brokerList.length) return;

  const brokersToPick = [
    "Afterprime",
    "Tickmill UK (Raw)",
    "FXCM",
    "IC Markets (Raw)",
    "Pepperstone UK (.r)",
    "FXOpen (TickTrader)",
    "Dukascopy",
    "Darwinex",
    "Global Prime",
    "Markets.com",
    "Swissquote",
    "FusionMarkets",
    "Vantage FX (RAW ECN)",
    "BlackBull Markets (cTrader)",
    "FXPIG",
    "Tradersway (ECN)",
    "Doo Prime (.uk)",
    "GO Markets (cTrader)",
    "Skilling (cTrader)",
    "Admiral Markets UK (Prime)",
    "OctaFX",
    "Rakuten Australia",
    "FXChoice (Pro)",
    "Industry Avg",
    "Top 10 Avg",
  ];
  const pickedBrokersLists = brokerList?.filter((item) =>
    brokersToPick.includes(item.broker),
  );

  return (
    <>
      <div className={`ap_container_small relative z-1 w-full z-5`}>
        <h2
          className={`text-[clamp(38px_,5vw_,50px)] font-semibold max-md:leading-[1.2]`}
        >
          {content.heading}
        </h2>
        <p className={`paragraph mb-[clamp(25px_,5vw_,50px)]`}>
          {content.introText}
        </p>
        <div className={`${styles.costCompareTable}`}>
          <div
            className={`${styles.costCompareTableHead} grid grid-cols-7 gp-10 md:gap-5 max-md:hidden`}
          >
            <div className={`col-span-3`}>
              <b>{content.colBroker}</b>
            </div>

            <div className={`max-md:col-span-2 col-span-2`}>
              <b>{content.colCostPerLot}</b>
              <br />
              {content.colCostPerLotSub}
            </div>
            <div className={`max-md:col-span-2 col-span-2 text-[#ffffff]!`}>
              <b>{content.colSavings}</b>
            </div>
          </div>
          <div className={`${styles.compareTableBody}`}>
            {/* #### */}

            {pickedBrokersLists?.map((broker, indx) => (
              <div
                key={`${broker.broker}-${broker.symbol}`}
                className={`${styles.costCompareTableRow} ${broker.broker === "Afterprime" ? styles.afterprime : ""} grid grid-cols-7 md:gap-5`}
              >
                <div
                  className={`col-span-3 max-md:col-span-7 max-md:pb-2! relative`}
                >
                  <div
                    data-label={content.colBroker}
                    className={`col-span-3 relative`}
                  >
                    {broker.broker}
                  </div>
                </div>

                <div
                  data-label={content.dataLabelCostLot}
                  className={`col-span-2 max-md:col-span-3`}
                >
                  ${asFiniteNumber(broker.costPerLot).toFixed(2)}
                </div>

                <div
                  data-label={content.colSavings}
                  className={`max-md:col-span-2 col-span-1`}
                >
                  <b>{asFiniteNumber(broker.savingPercentage)}%</b>
                </div>
                <div className={`max-md:col-span-2 col-span-1`}>
                  {broker.broker !== "Afterprime" && (
                    <Link
                      href={localizeHref(
                        `/vs/${brokerSlugMap[broker.broker as BrokerName] ?? ""}`,
                        locale,
                      )}
                      scroll={true}
                      className={`underline hover:no-underline text-[14px] max-md:text-[16px] block`}
                    >
                      {content.fullComparison}
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
