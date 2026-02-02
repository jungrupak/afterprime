"use client";
import styles from "./style.module.scss";
import Accordion from "@/utils/accordion/Accordion";
import { useState, useEffect } from "react";
import { getBrokerCompareData } from "@/lib/getBrokersToCompare";
import { useQuery } from "@tanstack/react-query";

interface FAQItem {
  question?: string;
  answer?: string;
}

type faqContents = {
  faqSubject?: string;
  data?: FAQItem[];
  instrument?: string;
  hasRebateValue?: boolean;
};

//##
const CACHE_TTL = 2 * 60 * 1000; // 2 minutes feed cache

export default function Faq({
  faqSubject,
  instrument,
  hasRebateValue,
}: faqContents) {
  // map nested faq_item into flat structure
  //if (!data) return null;

  const [isRebate, setIsRebate] = useState(true);

  //####
  const { data, isLoading, error } = useQuery({
    queryKey: ["cost-comparison-faq", instrument],
    queryFn: () => getBrokerCompareData(instrument!),
    enabled: !!instrument, //prevents undefined crash
    staleTime: CACHE_TTL, // fresh for 2 minutes
    gcTime: 10 * 60 * 1000, // cache stays for 10 minutes
  });
  //####

  useEffect(() => {
    if (data?.rebate === null) {
      setIsRebate(false);
    } else if (!data) {
      setIsRebate(false);
    } else {
      setIsRebate(true);
    }
  }, [data]);

  const fixedFaqs = [
    {
      question: `How are Flow Rewards calculated?`,
      answer: `Flow Rewards are paid per traded lot (round turn) using instrument specific rates published on the Afterprime website.`,
    },
    {
      question: `Is ${instrument} eligible for Flow Rewards?`,
      answer: `${isRebate ? `Yes. ${instrument} does qualify for Flow Rewards.` : `No. ${instrument} does not qualify for Flow Rewards.`}`,
    },
    {
      question: `How does Afterprime make money?`,
      answer: `Afterprime earns from institutional liquidity relationships and volume based arrangements, not from client losses.`,
    },
    {
      question: `How does account approval work?`,
      answer: `Applications are reviewed and approved selectively based on trading profile and activity.`,
    },
  ];

  //FAQ Schema Data
  const instrumentToLowercase = instrument?.toLowerCase();
  const schemaFaq = fixedFaqs
    ? {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": "https://afterprime.com/#org",
            name: "Afterprime",
            url: "https://afterprime.com",
          },
          {
            "@type": "WebSite",
            "@id": "https://afterprime.com/#website",
            name: "Afterprime",
            url: "https://afterprime.com",
            publisher: {
              "@id": "https://afterprime.com/#org",
            },
          },
          {
            "@type": "WebPage",
            "@id": `https://afterprime.com/trade/${instrumentToLowercase}#webpage`,
            url: `https://afterprime.com/trade/${instrumentToLowercase}`,
            name: `${instrument} Trading`,
            isPartOf: {
              "@id": "https://afterprime.com/#website",
            },
            about: {
              "@id": `https://afterprime.com/trade/${instrumentToLowercase}#financialproduct`,
            },
          },
          {
            "@type": "FinancialProduct",
            "@id": `https://afterprime.com/trade/${instrumentToLowercase}#financialproduct`,
            name: `${instrument}`,
            category: "Forex",
            provider: {
              "@id": "https://afterprime.com/#org",
            },
            description: `${instrument} perpetual currency pair with zero commission and published Flow Rewards.`,
            feesAndCommissionsSpecification:
              "Zero commission. Flow Rewards: {rebate_usd_per_lot} USD per lot.",
            offers: {
              "@type": "Offer",
              "@id": `https://afterprime.com/trade/${instrumentToLowercase}#offer`,
              offeredBy: {
                "@id": "https://afterprime.com/#org",
              },
              availability: "https://schema.org/InStock",
              category: "Perpetual currency pair",
              priceSpecification: [
                {
                  "@type": "UnitPriceSpecification",
                  name: "Commission",
                  price: 0,
                  priceCurrency: "USD",
                  unitText: "per lot",
                },
              ],
            },
          },
          {
            "@type": "FAQPage",
            "@id": `https://afterprime.com/trade/${instrumentToLowercase}#faq`,
            mainEntity: [
              {
                "@type": "Question",
                name: "How are Flow Rewards calculated?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Flow Rewards are paid per traded lot (round turn) using instrument specific rates published on the Afterprime website.",
                },
              },
              {
                "@type": "Question",
                name: `Is ${instrument} eligible for Flow Rewards?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Yes. ${instrument} qualifies for Flow Rewards.`,
                },
              },
              {
                "@type": "Question",
                name: "How does Afterprime make money?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Afterprime earns from institutional liquidity relationships and volume based arrangements, not from client losses.",
                },
              },
              {
                "@type": "Question",
                name: "How does account approval work?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Applications are reviewed and approved selectively based on trading profile and activity.",
                },
              },
            ],
          },
        ],
      }
    : null;
  //FAQ Schema Data Ends

  return (
    <>
      <section className={`${styles.faq_section} max-md:py-0! md:py-15!`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small">
          <div className={`${styles.faq_block}`}>
            <h2 className="text-[34px] font-[700] mb-10">{faqSubject}</h2>
            {/* Fixed Questions */}
            <Accordion faqObjects={fixedFaqs} />
            {/* Fixed Questions ends*/}
            {/* <Accordion faqObjects={data} /> */}
          </div>
        </div>
      </section>
      {/* //render data comparison schema */}
      {schemaFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaFaq),
          }}
        />
      )}
    </>
  );
}
