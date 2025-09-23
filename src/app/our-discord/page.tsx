import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/our-discord`,
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
import { MoreValueRealAlignment } from "@/components/home-sections/MoreValueRealAlignment";
import Faq from "@/components/faq/Faq";
import type { CardDataObject } from "@/types/cardObject";
import BlockWithLists from "@/components/block-multipurpose/BlockWithLists";
import Lists from "@/utils/lists/Lists";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import Image from "next/image";

export default function PageOurDiscord() {
  //const BannerImage = "/img/banner-about.jpg";
  //Content Card section Card Data##
  const cardsData: CardDataObject[] = [
    {
      title: "Founders on the Floor",
      paragraph: "Founders and team in the room, daily.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Support From Traders",
      paragraph: "Every support staff member started as a client.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Accountability in Public",
      paragraph: "Complete visibility for radical accountability",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Value Earns Rewards",
      paragraph: "Add value, earn recognition and rewards.",
      ctaLabel: "",
      ctaLink: "",
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

  //PTO LISTS
  const ptoLists = [
    "Orders are executed at zero commission and prices sharper than standard LP quotes.",
    "Fair Model Alignment – we aim to capture value post trade and share it back with our traders.",
    "Your trading activity generates yield that turns into real earnings alongside your PnL.",
  ];

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Our Discord</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Where execution meets community. Build, trade, and hold us accountable
          in real time.
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
        blockTitle="Our members, founders, and team operate side by side—building together, and holding each other accountable."
        blockParagraph="It’s the engine room where feedback loops into product, strategy, and support. The goal is simple: alignment, accountability, and a place where profitable traders shape the broker they use."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Where traders shape the broker in real time." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/chi-img.jpg">
        <h2>Community as Infrastructure</h2>
        <p>
          Discord is where we pressure-test everything. From product changes to
          execution models, nothing gets shipped without community fingerprints.
        </p>
        <p>
          Add value—through insight, data, or strategy—and you get rewarded.
          It’s how we close the gap between trader and broker: real-time
          feedback, visible action, and aligned incentives.
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
            Built in Public.
          </h2>
          <p className="paragraph">
            The trading industry is built on opacity. We&apos;re rebuilding it
            on transparency. Discord gives traders a front row seat—and a
            steering wheel.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="small" data={cardsData} />
        </div>
      </BlockWithCards>
      {/* Block With 4 cards Ends */}

      {/* Multipurpose Block for right image */}

      {/* Multipurpose Block for right image Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="The best broker is the one built in public, with its traders." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/img-angus.jpg">
        <h2>Breaking from Legacy Models</h2>
        <p>
          Legacy brokers silo their clients from decision-making. Feedback
          disappears into ticketing systems, and support is disconnected from
          trading reality.
        </p>

        <p>
          Discord flips that model: our community drives product, challenges
          decisions, and keeps the firm accountable.
        </p>
        <p>And yet, most brokers avoid it. You have to ask why.</p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section More value real alignment */}
      <MoreValueRealAlignment />
      {/* Section More value real alignment ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>The Bigger Picture</h2>
        <p>
          A Discord community is more than social—it&apos;s structural. It
          aligns incentives by making sure the broker evolves with the traders
          who use it.
        </p>
        <ul className="ulli">
          <li>From closed doors to open debates.</li>
          <li>From scripted support to ex-trader expertise.</li>
          <li>From client churn to trader-driven growth.</li>
          <li>From detached brokers to accountable, transparent operators.</li>
        </ul>
        <p>
          Because the best brokers evolve with their traders, not against them.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="If you want to know how a broker really runs—watch their Discord." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Community First Since 2012"
        cardParagraph="“We started trading on internet forums and we’ve kept that DNA. Building in public is the natural extension—where traders hold us accountable, shape the product, and even trade strategies alongside us.”"
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
