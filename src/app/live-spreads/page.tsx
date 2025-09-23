import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/markets/forex`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import LivePricingAllTable from "@/components/live-pricing-tables/LivePricingAll";
import ContentBlock from "@/components/content-block/ContentBlock";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import BlockWithCards from "@/components/content-block-with-cards/BlockWithCards";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import type { CardDataObject } from "@/types/cardObject";
import { MoreValueRealAlignment } from "@/components/home-sections/MoreValueRealAlignment";

export default function LiveSpreads() {
  //4 Cards data
  const dataCards: CardDataObject[] = [
    {
      title: "Conflict-Free",
      paragraph: "No internalization, no inflated spreads.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Independently Verified",
      paragraph: "Benchmarked against third-party data.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Tighter by Design",
      paragraph: "Purpose-built order books priced below LP feeds.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Lowest All-In Cost",
      paragraph: "Zero commissions + raw spreads = industry’s lowest.",
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

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Live Spreads</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`Harness the volatility of the world's most-traded financial markets with Afterprime.`}
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
        blockTitle="Trade on zero-commission prices—streamed live, exactly as you receive them."
        blockParagraph="These aren’t marketing spreads or cherry-picked examples. They’re the raw, executable prices you trade on—streamed live without edits. Before you test your strategy, you should be able to trust your cost."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Lowest cost isn’t a claim. It’s a data point, verified in public." />
      {/* Highlight Text Ends */}

      {/* Live Pricing Table */}
      <LivePricingAllTable />
      {/* Live Pricing Table Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Where traders shape the broker in real time." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/abstract-1.jpg">
        <h2>Order Books Built for Traders</h2>
        <p>
          Our liquidity is aggregated from prime brokers, tier-one banks,
          non-banks, and exchanges. We build our own order books to price
          tighter than our LPs and then publish those spreads live. No mark-ups,
          no cherry-picking, no latency tricks. The numbers you see are the
          numbers you trade.
        </p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Block With 4 cards */}
      {/* Align Execution Fundamental */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            The Baseline for Profitability
          </h2>
          <p className="paragraph">
            {`Spreads aren’t just a line on a screen—they’re the baseline for profitability. One pip wider, and your edge erodes. One pip tighter, and your P&L compounds.`}
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="regular" data={dataCards} />
        </div>
      </BlockWithCards>
      {/* Align Execution Fundamental ends */}
      {/* Block With 4 cards Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Every pip saved is P&L preserved." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/abstract-4.jpg">
        <h2>{`Market or Better Pricing`}</h2>
        <p>
          {`Spreads are the first cost every trader pays. Most brokers disguise them with averages, delayed feeds, or “from” numbers that rarely exist in live trading. Afterprime does the opposite—we stream real, executable spreads across pairs, verified against independent benchmarks.`}
        </p>
        <p>
          {`What you see isn’t a demo or a snapshot. It’s the same zero-commission pricing your account receives in real time.`}
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* More value Real alignment */}
      <MoreValueRealAlignment />
      {/* More value Real alignment Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Engineered spreads. Independent proof. Costs that hold up under scrutiny." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/abstract-5.jpg">
        <h2>{`How it Works`}</h2>

        <ul>
          <li>{`We pull pricing from multiple prime brokers, banks, non-banks, and exchanges.`}</li>
          <li>{`Our engine builds tighter spreads than individual LP quotes.`}</li>
          <li>{`Those prices are streamed directly to clients, without delay or smoothing.`}</li>
          <li>{`Independent data confirms we’re consistently cheaper than the competition.`}</li>
        </ul>
        <p>
          {`This isn’t about optics—it’s about engineering. By compressing cost at the structural level, we deliver spreads that stand up to scrutiny in real time.`}
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Why spreads are so important to traders."
        cardParagraph="“Tighter spreads mean lower transaction costs, which can have a significant impact on traders' profitability in the long run”"
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
