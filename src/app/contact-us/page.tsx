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
        "Find clear answers, guides, and resources anytime in our Help Center.",
      ctaLabel: "Help Center",
      ctaLink: "#",
      ctaOpenTarget: "Blank",
    },
    {
      title: "Instant Messager",
      paragraph:
        "Get instant answers anytime with real support through live chat.",
      ctaLabel: "Live Chat",
      ctaLink: "#",
      ctaOpenTarget: "Self",
    },
    {
      title: "Discord",
      paragraph:
        "Join Discord for support, updates, feedback, and trader-to-trader guidance.",
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
        blockTitle={`Trading moves fast, and questions can’t wait. That’s why we make support immediate.`}
        blockParagraph={`You can reach us through live chat, Discord, or email — whichever suits you best. Every channel is staffed by real people who know the platform inside out. Rely on fast responses, transparent answers, and support designed for serious traders.`}
      />
      {/* Generic IntroBlock Ends */}

      <ContentBlock blockImgUrl={`/img/team-img.jpg`}>
        <h2>Contact Info</h2>
        <p>{`Reach our support team directly by email or phone for quick answers. `}</p>
        <p>
          <strong className="font-[700]">Email :</strong>
          <br /> support@afterprime.com
        </p>
        <p>
          <strong className="font-[700]">Call Us :</strong>
          <br /> +61 (02) 9138 0640
        </p>
        <p>
          <strong className="font-[700]">Address :</strong>
          <br /> CT House. Office 9A, Providence, Mahe, Seychelles
        </p>
      </ContentBlock>

      {/* #### */}
      <SectionWithCards
        numberOfCardInRow={3}
        headingLayout="TwoCol"
        cardItems={helpOptionCards}
      />
      {/* #### */}
    </>
  );
}
