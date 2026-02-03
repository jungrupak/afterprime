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
import { metaDataHelper } from "./metaDataHelper";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";

interface PageProps {
  params: Promise<{ slug: string }>;
}

//Export Dynamic Page Title Tags####
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const instrumentUppercase = slug.toUpperCase();
  if (!params) return;
  const { getpercentage, rebate, industryVsApAvgPct } =
    await metaDataHelper(slug);
  //const formattedPercentage = Math.trunc(getpercentage);

  const formattedPercentage = Math.trunc(Math.abs(Number(getpercentage)));

  //for canonical ur
  const canonicalUrl = `https://afterprime.com/trade/${slug.toLowerCase()}`;

  if (rebate === 0) {
    return {
      title: `Trade ${instrumentUppercase} | Afterprime`,
      description: `Trade ${instrumentUppercase} with standard per lot pricing. Flow Rewards TM are not applied to ${instrumentUppercase}`,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } else if (industryVsApAvgPct <= 0) {
    return {
      title: `${instrumentUppercase} Trading With Flow Rewards | Afterprime`,
      description: `Trade ${instrumentUppercase} and earn ${rebate.toFixed(2)}/lot with Flow Rewards`,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } else {
    return {
      title: `Trade ${instrumentUppercase} at ${formattedPercentage}% Lower Cost vs the Next Best Option`,
      description: `Trade ${instrumentUppercase} on Afterprime with verified low trading costs, transparent execution, and institutional liquidity. Compare brokers all-in costs.`,
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }
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
      <Faq
        data={customFieldFaqBlock}
        faqSubject="FAQ"
        instrument={page.title.rendered}
      />
      <Cta />
      <CostCalculator instrument={page.title.rendered} />
      <ProductSpecification instrument={page.title.rendered} />
    </>
  );
}
