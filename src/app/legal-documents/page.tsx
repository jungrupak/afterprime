import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/regal-documents`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import type { CardDataObject } from "@/types/cardObject";
import { SectionWithCards } from "@/components/section-with-cards/SectionWithCards";

export default function LegalDocuments() {
  //Help options cards
  const legalDocsCards: CardDataObject[] = [
    {
      title: "Clinet Service Agreement",
      paragraph: "",
      ctaLabel: "Donwload Pdf",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Complain Handling Policy",
      paragraph: "",
      ctaLabel: "Donwload Pdf",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Conflicts of Interest Policy",
      paragraph: "",
      ctaLabel: "Donwload Pdf",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Risk Disclosure Statement",
      paragraph: "",
      ctaLabel: "Donwload Pdf",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Corporate Account PDF Form",
      paragraph: "",
      ctaLabel: "Donwload Pdf",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Joint Account  PDF Form",
      paragraph: "",
      ctaLabel: "Donwload Pdf",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Legal Documents</span>
        </h1>
        <p
          className="paragraph max-w-[800px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`Please note that our legal documents vary depending on which Afterprime  entity you hold your trading account with and the regulations that apply to you. `}
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
        blockTitle={`Before you open an account ,  you should read the disclosure and legal documents.`}
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
              Afterprime Global
              <br />
              Legal Documents.
            </span>
          </h2>
        }
        sectionSubtitle={`You’re trading on the world’s lowest-cost platform — and getting paid for your flow.`}
        cardItems={legalDocsCards}
      />
      {/* #### */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Afterprime Ltd (Seychelles company registration number 8426189-1)." />
      {/* Highlight Text Ends */}
    </>
  );
}
