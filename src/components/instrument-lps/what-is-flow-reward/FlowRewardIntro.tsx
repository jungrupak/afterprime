import React from "react";
import Lists from "@/components/ui/Lists";

interface FlowIntroProps {
  title?: string;
  paragraph?: string;
}
export default function FlowRewardIntro({ title, paragraph }: FlowIntroProps) {
  const ListItems = [
    "AUDUSD trades at tight nominal spreads where small execution differences compound quickly. ",
    "Flow RewardsTM offset spread cost as volume increases, improving repeatability of results. ",
    "Net cost stability matters most when scaling trade frequency or position size.",
  ];

  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className={`ap_container_small relative z-1 w-full`}>
        <h2 className={`leading-[1.1]`}>
          What Flow Rewards<sup className={`text-[24px]`}>TM</sup> Means in
          Practice
        </h2>
        <p className={`paragraph`}>
          AUDUSD trades at tight nominal spreads where small execution
          differences compound quickly. Flow Rewards<sup>TM</sup> offset spread
          cost as volume increases, improving repeatability of results. Net cost
          stability matters most when scaling trade frequency or position size.
        </p>
        <div className={`mt-10 md:mt-15`}>
          <h2 className={`leading-[1.1]`}>Execution Quality Rationale</h2>
          <Lists listItems={ListItems} />
        </div>
      </div>
    </section>
  );
}
