import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/kyc-aml`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import Section from "@/components/section/Section";
import { SectionTextContent } from "@/components/section/section-text-content/SectionTextContent";
import Button from "@/components/ui/Button";
import Lists from "@/components/ui/Lists";
import Faq from "@/components/faq/Faq";

export default function kycAml() {
  //KYC LISTS
  const kycLists = [
    `Identity document (Primary ID) examples:
Passport | National ID | Driver's Licens`,
    `Proof of Address examples:
Bank or Credit Card Statement | Utility Bill | Government-Issued Document`,
  ];

  const faqLists = [
    {
      question:
        "How is Afterprime able to offer the lowest all-in trading costs?",
      answer:
        "We’ve built our own pricing infrastructure and order books, giving us tighter spreads than most LPs. Combined with zero commissions and flow rewards, it results in the lowest verified all-in cost globally — without relying on B-book revenue.",
    },
    {
      question: "Do you really pay traders to trade? How does that work?",
      answer:
        "We’ve built our own pricing infrastructure and order books, giving us tighter spreads than most LPs. Combined with zero commissions and flow rewards, it results in the lowest verified all-in cost globally — without relying on B-book revenue.",
    },
    {
      question:
        "What’s the difference between your model and typical IB rebates?",
      answer:
        "We’ve built our own pricing infrastructure and order books, giving us tighter spreads than most LPs. Combined with zero commissions and flow rewards, it results in the lowest verified all-in cost globally — without relying on B-book revenue.",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">AML / CTF / KYC Policies</span>
        </h1>
        <p
          className="paragraph max-w-[800px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`In accordance with the Anti-Money Laundering and Counter Terrorism Financing laws`}
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
        blockTitle={`We are required to verify your identity and current residential address prior to trading.`}
        blockParagraph={`In accordance with the Anti-Money Laundering and Counter Terrorism  Financing laws, we are required to verify your identity and current  residential address prior to trading.`}
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Afterprime Ltd (Seychelles company registration number 8426189-1)." />
      {/* Highlight Text Ends */}

      <Section noiseEffect={true} contentAlign="start" container="boxed">
        <SectionTextContent className="max-w-[400px]">
          <h2>Verifying Your Identity.</h2>
          <p>
            Your Primary ID must show full name and date of birth, and full name
            must match your application.
          </p>
          <Button varient="primary-ghost" isArrowVisible={true}>
            Request Invite
          </Button>
        </SectionTextContent>

        {/* Right */}
        <div>
          <Lists bulletVarient="arrow-blue" listItems={kycLists} />
          <p className="text-[16px] opacity-68 mt-15">
            {`Your Proof of Address must be issued within the last 120 days (6
            months), and clearly show your full name and residential address. We
            can accept another form of primary ID but this must contain your
            residential address. Proof of ID must be valid for at least 6 months
            at the time of submission.`}
          </p>
        </div>
      </Section>

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Afterprime Ltd (Seychelles company registration number 8426189-1)." />
      {/* Highlight Text Ends */}

      <Faq
        faqSubject="Frequently Asked Question on KYC"
        faqObjectsToReceive={faqLists}
      />
    </>
  );
}
