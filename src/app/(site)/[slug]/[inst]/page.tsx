import { wpFetch } from "@/utils/wpFetch";
import type { WPPage } from "@/types/blocks";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./Page.module.scss";
import getSymbolSinglePageData from "@/lib/getSymbolSinglePageData";
import InstrumentKeyBenifits from "@/components/instrument-key-benifits/InstrumentKeyBenifits";
import { renderSection } from "@/lib/flexibleContentMap";
import FaqCalc from "@/components/faq-calculators/Faq";
import FaqSchema from "@/lib/schema/faqSchema";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import TradingGlossary from "@/components/TradingGlossary/TradingGlossary";
import Author from "@/components/AuthorForInstrumentPage/Author";
import { BottomCta } from "@/components/acfFieldGroups/bottom-cta/BottomCta";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";

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

  const allBrokers = await getBrokerCompareData(inst);
  const getAfterprime = allBrokers?.brokers.find(
    (broker) => broker.broker === "Afterprime",
  );
  const afterprimeCostPerLot = getAfterprime?.costPerLot ?? 0;
  const apRebate = allBrokers?.rebate?.rebate_usd_per_lot ?? 0;
  const netCostPerLot = afterprimeCostPerLot - apRebate;

  return {
    title: `${inst.toUpperCase()} Spreads & Lowest Verified Trading Costs | Afterprime`,
    description: `Trade ${inst.toUpperCase()} at $ ${netCostPerLot}/lot RT. Sub 50ms execution with $0 commission. Compare live ${inst.toUpperCase()} spreads.`,
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

  if (!inst) {
    notFound();
  }

  return (
    <>
      {/* Page Banner */}
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        {/* grain bg effect */}
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

      {/* Page Contents */}
      {pageBuilder && (
        <section className={`compact-section`}>
          <div className="ap_container_small">
            <div className={`${styles.pageEditorContent}`}>
              {pageBuilder.map(renderSection)}
            </div>
          </div>
        </section>
      )}
      {/* Page Contents Ends */}

      {/* Trading Glossary page */}

      <section id="trading-glossaries" className={`compact-section`}>
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
      <FaqSchema pageSlug={inst} />
      {/* FAQ */}

      {/* CTA Global */}
      <BottomCta />
      {/* CTA Global Ends */}

      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: slug.charAt(0).toUpperCase() + slug.slice(1), href: `/${slug}` },
          { name: inst.toUpperCase(), href: `/${slug}/${inst}` },
        ]}
      />

      {/* Page Schema */}
      {pageSchema && (
        <script
          id="page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageSchema,
          }}
        />
      )}
      {/* Page Schema Ends */}
    </>
  );
}

//
// 🔹 Pre-build all static params for ISR
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
