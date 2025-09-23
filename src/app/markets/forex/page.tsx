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
import LivePricingForexTable from "@/components/live-pricing-tables/LivePricingForex";
import ContentBlock from "@/components/content-block/ContentBlock";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import { TableDataRewardFlow } from "@/components/table-reward-flow/TableAndData";
import BlockWithLists from "@/components/block-multipurpose/BlockWithLists";
import Lists from "@/components/ui/Lists";
import { PlatformsSection } from "@/components/home-sections/PlatformSection";
import AdvantagesBlock from "@/components/advantages-block/AdvantagesBlock";

export default function Forex() {
  //const BannerImage = "/img/banner-about.jpg";

  //Feature Lists
  const symbolFeatureLists = [
    "Lowest all-in cost  with zero commissions",
    "Get paid to trade FX - a world’s first",
    "Go long or short with clean execution",
    "Institutional Spreads, verified in public",
    "24/5 global FX coverage",
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
          <span className="font-[600]">Forex Trading</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Institutional infrastructure, retail access. Trade FX as it should
          be—clean, transparent, and aligned.
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
        blockTitle="Forex is the world’s deepest market — $7 trillion traded daily across every timezone."
        blockParagraph="It’s where capital flows meet, liquidity concentrates, and opportunity scales. The result is an arena built for professionals: constant movement, transparent pricing, and the purest test of strategy and discipline."
      />
      {/* Generic IntroBlock Ends */}

      {/* Live Pricing Table */}
      <LivePricingForexTable />
      {/* Live Pricing Table Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Where traders shape the broker in real time." />
      {/* Highlight Text Ends */}

      {/* Earning Flow Table */}
      <TableDataRewardFlow
        sectionTitle="Get another PnL line on your trading"
        sectionParagraph=" See exactly what you earn per pair, transparently and in real time."
        categoryAsNavItem={["Majors", "Minors", "Exotics"]}
        tableColumnHeading={["Pairs", "USD $ per lot r/t Flow Reward"]}
        tableRowData={[
          {
            content: [
              { Pairs: "AUDUSD", "USD $ per lot r/t Flow Reward": "$0.3" },
              { Pairs: "CADUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "JPYUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "AUDUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "NZDUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
            ],
          },
          {
            content: [
              { Pairs: "NZDUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "NZDUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "NZDUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "NZDUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
            ],
          },
          {
            content: [
              { Pairs: "CADUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "JPYUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "AUDUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
              { Pairs: "NZDUSD", "USD $ per lot r/t Flow Reward": "$0.8" },
            ],
          },
        ]}
      />
      {/* Earning Flow Table Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/abstract-1.jpg">
        <h2>Infrastructure Built for FX</h2>
        <p>
          Forex is where the world&nbsp;s capital flows meet in real time—$7
          trillion traded daily across every timezone. Edges are won not just on
          strategy, but on cost and execution.
        </p>
        <p>
          Afterprime was built for this market. By running a pure A-book+ model,
          streaming zero-commission pricing, and aligning with top-tier
          liquidity providers, we give traders professional-grade conditions to
          scale their edge. This isn&nbsp;t a marketing spread—it&nbsp;s the
          live structure of the FX market, passed cleanly through.
        </p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Start */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="The Edge in FX"
        blockParagraph="Our execution model routes your orders straight to the market with zero commissions. By aggregating institutional liquidity and capturing spread efficiency, we give traders conditions built to scale."
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
          Forex isn&apos;t just another product for us—it&apos;s the core. We
          run an institutional setup anchored by multiple prime brokers and more
          than 26 liquidity providers.
        </p>
        <p>
          That depth lets us stream pricing and execution that hold up under
          scrutiny: tighter, cleaner, and more consistent than the retail norm.
          The structure isn&apos;t built to attract noise—it&apos;s built to
          help serious traders scale.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Block With 4 cards */}
      <AdvantagesBlock />
      {/* Block With 4 cards Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Clean execution turns the world’s deepest market into the fairest." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/img-angus.jpg">
        <h2>Transparent Execution</h2>
        <p>
          We aggregate liquidity across prime brokers, tier-one banks,
          non-banks, and exchanges. Our engine builds tighter order books than
          any single LP can provide, delivering the lowest all-in trading costs.
        </p>
        <p>
          Orders are filled at the VWAP shown, while we optimize the hedge leg
          to capture spread yield—never at the trader&apos;s expense.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/abstract-2.jpg">
        <h2>Breaking from Legacy Models</h2>
        <p>
          Legacy retail brokers run B-books, profiting directly from client
          losses. They advertise high leverage and “tight” spreads while
          warehousing risk and recycling second-hand liquidity. The result:
          inconsistent execution and unsustainable conditions.
        </p>
        <p>
          Afterprime rejects that model. Our FX infrastructure is institutional
          from the ground up—prime broker access, proprietary order book
          construction, and transparent pricing verified daily.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Clean execution turns the world’s deepest market into the fairest." />
      {/* Highlight Text Ends */}

      {/* Section Platforms */}
      <PlatformsSection />
      {/* Section Platforms */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Community First Since 2012"
        cardParagraph="“We started trading on internet forums and we’ve kept that DNA. Building in public is the natural extension—where traders hold us accountable, shape the product, and even trade strategies alongside us.”"
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
