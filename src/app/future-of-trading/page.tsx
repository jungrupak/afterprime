"use client";
import React from "react";
import { Metadata } from "next";
const metadata: Metadata = {
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
  const pointWhyItMatters: CardDataObject[] = [
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
          <span className="font-[600]">The Future of Trading</span>
        </h1>
        <p
          className="paragraph max-w-[800px] mb-12 lg:mt-20 opacity-80"
          style={{ fontWeight: "300" }}
        >
          The next era of trading is here — clean, aligned, and built to last.
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
        blockTitle="The old model treated traders like disposable accounts. The future treats them as partners."
        blockParagraph="The shift changes everything. Instead of chasing churn, brokers will be incentivised to help traders last longer, win more often, and scale their volume. When clients become partners, the whole ecosystem strengthens."
      />
      {/* Generic IntroBlock Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/img-bryan-2.jpg">
        <h2>The Shift Has Begun</h2>
        <p>
          Legacy brokers built their business on conflicts — B-books, opaque
          execution, and paid-for reviews dressed up as trust. Afterprime proves
          there&apos;s another way: a model that never profits from client
          losses, delivers zero commissions, and is independently verified as
          the world&apos;s lowest-cost broker.
        </p>
        <p>
          And it doesn&apos;t stop there. With Flow Rewards, we go beyond
          lowering costs — we pay traders for the value their flow creates.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Trading is already tough — it should also be fair. That’s the future we’re building." />
      {/* Highlight Text Ends */}

      {/* How it Works */}
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            Why It Matters for Traders
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
            data={pointWhyItMatters}
          />
        </div>
      </BlockWithCards>
      {/* How it Works ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="When traders win more often, the whole industry gets stronger." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>Pay to Trade: Only Possible When You&apos;re Clean</h2>
        <p>
          In the old world, brokers profited when traders lost. That conflict
          makes paying traders impossible — swings in the b-book are too wild to
          manage.
        </p>
        <p>
          In the new world, A-book brokers can share flow value back with
          clients. That&apos;s why Afterprime is the first broker in history to
          combine lowest costs with pay-to-trade.
        </p>
        <p>It only works because we run clean.</p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Section More value real alignment */}
      <MoreValueRealAlignment />
      {/* Section More value real alignment ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="Pay-to-trade only works with clean models — and clean is the future." />
      {/* Highlight Text Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={false} blockImgUrl="/img/chi-img-2.jpg">
        <h2>The End of Churn and Affiliates</h2>
        <p>
          Old-world brokers lure in small gamblers, churn retail accounts, and
          scale with affiliate networks. The future won&apos;t.
        </p>
        <p>
          Afterprime is built for serious, profitable traders. No gimmicks, no
          deposit bonuses, no affiliate churn. Growth comes from product
          strength, transparency, and community — not from tricking the next
          wave of retail flow.
        </p>
        <MainButton href="#" isArrowVisible={true} varient="primary-ghost">
          Request Invite
        </MainButton>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Content Block - Cost Kill Strategy */}
      <ContentBlock rtl={true} blockImgUrl="/img/jeremy-img-2.jpg">
        <h2>The Bigger Picture</h2>
        <p>
          The old world was built on opacity and conflict. The new world is
          being built on proof, alignment, and trust. The future of trading is
          clear:
        </p>
        <ul className="ulli">
          <li>From B-books to clean A-book models.</li>
          <li>From gimmicks to verified proof.</li>
          <li>From charging commissions to pay-to-trade</li>
          <li>
            From treating traders like product to treating traders like
            partners.
          </li>
        </ul>
        <p>
          We&apos;re not here to be the only ones doing it. We&apos;re here to
          prove it can be done — and to pull the industry forward.
        </p>
      </ContentBlock>
      {/* Content Block - Ends */}

      {/* Highlight Text */}
      <HighlightBlockQuote textValue="The next era of brokers won’t hide; they’ll be built in public." />
      {/* Highlight Text Ends */}

      {/* Section Founders Block */}
      <FoundersCard
        cardTitle="Building the Future at Afterprime"
        cardParagraph="“The next chapter in trading isn’t about squeezing clients — it’s about empowering them. The brokers who survive will be the ones who grow stronger when their traders do.”"
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
