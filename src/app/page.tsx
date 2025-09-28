import type { Metadata } from "next";
//
export const metadata: Metadata = {
  title: "Afterprime is Hero in Industry",
  description: "This is Afterprime Home page",
};
//Imports####
import { HeroHome } from "@/components/hero-home/HeroHome";
import { UserSellingPoint } from "@/components/home-sections/UserSellingPoint";
import { EarningFlow } from "@/components/home-sections/EarningFlow";
import { MoreValueRealAlignment } from "@/components/home-sections/MoreValueRealAlignment";
import LivePricingAllTable from "@/components/live-pricing-tables/LivePricingAll";
import { BuiltForTraders } from "@/components/home-sections/BuiltForTraders";
import { PlatformsSection } from "@/components/home-sections/PlatformSection";
import { MultipurposeBlock } from "@/components/block-multipurpose/BlockMultipurpose";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import Faq from "@/components/faq/Faq";
import { getPageACF } from "@/data/wp-pages";
import { getOptionsACF } from "@/data/wp-options";

//Import Utils####
import CostAdvantage from "@/components/cost-advantage/CostAdvantage";
import Section from "@/components/section/Section";

export default async function Home() {
  //
  const acfFields = await getPageACF("home-page");
  const optionFields = await getOptionsACF();
  if (!acfFields) return <p>No data found</p>;
  if (!optionFields) return <p>No data found</p>;

  //
  const getHeroHomeData = acfFields?.acf_blocks[0]?.fields;
  const earningFlowData = acfFields?.acf_blocks[1]?.fields;
  const moreValueRealAlignmentData = acfFields?.acf_blocks[2]?.fields;
  const getDataAbookSectionHome = acfFields?.acf_blocks[3]?.fields;
  const getProsandConsHome = acfFields?.acf_blocks[4]?.fields;
  const getPlatformsSectionData = acfFields?.acf_blocks[5]?.fields;
  const getCommunityDrivenSectionData = acfFields?.acf_blocks[6]?.fields;
  const getBottomCtaData = optionFields?.bottom_cta;
  const getFaqData = acfFields?.acf?.faq;
  //

  return (
    <>
      {/* Hero Banner */}
      <HeroHome
        data={getHeroHomeData}
        title={["GET", "PAID", "WHEN", "YOU", "TRADE"]}
      />
      {/* Hero Banner */}
    </>
  );
}
