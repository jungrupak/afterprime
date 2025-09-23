import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/platforms/mt5`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import ContentBlock from "@/components/content-block/ContentBlock";
import BlockWithCards from "@/components/content-block-with-cards/BlockWithCards";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import type { CardDataObject } from "@/types/cardObject";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import { SectionDownloadPlatform } from "@/components/download-section/DownloadSection";

export default function PageMt5() {
  //const BannerImage = "/img/banner-about.jpg";
  //Content Card section Card Data##
  const cardsData: CardDataObject[] = [
    {
      title: "Multi-Asset Access",
      paragraph:
        "Trade FX, indices, commodities, stocks, and crypto in one platform.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Advanced Tools",
      paragraph: "Expanded order types and market depth.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Seamless Execution",
      paragraph:
        "Orders filled at VWAP, hedged independently—no conflicts, no compromises.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Lowest Costs",
      paragraph: "Zero-commission spreads, verified by independent benchmarks.",
      ctaLabel: "",
      ctaLink: "",
    },
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

  //Download Links
  const cardData: CardDataObject[] = [
    {
      title: "Windows MT5",
      paragraph: "MT5 on Windows—fast, scalable, and conflict-free execution",
      ctaLabel: "Download",
      ctaLink: "/downloadlink",
    },
    {
      title: "iOS MT5",
      paragraph: "Trade MT5 on iOS—clean execution, anywhere you are",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "Android MT5",
      paragraph:
        "MT5 on Android: speed, scale, and execution without compromise",
      ctaLabel: "Download",
      ctaLink: "#",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">MetaTrader 5</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          The evolution of MetaTrader—more markets, deeper tools, same clean
          A-book+ execution.
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
        blockTitle="Multi-asset access, and advanced tools—designed for professionals needing flexibility and scale. "
        blockParagraph="At Afterprime, MT5 runs on pure A-book+ architecture with institutional liquidity, zero-commission pricing, and optimized hedging. Multi-asset execution becomes transparent, conflict-free, and scalable—designed for traders who demand alignment across every market."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="More markets. More tools. Zero compromise on execution." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>MT5 with Institutional DNA</h2>
        <p>
          MetaTrader 5 takes everything traders know from MT4 and expands it.
          Faster architecture, more asset classes, and advanced tools for
          analysis make MT5 the natural upgrade for professionals who need
          flexibility.
        </p>
        <p>
          At Afterprime, we pair MT5&apos;s modern platform with our
          institutional-grade liquidity and pure A-book+ model. That means the
          power of multi-asset trading, zero-commission pricing, and execution
          you can scale—without the conflicts that define legacy brokers.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Block With 4 cards */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            MetaTrader 5 for Professionals.
          </h2>
          <p className="paragraph">
            MT5 is a multi-asset engine where advanced tools meet clean
            execution. Every order routes through prime brokers, aggregated
            liquidity, and optimized hedging for scale without conflict.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="small" data={cardsData} />
        </div>
      </BlockWithCards>
      {/* Block With 4 cards Ends */}

      {/* Multipurpose Block for right image */}

      {/* Multipurpose Block for right image Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/team-img.jpg">
        <h2>MT5 Powered by A-book+</h2>
        <p>
          Most brokers promote MT5 as “multi-asset” while running the same
          B-book core underneath. That creates conflicts, inflated costs, and
          inconsistent execution.
        </p>

        <p>
          At Afterprime, MT5 runs on the same structure as our FX desks: pure
          A-book+, aggregated liquidity, and post-trade optimization. No
          conflicts—just the tools traders want, connected to the infrastructure
          they deserve.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="MT5 is the future standard—fair execution makes it worth trading on today." />
      {/* Highlight Text Ends */}

      {/* Section More value real alignment */}
      {/* Section More value real alignment */}
      <SectionDownloadPlatform
        downloadLink={cardData}
        sectionTitle="MetaTrader5"
        sectionParagraph="You're trading on the world's lowest-cost platform — and
              getting paid for your flow."
      />
      {/* Section More value real alignment ends */}
      {/* Section More value real alignment ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Consistency is execution plus cost—MT5 at Afterprime delivers both." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Breaking from Legacy Models</h2>
        <p>
          Every order on MT5 with Afterprime is filled at the live VWAP shown,
          with hedge legs managed independently across venues. Orders rest just
          long enough to capture micro-spread, never long enough to take on
          directional risk.
        </p>

        <p>
          This A-book+ architecture powers MT5 into a true multi-asset
          platform—where clean execution meets institutional scale.
        </p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="MT5 Without the Compromise"
        cardParagraph="“By running MT5 on a pure A-book+ model, we make sure traders get the platform’s full potential without the conflicts that have always held the industry back.”"
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
