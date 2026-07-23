import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import styles from "./Page.module.scss";
import { notFound } from "next/navigation";
import CostComparisonWithSelected from "./compare-ap-with-selected/CostComparison";
import CompareWithMajors from "./compare-with-majors/CostComparison";
import Button from "@/components/ui/Button";
import btnStyle from "@/components/ui/ui.module.scss";
import TypeformButton from "@/components/ui/typeForm";
import FaqCalc from "@/components/faq-calculators/Faq";
import FaqSchema from "@/lib/schema/faqSchema";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import { getSavingCompare } from "@/lib/getSavingCompare";
import CostSavingCalculatorBrokers from "../cost-calculator/CostSavingCalculator";
import { costSavingCalculatorContent } from "@/components/all-calculators/CostSavingCalculator/costSavingCalculatorContent";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { buildHreflangMap, toOgLocale } from "@/lib/seo/metadata";
import { localizeHref } from "@/lib/locale/localizeHref";
import { brokerPageContent, type BrokerPageContent } from "./brokerPageContent";

// ISR
export const revalidate = 60;

type Props = {
  params: Promise<{
    brokers: string;
  }>;
};

type VsBrokerJson = {
  title?: { rendered?: string };
  aioseo_head_json?: Record<string, string>;
  acf?: {
    cta_block?: {
      title?: string;
      paragraph?: string;
      button_url?: string;
    };
    hero_banner_home?: {
      banner_heading?: string;
      banner_paragraph?: string;
    };
    reading_text_content?: string;
    faq_section?: {
      q_and_a?: { question?: string; answer?: string }[];
    };
  };
};

