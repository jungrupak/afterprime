import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/license-and-regulations`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import type { CardDataObject } from "@/types/cardObject";
import { SectionWithCards } from "@/components/section-with-cards/SectionWithCards";
import Section from "@/components/section/Section";
import { SectionTextContent } from "@/components/section/section-text-content/SectionTextContent";
import TableUi from "@/components/ui/Table";
import ContentBlock from "@/components/content-block/ContentBlock";
import Button from "@/components/ui/Button";

export default function LicenseAndRegulations() {
  //Help options cards
  const regulationsCards: CardDataObject[] = [
    {
      title: "Audit",
      paragraph:
        "Afterprime conducts regular independent external audits of its financial and compliance arrangements to ensure regulatory compliance.",
      ctaLabel: "",
      ctaLink: "",
    },

    {
      title: "Good Corporate Citizen",
      paragraph:
        "  We are good corporate citizens and take our obligations as Financial Services Licences holders seriously.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Clean Sheet",
      paragraph:
        " We have no adverse regulatory or judicial findings against us from any financial regulator, government body or court of law.",
      ctaLabel: "",
      ctaLink: "",
    },
  ];

  //Table data
  const regulationTableData = [
    { col1: "Contracting Entity", col2: "Afterprime Pty. Ltd." },
    { col1: "Contracting Entity", col2: "FSA" },
    { col1: "Client Classification", col2: "Retail and Wholesale" },
    { col1: "Segregated Client Trust Account", col2: "Yes" },
    { col1: "Banking Partner(s)", col2: "ABSA (Seychelles) Limited" },
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">License & Regulation</span>
        </h1>
        <p
          className="paragraph max-w-[800px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`The Afterprime group of companies are licensed and regulated by leading  international regulatory bodies.`}
        </p>
        <MainButton
          href="#"
          varient="primary-ghost"
          size="large"
          isArrowVisible={true}
        >
          Live Chat
        </MainButton>
      </InnerBanner>
      {/* Hero Banner Ends */}

      {/* Generic IntroBlock */}
      <GenericIntroBlock
        blockTitle={`FSA licensed and regulated, providing safety, compliance, and market integrity.`}
        blockParagraph={``}
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <ContentBlock rtl={false} blockImgUrl="/img/team-img.jpg">
        <h2>Licensed Entities in Our Group</h2>
        <p>{`Afterprime Ltd (Seychelles company registration number 8426189-1) is a Securities Dealer, authorised by the Financial Services Authority (FSA) with license number SD057.`}</p>
        <p>{`Our group entity, Argamon Markets Pty Ltd, also holds an Australian Financial Services License (AFSL 404300) issued by ASIC in Australia.`}</p>
        <Button varient="primary-ghost" isArrowVisible={true} href="#">
          Request Invite
        </Button>
      </ContentBlock>
      {/* Highlight Text Ends */}

      {/* #### */}
      <SectionWithCards
        numberOfCardInRow={3}
        headingLayout="TwoCol"
        sectionHeading={
          <h2 className="h2-size mb-6">
            <span>
              We Practice Good <br />
              Governance
            </span>
          </h2>
        }
        sectionSubtitle={`The group and its representatives are in good standing with its regulators; ASIC and FSA.`}
        cardItems={regulationsCards}
      />
      {/* #### */}

      {/* Section */}
      <Section
        noiseEffect={true}
        container="noBoxed"
        contentAlign="unset"
        sectionClass=""
        containerClass="gap-12 md:gap-30"
      >
        {/* Left */}
        <SectionTextContent>
          <h2>Client Money</h2>
          <p>{`The safeguarding of client money is of paramount importance to  Afterprime. All client money is managed in accordance with client money  laws and kept separate from company funds.`}</p>
        </SectionTextContent>
        {/* Left ends */}

        {/* Right */}
        <div>
          <TableUi tableRowData={regulationTableData} />
        </div>
        {/* Right ends */}
      </Section>
      {/* Section Ends */}
    </>
  );
}
