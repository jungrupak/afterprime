import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/swaps`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import Section from "@/components/section/Section";
import { SectionTextContent } from "@/components/section/section-text-content/SectionTextContent";
import Button from "@/components/ui/Button";
import { TableDataRewardFlow } from "@/components/table-reward-flow/TableAndData";
import { swapsData } from "@/data/swaps";

export default function Swaps() {
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

  //Master Table Data
  const swapData = swapsData;
  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Swaps</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`Swaps are overnight financing costs, charged or credited based on the position you hold.`}
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
        blockTitle={`Overnight costs can shape every trade. Managing them is part of the edge.`}
        blockParagraph={`We publish swap rates openly across all products: no hidden mark-ups, no guesswork. They show exactly what you’ll pay or earn, so holding positions overnight is always clear and predictable.`}
      />
      {/* Generic IntroBlock Ends */}

      {/* Swap Table */}

      {/* Table Content Section */}
      <TableDataRewardFlow
        sectionTitle="SWAPs"
        // sectionParagraph=" See exactly what you earn per pair, transparently and in real time."
        tableRowData={swapData}
      />
      {/* Table Content Section Ends */}

      {/* Swap Table */}

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
          <h2>{`What is a Swap Rate?`}</h2>
          <p>{`A swap rate is the interest paid or received for holding a position overnight. For currency pairs, interest is paid on the currency sold and earned on the currency bought. Swap rates are influenced by the interbank spread and cross-currency basis.`}</p>
          <p>{`Rates are quoted per standard lot (1.0).
Note: Wednesdays are triple swap days for FX pairs, reflecting weekend market closures.CFDs.`}</p>
          <Button size="regular" varient="primary-ghost" isArrowVisible={true}>
            Request Invite
          </Button>
        </SectionTextContent>
        {/* Left Ends */}

        {/* Right */}
        <SectionTextContent className="md:max-w-[550px]">
          <h2>{`What is a Financing Fee?`}</h2>
          <p>{`A financing fee is the cost of keeping a CFD position open overnight. It gives traders access to leveraged products by paying only an initial margin, with the fee covering the borrowing or lending costs of the underlying asset. Dividend adjustments also apply — long positions receive a positive adjustment, while short positions receive a negative one.`}</p>
          <p>{`Please note: on Fridays, financing fees are charged at three times the normal rate to account for the weekend.`}</p>
        </SectionTextContent>
        {/* Right Ends */}
      </Section>

      {/* #### */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Why Swaps Matter to Traders"
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
