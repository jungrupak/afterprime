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
import DollarSavingsCalculator from "@/components/all-calculators/CostSavingCalculator/CostSavingCalculator";
import { CustomMetadata } from "@/utils/CustomMetadata";
import Script from "next/script";
import FaqSchema from "@/lib/schema/faqSchema";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";

interface PageSlug {
  params: Promise<{ slug: string }>;
}

//## Function to get data source here
async function pageDataSource(slug: string) {
  const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;
  try {
    const res = await fetch(`${baseUrl}/wp-json/wp/v2/pages?slug=${slug}`);
    if (!res.ok) return {};
    const pageData = await res.json();
    if (!pageData || !pageData.length) return;
    return pageData?.[0];
  } catch (err) {
    console.error("Faild to load data:", err);
  }
}
//##

export async function generateStaticParams() {
  const baseUrl = process.env.NEXT_PUBLIC_WP_BASE_URL;
  if (!baseUrl) return [];
  try {
    const parentRes = await fetch(
      `${baseUrl}/wp-json/wp/v2/pages?slug=calculators&_fields=id`,
      { next: { revalidate: 86400 } },
    );
    if (!parentRes.ok) return [];
    const [parent]: { id: number }[] = await parentRes.json();
    if (!parent?.id) return [];
    const res = await fetch(
      `${baseUrl}/wp-json/wp/v2/pages?parent=${parent.id}&_fields=slug&per_page=100`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return [];
    const pages: { slug: string }[] = await res.json();
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageSlug) {
  const { slug } = await params;
  const seoData = await CustomMetadata(slug);
  return seoData;
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

  return (
    <>
      {/* Banner Section */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
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
          {selectCalculator === "Savings Calculator" && (
            <DollarSavingsCalculator />
          )}
        </div>
      </section>
      {/* Calculator WIdget Section */}

      {/* Page Contents */}
      {pageFullContent && (
        <section className={`compact-section`}>
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
      <FaqSchema pageSlug={slug} />
      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Calculators", href: "/calculators" },
          { name: pageTitle ?? slug, href: `/calculators/${slug}` },
        ]}
      />
      {/* FAQ FROM CMS ENDS */}

      {/* //render data comparison schema */}
      {pageSchema && (
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageSchema,
          }}
        />
      )}
    </>
  );
}
