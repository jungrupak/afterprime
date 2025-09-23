import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/platforms/webtrader`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import ContentBlock from "@/components/content-block/ContentBlock";
import BlockWithCards from "@/components/content-block-with-cards/BlockWithCards";
import FoundersCard from "@/components/founder-card/FounderCard";
import Faq from "@/components/faq/Faq";
import type { CardDataObject } from "@/types/cardObject";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import Card from "@/components/ui/Card";

export default function PageWebTrader() {
  //const BannerImage = "/img/banner-about.jpg";
  //Content Card section Card Data##
  const cardsData: CardDataObject[] = [
    {
      title: "Instant Access",
      paragraph: "Trade anywhere, anytime, through any browser.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Cross-Device Sync",
      paragraph: "Switch seamlessly between desktop, tablet, and mobile.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Full Integration",
      paragraph: "MT4, MT5, and TE are all available in-browser.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Aligned Execution",
      paragraph: "Zero commissions, VWAP fills, and conflict-free pricing.",
      ctaLabel: "",
      ctaLink: "",
    },
  ];

  //Download Links
  const accessWebtrader = [
    {
      title: "MetaTrader4",
      paragraph: "MT4 on Windows—fast, scalable, and conflict-free execution",
      ctaLabel: "Login",
      ctaLink: "#",
    },
    {
      title: "MetaTrader5",
      paragraph: "Trade MT4 on iOS—clean execution, anywhere you are",
      ctaLabel: "Login",
      ctaLink: "#",
    },
    {
      title: "TraderEvolution",
      paragraph:
        "MT4 on Android: speed, scale, and execution without compromise",
      ctaLabel: "Login",
      ctaLink: "#",
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
          <span className="font-[600]">WebTrader</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Trade anywhere, anytime—direct from your browser. No downloads, no
          compromises.
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
        blockTitle="Trading without borders. WebTrader across MT4, MT5, and TraderEvolution makes that vision a reality. "
        blockParagraph="WebTrader makes Afterprime’s full infrastructure available anywhere with an internet connection. Log in, trade live, or test strategies on demo—all synced across devices."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Browser trading removes friction without removing performance" />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Trade Anywhere, Anytime</h2>
        <p>
          WebTrader gives you the freedom to access Afterprime&apos;s platforms
          without downloads or installations. Whether on desktop, tablet, or
          mobile, you can log in instantly and start trading with
          institutional-grade execution.
        </p>
        <p>
          With WebTrader, you get the same market-leading spreads, ultra-fast
          routing, and zero-commission pricing that power our MT4, MT5, and
          TraderEvolution platforms—all streamed directly through your browser.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Block With 4 cards */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            WebTrader: Power in Your Browser
          </h2>
          <p className="paragraph">
            All the power of Afterprime—accessible instantly in your browser.
            Seamless, synced, and aligned with the same execution as our core
            platforms.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="compact" data={cardsData} />
        </div>
      </BlockWithCards>
      {/* Block With 4 cards Ends */}

      {/* Multipurpose Block for right image */}

      {/* Multipurpose Block for right image Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/team-img.jpg">
        <h2>Under the Hood</h2>
        <p>
          Every trade through WebTrader runs on the same rails as our installed
          platforms.
        </p>

        <p>
          LOrders are filled at VWAP, hedge legs are managed independently
          across venues, and spread capture yields Flow Rewards back to clients.
          Clean access, even when you&apos;re away from your setup.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Execution quality doesn’t change just because you’re on the web." />
      {/* Highlight Text Ends */}

      {/* Access WebTrader*/}
      <section className={``}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
            <div className="">
              <h2 className="h2-size mb-6 text-center md:text-left">
                Access
                <br />
                <span>WebTrader</span>
              </h2>
            </div>
            <div className="">
              <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
                You&apos;re trading on the world&apos;s lowest-cost platform —
                and getting paid for your flow.
              </p>
            </div>
          </div>
          {/* Cards */}
          <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
            {accessWebtrader.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                paragraph={card.paragraph}
                cardCtaLabel={card.ctaLabel}
                cardCtaLink={card.ctaLink}
                cardSize="large"
                active={false}
              />
            ))}
          </div>
          {/* Cards Ends */}
        </div>
      </section>
      {/* Access WebTrader ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Speed, depth, transparency—built together, not added on." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Access Without Barriers"
        cardParagraph="“Traders don’t want obstacles—they want access. WebTrader makes that simple: log in, connect to our infrastructure, and trade with the same execution quality as any desktop platform.”"
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
