import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "./Page.module.scss";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import VsSymbolHero from "./VsSymbolHero";
import VsSymbolTable from "./VsSymbolTable";
import VsSymbolVerdicts from "./VsSymbolVerdicts";
import Accordion from "@/utils/accordion/Accordion";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import Link from "next/link";

export const revalidate = 60;

type Props = {
  params: Promise<{ brokers: string; symbol: string }>;
};

// Local to this route — do not import from [brokers]/page.tsx to avoid coupling
const BROKER_SLUG_MAP = {
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

// Returns display name for a slug, or undefined if not in map
function getBrokerDisplayName(slug: string): string | undefined {
  return (BROKER_SLUG_MAP as Record<string, string>)[slug];
}

// Returns the next broker slug for the "related links" section (wraps around)
function getNextBrokerSlug(currentSlug: string): string | null {
  const slugs = Object.keys(BROKER_SLUG_MAP);
  const idx = slugs.indexOf(currentSlug);
  if (idx === -1) return null;
  return slugs[(idx + 1) % slugs.length] ?? null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brokers, symbol } = await params;
  const mappedBrokerName = getBrokerDisplayName(brokers);
  if (!mappedBrokerName) return {};

  const data = await getBrokerCompareData(symbol);
  if (!data) return {};

  const ap = data.brokers.find((b) => b.broker === "Afterprime");
  const comp = data.brokers.find((b) => b.broker === mappedBrokerName);
  if (!ap || !comp) return {};

  const sym = symbol.toUpperCase();

  return {
    title: `Afterprime vs ${mappedBrokerName} ${sym} - Cost Comparison`,
    description: `Trade ${sym} cheaper at Afterprime. ${mappedBrokerName} costs $${comp.costPerLot.toFixed(2)}/lot vs Afterprime at $${ap.costPerLot.toFixed(2)}/lot — ${comp.savingPercentage.toFixed(1)}% lower. Zero commission.`,
    alternates: {
      canonical: `https://afterprime.com/vs/${brokers}/${symbol.toLowerCase()}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function VsSymbolPage({ params }: Props) {
  const { brokers, symbol } = await params;

  const mappedBrokerName = getBrokerDisplayName(brokers);
  if (!mappedBrokerName) return notFound();

  const data = await getBrokerCompareData(symbol);
  if (!data) return notFound();

  const ap = data.brokers.find((b) => b.broker === "Afterprime");
  const comp = data.brokers.find((b) => b.broker === mappedBrokerName);
  if (!ap || !comp) return notFound();

  const sym = symbol.toUpperCase();
  const rebate = data.rebate?.rebate_usd_per_lot ?? 0;
  const savingPer100Lots = (comp.costPerLot - ap.costPerLot) * 100;
  const apNetCost = Math.max(0, ap.costPerLot - rebate);
  const savingPct = comp.savingPercentage;
  const nextBrokerSlug = getNextBrokerSlug(brokers);

  const FAQ_DATA = [
    {
      question: `Is Afterprime cheaper than ${mappedBrokerName} for ${sym}?`,
      answer: `Yes. Based on current live data, Afterprime's all-in ${sym} cost is $${ap.costPerLot.toFixed(2)}/lot versus ${mappedBrokerName}'s $${comp.costPerLot.toFixed(2)}/lot — a ${savingPct.toFixed(1)}% difference. On 100 lots that's $${savingPer100Lots.toFixed(0)} in your favour.`,
    },
    {
      question: `Does ${mappedBrokerName} charge commission on ${sym}?`,
      answer: `${mappedBrokerName}'s all-in cost includes spread and any applicable commission depending on account type. Afterprime charges $0 commission on all trades — cost is entirely spread-based.`,
    },
    {
      question: `What is Afterprime's Flow Rewards and how does it affect the comparison?`,
      answer: `Flow Rewards is a structural rebate of up to $3/lot paid back to active traders. The current ${sym} rate is $${rebate.toFixed(2)}/lot, bringing Afterprime's net cost to $${apNetCost.toFixed(2)}/lot.`,
    },
    {
      question: `How often is this data updated?`,
      answer: `Spread and cost data is sourced from Forexbenchmark.com's feed and reflects current market conditions. Data is refreshed approximately every 12 hours.`,
    },
  ];

  const FAQ_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      {/* Section 1 — Hero / Verdict */}
      <VsSymbolHero
        brokerName={mappedBrokerName}
        symbol={symbol}
        apCostPerLot={ap.costPerLot}
        compCostPerLot={comp.costPerLot}
        savingPct={savingPct}
        savingPer100Lots={savingPer100Lots}
      />

      {/* Section 2 — Comparison Table */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2 className="leading-[1.2]">
            Cost Comparison: Afterprime vs {mappedBrokerName} {sym}
          </h2>
          <VsSymbolTable
            brokerName={mappedBrokerName}
            symbol={symbol}
            apCost={ap.cost}
            compCost={comp.cost}
            apCostPerLot={ap.costPerLot}
            compCostPerLot={comp.costPerLot}
            rebate={rebate}
            apNetCost={apNetCost}
            savingPct={savingPct}
          />
        </div>
      </section>

      {/* Section 3 — Trader Type Verdicts */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2 className="leading-[1.2]">Who Gets the Better Deal?</h2>
          <VsSymbolVerdicts
            brokerName={mappedBrokerName}
            symbol={symbol}
            savingPct={savingPct}
            savingPer100Lots={savingPer100Lots}
          />
        </div>
      </section>

      {/* Section 4 — About Broker */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2 className="leading-[1.2]">About This Comparison</h2>
          <div className={styles.aboutSection}>
            This comparison uses {mappedBrokerName}&apos;s pricing for {sym},
            verified by{" "}
            <a
              href="https://www.forexbenchmark.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <u>Forexbenchmark.com</u>
            </a>
            , which represents their lowest all-in cost offering.
          </div>
        </div>
      </section>

      {/* Section 5 — FAQ */}
      <section className="compact-section">
        <div className="ap_container_small">
          <div className={styles.faqBlock}>
            <h2 className="text-[34px] font-[700] mb-10">
              Afterprime vs {mappedBrokerName} {sym} FAQs.
            </h2>
            <Accordion faqObjects={FAQ_DATA} />
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
          />
        </div>
      </section>

      {/* Section 6 — Related Links */}
      <section className="compact-section">
        <div className="ap_container_small">
          <div className={styles.relatedLinks}>
            <Link
              href={`/forex/${symbol.toLowerCase()}`}
              className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
            >
              {sym} Trading Conditions →
            </Link>
            <Link
              href={`/swaps/${symbol.toLowerCase()}`}
              className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
            >
              {sym} Swap Rates →
            </Link>
            <Link
              href={`/trading-hours/${symbol.toLowerCase()}`}
              className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
            >
              {sym} Market Hours →
            </Link>
            {nextBrokerSlug && (
              <Link
                href={`/vs/${nextBrokerSlug}/${symbol.toLowerCase()}`}
                className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
              >
                Afterprime vs{" "}
                {getBrokerDisplayName(nextBrokerSlug)} {sym} →
              </Link>
            )}
            <Link
              href={`/vs/${brokers}`}
              className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
            >
              Afterprime vs {mappedBrokerName} — All Pairs →
            </Link>
          </div>
        </div>
      </section>

      {/* Schemas */}
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Broker Comparisons", href: "/vs" },
          {
            name: `Afterprime vs ${mappedBrokerName}`,
            href: `/vs/${brokers}`,
          },
          {
            name: `${sym} Comparison`,
            href: `/vs/${brokers}/${symbol.toLowerCase()}`,
          },
        ]}
      />
    </>
  );
}
