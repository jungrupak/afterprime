import InnerBanner from "@/components/blocks/inner-banner/InnerBanner";
import styles from "./Page.module.scss";
import { notFound } from "next/navigation";
import CostComparison from "./comparison/CostComparison";
import { vsCostComparisonContent } from "./comparison/vsCostComparisonContent";
import FaqCalc from "@/components/faq-calculators/Faq";
import Button from "@/components/ui/Button";
import ImpactCards from "./impact-cards/ImpactCards";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getTranslatedMetadata } from "@/lib/seo/metadata";
import { vsPageContent } from "./vsPageContent";
import WebtraderPlatform from "@/components/blocks/webtrader-platform/WebtraderPlatform";
import SignupFlow from "@/components/blocks/signup-flow/SignupFlow";
import CompareMT4MT5 from "@/components/blocks/mt4-vs-mt5/CompareBoth";
import BulletTickBlue from "@/components/ui/BulletTickBlue";

export async function generateMetadata() {
  const locale = await getRequestLocale();
  return getTranslatedMetadata("vs", locale);
}

/* ----------------------------- */
/* Types                         */
/* ----------------------------- */

type CostApiResponse = {
  secondBestVsAfterprimePct: number;
  top10VsAfterprimeAvgPct: number;
  industryVsAfterprimeAvgPct: number;
  lastUpdated?: string;
};

type VsPageJson = {
  acf?: {
    field_group?: {
      hero_banner_title?: string;
      hero_banner_paragraph?: string;
      intro_paragraph?: string;
      page_content?: string;
    };
    cta_block?: {
      title?: string;
      paragraph?: string;
      button_url?: string;
      button_text?: string;
    };
    faq_section?: {
      q_and_a?: { question?: string; answer?: string }[];
    };
  };
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
    return null;
  }
};

/* ----------------------------- */
/* Page Component                */
/* ----------------------------- */

export default async function Page() {
  const locale = await getRequestLocale();

  const [pageData, apiResponse, vsT, costCompT] = await Promise.all([
    getTranslatedPage<VsPageJson>("vs", locale),
    fetchCostData(),
    getTranslatedStatic("vs-page", locale, vsPageContent),
    getTranslatedStatic("vs-cost-comparison", locale, vsCostComparisonContent),
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

  const FAQ_DATA = pageData?.acf?.faq_section?.q_and_a;

  const lastUpdated =
    apiResponse?.lastUpdated ??
    new Date().toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <>
      <InnerBanner
        inner_banner_title={bannerHeading}
        inner_banner_paragraph={bannerSubheading}
      />
      <section
        className={`${styles.sectionIntroBlockGeneric} py-[clamp(40px_,10vw_,60px)]! compact-section`}
      >
        <div className="ap_container_small">
          <div className={styles.sectionIntroContents}>
            <div className="max-md:order-2 max-md:text-left">
              <p
                className={`font-size-heading-sm mb-4 md:mb-0 opacity-80 font-semibold`}
              >
                {introParagraph}
              </p>
            </div>

            <div className="max-md:order-1 text-left">
              <div className={styles.listUi}>
                <h3 className="cardTitle mb-8!">{vsT.keyAdvantagesHeading}</h3>

                <ul>
                  <li>
                    <BulletTickBlue />
                    {formatPercentage(vsTopTen)}
                    {vsT.lowerCostVsTop10}
                  </li>
                  <li>
                    <BulletTickBlue />
                    {formatPercentage(vsIndustryAvg)}
                    {vsT.lowerCostVsIndustry}
                  </li>
                  <li>
                    <BulletTickBlue />
                    {formatPercentage(vsSecondBest)}
                    {vsT.lowerCostVsNextBest}
                  </li>

                  <li>
                    <BulletTickBlue />
                    {vsT.zeroCommission}
                  </li>
                  <li>
                    <BulletTickBlue />
                    {vsT.flowRewards}
                  </li>
                </ul>

                <small className="reading-text-caption opacity-40 mt-5 block">
                  {vsT.costDataSuffix} {lastUpdated}
                </small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`py-[clamp(40px_,10vw_,60px)]! compact-section`}>
        <div className="ap_container_small">
          <CostComparison locale={locale} content={costCompT} />
        </div>
      </section>
      {pageContent && (
        <section className={`compact-section`}>
          <div className="ap_container_small">
            <div
              className={`cmsTextEditorContent`}
              dangerouslySetInnerHTML={{ __html: pageContent || `&nbsp` }}
            />
          </div>
        </section>
      )}

      <ImpactCards />

      <section className={`compact-section`}>
        <div className="ap_container_small">
          <div
            className={`${styles.bottomCta} flex flex-col justify-center items-center text-center`}
          >
            <div>
              <h2
                className={`text-[length:var(--heading-lg)]! md:mb-8! leading-[1]`}
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

      <FaqCalc faqSubject={vsT.faqLabel} data={FAQ_DATA ?? []} />
    </>
  );
}
