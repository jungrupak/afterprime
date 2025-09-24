import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/contact-us`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import type { CardDataObject } from "@/types/cardObject";
import { SectionWithCards } from "@/components/section-with-cards/SectionWithCards";
import ContentBlock from "@/components/content-block/ContentBlock";

export default function ContactUs() {
  //Help options cards
  const helpOptionCards: CardDataObject[] = [
    {
      title: "Help Center",
      paragraph:
        "Find in-depth information about trading terminals, deposits, withdrawals etc.",
      ctaLabel: "Help Center",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Instant Messager",
      paragraph:
        "Can't find the answers you're looking for? Ask our support team in live chat.",
      ctaLabel: "Live Chat",
      ctaLink: "#",
      ctaOpenTarget: "Self",
    },
    {
      title: "Discord",
      paragraph: "We profit on volume, not your losses — no B-book, ever.",
      ctaLabel: "Join Discord",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Contact Us</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          {`We’re excited about the future of financial markets, and trading technology, and eager to share this journey with our clients.`}
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
        blockTitle={`Every basis point saved across thousands of trades compounds into measurable performance.`}
        blockParagraph={`Our costs are not marketing numbers — they are independently audited and ranked #1 globally by ForexBenchmark. The result is clarity traders can build on: verified data, consistent pricing, and the lowest all-in cost structure in the market.`}
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Lowest cost isn’t a claim. It’s a data point, verified in public." />
      {/* Highlight Text Ends */}

      {/* #### */}
      <SectionWithCards
        numberOfCardInRow={3}
        headingLayout="TwoCol"
        sectionHeading={
          <h2 className="h2-size mb-6">
            <span>
              May be a long Title
              <br /> for Reach Us
            </span>
          </h2>
        }
        sectionSubtitle={`You’re trading on the world’s lowest-cost platform and getting paid for your flow and some more Texts
goes here.`}
        cardItems={helpOptionCards}
      />
      {/* #### */}

      <ContentBlock blockImgUrl={`/img/team-img.jpg`}>
        <h2>Contact Info</h2>
        <p>{`Chat with traders, discuss the markets, and even quiz the founders of Afterprime. Discord runs 24/7.`}</p>
        <p>{`Email : support@afterprime.com , support@afterprime.com`}</p>
        <p>{`Address: CT House. Office 9A, Providence, Mahe, Seychelles`}</p>
        <p>{`Call Us: +61 (02) 9138 0640`}</p>
      </ContentBlock>

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Engineered spreads. Independent proof. Costs that hold up under scrutiny." />
      {/* Highlight Text Ends */}
    </>
  );
}
