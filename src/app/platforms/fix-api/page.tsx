import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/platforms/fix-api`,
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
import Card from "@/components/ui/Card";

export default function PageFixApi() {
  //const BannerImage = "/img/banner-about.jpg";
  //Content Card section Card Data##
  const cardsData: CardDataObject[] = [
    {
      title: "Direct Access",
      paragraph: "Connect strategies straight to our servers.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Ultra-Low Latency",
      paragraph: "Execution measured in milliseconds",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Clean Infrastructure",
      paragraph: "No middleware, just clean trading direct to liqudity.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Institutional Alignment",
      paragraph: "FIX built on A-book+ liquidity and prime broker clearing",
      ctaLabel: "",
      ctaLink: "",
    },
  ];

  //Download Links
  const accessWebtrader = [
    {
      title: "MetaTrader4",
      paragraph: "MT4 on Windows—fast, scalable, and conflict-free execution",
      ctaLabel: "Login",
      ctaLink: "#",
    },
    {
      title: "MetaTrader5",
      paragraph: "Trade MT4 on iOS—clean execution, anywhere you are",
      ctaLabel: "Login",
      ctaLink: "#",
    },
    {
      title: "TraderEvolution",
      paragraph:
        "MT4 on Android: speed, scale, and execution without compromise",
      ctaLabel: "Login",
      ctaLink: "#",
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

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">FIX API</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Direct-to-market access. Institutional-grade speed and control.
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
        blockTitle="Trading without borders. WebTrader across MT4, MT5, and TraderEvolution makes that vision a reality."
        blockParagraph="WebTrader makes Afterprime’s full infrastructure available anywhere with an internet connection. Log in, trade live, or test strategies on demo—all synced across devices."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="If speed is your edge, FIX API is the direct route." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Institutional Speed</h2>
        <p>
          The Financial Information eXchange (FIX) protocol is the standard for
          institutional trading. It connects strategies directly to liquidity,
          bypassing platform layers and cutting execution down to milliseconds.
        </p>
        <p>
          At Afterprime, we offer FIX API connectivity for professional traders
          and systems that demand precision. No middleware, no third-party
          overhead—just a clean line into our servers and aggregated liquidity,
          with latency as low as 1ms.
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
            When FIX API Matters
          </h2>
          <p className="paragraph">
            Built for professionals who need more than platforms—FIX delivers
            direct connectivity, millisecond speed, and execution aligned with
            institutional standards.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="compact" data={cardsData} />
        </div>
      </BlockWithCards>
      {/* Block With 4 cards Ends */}

      {/* Multipurpose Block for right image */}

      {/* Multipurpose Block for right image Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/team-img.jpg">
        <h2>Under the Hood</h2>
        <p>
          Every FIX API order goes through Afterprime&apos;s institutional-grade
          stack—prime brokers, exchanges, non-banks, and ECNs. By bypassing
          platforms, latency drops to as low as 1ms.
        </p>

        <p>
          Spreads stream directly, orders fill at VWAP, and hedges are optimized
          across venues to capture micro-spread yield shared back as Flow
          Rewards.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="For traders who need the rails institutions run on." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Direct by Design"
        cardParagraph="“FIX API is the protocol institutions trust. We’ve opened that same standard to professional traders at Afterprime—direct access, faster execution, and aligned infrastructure designed to scale strategies.”"
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
