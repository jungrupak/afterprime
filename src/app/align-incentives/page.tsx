"use client";
import HowItWorks from "@/components/content-block-with-cards/BlockWithCards";
import Faq from "@/components/faq/Faq";
import InnerBanner from "@/components/inner-banner/InnerBanner";
import GenericIntroBlock from "@/components/intro-block/IntroBlock";
import { UspInContent } from "@/components/usp-in-content/UspInContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Afterprime - Align Incentives",
  description: "Description Goes here",
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
  },
};

//FAQ DATA
export const faqData = [
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

export default function About() {
  const BannerImage = "/img/banner-about.jpg";
  //USP In Content Data
  const uspData = [
    {
      title: "$3 p/lot",
      subTitle: "up to $3 per lot in pay to trade flow",
    },
    {
      title: "$4.6m",
      subTitle: "Savings based on YTD flow",
    },
    {
      title: "$2.3m",
      subTitle: "Paid out YTD",
    },
  ];

  return (
    <>
      <InnerBanner bannerImgUrl={BannerImage} />
      <GenericIntroBlock />

      <UspInContent getUspData={uspData} />

      <HowItWorks />

      <Faq faqSubject="FAQ About Us" faqObjectsToReceive={faqData} />
    </>
  );
}
