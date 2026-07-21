import { notFound } from "next/navigation";
import type { Metadata } from "next";
import styles from "@/app/(site)/[slug]/[inst]/Page.module.scss";
import InstrumentKeyBenifits from "@/components/instrument-key-benifits/InstrumentKeyBenifits";
import { renderSection } from "@/lib/flexibleContentMap";
import FaqCalc from "@/components/faq-calculators/Faq";
import FaqSchema from "@/lib/schema/faqSchema";
import BreadcrumbSchema from "@/lib/schema/breadcrumbSchema";
import TradingGlossary from "@/components/TradingGlossary/TradingGlossary";
import Author from "@/components/AuthorForInstrumentPage/Author";
import { BottomCta } from "@/components/acfFieldGroups/bottom-cta/BottomCta";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import type { WPPage } from "@/types/blocks";
import Link from "@/components/ui/Link";
import LivePriceChart from "@/components/charts/LivePriceChart";

export const revalidate = 60;

const FOREX_PARENT_ID = 688;

async function getForexPageData(slug: string): Promise<WPPage | undefined> {
  const restEndpoint = process.env.WORDPRESS_REST_ENDPOINT;
  if (!restEndpoint) return undefined;
  try {
    const res = await fetch(
      `${restEndpoint}/pages?slug=${slug}&parent=${FOREX_PARENT_ID}&_fields=id,slug,parent,title,acf`,
      { next: { revalidate: 60 } },
    );
    if (!res.ok) return undefined;
    const pages: WPPage[] = await res.json();
    return pages?.[0];
  } catch {
    return undefined;
  }
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const restEndpoint = process.env.WORDPRESS_REST_ENDPOINT;
  if (!restEndpoint) return [];
  try {
    const res = await fetch(
      `${restEndpoint}/pages?parent=688&_fields=slug&per_page=100`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return [];
    const pages: { slug: string }[] = await res.json();
    return pages.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const allBrokers = await getBrokerCompareData(slug);
  const getAfterprime = allBrokers?.brokers.find(
    (broker) => broker.broker === "Afterprime",
  );
  const afterprimeCostPerLot = getAfterprime?.costPerLot ?? 0;
  const apRebate = allBrokers?.rebate?.rebate_usd_per_lot ?? 0;
  const netCostPerLot = afterprimeCostPerLot - apRebate;

  return {
    title: `${slug.toUpperCase()} Spreads & Lowest Verified Trading Costs | Afterprime`,
    description: `Trade ${slug.toUpperCase()} at ${netCostPerLot}/lot RT. Sub 50ms execution with $0 commission. Compare live ${slug.toUpperCase()} spreads.`,
    alternates: {
      canonical: `https://afterprime.com/forex/${slug.toLowerCase()}`,
    },
  };
}

export default async function ForexSlugPage({ params }: Props) {
  const { slug } = await params;

  const data = await getForexPageData(slug);

  if (!data) notFound();

  const getFields = data?.acf?.instrument_single_page_fields;
  const pageSchema = getFields?.page_schema;
  const pageBuilder = data?.acf?.instrument_single_page_fields?.page_builder;
  const faqData = data?.acf?.faq_section?.q_and_a;
  const faqSectionTitle = data?.acf?.faq_section?.ssection_title;
  const glossaryData =
    data?.acf?.instrument_single_page_fields?.glossary_content_block;

  return (
    <>
      <section
        className={`${styles.innerBannerSection} h-auto! innerpage-banner`}
      >
        <div className="ap_container_small flex items-center h-full">
          <div className={`apBannerContent`}>
            <h1 className="h1-size mt-10 lg:mt-15">
              <span className="font-[600]">{data?.title.rendered}</span>
            </h1>
            <p>{getFields?.hero_paragraph_one ?? ""}</p>
          </div>
        </div>
      </section>

      <section
        className={`${styles.sectionIntroBlockGeneric} py-[clamp(40px_,10vw_,60px)]!`}
      >
        <div className="ap_container_small">
          <div className={`${styles.sectionIntroContents}`}>
            <div className={`max-md:order-2 max-md:text-left`}>
              <p>{getFields?.hero_paragraph_two ?? ""}</p>
            </div>
            <div className={`max-md:order-1 text-left`}>
              <InstrumentKeyBenifits instrument={slug} />
            </div>
          </div>
        </div>
      </section>

      {pageBuilder && (
        <section className={`compact-section`}>
          <div className="ap_container_small">
            <div className="bg-dark rounded-xl mb-8">
              <LivePriceChart symbol={slug.toUpperCase()} />
            </div>

            <div className={`${styles.pageEditorContent}`}>
              {pageBuilder.map((section, index) =>
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderSection(section as any, index),
              )}
            </div>
          </div>
        </section>
      )}

      <section id="trading-glossaries" className={`compact-section`}>
        <div className="ap_container_small">
          {glossaryData && (
            <>
              <h2 className={`mb-5! md:mb-8!`}>
                {slug.toUpperCase()} Trading Glossary
              </h2>
              <TradingGlossary
                glossaryBlockData={glossaryData}
                instrument={slug}
              />
            </>
          )}
          <div className={`mt-5 md:mt-8`}>
            <Author />
          </div>

          <div className="flex flex-wrap gap-3 mt-5 md:mt-10">
            <Link
              href={`/trade/${slug.toLowerCase()}`}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              Trade {slug.toUpperCase()}
              {""} →
            </Link>

            <Link
              href={`/trading-hours/${slug.toLowerCase()}`}
              className="rounded-full px-5 py-2 text-sm border transition-opacity hover:opacity-100 opacity-70"
              style={{ borderColor: "rgba(255,255,255,0.15)" }}
            >
              {slug.toUpperCase()} trading hours {""}→
            </Link>
          </div>
        </div>
      </section>

      <FaqCalc faqSubject={faqSectionTitle} data={faqData ?? []} />
      <FaqSchema pageSlug={slug} />

      <BottomCta />

      <BreadcrumbSchema
        items={[
          { name: "Home", href: "/" },
          { name: "Forex", href: "/forex" },
          { name: slug.toUpperCase(), href: `/forex/${slug}` },
        ]}
      />

      {pageSchema && (
        <script
          id="page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: pageSchema,
          }}
        />
      )}
    </>
  );
}
