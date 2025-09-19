import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Lowest Cost Verified",
  description: "Description Goes here",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/lowest-cost-verified`,
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

export default function LowestCostVerified() {
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
      title: "Global #1",
      paragraph: "Ranked lowest all-in cost across major FX pairs",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Verified Costs",
      paragraph: "Independent benchmarks confirm our position",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Unaltered Flow",
      paragraph: "Quotes passed clean, without distortion.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Scalable Edge",
      paragraph: "Savings compound as volume grows.",
      ctaLabel: "",
      ctaLink: "",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner bannerImgUrl={BannerImage}>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Lowest Costs — Verified</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Execution efficiency that isn&apos;t claimed — it&apos;s measured.
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
        blockTitle="Every basis point saved across thousands of trades compounds into measurable performance. "
        blockParagraph="Our costs are not marketing numbers — they are independently audited and ranked #1 globally by ForexBenchmark. The result is clarity traders can build on: verified data, consistent pricing, and the lowest all-in cost structure in the market."
      />
      {/* Ends */}

      {/* Content Image Block = Engineering for Alignment */}
      <ContentBlock rtl={false} blockImgUrl="/img/img-bryan-2.jpg">
        <h2>Cost Efficiency as Structure</h2>
        <p>
          Every fraction of a pip compounds. The lower your costs, the more of
          your strategy&apos;s edge is preserved. That&apos;s why cost
          efficiency isn&apos;t cosmetic — it&apos;s structural to long-term
          performance.
        </p>
        <p>
          At Afterprime, orders route directly into institutional liquidity,
          spreads stay razor-thin, and costs are independently verified by
          ForexBenchmark. The data confirms what we&apos;ve engineered:
          Afterprime leads the industry in all-in cost.
        </p>
        <Btn href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </Btn>
      </ContentBlock>
      {/* Content Image Block Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Lowest cost isn’t a claim. It’s a data point, verified in public." />
      {/* Highlight Text Ends */}

      {/* Align Execution Fundamental */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            Evidence Over Assumptions
          </h2>
          <p className="paragraph">
            Cost should be the one certainty traders can lock in. Strategy,
            markets, and risk will always fluctuate — but the foundation must be
            transparent and stable.
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
      <HighlightBlockQuote textValue="Every pip saved is P&L preserved." />
      {/* Highlight Text Ends */}

      {/* Content Image Block = Flow as source of value */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Efficiency at Scale</h2>
        <p>
          Our cost advantage is engineered, not accidental. We construct our own
          order books from primary liquidity sources, aggregate pricing across
          multiple tiers, and hedge cleanly to maintain stability.
        </p>
        <p>
          Independence matters just as much as infrastructure. External
          benchmarking verifies our numbers daily, eliminating the gap between
          marketing claims and trader reality. This is not cost compression for
          show — it is cost efficiency at scale.
        </p>
      </ContentBlock>
      {/* Content Image Block Ends */}

      {/*  */}
      <MoreValueRealAlignment />
      {/*  */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Engineered spreads. Independent proof. Costs that hold up under scrutiny." />
      {/* Highlight Text Ends */}

      {/* Content Image Block = Engineering for Alignment */}
      <ContentBlock rtl={false} blockImgUrl="/img/chi-img-2.jpg">
        <h2>Breaking from Legacy Models</h2>
        <p>
          Traditional brokers charge commissions or markup the spread. They rely
          on internalising flow to make money.
        </p>
        <p>Those structures and undermine transparency.</p>
        <p>
          Afterprime proves a cleaner path: costs that are razor-thin, measured
          independently, and made possible by alignment rather than conflict.
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
          The lowest cost structure isn&apos;t a feature — it&apos;s the
          baseline for a new kind of trading model. Verified data redefines what
          traders should expect from their broker.
        </p>
        <ul className="ulli">
          <li>From opaque claims to independently verified pricing.</li>
          <li>From hidden fees to transparent cost structures.</li>
          <li>From marketing spin to audited benchmarks.</li>
          <li>From inflated costs to the lowest all-in rates.</li>
        </ul>
        <p>
          That&apos;s not a promise — it&apos;s proof, measured daily and
          visible to every trader.
        </p>
      </ContentBlock>
      {/* Content Image Block Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Verification turns cost from a claim into a contract." />
      {/* Highlight Text Ends */}

      {/* Founder Card */}
      <FoundersCard
        cardTitle="The Architecture of Clean Trading"
        cardParagraph="“We’ve built systems to compress costs to their minimum. Independent verification makes that work visible. Lowest cost isn’t an angle — it’s the standard we hold ourselves to.”"
      />
      {/* Founder Card Ends */}

      {/* Section Google Review */}
      <GoogleReview />
      {/* Section Google Review ends */}

      {/* CTA Section */}
      <BottomCta />
      {/* CTA Section Ends */}

      <Faq
        faqSubject="Lowest Cost Verified FAQ"
        faqObjectsToReceive={faqData}
      />
    </>
  );
}
