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

export default function LicenseAndRegulations() {
  //Help options cards
  const regulationsCards: CardDataObject[] = [
    {
      title: "Audit",
      paragraph:
        "Afterprime conducts regular independent external audits of its financial and compliance arrangements.",
      ctaLabel: "",
      ctaLink: "",
      ctaOpenTarget: "",
    },

    {
      title: "Good Corporate Citizen",
      paragraph:
        " We are good corporate citizens and take our obligations as Financial Services Licences holders seriously Financial Services Licences holders.",
      ctaLabel: "",
      ctaLink: "",
      ctaOpenTarget: "",
    },
    {
      title: "Clean Sheet",
      paragraph:
        " We have no adverse regulatory or judicial findings against us from any financial regulator, government body or court of law.",
      ctaLabel: "",
      ctaLink: "",
      ctaOpenTarget: "",
    },
  ];

  //Table data
  const regulationTableData = [
    { col1: "Contracting Entity", col2: "Afterprime Pty. Ltd." },
    { col1: "Contracting Entity", col2: "FSA" },
    { col1: "Client Classification", col2: "Retail and Wholesale" },
    { col1: "Segregated Client Trust Account", col2: "Yes" },
    { col1: "Banking Partner(s)", col2: "ABSA (Seychelles) Limited" },
    {
      col1: "Deposit compensation scheme? (limit)",
      col2: "No compensation scheme",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">License & Regulation</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`The Afterprime group of companies are licensed and regulated by leading  international regulatory bodies, `}
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
        blockTitle={`allowing you to trade knowing your  financial interests are overseen.`}
        blockParagraph={`Afterprime Ltd (Seychelles company registration number 8426189-1).`}
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Afterprime Ltd (Seychelles company registration number 8426189-1)." />
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
          <p>{`The safeguarding of client money is of paramount importance to  Afterprime. All client money is managed in accordance with client money  laws and kept separate from company funds. `}</p>
          <p>{`The laws, rules, and  protections afforded to your client money vary based on the Afterprime  entity you are contracted with.`}</p>
        </SectionTextContent>
        {/* Left ends */}

        {/* Right */}
        <div>
          <TableUi tableRowData={regulationTableData} />
        </div>
        {/* Right ends */}
      </Section>
      {/* Section Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Afterprime Ltd (Seychelles company registration number 8426189-1)." />
      {/* Highlight Text Ends */}
    </>
  );
}
