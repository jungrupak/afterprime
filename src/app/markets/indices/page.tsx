import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/markets/indices`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import LivePricingIndicesTable from "@/components/live-pricing-tables/LivePricingIndices";
import ContentBlock from "@/components/content-block/ContentBlock";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import BlockWithLists from "@/components/block-multipurpose/BlockWithLists";
import Lists from "@/components/ui/Lists";
import { PlatformsSection } from "@/components/home-sections/PlatformSection";
import AdvantagesBlock from "@/components/advantages-block/AdvantagesBlock";

export default function Indices() {
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
          <span className="font-[600]">Indices Trading</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Trade the world&apos;s biggest equity markets with institutional
          infrastructure and zero-commission execution.
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
        blockTitle="Indices are benchmark markets — trillions in equity value tracked daily across every session."
        blockParagraph="They reflect economies, sectors, and sentiment in motion. The result is an arena where liquidity concentrates, volatility sharpens, and opportunity scales for traders who demand precision."
      />
      {/* Generic IntroBlock Ends */}

      {/* Live Pricing Table */}
      <LivePricingIndicesTable />
      {/* Live Pricing Table Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Where traders shape the broker in real time." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/abstract-1.jpg">
        <h2>Infrastructure Built for Indices</h2>
        <p>
          Indices are the pulse of global markets—tracking the fortunes of
          entire economies, sectors, and investor sentiment in real time. From
          S&P 500 and NASDAQ to DAX, FTSE, and Nikkei, these benchmarks drive
          capital flows and define risk-on/risk-off regimes.
        </p>
        <p>
          With clean A-book execution, we deliver professional-grade conditions
          where cost and latency make or break performance
        </p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Start */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="The Edge in Indices"
        blockParagraph="Indices amplify opportunity, but only if the structure supports you. Our model removes noise and creates alignment."
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
          Indices aren&apos;t just another asset—they&apos;re the heartbeat of
          global capital. To trade them properly, infrastructure matters.
        </p>
        <ul>
          <li>From synthetic feeds to exchange-anchored liquidity.</li>
          <li>From padded spreads to raw pricing.</li>
          <li>
            From client losses funding broker profits to conflict-free
            alignment.
          </li>
          <li>From marketing claims to independently verified execution.</li>
        </ul>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Block With 4 cards */}
      <AdvantagesBlock />
      {/* Block With 4 cards Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Clean execution turns the world’s deepest market into the fairest." />
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
