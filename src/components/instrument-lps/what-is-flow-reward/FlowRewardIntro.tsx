import React from "react";
import Lists from "@/components/ui/Lists";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";

interface QualityRationalData {
  item_one?: string;
  item_two?: string;
}

interface SectionData {
  heading?: string;
  paragraph?: string;
}

interface FlowIntroProps {
  instrument?: string;
  content?: SectionData;
  rationalData?: QualityRationalData;
}
export default async function FlowRewardIntro({
  instrument,
  content,
  rationalData,
}: FlowIntroProps) {
  if (!content) return;

  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("flow-reward-intro", locale, {
    executionQualityHeading: "Execution Quality",
  });

  const executionQualityItems = Object.values(
    rationalData as QualityRationalData,
  ).filter(Boolean) as string[];

  return (
    <div className="my-8 md:my-20">
      <h2
        dangerouslySetInnerHTML={{ __html: content.heading || "" }}
        className={`font-size-heading-md mb-4 md:mb-6 font-semibold`}
      />
      <p
        className={`reading-text-md mb-8 md:mb-12`}
        dangerouslySetInnerHTML={{
          __html: `${content.paragraph || ""}`,
        }}
      />
      <div className={`mt-10 md:mt-15`}>
        <h2
          className={`font-size-heading-md mb-4 md:mb-6 font-semibold`}
        >
          {t.executionQualityHeading}
        </h2>
        <Lists bulletVarient="arrow-blue" listItems={executionQualityItems} />
      </div>
    </div>
  );
}
