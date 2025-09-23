import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/trade-execution`,
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
import { MoreValueRealAlignment } from "@/components/home-sections/MoreValueRealAlignment";
import Faq from "@/components/faq/Faq";
import type { CardDataObject } from "@/types/cardObject";
import BlockWithLists from "@/components/block-multipurpose/BlockWithLists";
import Lists from "@/utils/lists/Lists";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import Image from "next/image";

export default function GetPaidToTrade() {
  //const BannerImage = "/img/banner-about.jpg";
  //Content Card section Card Data##
  const cardsData: CardDataObject[] = [
    {
      title: "Conflict-Free",
      paragraph: "No b-book, no trading against clients.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Deep Liquidity",
      paragraph: "Purpose-Built Order Books, Hedged in Real Markets",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Verified Lowest Costs",
      paragraph: "Independently benchmarked.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Flow Rewards",
      paragraph: "Spread capture shared back with traders.",
      ctaLabel: "",
      ctaLink: "",
    },
  ];
  //USP Data
  const uspDataObject = [
    {
      title: "$3 p/lot",
      subTitle: "Earn up to $3 per lot in pay to trade flow",
    },
    { title: "$4.6m", subTitle: "Estimated savings based on YTD flow" },
    { title: "$2.3m", subTitle: "Estimated Flow Rewards paid out YTD" },
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
          <span className="font-[600]">Trade Execution</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Clean fills. Neutral execution. Smart hedging that creates value
          instead of conflict.
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
        blockTitle="Execution is the foundation of trust. At Afterprime, every trade is routed cleanly to the market."
        blockParagraph="We route flow across banks, non-banks, and exchanges, price tighter than our LPs, and clear through prime brokers. We optimize the hedge leg independently—capturing spread without conflict and returning part of it as Flow Rewards."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Execution is neutral by design. Flow goes out clean, without conflict." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/chi-img.jpg">
        <h2>A-Book+ Execution, Zero Conflict</h2>
        <p>
          We run a pure A-book+ model. Fills are delivered at the VWAP shown,
          while we manage the hedge leg independently. The integrity of this
          structure means no conflict between broker and trader—only alignment.
        </p>
        <p>
          Once a trade is filled, we optimize the hedge across venues to capture
          natural spread value. Orders are rested for a short statistical
          window—long enough to capture micro-spread, never long enough to take
          on directional risk.
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
            Aligned by Design.
          </h2>
          <p className="paragraph">
            Traders should compete on skill, not on whether their broker is
            conflicted. The A-book+ model ensures your P&L is yours alone while
            keeping costs structurally lower than the rest of the industry.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="small" data={cardsData} />
        </div>
      </BlockWithCards>
      {/* Block With 4 cards Ends */}

      {/* Multipurpose Block for right image */}

      {/* Multipurpose Block for right image Ends */}

      {/* Section PTO */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="On Toxic Flow"
        blockParagraph="We welcome profitable traders. The only flow we can’t work with is toxic flow—latency grabs, arbitrage games, or anything built on exploiting pricing delays. Everything else—swing, day, systematic, discretionary—is fair game."
        btnText="Request Invite"
        btnUrl="#"
      >
        <Image
          src="/img/person-evolution-block.jpg"
          width={620}
          height={430}
          alt=""
        />
      </BlockWithLists>
      {/* ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="The right flow builds stability. Profitable flow strengthens it further." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock vAlign="start" rtl={false} blockImgUrl="/img/img-angus.jpg">
        <h2>A-Book+ in Action</h2>
        <p>A client buys 10 lots of EURUSD at 1.06500.</p>

        <ul>
          <li>The client is filled at that VWAP price.</li>
          <li>
            On our side, we place an offsetting order to sell 10 lots at 1.06501
            across our liquidity stack.
          </li>
          <li>
            If the market trades back down, that order is filled, and we&apos;ve
            hedged at 1.06501.
          </li>
          <li>
            The client remains long from 1.06500, untouched. We&apos;ve captured
            spread on the hedge leg.
          </li>
        </ul>

        <p>
          Multiply this across thousands of trades, and you get consistent,
          low-risk yield—without ever crossing interests with client
          performance.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section More value real alignment */}
      <MoreValueRealAlignment />
      {/* Section More value real alignment ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Breaking the B-Book Model</h2>
        <p>
          Legacy B-book brokers profit from client losses, warehouse billions in
          risk, and recycle second-hand liquidity. It makes their earnings
          volatile, their execution conflicted, and their rewards unsustainable.
        </p>
        <p>
          Afterprime is built different: pure A-book+, prime broker access, real
          liquidity, and yield from spread capture—not client attrition. Our
          foundation is simple: your success is never our loss.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="We don’t warehouse your risk. We warehouse trust." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Execution Becomes Alignment"
        cardParagraph="“We’ve been pure A-book since 2012. That foundation made it possible to build the first pay-to-trade model—fair, conflict-free, and aligned with traders from day one.”"
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
