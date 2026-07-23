import LPBanner from "@/components/instrument-lps/lp-bannner/LpBanner";
import { getTradePageData } from "@/lib/getTradePageData";
import { notFound } from "next/navigation";
import CostComparison from "@/components/instrument-lps/cost-comparison/CostComparison";
import CostBreakdown from "@/components/instrument-lps/cost-brakdown/CostBreakdown";
import FlowRewardIntro from "@/components/instrument-lps/what-is-flow-reward/FlowRewardIntro";
import CostCalculator from "@/components/instrument-lps/cost-calculator/CostCalculator";
import ProductSpecification from "@/components/instrument-lps/product-specification/ProductSpecification";
import Faq from "@/components/instrument-lps/faq/Faq";
import FaqSchema from "@/lib/schema/faqSchema";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import { metaDataHelper } from "./metaDataHelper";
import { CtaBlock } from "@/components/acfFieldGroups/cta-block/CtaBlock";
import LivePriceChart from "@/components/charts/LivePriceChart";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { lpBannerContent } from "@/components/instrument-lps/lp-bannner/lpBannerContent";
import { costBreakdownTableContent } from "@/components/instrument-lps/cost-brakdown/costBreakdownTableContent";
import { specificationTableContent } from "@/components/instrument-lps/product-specification/specificationTableContent";
import { productSpecificationContent } from "@/components/instrument-lps/product-specification/productSpecificationContent";
import { livePriceChartContent } from "@/components/charts/livePriceChartContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const restEndpoint = process.env.WORDPRESS_REST_ENDPOINT;
  if (!restEndpoint) return [];
  try {
    const res = await fetch(
      `${restEndpoint}/pages?parent=2709&_fields=slug&per_page=100`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return [];
    const pages: { slug: string }[] = await res.json();
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

//Export Dynamic Page Title Tags####
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const instrumentUppercase = slug.toUpperCase();
  if (!params) return;
  const { rebate, industryVsApAvgPct, top10VsAfterprimeAvgPct } =
    await metaDataHelper(slug);
  //const formattedPercentage = Math.trunc(getpercentage);

  const formattedPercentage = Math.trunc(
    Math.abs(Number(top10VsAfterprimeAvgPct)),
  );

  //for canonical ur
  const canonicalUrl = `https://afterprime.com/trade/${slug.toLowerCase()}`;

  if (rebate === 0) {
    return {
      title: `Trade ${instrumentUppercase} | Afterprime`,
      description: `Trade ${instrumentUppercase} with standard per lot pricing. Flow Rewards TM are not applied to ${instrumentUppercase}`,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } else if (industryVsApAvgPct <= 0) {
    return {
      title: `${instrumentUppercase} Trading With Flow Rewards | Afterprime`,
      description: `Trade ${instrumentUppercase} and earn ${rebate.toFixed(2)}/lot with Flow Rewards`,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } else {
    return {
      title: `Trade ${instrumentUppercase} at ${formattedPercentage}% Lower Cost vs Top 10 Brokers`,
      description: `Trade ${instrumentUppercase} on Afterprime with verified lowest trading costs. Compare brokers ${instrumentUppercase} cost.`,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }
}

export default async function TradeSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const rawPage = await getTradePageData({ params });

  if (!rawPage) {
    notFound();
  }

  // getTradePageData is a bespoke fetch (parent-scoped) — it can't go
  // through getTranslatedPage like every other page, so the page's entire
  // WP content (title, Flow Rewards section, execution quality items, FAQ
  // q_and_a) was never translated at all. Routed through getTranslatedStatic
  // here instead — same walk/translate/rehydrate pipeline, just fed
  // already-fetched data instead of fetching by slug.
  const page = await getTranslatedStatic("trade-page", locale, rawPage);

  const [
    lpBannerT,
    costBreakdownT,
    specificationTableT,
    productSpecificationT,
    livePriceChartT,
    staticFaqT,
  ] = await Promise.all([
    getTranslatedStatic("lp-banner", locale, lpBannerContent),
    getTranslatedStatic(
      "cost-breakdown-table",
      locale,
      costBreakdownTableContent,
    ),
    getTranslatedStatic(
      "specification-table",
      locale,
      specificationTableContent,
    ),
    getTranslatedStatic(
      "product-specification",
      locale,
      productSpecificationContent,
    ),
    getTranslatedStatic("live-price-chart", locale, livePriceChartContent),
    // Static-only FAQ copy (not sourced from WP) — kept separate from the
    // WP-derived q_and_a below so that already-translated WP text (part of
    // `page` above) never gets run through Weglot a second time.
    getTranslatedStatic("trade-page-static-faq", locale, {
      sectionTitle: "FAQ",
      applyButtonText: "Apply for Invite code",
      fixedFaqs: {
        q1: "How are Flow Rewards calculated?",
        a1: "Flow Rewards are paid per traded lot (round turn) using instrument specific rates published on the Afterprime website.",
        q2: "Is {sym} eligible for Flow Rewards?",
        a2Xau: "Yes.",
        a2Other: "Yes. {sym} does qualify for Flow Rewards.",
        q3: "How does Afterprime make money?",
        a3: "Afterprime earns from institutional liquidity relationships and volume based arrangements, not from client losses.",
        q4: "How does account approval work?",
        a4: "Applications are reviewed and approved selectively based on trading profile and activity.",
      },
    }),
  ]);

  const flowRewardContent =
    page.acf?.instrument_page_fields?.what_is_flow_rewards_section;
  const rationalData =
    page.acf?.instrument_page_fields?.execution_quality_rational;

  const customFieldFaqRaw = page.acf?.faq_section?.q_and_a;
  const sym = page.slug?.toUpperCase() ?? slug.toUpperCase();

  const faqTranslated = {
    sectionTitle: staticFaqT.sectionTitle,
    applyButtonText: staticFaqT.applyButtonText,
    items: (customFieldFaqRaw || []).map(
      (item: { question?: string; answer?: string }) => ({
        question: item?.question || "",
        answer: item?.answer || "",
      }),
    ),
    fixedFaqs: [
      {
        question: staticFaqT.fixedFaqs.q1,
        answer: staticFaqT.fixedFaqs.a1,
      },
      {
        question: staticFaqT.fixedFaqs.q2.replace("{sym}", sym),
        answer:
          sym === "XAUUSD"
            ? staticFaqT.fixedFaqs.a2Xau
            : staticFaqT.fixedFaqs.a2Other.replace("{sym}", sym),
      },
      {
        question: staticFaqT.fixedFaqs.q3,
        answer: staticFaqT.fixedFaqs.a3,
      },
      {
        question: staticFaqT.fixedFaqs.q4,
        answer: staticFaqT.fixedFaqs.a4,
      },
    ],
  };

  return (
    <>
      <LPBanner
        instrument={page.slug}
        applyButtonText={faqTranslated.applyButtonText}
        content={lpBannerT}
      />

      <section className="compact-section pt-[0.5px]!">
        <div className="ap_container_small">
          {/* THE LIVE CHART SECTION */}
          <div className="bg-dark pt-10 md:pt-15 rounded-xl mb-8">
            <LivePriceChart
              symbol={page.slug.toUpperCase()}
              content={livePriceChartT}
            />
          </div>

          <CostComparison instrument={page.slug.toUpperCase()} />

          <CostCalculator instrument={page.slug.toUpperCase()} />

          <FlowRewardIntro
            content={flowRewardContent}
            rationalData={rationalData}
          />

          <CostBreakdown
            instrument={page.slug.toUpperCase()}
            content={costBreakdownT}
          />

          <ProductSpecification
            instrument={page.slug.toUpperCase()}
            content={productSpecificationT}
            specTableContent={specificationTableT}
          />

          <div className={`mt-10 md:mt-25`}>
            <CtaBlock />
          </div>

          <Faq
            data={faqTranslated.items}
            fixedFaqs={faqTranslated.fixedFaqs}
            faqSubject={faqTranslated.sectionTitle}
            instrument={page.slug}
          />

          <FaqSchema pageSlug={page.slug.toUpperCase()} />

          <BreadcrumbSchema
            items={[
              { name: "Home", href: "/" },
              { name: "Trade", href: "/trade" },
              { name: page.slug.toUpperCase(), href: `/trade/${page.slug}` },
            ]}
          />
        </div>
      </section>
    </>
  );
}