//
// Metadata
//

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brokers } = await params;
  const locale = await getRequestLocale();
  const renderPage = await getTranslatedPage<VsBrokerJson>(brokers, locale);
  const pageTitle = renderPage?.title?.rendered;
  const pageAiseo = renderPage?.aioseo_head_json;
  const year = new Date().getFullYear();

  const savingCompares = await getSavingCompare();
  const mappedBrokerName = brokerSlugMap[brokers as keyof typeof brokerSlugMap];
  const currentPageBroker = savingCompares?.brokers?.find(
    (item) => item.broker === mappedBrokerName,
  );
  const findAfterprime = savingCompares?.brokers?.find(
    (item) => item.broker === "Afterprime",
  );
  const brokerSavingPcnt = currentPageBroker?.savingPercentage.toFixed(1) ?? 0;

  const canonicalPath = `/vs/${brokers}`;
  const canonicalUrl = `https://afterprime.com${localizeHref(canonicalPath, locale)}`;

  return {
    title: `Afterprime vs ${pageTitle} Comparison ${year}`,
    description: `Save ${brokerSavingPcnt}% vs ${pageTitle} trading costs. Verified average cost all pairs $${findAfterprime?.costPerLot}/lot vs ${pageTitle}'s $${currentPageBroker?.costPerLot}. Compare brokers.`,
    alternates: {
      canonical: canonicalUrl,
      languages: buildHreflangMap(brokers, canonicalPath),
    },

    authors: [{ name: "Afterprime", url: "https://afterprime.com" }],
    creator: "Afterprime",
    publisher: "Afterprime",

    openGraph: {
      title: pageAiseo?.["og:title"] ?? "Afterprime",
      description:
        pageAiseo?.["og:description"] ??
        "Forex broker with lowest costs, A-Book forex broker, Get paid to trade",
      url: canonicalUrl,
      siteName: pageAiseo?.["og:site_name"] ?? "afterprime.com",
      type: (pageAiseo?.["og:type"] as "website" | "article") ?? "website",
      locale: toOgLocale(locale),
      images: [
        {
          url:
            pageAiseo?.["og:image"] ??
            "/img/og-images/default-og-afterprime-home.jpg",
          width: 1200,
          height: 630,
          alt:
            pageAiseo?.["og:title"] ??
            pageAiseo?.["og:description"] ??
            "Afterprime",
        },
      ],
    },

    twitter: {
      card: (pageAiseo?.["twitter:card"] as "summary" | "summary_large_image") ?? "summary_large_image",
      title: pageAiseo?.["twitter:title"] ?? "Afterprime",
      description:
        pageAiseo?.["twitter:description"] ??
        "Forex broker with Flow Rewards program, Forex broker with institutional-grade execution",
      images: [
        pageAiseo?.["twitter:image"] ??
          "/img/og-images/default-og-afterprime-home.jpg",
      ],
      creator: pageAiseo?.["twitter:creator"] ?? "@afterprime_com",
      site: pageAiseo?.["twitter:site"] ?? "@afterprime_com",
    },

    icons: {
      icon: "/favicon.ico",
      apple: [
        { url: "/AppIcon57x57.png", sizes: "57x57" },
        { url: "/AppIcon57x57@2x.png", sizes: "114x114" },
        { url: "/AppIcon57x57@2x.png", sizes: "120x120" },
        { url: "/AppIcon72x72.png", sizes: "72x72" },
        { url: "/AppIcon72x72@2x.png", sizes: "144x144" },
        { url: "/AppIcon72x72@2x.png", sizes: "152x152" },
      ],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

//
// Page Component
//
export default async function ChildPage({ params }: Props) {
  const { brokers } = await params;
  if (!brokers) return;
  const locale = await getRequestLocale();
  const [pageData, vsT, brokerT, calcT] = await Promise.all([
    getTranslatedPage<VsBrokerJson>(brokers, locale),
    getTranslatedStatic("vs-broker-cta", locale, {
      getInviteCodeCta: "Get Invite Code",
    }),
    getTranslatedStatic("vs-broker-page", locale, brokerPageContent),
    getTranslatedStatic("cost-saving-calculator", locale, costSavingCalculatorContent),
  ]);
  if (!pageData) {
    notFound();
  }
  const pageTitle = pageData?.title?.rendered || brokers;
  const ctaBlockFields = pageData?.acf?.cta_block;
  const heroBanner = pageData?.acf?.hero_banner_home;
  const content = pageData?.acf?.reading_text_content;
  const faqData = pageData?.acf?.faq_section?.q_and_a;

  const BROKER_VIDEO_URLS = [
    { broker: "ic-markets", url: "ic-markets-raw-web-bumperad.mp4" },
    { broker: "fxopen", url: "fxopen-ticktrader-web-bumperad.mp4" },
    { broker: "global-prime", url: "global-prime-web-bumperad.mp4" },
    { broker: "fxcm", url: "fxcm-web-bumperad.mp4" },
    { broker: "tickmill", url: "tickmill-uk-raw-web-bumperad.mp4" },
    { broker: "pepperstone", url: "pepperstone-uk-r-web-bumperad.mp4" },
    { broker: "swissquote", url: "swissquote-web-bumperad.mp4" },
    { broker: "darwinex", url: "darwinex-web-bumperad.mp4" },
    { broker: "dukascopy", url: "dukascopy-web-bumperad.mp4" },
    { broker: "marketscom", url: "marketscom-web-bumperad.mp4" },
    { broker: "markets-dot-com", url: "marketscom-web-bumperad.mp4" },
    { broker: "top-10-avg", url: "top-10-avg-web-bumperad.mp4" },
    { broker: "industry-avg", url: "industry-avg-web-bumperad.mp4" },
  ];

  function getBrokerVideoUrl(brokerName: string) {
    if (!brokerName) return null;
    const search = brokerName.toLowerCase().trim();
    const normalized = search.replace(/[-.]/g, "");
    const match = BROKER_VIDEO_URLS.find(
      (b) =>
        search.includes(b.broker) ||
        normalized.includes(b.broker.replace(/[-.]/g, "")),
    );
    return match ? match.url : null;
  }

  function renderBrokerVideoPlayer(brokerName: string) {
    const videoKey = getBrokerVideoUrl(brokerName);
    if (!videoKey) return null;

    return (
      <section className={`compact-section`}>
        <div className="ap_container_small">
          <div
            style={{
              width: "100%",
              background: "#000",
              aspectRatio: "16/9",
              maxHeight: "500px",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <video
              controls
              muted
              autoPlay
              loop
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            >
              <source
                src={`https://motion.afterprime.com/${encodeURIComponent(videoKey)}`}
                type="video/mp4"
              />
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Inner Banner */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        <div className="ap_container_small flex items-center h-full">
          <div className={`apBannerContent`}>
            <h1 className="h1-size mt-10 lg:mt-15 max-w-[800px]">
              <span className="font-[600]">{heroBanner?.banner_heading}</span>
            </h1>
            <div
              className="paragraph max-w-[600px] lg:mt-8 opacity-80"
              style={{ fontWeight: "300" }}
              dangerouslySetInnerHTML={{
                __html: heroBanner?.banner_paragraph || "&nbsp;",
              }}
            />

            <div className={`mt-8 md:mt-15`}>
              <a
                href={`#costCalculator`}
                className={`${btnStyle.ap_button} ${btnStyle.primary} ${btnStyle.regular}`}
              >
                {brokerT.compareYourCost}
                <svg
                  width="11"
                  height="17"
                  viewBox="0 0 11 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.70063 0.707031L10.8916 8.70703L2.70063 16.707L0.891603 14.9402L7.27355 8.70703L0.891602 2.47388L2.70063 0.707031Z"
                    fill="#fff"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {renderBrokerVideoPlayer(brokers)}

      <section
        id="costCalculator"
        className={`compact-section`}
        style={{ scrollMarginTop: "80px" }}
      >
        <div className="ap_container_small">
          <CostSavingCalculatorBrokers currentBroker={brokers} locale={locale} content={calcT} />
        </div>
      </section>

      <section className={`compact-section`}>
        <div className="ap_container_small">
          <h2 className={`leading-[1.2]`}>{brokerT.totalTradingCostHeading}</h2>
          <CostComparisonWithSelected selectedBrokerSlug={brokers} />
        </div>
      </section>

      <section className={`compact-section`}>
        <div className="ap_container_small">
          <h2 className={`leading-[1.2]`}>{brokerT.tradingCostByMajorHeading}</h2>
          <CompareWithMajors broker={brokers} />
        </div>
      </section>

      {/* Dynamic Content Area */}
      <section className={`compact-section`}>
        <div className="ap_container_small">
          <div className={`${styles.pageEditorContent}`}>
            <h2 className={`mt-0!`}>{brokerT.editorialSpreadHeading}</h2>

            <p>
              {brokerT.editorialSpreadIntro}
            </p>

            <ul>
              <li>
                <b>{brokerT.editorialRawRealityTitle}</b>
                <br />
                {brokerT.editorialRawRealityDesc}
              </li>
              <li>
                <b>{brokerT.editorialAfterprimeEdgeTitle}</b>
                <br />
                {brokerT.editorialAfterprimeEdgeDesc}
              </li>
            </ul>

            <h2 className={`mt-0!`}>
              {brokerT.editorialCostPerLotHeading}
            </h2>

            <p>
              {brokerT.editorialCostPerLotIntro}
            </p>

            <p>
              <b>{brokerT.editorialCostPerLotFormula}</b> {brokerT.editorialCostPerLotFormulaSuffix}
            </p>

            <ul>
              <li>
                <b>{brokerT.editorialSlippageTitle}</b>
                <br />
                {brokerT.editorialSlippageDesc.replace("{brokerName}", pageTitle)}
              </li>

              <li>
                <b>{brokerT.editorialCumulativeTitle}</b>
                <br />
                {brokerT.editorialCumulativeDesc}
              </li>
            </ul>

            <h2 className={`mt-0!`}>{brokerT.editorialHowAffectsHeading}</h2>

            <p>
              {brokerT.editorialHowAffectsIntro}
            </p>

            <ul>
              <li>
                <b>{brokerT.editorialVolumeWeightingTitle}</b>
                <br />
                {brokerT.editorialVolumeWeightingDesc}
              </li>
              <li>
                <b>
                  {brokerT.editorialFlowRewardsTitle}
                </b>
                <br />
                {brokerT.editorialFlowRewardsDesc}
              </li>
              <li>
                <b>{brokerT.editorialInsightTitle}</b>
                <br />
                {brokerT.editorialInsightDesc}
              </li>
            </ul>

            <div dangerouslySetInnerHTML={{ __html: content ?? "" }} />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FaqCalc faqSubject="FAQ." data={faqData ?? []} />
      <FaqSchema pageSlug={brokers} />
      <BreadcrumbSchema
        items={[
          { name: brokerT.breadcrumbHome, href: localizeHref("/", locale) },
          { name: brokerT.breadcrumbBrokerComparisons, href: localizeHref("/vs", locale) },
          {
            name: `Afterprime vs ${brokers.charAt(0).toUpperCase() + brokers.slice(1)}`,
            href: localizeHref(`/vs/${brokers}`, locale),
          },
        ]}
      />

      {/* CTA */}
      <section className={`compact-section`}>
        <div className="ap_container_small">
          <div
            className={`${styles.bottomCta} flex flex-col justify-center items-center text-center`}
          >
            <div>
              <h2
                className={`text-[clamp(30px_,5vw_,50px)]! md:mb-8! leading-[1]`}
              >
                {ctaBlockFields?.title}
              </h2>
              <p
                className={`paragraph mb-8 md:mb-10 opacity-80`}
                dangerouslySetInnerHTML={{
                  __html: ctaBlockFields?.paragraph || "",
                }}
              />
              <TypeformButton buttonText={vsT.getInviteCodeCta} size="Regular" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

//
// Pre-build all static params for ISR
export async function generateStaticParams() {
  const pages = await wpFetch<WPPage[]>(`/pages?_fields=id,slug,parent`);
  if (!Array.isArray(pages)) return [];

  const parents = pages.filter((p) => p.parent === 0);
  const parentMap = Object.fromEntries(parents.map((p) => [p.id, p.slug]));

  return pages
    .filter((p) => p.parent !== 0 && parentMap[p.parent])
    .map((p) => ({
      slug: parentMap[p.parent],
      inst: p.slug,
    }));
}
