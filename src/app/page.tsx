import type { Metadata } from "next";
import HeroHome from "@/components/hero-home/HeroHome";
import {
  LowCostRanking,
  EarningFlow,
  GenericCardSectionOne,
} from "@/components/home-sections/HomeSections";
import { getHomePageData } from "@/data/data-home-page";
import { ContentBlock } from "@/utils/content-block/ContentBlock";
import { ProsNCons } from "@/utils/pros-cons/ProsNcons";
export const metadata: Metadata = {
  title: "Afterprime",
  description: "This is Afterprime Home page",
};

//
const aBookListsItems = [
  "No B-Book – We never profit from losses.",
  "Trades aligned with you, not against you.",
  "Consistently called the most honest broker.",
];
//

export default async function Home() {
  const homeBannerData = await getHomePageData();
  const heroContent = homeBannerData[0]?.acf_blocks[0]?.attrs?.data;
  const rankingSection = homeBannerData[0]?.acf_blocks[1]?.attrs?.data;
  const earningFlowSection = homeBannerData[0]?.acf_blocks[2]?.attrs?.data;
  // Earning Flow List Items Trimming only list items from REST API object
  const earningFlowLists = Object.entries(earningFlowSection)
    .filter(([key, value]) =>
      /^earning_flow_list_items_\d+_list_point$/.test(key)
    )
    .map(([key, value]) => value as string);
  // Earning Flow List Items Ends
  return (
    <>
      {/* Hero Banner */}
      <HeroHome
        title={heroContent?.hero_banner_home_banner_heading}
        description={heroContent?.hero_banner_home_banner_paragraph}
        buttonText={heroContent?.hero_banner_home_banner_btn_text}
        btnUrl={heroContent?.hero_banner_home_banner_btn_url}
      />
      {/* Hero Banner */}
      {/* Ranking #1 Section */}
      <LowCostRanking
        cardOneHeading={rankingSection?.block_rank_one_card_one_heading}
        cardOneSubheading={rankingSection?.block_rank_one_card_one_sub_heading}
        cardOneParagraph={rankingSection?.block_rank_one_card_one_text_line}
        // ##
        cardTwoHeading={rankingSection?.block_rank_one_card_two_heading}
        cardTwoSubheading={rankingSection?.block_rank_one_card_two_sub_heading}
        cardTwoParagraph={rankingSection?.block_rank_one_card_two_text_line}
        // ##
        cardThreeHeading={rankingSection?.block_rank_one_card_three_heading}
        cardThreeSubheading={
          rankingSection?.block_rank_one_card_three_sub_heading
        }
        cardThreeParagraph={rankingSection?.block_rank_one_card_three_text_line}
        //##
        forexBenchUrl={rankingSection?.block_rank_one_card_two_external_link}
      />
      {/* Ranking #1 Section Ends */}
      {/* Earning Flow Section */}
      <EarningFlow
        listItems={earningFlowLists}
        buttonText="How it Works"
        btnUrl="#"
      />
      {/* Earning Flow Section Ends */}
      {/* Generic Cards Section */}
      <GenericCardSectionOne />
      {/* Generic Cards Section Ends */}
      {/* Section slot */}
      <section className="">
        <div className="ap_container">
          <ContentBlock
            blockTitle="A-Book+ <br/> Never Against You."
            blockPara="We operate with no conflict of interest. Every trade is hedged, every execution aligned with you."
            isBoxed={true}
            ctaText="Execution Model"
            ctaLink="#"
            listItems={aBookListsItems}
          />
        </div>
      </section>
      {/* Section slot ends */}
      {/* Live Pricing Section */}
      Live Pricing Section -------
      {/* Live Pricing Section Ends */}
      {/* Section slot */}
      <section className="">
        <div className="ap_container">
          <ProsNCons
            blockTitle="Afterprime is built for <br/> traders who treat trading like a profession."
            blockPara="Our platform is designed for clients who understand our model, respect risk, and approach markets with discipline."
            isBoxed={false}
            ctaText="How to Qualify"
            ctaLink="#"
            prosLabel="Designed for:"
            consLabel="Not Designed for:"
            ProslistItems={[
              "Professional traders running consistent strategies.",
              "Disciplined traders who respect execution, risk, and capital.",
            ]}
            ConslistItems={[
              "Arbitrage or latency flow type strategies.",
              "Accounts chasing leverage, bonuses, or gimmicks.",
            ]}
          />
        </div>
      </section>
      {/* Section slot ends */}
    </>
  );
}
