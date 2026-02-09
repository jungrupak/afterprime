import styles from "../Page.module.scss";
import FaqCalc from "@/components/faq-calculators/Faq";
import CompoundGrowthCalculator from "@/components/all-calculators/CompoundGrowthCalculator/CompoundGrowthCalculator";
import DrawdownCalculator from "@/components/all-calculators/DradownCalculator/DrawdonCalculator";
import CurrencyConverter from "@/components/all-calculators/CurrencyConverter/CurrencyConverter";
import { notFound } from "next/navigation";
import MarginCalculator from "@/components/all-calculators/MarginCalculator/MarginCalculator";
import PositionSizeCalculator from "@/components/all-calculators/PositionSizeCalculator/PositionSizeCalculator";
import ProfitLossCalculator from "@/components/all-calculators/ProfitLossCalculator/ProfitLossCalculator";
import PipValueCalculator from "@/components/all-calculators/PipValueCalculator/PipValueCalculator";
import SwapCalculator from "@/components/all-calculators/SwapCalculator/SwapCalculator";
import TradingCalculator from "@/components/all-calculators/TradingCalculator/TradingCalculator";

interface PageSlug {
  params: Promise<{ slug: string }>;
}

//## Function to get data source here
async function pageDataSource(slug: string) {
  try {
    const res = await fetch(
      `${process.env.WORDPRESS_REST_ENDPOINT}/pages?slug=${slug}`,
    );
    if (!res.ok) return {};
    const pageData = await res.json();
    if (!pageData || !pageData.length) return;
    return pageData?.[0];
  } catch (err) {
    console.error("Faild to load data:", err);
  }
}
//##

export async function generateMetadata({ params }: PageSlug) {
  const { slug } = await params;
  const dataSource = await pageDataSource(slug);

  return {
    title: dataSource?.aioseo_head_json?.title,
    description: dataSource?.aioseo_head_json?.description,
    alternates: {
      canonical: `https://afterprime.com/calculators/${slug}`,
    },
  };
}
//##

export default async function Page({ params }: PageSlug) {
  const { slug } = await params;
  const pageData = await pageDataSource(slug);
  if (!pageData) {
    notFound();
  }

  const acfFields = pageData?.acf;
  const calculatorPageFields = acfFields?.calculator_page_fields;

  const pageTitle = pageData?.title.rendered;
  const heroParagraph = calculatorPageFields?.intro_paragraph;
  const sectionTitle = acfFields?.faq_section?.ssection_title;
  const faqData = acfFields?.faq_section?.q_and_a;
  const pageFullContent = calculatorPageFields?.page_content;
  const selectCalculator = calculatorPageFields?.select_calculator;

  const pageSchema = calculatorPageFields?.page_schema;
  const faqSchema =
    faqData && faqData.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqData
            .filter(
              (item: { question?: string; answer?: string }) =>
                item.question && item.answer,
            )
            .map((item: { question?: string; answer?: string }) => ({
              "@type": "Question",
              name: item.question?.replace(/(<([^>]+)>)/gi, ""),
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer?.replace(/(<([^>]+)>)/gi, ""),
              },
            })),
        }
      : null;

  return (
    <>
      {/* Banner Section */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        <div className="grainy_bg"></div>
        <div className="ap_container_small flex items-center h-full">
          <div className="apBannerContent md:max-w-[800px]">
            <h1 className="h1-size mt-10 lg:mt-15">
              <span className="font-[600]">{pageTitle}</span>
            </h1>
            <div
              className="paragraph max-lg:mx-auto lg:mt-8 opacity-80"
              style={{ fontWeight: "300" }}
            >
              {heroParagraph}
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section Ends */}

      {/* Calculator WIdget Section */}
      <section className={`compact-section`}>
        <div className="grainy_bg"></div>
        <div className="ap_container_small flex items-center h-full">
          {selectCalculator === "Compound Growth Calculator" && (
            <CompoundGrowthCalculator />
          )}
          {selectCalculator === "Drawdown Calculator" && <DrawdownCalculator />}
          {selectCalculator === "Currency Convertor" && <CurrencyConverter />}
          {selectCalculator === "Margin Calculator" && <MarginCalculator />}
          {selectCalculator === "Position Size Calculator" && (
            <PositionSizeCalculator />
          )}
          {selectCalculator === "Profit Loss Calculator" && (
            <ProfitLossCalculator />
          )}
          {selectCalculator === "Pip Value Calculator" && (
            <PipValueCalculator />
          )}
          {selectCalculator === "Swap Calculator" && <SwapCalculator />}
          {selectCalculator === "Trading Calculator" && <TradingCalculator />}
        </div>
      </section>
      {/* Calculator WIdget Section */}

      {/* Page Contents */}
      {pageFullContent && (
        <section className={`compact-section`}>
          <div className="grainy_bg"></div>
          <div className="ap_container_small">
            <div
              className={`${styles.pageEditorContent}`}
              dangerouslySetInnerHTML={{ __html: pageFullContent || `&nbsp` }}
            />
          </div>
        </section>
      )}

      {/* Page Contents Ends */}

      {/* FAQ FROM CMS */}
      {faqData && <FaqCalc faqSubject={sectionTitle} data={faqData} />}
      {/* FAQ FROM CMS ENDS */}
      {/* FAQ schema */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      {/* //render data comparison schema */}
      {pageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSchema),
          }}
        />
      )}
    </>
  );
}
