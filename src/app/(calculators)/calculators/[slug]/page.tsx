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
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedPage } from "@/lib/content/getTranslatedPage";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { positionSizeCalculatorContent } from "@/components/all-calculators/PositionSizeCalculator/PositionSizeCalculatorContent";
import { marginCalculatorContent } from "@/components/all-calculators/MarginCalculator/MarginCalculatorContent";
import { profitLossCalculatorContent } from "@/components/all-calculators/ProfitLossCalculator/ProfitLossCalculatorContent";
import { pipValueCalculatorContent } from "@/components/all-calculators/PipValueCalculator/PipValueCalculatorContent";
import { swapCalculatorContent } from "@/components/all-calculators/SwapCalculator/SwapCalculatorContent";
import { currencyConverterContent } from "@/components/all-calculators/CurrencyConverter/CurrencyConverterContent";
import { compoundGrowthCalculatorContent } from "@/components/all-calculators/CompoundGrowthCalculator/CompoundGrowthCalculatorContent";
import { drawdonCalculatorContent } from "@/components/all-calculators/DradownCalculator/DrawdonCalculatorContent";
import { costSavingCalculatorContent } from "@/components/all-calculators/CostSavingCalculator/costSavingCalculatorContent";
import { getCalculatorsContent } from "@/components/all-calculators/TradingCalculator/GetCalculatorsContent";
import { tradingProfitCalculatorContent } from "@/components/trading-calculator/tradingProfitCalculatorContent";

interface PageSlug {
  params: Promise<{ slug: string }>;
}

type CalculatorAcfFields = {
  intro_paragraph?: string;
  page_content?: string;
  select_calculator?: string;
  page_schema?: string;
};

type CalculatorPageJson = {
  title?: { rendered?: string };
  acf?: {
    calculator_page_fields?: CalculatorAcfFields;
    faq_section?: {
      ssection_title?: string;
      q_and_a?: { question?: string; answer?: string }[];
    };
  };
};

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
  const locale = await getRequestLocale();
  const pageData = await getTranslatedPage<CalculatorPageJson>(slug, locale);
  if (!pageData) {
    notFound();
  }

  const breadcrumbT = await getTranslatedStatic("calculator-breadcrumb", locale, {
    home: "Home",
    calculators: "Calculators",
  });

  const acfFields = pageData?.acf;
  const calculatorPageFields = acfFields?.calculator_page_fields;

  const pageTitle = pageData?.title?.rendered;
  const heroParagraph = calculatorPageFields?.intro_paragraph;
  const sectionTitle = acfFields?.faq_section?.ssection_title;
  const faqData = acfFields?.faq_section?.q_and_a;
  const pageFullContent = calculatorPageFields?.page_content;
  const selectCalculator = calculatorPageFields?.select_calculator;

  const pageSchema = calculatorPageFields?.page_schema;

  // Only translate the one calculator content object that will actually
  // render for this page, rather than paying for all 10 Weglot lookups.
  let positionSizeT = positionSizeCalculatorContent;
  let marginT = marginCalculatorContent;
  let profitLossT = profitLossCalculatorContent;
  let pipValueT = pipValueCalculatorContent;
  let swapT = swapCalculatorContent;
  let currencyConverterT = currencyConverterContent;
  let compoundGrowthT = compoundGrowthCalculatorContent;
  let drawdownT = drawdonCalculatorContent;
  let costSavingT = costSavingCalculatorContent;
  let getCalculatorsT = getCalculatorsContent;
  let tradingProfitT = tradingProfitCalculatorContent;

  switch (selectCalculator) {
    case "Position Size Calculator":
      positionSizeT = await getTranslatedStatic(
        "position-size-calculator",
        locale,
        positionSizeCalculatorContent,
      );
      break;
    case "Margin Calculator":
      marginT = await getTranslatedStatic(
        "margin-calculator",
        locale,
        marginCalculatorContent,
      );
      break;
    case "Profit Loss Calculator":
      profitLossT = await getTranslatedStatic(
        "profit-loss-calculator",
        locale,
        profitLossCalculatorContent,
      );
      break;
    case "Pip Value Calculator":
      pipValueT = await getTranslatedStatic(
        "pip-value-calculator",
        locale,
        pipValueCalculatorContent,
      );
      break;
    case "Swap Calculator":
      swapT = await getTranslatedStatic(
        "swap-calculator",
        locale,
        swapCalculatorContent,
      );
      break;
    case "Currency Convertor":
      currencyConverterT = await getTranslatedStatic(
        "currency-converter",
        locale,
        currencyConverterContent,
      );
      break;
    case "Compound Growth Calculator":
      compoundGrowthT = await getTranslatedStatic(
        "compound-growth-calculator",
        locale,
        compoundGrowthCalculatorContent,
      );
      break;
    case "Drawdown Calculator":
      drawdownT = await getTranslatedStatic(
        "drawdown-calculator",
        locale,
        drawdonCalculatorContent,
      );
      break;
    case "Savings Calculator":
      costSavingT = await getTranslatedStatic(
        "cost-saving-calculator",
        locale,
        costSavingCalculatorContent,
      );
      break;
    case "Trading Calculator":
      [getCalculatorsT, tradingProfitT] = await Promise.all([
        getTranslatedStatic(
          "get-calculators-shell",
          locale,
          getCalculatorsContent,
        ),
        getTranslatedStatic(
          "trading-profit-calculator",
          locale,
          tradingProfitCalculatorContent,
        ),
      ]);
      break;
  }

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
            <CompoundGrowthCalculator content={compoundGrowthT} />
          )}
          {selectCalculator === "Drawdown Calculator" && (
            <DrawdownCalculator content={drawdownT} />
          )}
          {selectCalculator === "Currency Convertor" && (
            <CurrencyConverter content={currencyConverterT} />
          )}
          {selectCalculator === "Margin Calculator" && (
            <MarginCalculator content={marginT} />
          )}
          {selectCalculator === "Position Size Calculator" && (
            <PositionSizeCalculator content={positionSizeT} />
          )}
          {selectCalculator === "Profit Loss Calculator" && (
            <ProfitLossCalculator content={profitLossT} />
          )}
          {selectCalculator === "Pip Value Calculator" && (
            <PipValueCalculator content={pipValueT} />
          )}
          {selectCalculator === "Swap Calculator" && (
            <SwapCalculator content={swapT} />
          )}
          {selectCalculator === "Trading Calculator" && (
            <TradingCalculator
              content={getCalculatorsT}
              formContent={tradingProfitT}
            />
          )}
          {selectCalculator === "Savings Calculator" && (
            <DollarSavingsCalculator content={costSavingT} />
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
          { name: breadcrumbT.home, href: "/" },
          { name: breadcrumbT.calculators, href: "/calculators" },
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
