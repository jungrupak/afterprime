import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/platforms/traderevolution`,
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

export default function PageTraderEvolution() {
  //const BannerImage = "/img/banner-about.jpg";
  //Content Card section Card Data##
  const cardsData: CardDataObject[] = [
    {
      title: "300+ Markets",
      paragraph:
        " From forex to crypto to share CFDs, trade all markets in one place.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Professional Tools",
      paragraph: "Depth of Market, Matrix, Super DOM and advanced chart types.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Custom Workflows",
      paragraph:
        "Hotkeys, layouts, themes, and multiple workspaces tailored to how you trade.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Seamless Access",
      paragraph:
        "Multi-device sync keep you connected anywhere enabling trading on the go.",
      ctaLabel: "",
      ctaLink: "",
    },
  ];

  //Download Links
  const cardData: CardDataObject[] = [
    {
      title: "Windows TE",
      paragraph: "MT4 on Windows—fast, scalable, and conflict-free execution",
      ctaLabel: "Download",
      ctaLink: "/downloadlink",
    },
    {
      title: "iOS TE",
      paragraph: "Trade MT4 on iOS—clean execution, anywhere you are",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "Android TE",
      paragraph:
        "MT4 on Android: speed, scale, and execution without compromise",
      ctaLabel: "Download",
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
          <span className="font-[600]">TraderEvolution</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Next-generation multi-asset platform—modern design, institutional
          execution, and zero-commission pricing.
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
        blockTitle="Access 300+ markets with advanced tools, and institutional-grade liquidity. "
        blockParagraph="Engineered for scale and precision, TraderEvolution combines prime broker clearing, and seamless multi-device access. Trade on a modern platform that matches trader speed with institutional infrastructure."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="TraderEvolution brings bank-grade execution to your screen." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Built for Professional Traders</h2>
        <p>
          With access to over 300 markets, 0.0-pip spreads, and &lt;1ms
          execution, this platform doesn&apos;t just keep up with markets—it
          moves ahead of them.
        </p>
        <p>
          Every detail is engineered for professionals: advanced chart types,
          hotkeys, depth-of-market tools, customisable workspaces, and
          multi-device sync. TraderEvolution isn&apos;t just a trading app;
          it&apos;s a platform built for real-time decision-making, where
          performance and precision converge.
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
            Where Institutional Traders Live
          </h2>
          <p className="paragraph">
            TraderEvolution is more than a platform—it&apos;s a multi-asset
            system where speed and depth meet clean execution. Every order
            routes through prime brokers, ECNs, and dark pools, optimized for
            scale without conflict.
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
          TraderEvolution connects directly to Afterprime&apos;s liquidity
          stack—prime brokers, ECNs, and dark liquidity—stitched together for
          world-class pricing.
        </p>

        <p>
          Low latency, deep market access, and conflict-free fills make it more
          than just another platform—it&apos;s part of the market&apos;s
          structure.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Speed, depth, transparency—built together, not added on." />
      {/* Highlight Text Ends */}

      {/* Section More value real alignment */}
      <SectionDownloadPlatform
        downloadLink={cardData}
        sectionTitle="TraderEvolution"
        sectionParagraph="You're trading on the world's lowest-cost platform — and
              getting paid for your flow."
      />
      {/* Section More value real alignment ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Speed, depth, transparency—built together, not added on." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="The Future of Platforms"
        cardParagraph="“TraderEvolution was designed for the future of trading.  We offer platforms traders asked for: every tool, every market, every trade—powered by our custom built pricing and institutional execution.”"
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
