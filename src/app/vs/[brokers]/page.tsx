import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import styles from "./Page.module.scss";
import { notFound } from "next/navigation";
import { getPageDataBySlug } from "@/data/getPageDataBySlug";
import CostComparisonWithSelected from "./compare-ap-with-selected/CostComparison";
import CompareWithMajors from "./compare-with-majors/CostComparison";
import Button from "@/components/ui/Button";
import TypeformButton from "@/components/ui/typeForm";
import FaqCalc from "@/components/faq-calculators/Faq";
import { getSavingCompare } from "@/lib/getSavingCompare";

// ISR
export const revalidate = 60;

type Props = {
  params: Promise<{
    brokers: string;
  }>;
};

//
// 🔹 Metadata
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
  "top-10-avg": "Top 10 Avg",
  "industry-avg": "Industry Avg",
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { brokers } = await params;
  const renderPage = await getPageDataBySlug(brokers);
  const pageTitle = renderPage?.title?.rendered;
  const pageAiseo = renderPage?.aioseo_head_json;
  const year = new Date().getFullYear();

  // ## get brokers data
  const savingCompares = await getSavingCompare();
  const mappedBrokerName = brokerSlugMap[brokers as keyof typeof brokerSlugMap];
  const currentPageBroker = savingCompares?.brokers?.find(
    (item) => item.broker === mappedBrokerName,
  );
  const findAfterprime = savingCompares?.brokers?.find(
    (item) => item.broker === "Afterprime",
  );
  const brokerSavingPcnt = currentPageBroker?.savingPercentage.toFixed(1) ?? 0;
  console.log("what broker", findAfterprime);
  // ## Ends

  return {
    title: `Afterprime vs ${pageTitle} - Lowest Verified Cost Comparison ${year}
`,
    description: `Save ${brokerSavingPcnt}% vs ${pageTitle} trading costs. Verified average cost all pairs $${findAfterprime?.costPerLot}/lot vs ${pageTitle}’s $${currentPageBroker?.costPerLot}. See the total cost breakdown.`,
    alternates: {
      canonical: `https://afterprime.com/vs/${brokers}`,
    },

    authors: [{ name: "Afterprime", url: "https://afterprime.com" }],

    creator: "Afterprime",
    publisher: "Afterprime",

    openGraph: {
      title: pageAiseo?.["og:title"] ?? "Afterprime",

      description:
        pageAiseo?.["og:description"] ??
        "Forex broker with lowest costs, A-Book forex broker, Get paid to trade",

      url: `https://afterprime.com/vs/${brokers}`,
      siteName: pageAiseo?.["og:site_name"] ?? "afterprime.com",
      type: pageAiseo?.["og:type"] ?? "website",
      images: [
        {
          url:
            pageAiseo?.["og:image"] ??
            "https://cdn.afterprime.com/images/og_image_afterprime.jpg",
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
      card: pageAiseo?.["twitter:card"] ?? "summary_large_image",
      title: pageAiseo?.["twitter:title"] ?? "Afterprime",
      description:
        pageAiseo?.["twitter:description"] ??
        "Forex broker with Flow Rewards program, Forex broker with institutional-grade execution",

      images: [
        pageAiseo?.["twitter:image"] ??
          "https://cdn.afterprime.com/images/og_image_afterprime.jpg",
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
// 🔹 Page Component
//
export default async function ChildPage({ params }: Props) {
  const { brokers } = await params;
  if (!brokers) return;
  const pageData = await getPageDataBySlug(brokers);
  if (!pageData) {
    notFound();
  }
  const pageTitle = pageData?.title?.rendered || brokers;
  const ctaBlockFields = pageData?.acf?.cta_block;
  const heroBanner = pageData?.acf?.hero_banner_home;
  const content = pageData?.acf?.reading_text_content;
  const faqData = pageData?.acf?.faq_section?.q_and_a;
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

            {heroBanner &&
              (heroBanner?.is_type_form_cta === true ? (
                <div className={`mt-8 md:mt-15`}>
                  <TypeformButton buttonText="Apply to Trade" size="Large" />
                </div>
              ) : (
                <div className={`mt-8 md:mt-15`}>
                  <Button
                    href={heroBanner?.banner_btn_url}
                    varient="primary"
                    size="regular"
                    isArrowVisible={true}
                  >
                    {heroBanner?.banner_btn_text}
                  </Button>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* Inner Banner Ends */}

      {/* Trading Cost Breakdown */}
      <section className={`compact-section`}>
        <div className="ap_container_small">
          <h2 className={`leading-[1.2]`}>Total Trading Cost Breakdown</h2>
          <CostComparisonWithSelected selectedBrokerSlug={brokers} />
        </div>
      </section>
      {/* Trading Cost Breakdown Ends */}

      {/* Trading Cost Breakdown */}
      <section className={`compact-section`}>
        <div className="ap_container_small">
          <h2 className={`leading-[1.2]`}>Trading Cost by Forex Major</h2>
          <CompareWithMajors broker={brokers} />
        </div>
      </section>
      {/* Trading Cost Breakdown Ends */}

      {/* Dynamic Content Area */}
      <section className={`compact-section`}>
        <div className="ap_container_small">
          {/*  */}
          <div className={`${styles.pageEditorContent}`}>
            <h2 className={`mt-0!`}>Spreads - The Invisible Variable</h2>

            <p>
              The spread is the primary cost of entry for any trader, but it is
              rarely static. Most brokers quote "typical" spreads that fluctuate
              wildly during high volatility or low liquidity periods (like the
              New York/London crossover or market open).
            </p>

            <ul>
              <li>
                <b>The "Raw" Reality</b>
                <br />
                Many brokers claim "$0.0 spreads," but the frequency of those
                spreads actually being available to fill your order is the true
                metric of quality.
              </li>
              <li>
                <b>The Afterprime Edge</b>
                <br />
                We focus on spread stability. By curating our flow, we reduce
                the "noise" and "gapping" that often occurs with retail-heavy
                brokers, ensuring that the price you see is the price you get,
                under normal market conditions.
              </li>
            </ul>

            <h2 className={`mt-0!`}>
              Cost Per Lot Impact - More Than Just Commission
            </h2>

            <p>
              Traders often make the mistake of looking at commission in
              isolation. A low commission is meaningless if it’s paired with
              wide spreads or poor execution (slippage).
            </p>

            <p>
              <b>The Total Cost Per Lot formula is:</b> (Spread in Pips x Pip
              Value) + Round Turn Commission = <b>Total Cost</b>
            </p>

            <ul>
              <li>
                <b>The Slippage Factor</b>
                <br />
                If a broker has "cheap" costs but slips your entry by 0.2 pips,
                that is an extra $2.00 per lot added to your cost that doesn't
                show up on their pricing page. This is an industry-wide dynamic
                and does not constitute a specific claim regarding {pageTitle}'s
                execution quality.
              </li>

              <li>
                <b>Cumulative Friction</b>
                <br />
                For a high-frequency trader or someone moving 1,000 lots a
                month, a mere $2.00 difference in total cost per lot is the
                difference between a $2,000 profit and a $2,000 loss.
              </li>
            </ul>

            <h2 className={`mt-0!`}>How it Affects Total Cost Calculation</h2>

            <p>
              When we calculate the comparison between Afterprime and other
              brokers, we don't just look at a snapshot. We aggregate data
              across different market sessions to provide a "Net Cost" profile.
            </p>

            <ul>
              <li>
                <b>Volume Weighting</b>
                <br />
                We analyze how costs scale. As your volume increases, the impact
                of "Flow Rewards<sup>TM</sup> becomes the deciding factor. While
                other brokers keep your commission static regardless of your
                contribution to the ecosystem, we believe in rewarding "clean"
                flow.
              </li>
              <li>
                <b>
                  The Logic of "Flow Rewards<sup>TM</sup>"
                </b>
                <br />
                Unlike traditional "cashback" models which are often just
                rebates of marked-up spreads, Flow Rewards<sup>TM</sup> are a
                direct reflection of the value your trading flow brings to our
                liquidity providers.
              </li>
              <li>
                <b>Insight</b>
                <br />
                By reducing the "toxic" flow (latency arbitrage, etc.) through
                our invite-only model, our Liquidity Providers (LPs) can offer
                us tighter pricing. We simply pass those savings directly back
                to you.
              </li>
            </ul>

            <div dangerouslySetInnerHTML={{ __html: content ?? "" }} />
            {/* ## */}
          </div>
        </div>
      </section>
      {/* Dynamic Content Area Ends */}

      {/* FAQs */}
      <FaqCalc faqSubject="FAQ." data={faqData} />
      {/* FAQs Ends */}

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
              <TypeformButton buttonText="Get Invite Code" size="Regular" />
            </div>
          </div>
        </div>
      </section>
      {/* CTA Ends */}
    </>
  );
}

//
// 🔹 Pre-build all static params for ISR
export async function generateStaticParams() {
  const pages = await wpFetch<WPPage[]>(`/pages?_fields=id,slug,parent`);
  if (!pages) return [];

  const parents = pages.filter((p) => p.parent === 0);
  const parentMap = Object.fromEntries(parents.map((p) => [p.id, p.slug]));

  return pages
    .filter((p) => p.parent !== 0 && parentMap[p.parent])
    .map((p) => ({
      slug: parentMap[p.parent],
      inst: p.slug,
    }));
}
