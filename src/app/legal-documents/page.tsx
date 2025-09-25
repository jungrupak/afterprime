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
      paragraph:
        "Clear terms that define your trading relationship with Afterprime.",
      ctaLabel: "",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "AML Policy",
      paragraph:
        "Our AML commitment ensures compliance and financial integrity worldwide.",
      ctaLabel: "",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Complain Handling Policy",
      paragraph:
        "A transparent process for resolving client concerns quickly and fairly.",
      ctaLabel: "",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Conflicts of Interest Policy",
      paragraph:
        "Outlining how we manage and disclose potential conflicts of interest.",
      ctaLabel: "",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Risk Disclosure Statement",
      paragraph:
        "Understand the risks of trading CFDs before entering the markets.",
      ctaLabel: "",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Corporate Account",
      paragraph:
        "Everything you need to know about opening a corporate account.",
      ctaLabel: "",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Joint Account",
      paragraph:
        "Guidelines for managing and operating a joint trading account.",
      ctaLabel: "",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "FSA Legal Entity",
      paragraph:
        "Afterprime Ltd (Seychelles 8426189-1), authorised Securities Dealer under FSA licence SD057.",
      ctaLabel: "",
      ctaLink: "",
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
          {`Before you open an account ,  you should read the disclosure and legal documents.`}
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

      {/* #### */}
      <SectionWithCards
        numberOfCardInRow={3}
        headingLayout="LeftAligned"
        sectionHeading={
          <h2 className="h2-size mb-6">
            <span>Afterprime Global Legal Documents.</span>
          </h2>
        }
        cardItems={legalDocsCards}
      />
      {/* #### */}
    </>
  );
}
