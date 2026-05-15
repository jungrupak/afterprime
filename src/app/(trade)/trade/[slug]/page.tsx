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

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ... generateStaticParams and generateMetadata stay exactly the same ...

export default async function TradeSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getTradePageData({ params });

  if (!page) {
    notFound();
  }

  const flowRewardContent = page.acf?.instrument_page_fields?.what_is_flow_rewards_section;
  const rationalData = page.acf?.instrument_page_fields?.execution_quality_rational;
  const customFieldFaqBlock = page.acf?.faq_section?.q_and_a;

  return (
    <>
      <LPBanner instrument={page.slug} />

      <section className="compact-section pt-[0.5px]!">
        <div className="ap_container_small">

          {/* THE LIVE CHART SECTION */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
             <LivePriceChart symbol={page.slug.toUpperCase()} />
          </div>

          <CostComparison instrument={page.slug.toUpperCase()} />

          <CostCalculator instrument={page.slug.toUpperCase()} />

          <FlowRewardIntro
            content={flowRewardContent}
            rationalData={rationalData}
          />

          <CostBreakdown instrument={page.slug.toUpperCase()} />

          <CtaBlock />

          <ProductSpecification instrument={page.slug.toUpperCase()} />

          <Faq
            data={customFieldFaqBlock}
            faqSubject="FAQ"
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
