import React from "react";
import LPBanner from "@/components/instrument-lps/lp-bannner/LpBanner";
import { getTradePageData } from "@/lib/getTradePageData";
import { notFound } from "next/navigation"; //This needs to render custom 404 page created in this specific instance
import CostComparison from "@/components/instrument-lps/cost-comparison/CostComparison";
import GoogleReview from "@/components/google-review/GoogleReview";
import CostBreakdown from "@/components/instrument-lps/cost-brakdown/CostBreakdown";
import FlowRewardIntro from "@/components/instrument-lps/what-is-flow-reward/FlowRewardIntro";
import CostCalculator from "@/components/instrument-lps/cost-calculator/CostCalculator";
import ProductSpecification from "@/components/instrument-lps/product-specification/ProductSpecification";
import Faq from "@/components/faq/Faq";
import Cta from "@/components/instrument-lps/cta/Cta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function TradeSlugPage({ params }: PageProps) {
  const page = await getTradePageData({ params });
  if (!page) {
    notFound();
  }

  const heroBullets = page.acf?.instrument_page_fields?.hero_bullet_lists ?? [];
  const heroPartialText =
    page.acf?.instrument_page_fields?.hero_partial_title || undefined;

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
      <CostBreakdown />
      <FlowRewardIntro />
      <CostCalculator />
      <ProductSpecification />
      {/* <Faq data={page.acf?.faq_section} faqSubject="FAQ" /> */}
      <Cta />
    </>
  );
}
