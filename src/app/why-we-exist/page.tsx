"use client";
import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Afterprime - Why We Exists",
  description: "This is Afterprime Storie page",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/why-we-exist`,
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
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import { CardDataObject } from "@/types/cardObject";

export default function WhyWeExist() {
  //Banner Image
  const BannerImage = "/img/banner-why-we-exist.jpg";

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

  //Four Pillars
  const fourPillarsPoints: CardDataObject[] = [
    {
      title: "No B-book",
      paragraph: "100% A-book. We don’t profit off losses",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Invite Only",
      paragraph: "No gimmicks, no deposit bonuses, no affiliate churn.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Flow Rewards",
      paragraph: "Verified #1 lowest costs +  pay-to-trade model",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Transparent",
      paragraph: " our community holds us accountable",
      ctaLabel: "",
      ctaLink: "",
    },
  ];
  return (
    <>
      {/* Hero Banner */}
      <InnerBanner bannerImgUrl={BannerImage}>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Why We Exist</span>
        </h1>
        <p
          className="paragraph max-w-[800px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          The industry was built backwards — brokers win when traders lose. We
          exist to flip that model.
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
        blockTitle="For decades, brokers engineered the game against their own clients. Incentives clashed. "
        blockParagraph="We exist because we were traders first. We felt the pain of stacked costs and stacked odds. And we knew there had to be a way to build a brokerage where success was shared — not extracted."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="The game was rigged — and someone had to unstack the deck." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/img-bryan-2.jpg">
        <h2>Realign the Game</h2>
        <p>
          We exist to give traders a fairer shot. To strip away hidden conflicts
          and gimmicks. To prove you can run a brokerage where the incentives
          are aligned, the costs are transparent, and the value flows back to
          the people creating it. That’s why we:
        </p>
        <ul className="ulli">
          <li>Became the first to fully A-book retail flow.</li>
          <li>Built our own liquidity stack instead of renting one.</li>
          <li>Created the world&apos;s first pay-to-trade model.</li>
        </ul>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Why It Matters</h2>
        <p>
          Because the old model isn&apos;t just misaligned — it wastes
          potential. Trust in the industry was eroded by conflicts of interest.
        </p>
        <p>
          In the most nefarious cases brokers profited off the back of blowing
          up accounts on purpose (remember the Virtual Dealer Plugin days?)
        </p>
        <p>
          We exist to rebuild that trust, to give those strategies life, and to
          unlock that potential.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section left content right side cards repeator */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            Not Another Broker. The Opposite of One.
          </h2>
          <p className="paragraph">
            Most brokers copy the same playbook — chase deposits, churn clients,
            profit from losses, and hide behind marketing.
          </p>
          <p className="paragraph">
            Afterprime is the anti-thesis of that model.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator
            cardSize="regular"
            type="bold"
            data={fourPillarsPoints}
          />
        </div>
      </BlockWithCards>
      {/* Section left content right side cards repeator ends*/}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Fairness isn’t a slogan. It’s the operating system." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/chi-img-2.jpg">
        <h2>The Bigger Picture</h2>
        <p>
          This isn&apos;t about being another broker with a shinier platform.
          It&apos;s about setting a new standard: one where traders are
          participants in the value chain, not products in it.
        </p>
        <p>That&apos;s why we exist.</p>
        <p>
          To give traders the environment they always deserved — and to prove
          the industry can be better. One can only lead by example, right?
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Traders aren’t products in our model. They’re participants in it." />
      {/* Highlight Text Ends */}

      {/* Section More value real alignment */}
      <MoreValueRealAlignment />
      {/* Section More value real alignment ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="We don’t just exist to fix what’s broken — we exist to show what trading can become." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="On the Trader’s Side, Always"
        cardParagraph="“For us, alignment was never a feature — it was the reason we started. A broker should prove its value by helping traders win, not by hoping they lose.”"
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
