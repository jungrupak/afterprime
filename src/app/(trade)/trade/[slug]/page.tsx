import LPBanner from "@/components/instrument-lps/lp-bannner/LpBanner";
import { getTradePageData } from "@/lib/getTradePageData";
import { notFound } from "next/navigation"; //This needs to render custom 404 page created in this specific instance
import CostComparison from "@/components/instrument-lps/cost-comparison/CostComparison";
import CostBreakdown from "@/components/instrument-lps/cost-brakdown/CostBreakdown";
import FlowRewardIntro from "@/components/instrument-lps/what-is-flow-reward/FlowRewardIntro";
import CostCalculator from "@/components/instrument-lps/cost-calculator/CostCalculator";
import ProductSpecification from "@/components/instrument-lps/product-specification/ProductSpecification";
import Faq from "@/components/instrument-lps/faq/Faq";
import Cta from "@/components/instrument-lps/cta/Cta";

interface PageProps {
  params: Promise<{ slug: string }>;
}

//Export Dynamic Page Title Tags####
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // ✅ REQUIRED in Next 14+

  console.log("SYMBOL:", slug); // server log

  const res = await fetch(`https://feed.afterprime.com/api/symbol/${slug}`, {
    headers: {
      "User-Agent": "Next.js Server",
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Metadata fetch failed:", res.status);
    return {};
  }

  const data = await res.json();

  console.log("FETCHED META DATA:", data);

  return {
    title: `Trade ${slug.toUpperCase()} at ${data.secondBestVsAfterprimePct}% Lower Cost`,
    description: `Trade ${data.name} with Afterprime`,
  };
}
//Export Dynamic Page Title Tags Ends####

export default async function TradeSlugPage({ params }: PageProps) {
  const page = await getTradePageData({ params });
  if (!page) {
    notFound();
  }

  const flowRewardContent =
    page.acf?.instrument_page_fields?.what_is_flow_rewards_section || undefined;

  const rationalData =
    page.acf?.instrument_page_fields?.execution_quality_rational || undefined;

  const customFieldFaqBlock = page.acf?.faq_section?.q_and_a;
  const customFieldCTABlock = page.acf?.instrument_page_fields?.lp_cta;

  //###################

  return (
    <>
      <LPBanner instrument={page.title.rendered} />
      <CostComparison instrument={page.title.rendered} />
      {/* <GoogleReview /> */}

      <FlowRewardIntro
        instrument={page.title.rendered}
        content={flowRewardContent}
        rationalData={rationalData}
      />
      <CostBreakdown instrument={page.title.rendered} />
      <Faq data={customFieldFaqBlock} faqSubject="FAQ" />
      <Cta />
      <CostCalculator instrument={page.title.rendered} />
      <ProductSpecification instrument={page.title.rendered} />
    </>
  );
}
