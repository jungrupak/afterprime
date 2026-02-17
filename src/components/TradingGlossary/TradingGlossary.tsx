import React from "react";
import styles from "./TradingGloassary.module.scss";
import Script from "next/script";

interface GlossaryItems {
  title: string;
  paragraph: string;
}
interface GlossaryBlock {
  instrument: string;
  glossaryBlockData: GlossaryItems[];
}

export default function TradingGlossary({
  glossaryBlockData,
  instrument,
}: GlossaryBlock) {
  if (!glossaryBlockData || glossaryBlockData.length === 0) return;

  const schemaData = glossaryBlockData;

  //FAQ schema##
  const faqSchema =
    schemaData && schemaData.length
      ? {
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: `${instrument.toUpperCase()} Trading Glossary`,
          url: `https://afterprime.com/forex/${instrument.toLowerCase()}`,
          hasDefinedTerm: schemaData.map((term) => ({
            "@type": "DefinedTerm",
            name: term.title,
            description: term.paragraph,
            termCode: term.title,
            inDefinedTermSet: {
              "@type": "DefinedTermSet",
              name: `${instrument.toUpperCase()} Trading Glossary`,
              url: `https://afterprime.com/forex/${instrument.toLowerCase()}`,
            },
          })),
        }
      : null;

  // Ends FAQ schema

  return (
    <>
      <div className={`${styles.glossaryWrapper}`}>
        <ul>
          {glossaryBlockData.map((item, index) => (
            <li key={index}>
              <div
                className={`text-[clamp(20px_,4vw_,24px)] font-bold mb-2 md:mb-4`}
              >
                {item.title}
              </div>
              <p
                className={`text-[clamp(16px_,4vw_,20px)] opacity-65 leading-[1.5]`}
              >
                {item.paragraph}
              </p>
            </li>
          ))}
        </ul>
      </div>
      {/* FAQ schema */}
      {schemaData && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      )}
      {/* FAQ schema ends */}
    </>
  );
}
