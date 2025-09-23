import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/markets/commodities`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import ContentBlock from "@/components/content-block/ContentBlock";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import BlockWithLists from "@/components/block-multipurpose/BlockWithLists";
import Lists from "@/components/ui/Lists";
import { PlatformsSection } from "@/components/home-sections/PlatformSection";
import AdvantagesBlock from "@/components/advantages-block/AdvantagesBlock";
import LivePricingCommoditiesTable from "@/components/live-pricing-tables/LivePricingCommodities";

export default function Commodities() {
  //const BannerImage = "/img/banner-about.jpg";

  //Feature Lists
  const symbolFeatureLists = [
    "Exchange-grade pricing — Aggregated from exchanges, banks, and non-banks for depth and consistency.",
    "Execution built for scale — Engineered to serve both discretionary traders and automated systems without compromise.",
    "Pure A-book flow — No internalisation, no conflicts, just aligned execution.",
  ];

  //FAQ DATA
  const faqData = [
    {
      question:
        "How is Afterprime able to offer the lowest all-in trading costs?",
      answer:
        "We've built our own pricing infrastructure and order books, giving us tighter spreads than most LPs. Combined with zero commissions and flow rewards, it results in the lowest verified all-in cost globally — without relying on B-book revenue.",
    },
    {
      question: "Do you really pay traders to trade? How does that work?",
      answer:
        "We’ve built our own pricing infrastructure and order books, giving us tighter spreads than most LPs. Combined with zero commissions and flow rewards, it results in the lowest verified all-in cost globally ",
    },
  ];

  //PTO LISTS
  const ptoLists = [
    "Orders are executed at zero commission and prices sharper than standard LP quotes.",
    "Fair Model Alignment – we aim to capture value post trade and share it back with our traders.",
    "Your trading activity generates yield that turns into real earnings alongside your PnL.",
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Commodities Trading</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Direct access to the world&apos;s rawest markets — where supply,
          demand, and geopolitics shape every tick.
        </p>
        <MainButton
          href="#"
          varient="primary-ghost"
          size="large"
          isArrowVisible={true}
        >
          Request Invite
        </MainButton>
      </InnerBanner>
      {/* Hero Banner Ends */}

      {/* Generic IntroBlock */}
      <GenericIntroBlock
        blockTitle="Commodities are essential markets — energy, metals, and agriculture traded daily at massive scale."
        blockParagraph="They move with supply shocks, geopolitics, and demand cycles. The result is a landscape where volatility is constant, prices are real, and opportunity lies in navigating the forces that shape the global economy."
      />
      {/* Generic IntroBlock Ends */}

      {/* Live Pricing Table */}
      <LivePricingCommoditiesTable />
      {/* Live Pricing Table Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Where traders shape the broker in real time." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/abstract-1.jpg">
        <h2>Infrastructure Built for Commodities</h2>
        <p>
          Commodities trade on volatility—oil swings with geopolitics, metals
          with demand cycles, agriculture with weather.
        </p>
        <p>
          Our architecture balances depth with resilience, so whether
          you&apos;re hedging risk or trading momentum, fills remain consistent
          in the most reactive markets.
        </p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Start */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="The Edge in Commodities"
        blockParagraph="Commodities fuel volatility, but only if execution holds steady. Our model cuts through the shocks and delivers alignment."
        btnText="Request Invite"
        btnUrl="#"
      >
        <Lists bulletVarient="arrow-blue" listItems={symbolFeatureLists} />
      </BlockWithLists>
      {/* Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/abstract-3.jpg">
        <h2>Institutional DNA, Retail Access</h2>
        <p>
          Commodities aren&apos;t just another market—they&apos;re the raw
          drivers of economies. To trade them properly, stability and
          transparency matter.
        </p>
        <ul>
          <li>From padded swaps to transparent financing.</li>
          <li>From synthetic pricing to exchange-anchored depth.</li>
          <li>From hidden costs to zero-commission spreads.</li>
          <li>From broker gimmicks to execution aligned with traders.</li>
        </ul>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Block With 4 cards */}
      <AdvantagesBlock />
      {/* Block With 4 cards Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Clean execution keeps you in sync with the global supply chain." />
      {/* Highlight Text Ends */}

      {/* Section Platforms */}
      <PlatformsSection />
      {/* Section Platforms */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Clean Access to Benchmark Markets"
        cardParagraph="“We built Afterprime to deliver clean access to benchmark markets like the S&P, NASDAQ, and DAX—because your performance should depend on strategy, not broker tricks.”"
      />
      {/* Section Founders Block Ends */}

      {/* Section Google Review */}
      <GoogleReview />
      {/* Section Google Review ends */}

      {/* CTA Section */}
      <BottomCta />
      {/* CTA Section Ends */}

      {/* FAQ */}
      <Faq
        faqSubject="Frequently Asked Questions"
        faqObjectsToReceive={faqData}
      />
      {/* FAQ ends */}
    </>
  );
}
