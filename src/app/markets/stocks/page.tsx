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
import LivePricingStocksTable from "@/components/live-pricing-tables/LivePricingStocks";

export default function Stocks() {
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

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Stocks Trading</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Direct access to global equities with institutional-grade pricing and
          execution.
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
        blockTitle="Trade the benchmark of enterprise — technology and finance, traded daily across global exchanges."
        blockParagraph="They move with earnings, innovation, and investor sentiment. The result is a market where value is constantly repriced, capital flows at scale, and opportunity lies in reading the pulse of economies and companies alike."
      />
      {/* Generic IntroBlock Ends */}

      {/* Live Pricing Table */}
      <LivePricingStocksTable />
      {/* Live Pricing Table Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Where traders shape the broker in real time." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/abstract-1.jpg">
        <h2>Infrastructure Built for Stocks</h2>
        <p>
          Stocks are where companies meet capital—trillions in equity value
          traded daily across global exchanges. From tech giants to industrial
          leaders, the stock market reflects innovation, growth, and sentiment
          in motion.
        </p>
        <p>
          We connect traders to global stock markets with the same
          institutional-grade architecture that powers our flow—built for
          consistency, scale, and absolute transparency.
        </p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Start */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="The Edge in Stocks"
        blockParagraph="Stocks define growth, sentiment, and innovation—but only if access is clean. Our model removes conflicts and delivers alignment."
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
          Stocks aren&apos;t just another asset—they&apos;re the equity engine
          of global markets. To trade them properly, clarity and alignment
          matter.
        </p>
        <ul>
          <li>From padded fees to transparent costs.</li>
          <li>From hidden costs to zero-commission pricing.</li>
          <li>From conflicted execution to alignment with trader outcomes.</li>
        </ul>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Block With 4 cards */}
      <AdvantagesBlock />
      {/* Block With 4 cards Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Clean execution keeps you in sync with global capital markets." />
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
