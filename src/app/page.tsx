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
import { AbookSection } from "@/components/home-sections/AbookSection";
import LivePricingAllTable from "@/components/live-pricing-tables/LivePricingAll";
import { BuiltForTraders } from "@/components/home-sections/BuiltForTraders";
import { PlatformsSection } from "@/components/home-sections/PlatformSection";
import { CommunityDrivenSection } from "@/components/home-sections/CommunityDrivenSection";
import GoogleReview from "@/components/google-review/GoogleReview";
import FoundersCard from "@/components/founder-card/FounderCard";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import Faq from "@/components/faq/Faq";
import { getPageACF } from "@/data/wp-pages";

//Import Utils####
import { homeFaqData } from "@/utils/FaqHome";
import CostAdvantage from "@/components/cost-advantage/CostAdvantage";
import Section from "@/components/section/Section";

export default async function Home() {
  //
  const acfFields = await getPageACF("home-page");
  if (!acfFields) return <p>No data found</p>;

  //
  const getHeroHomeData = acfFields?.acf_blocks[0]?.attrs?.data;
  const earningFlowData = acfFields?.acf_blocks[1]?.attrs?.data;
  const moreValueRealAlignmentData = acfFields?.acf_blocks[2]?.attrs?.data;
  const getDataAbookSectionHome = acfFields?.acf_blocks[3]?.attrs?.data;

  return (
    <>
      {/* Hero Banner */}
      <HeroHome
        data={getHeroHomeData}
        title={["GET", "PAID", "WHEN", "YOU", "TRADE"]}
      />
      {/* Hero Banner */}

      {/* User Selling Poing */}
      <UserSellingPoint />
      {/* User Selling Poing */}

      <Section noiseEffect={true}>
        <CostAdvantage />
      </Section>

      {/* Earning Flow Section */}
      <EarningFlow data={earningFlowData} />
      {/* Earning Flow Section Ends */}
      {/* Generic Cards Section */}
      <MoreValueRealAlignment data={moreValueRealAlignmentData} />
      {/* Generic Cards Section Ends */}
      {/* A book section */}
      <AbookSection data={getDataAbookSectionHome} />
      {/* A book section ends */}
      {/* Live Pricing Section */}
      <LivePricingAllTable />
      {/* Live Pricing Section Ends */}
      {/* Section slot */}
      <BuiltForTraders />
      {/* Section slot ends */}
      {/* Platform Section */}
      <PlatformsSection />
      {/* Platform Section Ends */}
      {/* SEction Community Driven */}
      <CommunityDrivenSection />
      {/* SEction Community Driven Ends */}
      {/* Section Google Review */}
      <GoogleReview />
      {/* Section Google Review ends */}
      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Trusted, since 2012 — always on your side."
        cardParagraph="“After all this time, we've learned one thing: when interests align, magic happens. Afterprime is built entirely on that truth.”"
      />
      {/* Section Founders Block Ends */}
      {/* CTA Section */}
      <BottomCta />
      {/* CTA Section Ends */}
      {/* Faq Section */}
      <Faq faqSubject="General FAQ" faqObjectsToReceive={homeFaqData} />
      {/* Faq Section Ends */}
    </>
  );
}
