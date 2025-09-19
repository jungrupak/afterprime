"use client";
import React from "react";
import { Metadata } from "next";
const metadata: Metadata = {
  title: "Afterprime - Our Stories",
  description: "This is Afterprime Storie page",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/our-stories`,
  },
};
//
import InnerBanner from "@/components/inner-banner/InnerBanner";
import MainButton from "@/components/ui/Button";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import HighlightBlockQuote from "@/components/highlight-blockquote/HighlightBlockquote";
import ContentBlock from "@/components/content-block/ContentBlock";
import Image from "next/image";
import BlockWithCards from "@/components/content-block-with-cards/BlockWithCards";
import FoundersCard from "@/components/founder-card/FounderCard";
import { MoreValueRealAlignment } from "@/components/home-sections/MoreValueRealAlignment";
import Faq from "@/components/faq/Faq";
import BlockWithLists from "@/components/block-multipurpose/BlockWithLists";
import GoogleReview from "@/components/google-review/GoogleReview";
import { BottomCta } from "@/components/bottom-cta/BottomCta";
import CardRepeator from "@/components/card-repeater/CardRepeater";
import { CardDataObject } from "@/types/cardObject";

export default function OurStories() {
  //Banner Image
  const BannerImage = "/img/banner-our-story.jpg";

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
      title: "1.",
      paragraph: "Get Paid to Trade. ",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "2.",
      paragraph: "The worlds Lowest Costs, verified.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "3.",
      paragraph: "An aligned model. No profiting from client losses.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "4.",
      paragraph: " A community effort - we grow together with you.",
      ctaLabel: "",
      ctaLink: "",
    },
  ];
  return (
    <>
      {/* Hero Banner */}
      <InnerBanner bannerImgUrl={BannerImage}>
        <h1 className="h1-size mt-28 lg:mt-42">
          <span className="font-[600]">Our Story</span>
        </h1>
        <p
          className="paragraph max-w-[800px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          13 years of challenging the industry&apos;s defaults — from traders to
          the world&apos;s first pay-to-trade model.
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
        blockTitle="We were traders first —  But one truth gnawed at us: brokers were messing with our trades."
        blockParagraph="So instead of complaining, we became one. Back then, no one dared to fully A-book. The retail world was MT4, wide spreads, and casino-style B-books. Our first brokerage was born — a broker built on transparency and community."
      />
      {/* Generic IntroBlock Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="From a startup to trillions in client flow — every step of our journey has been aligned with our clients." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/chi-img.jpg">
        <h2>Alignment Above All</h2>
        <p>
          When we told industry peers we didn&apos;t B-book, they laughed.
          “You&apos;ll never make it. You&apos;re leaving money on the table.”
          But the banks loved our flow, and our community trusted us.
        </p>
        <p>The lesson stuck: the industry wasn&apos;t changing. </p>
        <p>
          We had to. As traders ourselves, we built the environment we wanted to
          trade on. Revolutionary, not reactionary.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* How it Works */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            The 4 Pillars of Afterprime
          </h2>
          <p className="paragraph">
            Today, Afterprime 2.0 is the world&apos;s first pay-to-trade
            brokerage. Built on four pillars.
          </p>
          <p className="paragraph">
            The result: zero commissions, lowest verified costs, and extra
            earnings on top of your PnL.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator
            type="bold"
            cardSize="regular"
            data={fourPillarsPoints}
          />
        </div>
      </BlockWithCards>
      {/* How it Works ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="First in trading history: lowest costs + payouts from your flow." />
      {/* Highlight Text Ends */}

      {/* Section PTO */}
      <BlockWithLists
        isBoxed={true}
        blockTitle="The Evolution: Building Our Edge"
        blockParagraph="Leaving the past wasn’t easy, but it gave us freedom. With Argamon and Afterprime, we could go deeper into liquidity — obsessing over markouts, pricing, execution."
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
      {/* Section PTO ends */}

      {/* Section More value real alignment */}
      <MoreValueRealAlignment />
      {/* Section More value real alignment ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="we built our own pricing, our own order books, and now, a model the industry’s never seen before." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/img-angus.jpg">
        <h2>The Future is Afterprime</h2>
        <p>
          The casino model won&apos;t disappear overnight. But smart traders
          demand for alignment is rising.
        </p>

        <p>
          Looking back from the attic days to now, one principle hasn&apos;t
          changed: we&apos;ve always been on the trader&apos;s side.
        </p>
        <p>
          We don&apos;t just want to build the lowest-cost broker — we want
          traders to look back and say they were part of rewriting the industry.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="We started as traders and we’ve never stopped building for traders. We are all in it together." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Built on Trust, Proven by Time"
        cardParagraph="“For over 13 years we’ve shown you can grow a brokerage without betting against traders. That foundation now powers a new model — one where integrity meets innovation.”"
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
