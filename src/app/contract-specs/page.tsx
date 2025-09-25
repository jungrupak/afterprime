import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contract-specs`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import type { CardDataObject } from "@/types/cardObject";
import { SectionWithCards } from "@/components/section-with-cards/SectionWithCards";

export default function ContractSpecs() {
  //Trading Hours PDF card Data
  const pdfCards: CardDataObject[] = [
    {
      title: "Forex",
      paragraph: "Download Forex Specifications",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "Indices",
      paragraph: "Download Indices Specifications",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "Commodities",
      paragraph: "Download Commodities Specifications",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "Stocks",
      paragraph: "Download Stocks Specifications",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "Crypto",
      paragraph: "Download Crypto Specifications",
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
          <span className="font-[600]">Contract Specifications</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`Download our full Contract Specifications to view detailed trading conditions across all products.`}
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
        blockTitle={`Every trade is defined by its terms. Knowing them is part of the edge.`}
        blockParagraph={`We publish Contract Specifications openly across all products: no hidden conditions, no surprises. They show exactly what you’re trading — from margin and lot size to hours and tick value — so you always know the rules before you trade.`}
      />
      {/* Generic IntroBlock Ends */}

      {/* #### */}

      <SectionWithCards
        sectionHeading={
          <h2>
            <b className="font-[600]">Contract Specifications</b>
          </h2>
        }
        numberOfCardInRow={3}
        headingLayout="TwoCol"
        cardItems={pdfCards}
      />

      {/* #### */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Why Contract Specification Matters."
        cardParagraph="“Fair and transparent swap rates keep overnight costs predictable, which can have a significant impact on traders’ profitability in the long run.”"
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
