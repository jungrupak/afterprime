import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/platforms/mt4`,
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

export default function PageMt4() {
  //const BannerImage = "/img/banner-about.jpg";
  //Content Card section Card Data##
  const cardsData: CardDataObject[] = [
    {
      title: "Global Standard",
      paragraph: "The most widely used trading platform worldwide.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Algo-Ready",
      paragraph:
        "Support for Expert Advisors (EAs), indicators, and automated strategies.",
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

  //Download Links
  const cardData: CardDataObject[] = [
    {
      title: "Windows MT4",
      paragraph: "MT4 on Windows—fast, scalable, and conflict-free execution",
      ctaLabel: "Download",
      ctaLink: "/downloadlink",
    },
    {
      title: "iOS MT4",
      paragraph: "Trade MT4 on iOS—clean execution, anywhere you are",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "Android MT4",
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
          <span className="font-[600]">MetaTrader 4</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          The world&apos;s most trusted trading platform—built for transparency,
          speed, and alignment.
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
        blockTitle="Every basis point saved across thousands of trades compounds into measurable performance. "
        blockParagraph="Our costs are not marketing numbers — they are independently audited and ranked #1 globally by ForexBenchmark. The result is clarity traders can build on: verified data, consistent pricing, and the lowest all-in cost structure in the market."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Every click on MT4 connects to a deeper pool of liquidity." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>MT4, Rebuilt for Professionals</h2>
        <p>
          MetaTrader 4 has been the benchmark platform for global traders for
          nearly two decades. Its simplicity, flexibility, and ecosystem of
          tools have made it the default choice for both discretionary and
          automated strategies.
        </p>
        <p>
          By combining its familiar interface with our institutional-grade
          liquidity and pure A-book+ model, traders get the best of both worlds:
          execution built to scale and the lowest verified all-in costs in the
          market.
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
            MetaTrader 4 for Professionals.
          </h2>
          <p className="paragraph">
            MT4 is more than a charting platform—it&apos;s the hub where
            strategy meets execution. With Afterprime&apos;s infrastructure
            underneath, every order routes cleanly through prime brokers,
            aggregated liquidity, and optimized hedging.
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
        <h2>MT4 Powered by A-book+</h2>
        <p>
          When you place a trade on MT4 with Afterprime, it&apos;s filled at the
          live VWAP shown on the platform. Behind the scenes, we manage the
          hedge leg across venues, capturing natural spread without directional
          risk.
        </p>

        <p>
          This structure allows us to return part of the yield to clients
          through Flow Rewards—making MT4 not just a trading tool, but part of a
          fairer market structure.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="The platform traders know, powered by the infrastructure they’ve never had access to." />
      {/* Highlight Text Ends */}

      {/* Section More value real alignment */}
      <SectionDownloadPlatform
        downloadLink={cardData}
        sectionTitle="MetaTrader4"
        sectionParagraph="You're trading on the world's lowest-cost platform — and
              getting paid for your flow."
      />
      {/* Section More value real alignment ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Consistency is execution plus cost—MT4 at Afterprime delivers both." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Breaking from Legacy Models</h2>
        <p>
          Legacy brokers run MT4 on a B-book backbone—internalising trades and
          depending on client losses. That&apos;s not execution—it&apos;s
          conflict.
        </p>

        <p>
          Afterprime flips the model. MT4 here runs on the same A-book+
          foundation as our institutional desks: clean pricing, conflict-free
          execution, and rewards for quality flow.
        </p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="MT4 Without the Noise"
        cardParagraph="“When we first started trading it was on MetaTrader 4. We built Afterprime to strip away the conflicts—so whether you’re running an EA or trading by hand, MT4 finally connects you to true institutional execution.”"
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
