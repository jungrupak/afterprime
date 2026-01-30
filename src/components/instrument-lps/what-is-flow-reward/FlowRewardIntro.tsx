import React from "react";
import Lists from "@/components/ui/Lists";

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
export default function FlowRewardIntro({
  instrument,
  content,
  rationalData,
}: FlowIntroProps) {
  if (!content) return;

  const executionQualityItems = Object.values(
    rationalData as QualityRationalData,
  ).filter(Boolean) as string[];

  return (
    <section className={`md:py-20! max-md:py-0!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className={`ap_container_small relative z-1 w-full`}>
        <h2
          dangerouslySetInnerHTML={{ __html: content.heading || "" }}
          className={`leading-[1.1]`}
        />
        <p
          className={`paragraph`}
          dangerouslySetInnerHTML={{
            __html: `${instrument} -  ${content.paragraph || ""}`,
          }}
        />
        <div className={`mt-10 md:mt-15`}>
          <h2 className={`leading-[1.1]`}>Execution Quality</h2>
          <Lists listItems={executionQualityItems} />
        </div>
      </div>
    </section>
  );
}
