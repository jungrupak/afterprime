import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Get Paid To Trade",
  description: "This is Afterprime Get Paid To Trade",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/get-paid-to-trade`,
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
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import Image from "next/image";

export default function PageHowToQualify() {
  //const BannerImage = "/img/banner-about.jpg";
  //Content Card section Card Data##
  const cardsData: CardDataObject[] = [
    {
      title: "Professional First",
      paragraph:
        "Designed for traders running consistent, scalable strategies.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Discipline Matters",
      paragraph: "Respect for execution, capital, and market structure.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "No Arbitrage Games",
      paragraph: "Latency, broker arb, or toxic flow aren’t welcome.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Aligned Incentives",
      paragraph: "No bonuses, no gimmicks, no churn.",
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

  return (
    <>
      {/* Hero Banner */}
      <InnerBanner>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">How to Qualify</span>
        </h1>
        <p
          className="paragraph max-w-[600px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          Not every trader belongs here. The right ones know why.
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
        blockTitle="Afterprime isn’t mass-market. It’s not designed for hobbyists, bonus-hunters, or anyone chasing gimmicks. "
        blockParagraph="If you already hold an invite from an existing member, you’re straight in. Otherwise, you’ll need to apply. Pass the application, and you’ll receive an invite code. You’ll then have 14 days to explore the demo environment and fund your account or the account is closed."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Our edge is only as strong as the discipline of our clients." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/chi-img.jpg">
        <h2>What it Takes</h2>
        <p>
          We built Afterprime for traders who treat markets as a profession.
          That means consistency, risk awareness, and discipline aren’t
          optional—they’re the baseline. The application process filters for
          alignment: your strategy, your approach, and your understanding of
          risk.
        </p>
        <p>
          Discipline, consistency, and risk awareness aren’t optional—they’re
          the baseline. We’re looking for traders who approach markets
          professionally and align with our execution model.
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
            What We Look For.
          </h2>
          <p className="paragraph">
            Invite-only access isn&apos;t a marketing trick—it&apos;s
            structural. The integrity of the model relies on traders who can
            operate within it.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="small" data={cardsData} />
        </div>
      </BlockWithCards>
      {/* Block With 4 cards Ends */}

      {/* Multipurpose Block for right image */}

      {/* Multipurpose Block for right image Ends */}

      {/* Section PTO */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="On Toxic Flow"
        blockParagraph="We welcome profitable traders. The only flow we can’t work with is toxic flow—latency grabs, arbitrage games, or anything built on exploiting pricing delays. Everything else—swing, day, systematic, discretionary—is fair game."
        btnText="Request Invite"
        btnUrl="#"
      >
        <Image
          src="/img/person-evolution-block.jpg"
          width={620}
          height={430}
          alt=""
        />
      </BlockWithLists>
      {/* ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="The right flow builds stability. Profitable flow strengthens it further." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/img-angus.jpg">
        <h2>The Screening Test</h2>
        <p>
          We assess how you trade: instruments, style, and the thinking behind
          your entries and exits. We look for alignment with institutional
          standards.
        </p>

        <p>
          We measure not just what you trade, but how you think about execution
          and risk. Those who pass are traders we can scale with.
        </p>
        <p>
          We want to see that you understand execution, size your positions with
          intent, and approach risk like a professional. Traders who pass share
          one thing in common: discipline.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section More value real alignment */}
      <MoreValueRealAlignment />
      {/* Section More value real alignment ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>The Bigger Picture</h2>
        <p>
          This isn&apos;t exclusivity for its own sake. It&apos;s about building
          a market structure that rewards professionalism.
        </p>
        <ul className="ulli">
          <li>From volume churners to rewarding disciplined flow.</li>
          <li>From toxic latency grabs to scalable, aligned flow.</li>
          <li>From gimmicks and bonuses to verified lowest costs.</li>
          <li>From short-term client losses to long-term aligned growth.</li>
        </ul>
        <p>
          That&apos;s how we protect the model—and why the traders who qualify
          have the edge to last.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="We qualify the trader so the model can qualify itself." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="On Alignment"
        cardParagraph="“Invite-only isn’t about exclusivity. It’s about alignment. Respect risk, get rewarded. That’s the model.”"
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
