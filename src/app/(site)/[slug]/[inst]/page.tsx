import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./Page.module.scss";
import getSymbolSinglePageData from "@/lib/getSymbolSinglePageData";
import CostComparison from "@/components/instrument-lps/cost-comparison/CostComparison";
import InstrumentKeyBenifits from "@/components/instrument-key-benifits/InstrumentKeyBenifits";
import { renderSection } from "@/lib/flexibleContentMap";
import Script from "next/script";
import Cta from "@/components/instrument-lps/cta/Cta";
import FaqCalc from "@/components/faq-calculators/Faq";
import TradingGlossary from "@/components/TradingGlossary/TradingGlossary";
import Author from "@/components/AuthorForInstrumentPage/Author";
import DollarSavingsCalculator from "@/components/all-calculators/CostSavingCalculator/CostSavingCalculator";
import CostSavingsCalculatorInstrument from "@/components/all-calculators/CostSavingCalculatorPerInstrument/CostSavingCalculator";

// ISR
export const revalidate = 60;

type Props = {
  params: Promise<{
    slug: string; //this is domain.com/dynamic page slug i.e [slug]
    inst: string; //remember this is name of child dynamic folder i.e [child]
  }>;
};

//
// 🔹 Metadata
//
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { inst } = await params;
  return {
    title: `${inst.toUpperCase()} Forex Pair Overview and Trading with Afterprime`,
    description: `See how the ${inst.toUpperCase()} forex pair moves, what drives its price and how Afterprime supports ${inst.toUpperCase()} trading with low costs, deep liquidity and pro tools.`,
    alternates: {
      canonical: `https://afterprime.com/forex/${inst}`,
    },
  };
}

//
// 🔹 Page Component
//
export default async function ChildPage({ params }: Props) {
  const { slug, inst } = await params;

  const parentRes = await wpFetch<WPPage[]>(`/pages?slug=${slug}&_fields=id`); //this asks domain/forex as [slug] page id.
  const getParentId = parentRes?.[0];
  const data = await getSymbolSinglePageData(inst, String(getParentId?.id));
  //console.log("data", data);
  if (!data) notFound();

  // Validate parent relationship
  if (!data.parent) notFound();

  const parent = await wpFetch<WPPage>(`/pages/${data.parent}?_fields=slug`); // this line is asking parent ID's slug

  if (!parent || parent.slug !== slug) {
    notFound();
  }

  //Get CUstom Fields
  const getFields = data?.acf?.instrument_single_page_fields;
  const pageSchema = getFields?.page_schema;

  //get Flexible ACF content here
  const pageBuilder = data?.acf?.instrument_single_page_fields?.page_builder;
  //Faq data
  const faqData = data?.acf?.faq_section?.q_and_a;
  const faqSectionTitle = data?.acf?.faq_section?.ssection_title;
  //Glossary Data
  const glossaryData =
    data?.acf?.instrument_single_page_fields?.glossary_content_block;
  //FAQ schema##
  const faqSchema =
    faqData && faqData.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqData
            .filter(
              (item: { question: string; answer: string }) =>
                item.question && item.answer,
            )
            .map((item: { question: string; answer: string }) => ({
              "@type": "Question",
              name: item.question.replace(/(<([^>]+)>)/gi, ""),
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer.replace(/(<([^>]+)>)/gi, ""),
              },
            })),
        }
      : null;

  // Ends FAQ schema
  //  console.log("faq schema", faqSchema);

  if (!inst) {
    notFound();
  }

  return (
    <>
      {/* Page Bannder */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small flex items-center h-full">
          <div className={`apBannerContent`}>
            <h1 className="h1-size mt-10 lg:mt-15">
              <span className="font-[600]">{data?.title.rendered}</span>
            </h1>
            <p>{getFields.hero_paragraph_one ?? ""}</p>
          </div>
        </div>
      </section>
      {/* Page Bannder Ends */}

      {/* Key Advantages */}
      <section
        className={`${styles.sectionIntroBlockGeneric} py-[clamp(40px_,10vw_,60px)]!`}
      >
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small">
          <div className={`${styles.sectionIntroContents}`}>
            <div className={`max-md:order-2 max-md:text-left`}>
              <p>{getFields.hero_paragraph_two ?? ""}</p>
            </div>
            <div className={`max-md:order-1 text-left`}>
              <InstrumentKeyBenifits instrument={inst} />
            </div>
          </div>
        </div>
      </section>
      {/* Key Advantages */}

      {/* Cost Comparision */}
      <CostComparison instrument={inst} />
      {/* Cost Comparision */}

      {/* Page Contents */}
      {pageBuilder && (
        <section className={`compact-section`}>
          <div className="grainy_bg"></div>
          <div className="ap_container_small">
            {/* Cost Saving Calculator */}
            <CostSavingsCalculatorInstrument instrument={inst} />
            {/* Cost Saving Calculator Ends */}

            <div className={`${styles.pageEditorContent}`}>
              {pageBuilder.map(renderSection)}
            </div>
          </div>
        </section>
      )}
      {/* Page Contents Ends */}

      {/* Trading Glossary page */}

      <section className={`compact-section`}>
        <div className="grainy_bg"></div>
        <div className="ap_container_small">
          {glossaryData && (
            <>
              <h2 className={`mb-5! md:mb-8!`}>
                {inst.toUpperCase()} Trading Glossary
              </h2>
              <TradingGlossary
                glossaryBlockData={glossaryData}
                instrument={inst}
              />
            </>
          )}
          {/* AUthor */}
          <div className={`mt-5 md:mt-8`}>
            <Author />
          </div>
          {/* AUthor Ends */}
        </div>
      </section>
      {/* Trading Glossary page Eds */}

      {/* FAQ */}
      <FaqCalc faqSubject={faqSectionTitle} data={faqData} />
      {/* FAQ */}

      {/* CTA Global */}
      <Cta />
      {/* CTA Global Ends */}

      {/* Page Schema */}
      {pageSchema && (
        <Script
          id="page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(pageSchema),
          }}
        />
      )}
      {/* Page Schema Ends */}
      {/* FAQ schema */}
      {faqSchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
      {/* FAQ schema ends */}
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
