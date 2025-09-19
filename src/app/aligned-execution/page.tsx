import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Align Incentives",
  description: "Description Goes here",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/align-incentives`,
  },
};

import Faq from "@/components/faq/Faq";
import Btn from "@/components/ui/Button";
import InnerBanner from "@/components/inner-banner/InnerBanner";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import ContentBlock from "@/components/content-block/ContentBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import BlockWithCards from "@/components/content-block-with-cards/BlockWithCards";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import type { CardDataObject } from "@/types/cardObject";
import { MoreValueRealAlignment } from "@/components/home-sections/MoreValueRealAlignment";
import FoundersCard from "@/components/founder-card/FounderCard";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";

export default function AlignedExecution() {
  const BannerImage = "/img/banner-why-we-exist.jpg";
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

  //Align Execution Cards
  const alignExecutionCards: CardDataObject[] = [
    {
      title: "No Conflict",
      paragraph: "We do not run a b-book or profit from client losses",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Verified Costs",
      paragraph: "Costs are transparent and independently audited.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Deep Liquidity",
      paragraph: " Depth designed for scale, not retail churn.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Custom Streams",
      paragraph: "Bespoke order books and depth for high volume traders.",
      ctaLabel: "",
      ctaLink: "",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner bannerImgUrl={BannerImage}>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Aligned Execution</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Clean, consistent, and aligned — the way trading should be
        </p>
        <Btn
          href="#"
          varient="primary-ghost"
          size="large"
          isArrowVisible={true}
        >
          Request Invite
        </Btn>
      </InnerBanner>
      {/* Ends */}

      {/* Generic Intro Block */}
      <GenericIntroBlock
        blockTitle="Traders control their strategy; brokers control execution. In conflicted models, that’s where the edge is lost. "
        blockParagraph="When brokers hold the execution lever, misaligned incentives distort the game. Alignment removes that distortion. It ensures execution reflects the market, not the broker’s book — so outcomes are decided by strategy, not by structural conflict."
      />
      {/* Ends */}

      {/* Content Image Block = Engineering for Alignment */}
      <ContentBlock rtl={false} blockImgUrl="/img/img-bryan-2.jpg">
        <h2>Engineered for Alignment</h2>
        <p>
          Trading systems work best when structure eliminates conflict.
          Execution should be measurable, transparent, and precise — not shaped
          by hidden incentives.
        </p>
        <p>
          We custom-build our order books and pricing infrastructure to create
          conditions that match institutional standards.{" "}
        </p>
        <p>
          Spreads are kept razor-thin and every flow event is managed with
          precision. Alignment isn’t a feature. It’s the architecture.
        </p>
        <Btn href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </Btn>
      </ContentBlock>
      {/* Content Image Block Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Markets are already unpredictable. Execution shouldn’t be." />
      {/* Highlight Text Ends */}

      {/* Align Execution Fundamental */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            Aligned Execution Fundamentals
          </h2>
          <p className="paragraph">
            Execution alignment isn&apos;t theory — it&apos;s measurable.
            Traders who know their broker isn&apos;t conflicted can size up,
            scale strategies, and trust their results.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator
            type="bold"
            cardSize="regular"
            data={alignExecutionCards}
          />
        </div>
      </BlockWithCards>
      {/* Align Execution Fundamental ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Alignment ensures trading reflects skill and strategy, not structural noise." />
      {/* Highlight Text Ends */}

      {/* Content Image Block = Flow as source of value */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Flow as a Source of Value</h2>
        <p>
          In conflicted models, flow is treated as risk — something to defend
          against, managed in ways that create friction for traders. That
          distortion undermines both execution quality and trust.
        </p>
        <p>
          In an aligned model, flow is an asset. By routing trades into deep
          liquidity, we convert that flow into measurable value. This is the
          foundation of our pay-to-trade framework: clean execution generates
          yield that can be shared back with clients.
        </p>
      </ContentBlock>
      {/* Content Image Block Ends */}

      {/*  */}
      <MoreValueRealAlignment />
      {/*  */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Alignment is the bridge between cleaner execution and pay-to-trade rewards." />
      {/* Highlight Text Ends */}

      {/* Content Image Block = Engineering for Alignment */}
      <ContentBlock rtl={false} blockImgUrl="/img/chi-img-2.jpg">
        <h2>Alignment Scales, Conflict Breaks</h2>
        <p>
          Models built on conflict are unstable by design. They rely on
          volatility in client outcomes to sustain broker revenue. That
          instability forces short-term thinking, hidden frictions, and cycles
          that cannot last.
        </p>
        <p>
          Aligned execution is structurally different. Incentives converge,
          liquidity deepens, and pricing precision improves with scale.
        </p>

        <Btn href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </Btn>
      </ContentBlock>
      {/* Content Image Block Ends */}

      {/* Content Image Block = Flow as source of value */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>The Bigger Picture</h2>
        <p>
          Aligned execution is more than a feature — it&apos;s a structural
          reset. It moves the industry:
        </p>
        <ul className="ulli">
          <li>From conflicted risk models to neutral order routing.</li>
          <li>From opaque fills to verifiable execution data.</li>
          <li>From charging commissions to paying on flow.</li>
          <li>From traders as product to traders as partners.</li>
        </ul>
        <p>
          We don&apos;t expect to be alone on this path. We do intend to be the
          first to prove it works.
        </p>
      </ContentBlock>
      {/* Content Image Block Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Incentive alignment isn’t optional. It’s the core architecture of trust." />
      {/* Highlight Text Ends */}

      {/* Founder Card */}
      <FoundersCard
        cardTitle="The Architecture of Clean Trading"
        cardParagraph="“Aligned execution isn’t an add-on, it’s structural. We’ve designed a system where aligned incentives form the architecture, and trust is the natural outcome.”"
      />
      {/* Founder Card Ends */}

      {/* Section Google Review */}
      <GoogleReview />
      {/* Section Google Review ends */}

      {/* CTA Section */}
      <BottomCta />
      {/* CTA Section Ends */}

      <Faq faqSubject="Aligned Execution FAQ" faqObjectsToReceive={faqData} />
    </>
  );
}
