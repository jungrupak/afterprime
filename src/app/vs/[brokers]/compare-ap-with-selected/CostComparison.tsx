import styles from "./CostComparison.module.scss";
import { getSavingCompare } from "@/lib/getSavingCompare";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import {
  compareApSelectedContent,
  type CompareApSelectedContent,
} from "./compareApSelectedContent";

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
  "fusion-markets": "FusionMarkets",
  "vantage-fx": "Vantage FX (RAW ECN)",
  "blackbull-markets": "BlackBull Markets (cTrader)",
  fxpig: "FXPIG",
  tradersway: "Tradersway (ECN)",
  "doo-prime": "Doo Prime (.uk)",
  "go-markets": "GO Markets (cTrader)",
  skilling: "Skilling (cTrader)",
  "admiral-markets": "Admiral Markets",
  OctaFX: "OctaFX",
  rakuten: "Rakuten Australia",
  fxchoice: "FXChoice (Pro)",
  "top-10-avg": "Top 10 Avg",
  "industry-avg": "Industry Avg",
} as const;

const CACHE_TTL = 2 * 60 * 1000;

export default async function CostComparisonWithSelected({
  selectedBrokerSlug,
}: Props) {
  const asFiniteNumber = (value: unknown, fallback = 0) =>
    typeof value === "number" && Number.isFinite(value) ? value : fallback;

  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("vs-compare-ap-selected", locale, compareApSelectedContent);

  // ✅ safely map slug → broker display name
  const mappedBrokerName =
    brokerSlugMap[selectedBrokerSlug as keyof typeof brokerSlugMap];

  const data = await getSavingCompare();
  if (!data) {
    throw new Error("Failed to fetch cost comparison data");
  }

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

  const lastUpdated = new Date().toLocaleDateString(locale === "en" ? "en-GB" : locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const selectedBrokerName = mappedBrokerName ?? "selected broker";

  if (!pickedBrokersLists.length) return null;

  return (
    <div className="ap_container_small relative z-1 w-full z-5">
      <div className={styles.costCompareTable}>
        <div
          className={`${styles.costCompareTableHead} grid grid-cols-7 gp-10 md:gap-5 max-md:hidden`}
        >
          <div className="col-span-2 text-[#ffffff]!">{t.brokerLabel}</div>
          <div className="col-span-2 text-[#ffffff]!">{t.pairsLabel}</div>
          <div className="col-span-2 text-[#ffffff]!">
            {t.costPerLotLabel}
            <br />
            {t.costPerLotSub}
          </div>
          <div className="col-span-1 text-[#ffffff]! text-right">
            <b>
              {t.savingsLabel}
              <br />
              {t.savingsSub}
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
                <div data-label={t.dataLabelBroker}>{broker.broker}</div>
              </div>

              <div
                className="col-span-2 max-md:col-span-2 max-md:pb-2!"
                data-label={t.dataLabelPairs}
              >
                <div>{t.pairsAll}</div>
              </div>

              <div
                data-label={t.dataLabelCost}
                className="col-span-2 max-md:col-span-3"
              >
                ${asFiniteNumber(broker.costPerLot).toFixed(2)}
              </div>

              <div
                data-label={t.dataLabelSavings}
                className="col-span-1 max-md:col-span-2 text-right"
              >
                <b>{asFiniteNumber(broker.savingPercentage)}%</b>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-[14px] opacity-60 mt-5">
        <p className="risk-warning-all">
          {t.sourcePrefix}{" "}
          <a href="https://www.forexbenchmark.com" target="_blank">
            <u>{t.sourceName}</u>
          </a>{" "}
          {t.sourceNote}
          {t.lastUpdatedPrefix} {lastUpdated}{t.lastUpdatedSuffix}<br />
          <br />
          {t.costDescription.replace("{brokerName}", selectedBrokerName)}
        </p>
      </div>
    </div>
  );
}
