import InnerBanner from "@/components/blocks/inner-banner/InnerBanner";
import styles from "./Page.module.scss";
import { Metadata } from "next";
import { getPageDataBySlug } from "@/data/getPageDataBySlug";
import { notFound } from "next/navigation";
import CostComparison from "./comparison/CostComparison";
import FaqCalc from "@/components/faq-calculators/Faq";
import Button from "@/components/ui/Button";
import ImpactCards from "./impact-cards/ImpactCards";

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await getPageDataBySlug("vs");
  if (!pageData) {
    return {
      title: "No Title Found",
      description: "No description Found",
    };
  }
  const aiseoField = pageData?.aioseo_head_json;
  if (!aiseoField)
    return {
      title: "No title field for aiseo",
      description: "No description field for aiseo",
    };

  const metaTitle = aiseoField?.title;
  const metaDescription = aiseoField?.description;
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: "https://afterprime.com/vs",
    },
  };
}

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */

type CostApiResponse = {
  secondBestVsAfterprimePct: number;
  top10VsAfterprimeAvgPct: number;
  industryVsAfterprimeAvgPct: number;
  lastUpdated?: string; // optional if API provides it
};

/* ----------------------------- */
/* Utilities                     */
/* ----------------------------- */

const formatPercentage = (value?: number): string => {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return "0.0";
  }
  return value.toFixed(1);
};

/* ----------------------------- */
/* API Fetcher                   */
/* ----------------------------- */

const fetchCostData = async (): Promise<CostApiResponse | null> => {
  try {
    const res = await fetch("https://feed.afterprime.com/api/costs", {
      next: { revalidate: 2400 },
    });

    if (!res.ok) {
      throw new Error(`Cost API error: ${res.status}`);
    }

    const data = (await res.json()) as CostApiResponse;

    return data;
  } catch (error) {
    console.error("Failed to fetch cost data:", error);
    return null; // fail gracefully
  }
};

/* ----------------------------- */
/* Page Component                */
/* ----------------------------- */

export default async function Page() {
  // Parallel fetching (performance optimized)
  const [pageData, apiResponse] = await Promise.all([
    getPageDataBySlug("vs"),
    fetchCostData(),
  ]);

  if (!pageData) {
    notFound();
  }

  const customFields = pageData?.acf?.field_group;

  const bannerHeading = customFields?.hero_banner_title ?? "";
  const bannerSubheading = customFields?.hero_banner_paragraph ?? "";
  const introParagraph = customFields?.intro_paragraph ?? "";
  const pageContent = customFields?.page_content ?? "";

  const vsSecondBest = apiResponse?.secondBestVsAfterprimePct;
  const vsTopTen = apiResponse?.top10VsAfterprimeAvgPct;
  const vsIndustryAvg = apiResponse?.industryVsAfterprimeAvgPct;

  const ctaBlockFields = pageData?.acf?.cta_block;

  //FAQ Data
  const FAQ_DATA = pageData?.acf?.faq_section?.q_and_a;

  const lastUpdated =
    apiResponse?.lastUpdated ??
    new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      {/* Inner Banner */}
      <InnerBanner
        inner_banner_title={bannerHeading}
        inner_banner_paragraph={bannerSubheading}
      />
      {/* Intro Block */}
      <section
        className={`${styles.sectionIntroBlockGeneric} py-[clamp(40px_,10vw_,60px)]!`}
      >
        <div className="grainy_bg"></div>

        <div className="ap_container_small">
          <div className={styles.sectionIntroContents}>
            <div className="max-md:order-2 max-md:text-left">
              <p>{introParagraph}</p>
            </div>

            <div className="max-md:order-1 text-left">
              <div className={styles.listUi}>
                <h3 className="text-[clamp(28px_,5vw_,34px)]! font-semibold! mb-5! md:mb-10!">
                  Key advantages
                </h3>

                <ul>
                  <li>
                    {formatPercentage(vsTopTen)}% Lower Cost vs Top 10 Brokers
                  </li>
                  <li>
                    {formatPercentage(vsIndustryAvg)}% Lower Cost vs Industry Avg.
                  </li>
                  <li>
                    {formatPercentage(vsSecondBest)}% Lower Cost vs Next Best Broker
                  </li>

                  <li>Zero commission on all instruments</li>
                  <li>Flow Rewards up to $3/lot (round turn)</li>
                </ul>

                <small className="mt-5 block opacity-65">
                  All cost data from ForexBenchmark.com, 7-day rolling average.
                  Last updated: {lastUpdated}
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Intro Block ends */}
      {/* Comparison Directory */}
      <section className={`py-[clamp(40px_,10vw_,60px)]!`}>
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          <CostComparison />
        </div>
      </section>
      {/* Comparison Directory Ends */}
      {/* Contents */}
      {pageContent && (
        <section className={`compact-section`}>
          <div className="grainy_bg"></div>
          <div className="ap_container_small">
            <div
              className={`${styles.pageEditorContent}`}
              dangerouslySetInnerHTML={{ __html: pageContent || `&nbsp` }}
            />
          </div>
        </section>
      )}
      {/* Contents */}

      {/* Impact Cards */}
      <ImpactCards />
      {/* Impact Cards Ends */}

      {/* CTA */}
      <section className={`compact-section`}>
        <div className="grainy_bg"></div>
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
              <Button
                varient="primary"
                size="regular"
                href={ctaBlockFields?.button_url}
              >
                {ctaBlockFields?.button_text}
              </Button>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Ends */}

      {/* FAQ Block */}
      <FaqCalc faqSubject="FAQ" data={FAQ_DATA} />
      {/* FAQ Block Ends */}
    </>
  );
}
