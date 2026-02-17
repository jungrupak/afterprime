"use client";
import styles from "./Author.module.scss";
import Image from "next/image";
import Script from "next/script";
export default function Author() {
  //####
  const getFourDayDate = () => {
    const today = new Date();

    // Number of days since Unix epoch
    const daysSinceEpoch = Math.floor(today.getTime() / (1000 * 60 * 60 * 24));

    // Round down to nearest multiple of 4
    const roundedDays = Math.floor(daysSinceEpoch / 4) * 4;

    const fourDayDate = new Date(roundedDays * 24 * 60 * 60 * 1000);

    return fourDayDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };
  //####Ends
  const SCHEMA_DATA = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Jeremy Kinstlinger",
      jobTitle: "CEO, Co-Founder, and Director",
      worksFor: {
        "@type": "Organization",
        name: "Afterprime",
        url: "https://afterprime.com/",
      },
      description:
        "CEO and Co-Founder of Afterprime.com. Financial expert and seasoned trader who co-founded the highly-regarded Global Prime in 2012. Known for his expertise in A-Book brokerage, transparency, and the 'Pay-to-Trade' model.",
      knowsAbout: [
        "Forex Trading",
        "CFD Brokerage",
        "Financial Transparency",
        "A-Book Execution",
        "Financial Regulation (RG146)",
        "Online Trading Technology",
      ],
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        name: "RG146 License",
        description:
          "Mandatory Australian financial services qualification demonstrating competence in areas such as financial planning, compliance, and securities.",
      },
      url: "https://afterprime.com/our-story",
    },
  ];

  return (
    <>
      <div className={`flex gap-4 items-center`}>
        <Image
          className={`rounded-[100px]`}
          src="/img/Jeremy.jpg"
          height={40}
          width={40}
          alt=""
        />
        <div>
          <h5 className={`font-semibold text-[18px]`}>Jeremy Kinstlinger</h5>
          <span className={`opacity-65`}>{getFourDayDate()}</span>
        </div>
      </div>
      {SCHEMA_DATA && (
        <Script
          id="page-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SCHEMA_DATA),
          }}
        />
      )}
    </>
  );
}
