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
import LivePricingCryptoTable from "@/components/live-pricing-tables/LivePricingCrypto";

export default function Crypto() {
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
          <span className="font-[600]">Crypto CFD Trading</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Trade digital assets on zero commission with institutional-grade
          infrastructure.
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
        blockTitle="Trade the frontier of digital value — Bitcoin, Ethereum, and leading assets moving 24/7."
        blockParagraph="They shift with adoption, regulation, and sentiment. The result is a market where volatility is constant and opportunity belongs to those who can trade structure as much as direction."
      />
      {/* Generic IntroBlock Ends */}

      {/* Live Pricing Table */}
      <LivePricingCryptoTable />
      {/* Live Pricing Table Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Where traders shape the broker in real time." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/abstract-1.jpg">
        <h2>Infrastructure Built for Commodities</h2>
        <p>
          Crypto is where technology meets finance—digital assets traded around
          the clock, across every timezone. From Bitcoin to Ethereum, the market
          reflects adoption, regulation, and innovation in real time.
        </p>
        <p>
          We connect traders to crypto markets with institutional-grade
          architecture—aggregated liquidity, pure A-book flow, and execution
          built for speed, scale, and transparency.
        </p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Start */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="The Edge in Crypto"
        blockParagraph="Crypto is fast, fragmented, and volatile—but only if access is clean does opportunity scale. Our model strips out conflicts and delivers alignment."
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
          Crypto isn&apos;t just another trend—it&apos;s a 24/7 market reshaping
          how value moves. To trade it properly, structure and transparency
          matter.
        </p>
        <ul>
          <li>From fragmented venues to aggregated liquidity.</li>
          <li>From synthetic pricing to clean, real-time execution.</li>
          <li>From hidden spreads to zero-commission access.</li>
          <li>From conflicted models to alignment with traders.</li>
        </ul>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Block With 4 cards */}
      <AdvantagesBlock />
      {/* Block With 4 cards Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Clean execution keeps you in sync with 24/7 digital markets." />
      {/* Highlight Text Ends */}

      {/* Section Platforms */}
      <PlatformsSection />
      {/* Section Platforms */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Beyond the Hype"
        cardParagraph="“Crypto redefined how value moves—24/7, borderless, and fast. We built Afterprime to give traders clean, institutional-grade access to digital assets without the noise or conflicts that plague retail.”"
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
