import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/margins-and-leverages`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import ContentBlock from "@/components/content-block/ContentBlock";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import { MoreValueRealAlignment } from "@/components/home-sections/MoreValueRealAlignment";
import SectionTable from "@/components/section-table/SectionTable";
import BlockWithLists from "@/components/block-multipurpose/BlockWithLists";
import Accordion from "@/utils/accordion/Accordion";
import type { AccordionObjectsKeys } from "@/utils/accordion/Accordion";

export default function MarginsAndLeverages() {
  //Accordion data
  const deepDiveExplained: AccordionObjectsKeys[] = [
    {
      question: "Margin, Explained",
      answer:
        "We’ve built our own pricing infrastructure and order books, giving us tighter spreads than most LPs. Combined with zero commissions and flow rewards, it results in the lowest verified all-in cost globally — without relying on B-book revenue. Swap charges are released on a daily basis by financial institutions  that we work with. They are calculated based on the charges we incur to  roll the positions in the market. The swap charge is measured on a  standard size of 1.0 lot.",
    },
    {
      question: "How to calculate Leverage",
      answer:
        "We’ve built our own pricing infrastructure and order books, giving us tighter spreads than most LPs. Combined with zero commissions and flow rewards, it results in the lowest verified all-in cost globally — without relying on B-book revenue. Swap charges are released on a daily basis by financial institutions  that we work with. They are calculated based on the charges we incur to  roll the positions in the market. The swap charge is measured on a  standard size of 1.0 lot.",
    },
  ];

  //Margin and Leverage Table data
  const marginAndLeverage = [
    { "Asset Class": "Forex", Margin: "1%", Leverage: "1:100" },
    { "Asset Class": "Metals", Margin: "1%", Leverage: "1:100" },
    { "Asset Class": "Indices", Margin: "1%", Leverage: "1:100" },
    { "Asset Class": "Commodities", Margin: "1%", Leverage: "1:100" },
    { "Asset Class": "Crypto", Margin: "33.3%", Leverage: "1:3" },
    { "Asset Class": "Shares", Margin: "20%", Leverage: "1:5" },
  ];
  const mnlTableHead = Object.keys(marginAndLeverage[0]);
  //Ends

  //Margin and Leverage Table data
  const marginCall = [
    { "Asset Class": "Forex", "Margin Call": "120%", "Stop Out Level": "80%" },
    { "Asset Class": "Metals", "Margin Call": "120%", "Stop Out Level": "80%" },
    {
      "Asset Class": "Indices",
      "Margin Call": "120%",
      "Stop Out Level": "80%",
    },
    {
      "Asset Class": "Commodities",
      "Margin Call": "120%",
      "Stop Out Level": "80%",
    },
    { "Asset Class": "Crypto", "Margin Call": "120%", "Stop Out Level": "80%" },
    { "Asset Class": "Shares", "Margin Call": "120%", "Stop Out Level": "80%" },
  ];
  const marginCallTableHead = Object.keys(marginCall[0]);
  //Ends

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
          <span className="font-[600]">Margin & Leverage</span>
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
        blockTitle={`Leverage is a tool, not a thrill ride. Used with discipline, it magnifies opportunity. `}
        blockParagraph={`Afterprime’s margin and leverage framework is designed to give professional traders the flexibility they need. We offer scalable leverage that respects both capital and risk, aligned with how institutional desks manage exposure.`}
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Lowest cost isn’t a claim. It’s a data point, verified in public." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/abstract-1.jpg">
        <h2>{`Breaking from Legacy Models`}</h2>
        <p>
          {`Legacy brokers dangle more than 1000:1 leverage as bait. It creates churn, not sustainability. `}
        </p>
        <p>{`The result is predictable: blown accounts that fuel B-book profits. Afterprime rejects that approach. Our structure rewards discipline and longevity—because aligned flow has more value than client attrition.`}</p>

        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Table Data Section Generic-- Margin and Leverage*/}
      <SectionTable
        sectionTitle="Margin & Leverage Specifications"
        sectionParagraph="CFDs are leveraged products so you’re only required to put up a fraction of your trade’s total value as margin to open your position."
        dataTableHead={mnlTableHead}
        dataTableRow={marginAndLeverage}
      />
      {/* Table Data Section Generic Ends */}

      {/* Table Data Section Generic --Margin Call */}
      <SectionTable
        sectionTitle="Margin Call and Stop Out Levels"
        sectionParagraph="CFDs are leveraged products so you’re only required to put up a fraction of your trade’s total value as margin to open your position."
        dataTableHead={marginCallTableHead}
        dataTableRow={marginCall}
      />
      {/* Table Data Section Generic Ends */}

      {/* Block Multipurpose - Block with Lists */}
      <BlockWithLists
        blockTitle="Deep Dive"
        blockParagraph="Learn how margins and leverage actually work—why they matter, how they scale, and the principles behind our framework."
        btnText="Request Invite"
        btnUrl="#"
      >
        <Accordion faqObjects={deepDiveExplained} answerFluid={false} />
      </BlockWithLists>
      {/* Block Multipurpose - Block with Lists ends */}

      {/* More value Real alignment */}
      <MoreValueRealAlignment />
      {/* More value Real alignment Ends */}

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
