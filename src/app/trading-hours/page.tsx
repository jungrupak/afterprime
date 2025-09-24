import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/trading-hours`,
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
import { TradingHoursSection } from "@/components/trading-hours-section/TradingHours";
import DefinationLists from "@/components/ui/DefinationList";
import Section from "@/components/section/Section";
import { SectionTextContent } from "@/components/section/section-text-content/SectionTextContent";
import Button from "@/components/ui/Button";
import type { CardDataObject } from "@/types/cardObject";

export default function TradingHours() {
  //Trading Hours PDF card Data
  const pdfCards: CardDataObject[] = [
    {
      title: "September",
      paragraph: "Holiday Trading Hours 2025",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "August",
      paragraph: "Holiday Trading Hours 2025",
      ctaLabel: "Download",
      ctaLink: "#",
    },
    {
      title: "July",
      paragraph: "Holiday Trading Hours 2025",
      ctaLabel: "Download",
      ctaLink: "#",
    },
  ];

  //Defination List
  const definationLists = [
    {
      label: "Daily Rollover ",
      description:
        "At 5 p.m. New York time, positions roll and swap rates apply. Liquidity thins, spreads widen, and fills can be less predictable.",
    },
    {
      label: "Monday Open",
      description:
        "Liquidity builds gradually as markets reopen. Early orders can face wider spreads until books normalize",
    },
    {
      label: "Friday Close ",
      description:
        "Liquidity tapers off as institutions square books, creating thinner depth and larger swings.",
    },
    {
      label: "News Releases",
      description:
        "Economic data and central bank announcements can shift spreads and slippage in seconds.",
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
          <span className="font-[600]">Trading Hours</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`CFDs are leveraged products so you’re only required to put up a fraction of your trade’s total value as margin to open your position.`}
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
        blockTitle={`Markets don’t sleep—but liquidity does. Timing is as critical as strategy.`}
        blockParagraph={`We publish trading hours transparently across all products: no hidden downtime, no surprise gaps. From Sunday night open to Friday close, you’ll see exactly when instruments trade, when liquidity is deepest, and when conditions tighten.`}
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Lowest cost isn’t a claim. It’s a data point, verified in public." />
      {/* Highlight Text Ends */}

      <TradingHoursSection pdfCards={pdfCards} />

      {/* #### */}
      <Section
        noiseEffect={true}
        container="noBoxed"
        contentAlign="unset"
        sectionClass=""
        containerClass="gap-12 md:gap-20"
      >
        {/* Left */}
        <SectionTextContent className="md:max-w-[550px]">
          <h2>{`Market Rhythms`}</h2>
          <p>{`Markets run 24/5, but conditions aren’t flat. Every day brings its own rhythm—rollovers, opens, closes, and the impact of scheduled events.`}</p>
          <p>{`Trading isn’t just about direction—it’s about timing. Knowing when the market is structured for clean execution, and when it isn’t, is part of managing risk.`}</p>
          <Button size="regular" varient="primary-ghost" isArrowVisible={true}>
            Request Invite
          </Button>
        </SectionTextContent>
        {/* Left Ends */}

        {/* Right */}
        <div>
          <h2 className="" style={{ fontWeight: "600" }}>
            Volatile Windows
          </h2>
          <DefinationLists
            listItems={definationLists}
            bulletVarient="arrow-blue"
          />
        </div>
        {/* Right Ends */}
      </Section>

      {/* #### */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Engineered spreads. Independent proof. Costs that hold up under scrutiny." />
      {/* Highlight Text Ends */}

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
