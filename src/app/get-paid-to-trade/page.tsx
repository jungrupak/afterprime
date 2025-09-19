"use client";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import ContentBlock from "@/components/content-block/ContentBlock";
import { TableDataRewardFlow } from "@/components/table-reward-flow/TableAndData";
import { UspInContent } from "@/components/usp-in-content/UspInContent";
import BlockWithCards from "@/components/content-block-with-cards/BlockWithCards";
import FoundersCard from "@/components/founder-card/FounderCard";
import { MoreValueRealAlignment } from "@/components/home-sections/MoreValueRealAlignment";
import Faq from "@/components/faq/Faq";
import { howItWorksCards } from "@/utils/HowItWorksCardContent";
import BlockWithLists from "@/components/block-multipurpose/BlockWithLists";
import Lists from "@/utils/lists/Lists";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import { CardDataObject } from "@/types/cardObject";

export default function GetPaidToTrade() {
  const BannerImage = "/img/banner-about.jpg";
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
      <InnerBanner bannerImgUrl={BannerImage}>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Get Paid to Trade</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Most traders lose to fees. We built the first broker where your trades
          pay you back.
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
        blockTitle="Studies show 70–80% of traders lose money from  fees and costs eating into every strategy."
        blockParagraph="Spreads, commissions and slippage compound until even skilled traders are fighting an uphill battle. If you're trading at another broker, the harsh truth is this: your break-even point is already stacked against you."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Earn up to USD $36,000 a year  on 1000 lots/month —  that's before the savings from the world's lowest costs." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/elan-img.jpg">
        <h2>Costs Kill Strategies — How We Shift the Curve</h2>
        <p>
          With legacy brokers, spreads and commissions kill strategies before
          they even start. At Afterprime, the combination of lowest verified
          costs and flow rewards flips that equation — the profitability curve
          tilts in your favor. Your flow has real value, and instead of keeping
          it, we return it to you. That&apos;s what makes this trading aligned.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Table Content Section */}
      <TableDataRewardFlow
        sectionTitle="Get another PnL line on your trading"
        sectionParagraph=" See exactly what you earn per pair, transparently and in real time."
      />
      {/* Table Content Section Ends */}

      {/* Content Middle USP */}
      <UspInContent getUspData={uspDataObject} />
      {/* Content Middle USP Ends */}

      {/* How it Works */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            How It Works.
          </h2>
          <p className="paragraph">
            When you place a trade, your order creates value in the market.
            Legacy brokers keep that value — we share it.
          </p>
          <p className="paragraph">
            The result: zero commissions, lowest verified costs, and extra
            earnings on top of your PnL.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="regular" data={howItWorksCards} />
        </div>
      </BlockWithCards>
      {/* How it Works ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Even strategies that net flat can now generate consistent revenue through Flow Rewards." />
      {/* Highlight Text Ends */}

      {/* Section PTO */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="Post-Trade Optimisation (PTO)"
        blockParagraph="With our PTO technology, trades are filled  at better than market prices on zero commission. We then work your order into the market with the aim of capturing the spread. "
        btnText="Request Invite"
        btnUrl="#"
      >
        <Lists bulletStyle="arrow_blue" items={ptoLists} />
      </BlockWithLists>
      {/* Section PTO ends */}

      {/* Section More value real alignment */}
      <MoreValueRealAlignment />
      {/* Section More value real alignment ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Commission rebates are history. Lowest costs + Flow Rewards are the future." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/img-bryan.jpg">
        <h2>Lowest Costs — Verified</h2>
        <p>
          Independent data from ForexBenchmark confirms Afterprime ranks #1
          worldwide for all-in trading costs.
        </p>
        <ul className="ulli">
          <li>70% Lower cost than industry average.</li>
          <li>30% lower cost than 2nd best.</li>
        </ul>
        <p>
          While competitors still charge commissions or widen spreads,
          we&apos;ve proven we deliver the lowest verified cost. And then, we go
          further — returning part of your flow&apos;s value directly to you.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="For the first time, traders aren’t just customers — they’re participants in the market value chain." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Changing Brokerage Forever</h2>
        <p>
          Trading is hard enough without high costs stacking the deck. Lowering
          costs isn&apos;t just helpful — it&apos;s survival. When you add on
          Flow Rewards, the game changes.
        </p>
        <ul className="ulli">
          <li>No B-book. We never profit from client losses.</li>
          <li>
            No broker in trading history has combined lowest verified costs with
            payouts from order flow. This is the world&apos;s first.
          </li>
        </ul>
        <p>
          With Afterprime you&apos;re no longer just a customer. You&apos;re
          incentivised to provide liquidity to the market.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Over A Decade of Proven Alignment"
        cardParagraph="“For 13 years we’ve built around one goal: helping traders win. Now we’ve taken it further — the world’s lowest costs plus payouts from your flow.”"
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
