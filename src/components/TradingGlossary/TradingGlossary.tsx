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
  const glossarySchema =
    Array.isArray(schemaData) && schemaData.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          "@id": `https://afterprime.com/forex/${instrument?.toLowerCase()}#glossary`,
          name: `${instrument?.toUpperCase()} Trading Glossary`,
          url: `https://afterprime.com/forex/${instrument?.toLowerCase()}`,
          hasDefinedTerm: schemaData
            .filter((term) => term?.title && term?.paragraph) // remove invalid items
            .map((term) => ({
              "@type": "DefinedTerm",
              "@id": `https://afterprime.com/forex/${instrument?.toLowerCase()}#${term.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`,
              name: term.title,
              description: term.paragraph,
              termCode: term.title.toLowerCase().replace(/\s+/g, "-"),
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
      {glossarySchema && (
        <Script
          id="faq-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(glossarySchema),
          }}
        />
      )}
      {/* FAQ schema ends */}
    </>
  );
}
