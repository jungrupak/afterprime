import LPBanner from "@/components/instrument-lps/lp-bannner/LpBanner";
import { getTradePageData } from "@/lib/getTradePageData";
import { notFound } from "next/navigation"; //This needs to render custom 404 page created in this specific instance
import CostComparison from "@/components/instrument-lps/cost-comparison/CostComparison";
import GoogleReview from "@/components/google-review/GoogleReview";
import CostBreakdown from "@/components/instrument-lps/cost-brakdown/CostBreakdown";
import FlowRewardIntro from "@/components/instrument-lps/what-is-flow-reward/FlowRewardIntro";
import CostCalculator from "@/components/instrument-lps/cost-calculator/CostCalculator";
import ProductSpecification from "@/components/instrument-lps/product-specification/ProductSpecification";
import Faq from "@/components/instrument-lps/faq/Faq";
import Cta from "@/components/instrument-lps/cta/Cta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TradeSlugPage({ params }: PageProps) {
  const page = await getTradePageData({ params });
  if (!page) {
    notFound();
  }

  const heroBullets = page.acf?.instrument_page_fields?.hero_bullet_lists;
  const heroPartialText =
    page.acf?.instrument_page_fields?.hero_partial_title || undefined;

  const costBreakDownListData =
    page.acf?.instrument_page_fields?.all_in_cost_breakdown ?? [];

  const flowRewardContent =
    page.acf?.instrument_page_fields?.what_is_flow_rewards_section || undefined;

  const rationalData =
    page.acf?.instrument_page_fields?.execution_quality_rational || undefined;

  const customFieldProductSpec =
    page.acf?.instrument_page_fields?.product_specification;

  const customFieldFaqBlock = page.acf?.faq_section?.q_and_a;
  const customFieldCTABlock = page.acf?.instrument_page_fields?.lp_cta;

  //###################

  return (
    <>
      <LPBanner
        instrumentname={page.title.rendered}
        lists={heroBullets}
        partialTitle={heroPartialText}
      />
      <CostComparison intrumentName={page.title.rendered} />
      <GoogleReview />
      <CostBreakdown
        breakDownTableLists={costBreakDownListData}
        instrument={page.title.rendered}
      />
      <FlowRewardIntro
        instrument={page.title.rendered}
        content={flowRewardContent}
        rationalData={rationalData}
      />
      <CostCalculator selectedInstrument={page.title.rendered} />
      <ProductSpecification
        instrument={page.title.rendered}
        productSpec={customFieldProductSpec}
      />
      <Faq data={customFieldFaqBlock} faqSubject="FAQ" />
      <Cta content={customFieldCTABlock} />
    </>
  );
}
