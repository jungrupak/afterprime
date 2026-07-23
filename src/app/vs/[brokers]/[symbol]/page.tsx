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
import { CtaBlock } from "@/components/acfFieldGroups/cta-block/CtaBlock";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { vsSymbolFaqContent } from "./VsSymbolFaqContent";
import { vsSymbolPageContent } from "./vsSymbolPageContent";
import { vsSymbolHeroContent } from "./vsSymbolHeroContent";
import { vsSymbolTableContent } from "./vsSymbolTableContent";
import { vsSymbolVerdictsContent } from "./vsSymbolVerdictsContent";
import { localizeHref } from "@/lib/locale/localizeHref";

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
  "fusion-markets": "FusionMarkets",
  "vantage-fx": "Vantage FX (RAW ECN)",
  "blackbull-markets": "BlackBull Markets (cTrader)",
  fxpig: "FXPIG",
  tradersway: "Tradersway (ECN)",
  "doo-prime": "Doo Prime (.uk)",
  "go-markets": "GO Markets (cTrader)",
  skilling: "Skilling",
  "admiral-markets": "Admiral Markets UK (Prime)",
  octafx: "OctaFX",
  rakuten: "Rakuten Australia",
  fxchoice: "FXChoice (Pro)",
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
  const locale = await getRequestLocale();
  const mappedBrokerName = getBrokerDisplayName(brokers);
  if (!mappedBrokerName) return {};

  const data = await getBrokerCompareData(symbol);
  if (!data) return {};

  const ap = data.brokers.find((b) => b.broker === "Afterprime");
  const comp = data.brokers.find((b) => b.broker === mappedBrokerName);
  if (!ap || !comp) return {};

  const sym = symbol.toUpperCase();

  const canonicalPath = `/vs/${brokers}/${symbol.toLowerCase()}`;
  const canonicalUrl = `https://afterprime.com${localizeHref(canonicalPath, locale)}`;

  return {
    title: `Afterprime vs ${mappedBrokerName} ${sym} - Cost Comparison`,
    description: `Trade ${sym} cheaper at Afterprime. ${mappedBrokerName} costs $${comp.costPerLot.toFixed(2)}/lot vs Afterprime at $${ap.costPerLot.toFixed(2)}/lot — ${comp.savingPercentage.toFixed(1)}% lower. Zero commission.`,
    alternates: {
      canonical: canonicalUrl,
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
  const savingPerlot = comp.costPerLot - ap.costPerLot;
  const savingPer100Lots = (comp.costPerLot - ap.costPerLot) * 100;
  const apNetCost = Math.max(0, ap.costPerLot - rebate);
  const savingPct = comp.savingPercentage;
  const nextBrokerSlug = getNextBrokerSlug(brokers);

  const locale = await getRequestLocale();
  const [faqT, t, heroT, tableT, verdictsT] = await Promise.all([
    getTranslatedStatic("vs-symbol-faq", locale, vsSymbolFaqContent),
    getTranslatedStatic("vs-symbol-page", locale, vsSymbolPageContent),
    getTranslatedStatic("vs-symbol-hero", locale, vsSymbolHeroContent),
    getTranslatedStatic("vs-symbol-table", locale, vsSymbolTableContent),
    getTranslatedStatic("vs-symbol-verdicts", locale, vsSymbolVerdictsContent),
  ]);

  const apCostStr = `$${ap.costPerLot.toFixed(2)}`;
  const compCostStr = `$${comp.costPerLot.toFixed(2)}`;

  const FAQ_DATA = [
    {
      question: faqT.q1
        .replace("{brokerName}", mappedBrokerName)
        .replace("{symbol}", sym),
      answer: (savingPerlot > 0 ? faqT.a1Cheaper : faqT.a1NotCheaper)
        .replace(/{symbol}/g, sym)
        .replace("{apCost}", apCostStr)
        .replace("{brokerName}", mappedBrokerName)
        .replace("{compCost}", compCostStr)
        .replace("{savingPct}", savingPct.toFixed(1))
        .replace("{saving100}", `$${savingPer100Lots.toFixed(0)}`),
    },
    {
      question: faqT.q2
        .replace("{brokerName}", mappedBrokerName)
        .replace("{symbol}", sym),
      answer: faqT.a2.replace(/{brokerName}/g, mappedBrokerName),
    },
    {
      question: faqT.q3,
      answer:
        faqT.a3Prefix +
        (rebate > 0
          ? faqT.a3RebateAvailable
              .replace("{symbol}", sym)
              .replace("{rebate}", `$${rebate.toFixed(2)}`)
              .replace("{apNetCost}", `$${apNetCost.toFixed(2)}`)
          : faqT.a3RebateUnavailable.replace("{symbol}", sym)),
    },
    {
      question: faqT.q4,
      answer: faqT.a4,
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
        locale={locale}
        content={heroT}
      />

      {/* Section 2 — Comparison Table */}
      <section className="compact-section">
        <div className="ap_container_small">
          <h2 className="leading-[1.2]">
            {t.costComparisonHeading
              .replace("{brokerName}", mappedBrokerName)
              .replace("{sym}", sym)}
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
            content={tableT}
          />
          <div className={`${styles.aboutSection} mt-10`}>
            {t.comparisonNote
              .replace("{brokerName}", mappedBrokerName)
              .replace("{sym}", sym)}
          </div>
        </div>
      </section>

      {/* Section 3 — Trader Type Verdicts */}
      {savingPerlot > 0 && (
        <section className="compact-section">
          <div className="ap_container_small">
            <h2 className="leading-[1.2] max-md:text-center">
              {t.betterDealHeading}
            </h2>
            <VsSymbolVerdicts
              brokerName={mappedBrokerName}
              symbol={symbol}
              savingPct={savingPct}
              savingPer100Lots={savingPer100Lots}
              locale={locale}
              content={verdictsT}
            />
          </div>
        </section>
      )}

      {/* Section 5 — FAQ */}
      <section className="compact-section">
        <div className="ap_container_small">
          <div className={styles.faqBlock}>
            <h2 className="text-[34px] font-[700] mb-10">
              {t.faqHeading
                .replace("{brokerName}", mappedBrokerName)
                .replace("{sym}", sym)}
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
          <h2 className="text-[34px] font-[700] mb-10">
            {t.learnMoreHeading.replace("{sym}", sym)}
          </h2>
          <div className={styles.relatedLinks}>
            <Link
              href={localizeHref(`/forex/${symbol.toLowerCase()}`, locale)}
              className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
            >
              {t.tradingConditionsLink.replace("{sym}", sym)}
            </Link>
            <Link
              href={localizeHref(`/swaps/${symbol.toLowerCase()}`, locale)}
              className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
            >
              {t.swapRatesLink.replace("{sym}", sym)}
            </Link>
            <Link
              href={localizeHref(`/trading-hours/${symbol.toLowerCase()}`, locale)}
              className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
            >
              {t.marketHoursLink.replace("{sym}", sym)}
            </Link>
            {nextBrokerSlug && (
              <Link
                href={localizeHref(`/vs/${nextBrokerSlug}/${symbol.toLowerCase()}`, locale)}
                className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
              >
                {t.nextBrokerLink
                  .replace("{nextBroker}", getBrokerDisplayName(nextBrokerSlug) ?? nextBrokerSlug)
                  .replace("{sym}", sym)}
              </Link>
            )}
            <Link
              href={localizeHref(`/vs/${brokers}`, locale)}
              className={`rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70 ${styles.relatedLinkPill}`}
            >
              {t.allPairsLink.replace("{brokerName}", mappedBrokerName)}
            </Link>
          </div>
        </div>
      </section>

      <section className="compact-section">
        <div className="ap_container_small">
          <CtaBlock />
        </div>
      </section>

      {/* Schemas */}
      <BreadcrumbSchema
        items={[
          { name: t.breadcrumbHome, href: localizeHref("/", locale) },
          { name: t.breadcrumbBrokerComparisons, href: localizeHref("/vs", locale) },
          {
            name: t.breadcrumbVsBroker.replace("{brokerName}", mappedBrokerName),
            href: localizeHref(`/vs/${brokers}`, locale),
          },
          {
            name: t.breadcrumbSymbolComparison.replace("{sym}", sym),
            href: localizeHref(`/vs/${brokers}/${symbol.toLowerCase()}`, locale),
          },
        ]}
      />
    </>
  );
}
