import React from "react";
import Card from "../ui/Card";
import type { CardDataObject } from "@/types/cardObject";

interface CardRepeatorProp {
  data: CardDataObject[];
  cardSize: "regular" | "large" | "compact" | "small";
  type?: "bold" | "regular";
}

export default function CardRepeator({
  data,
  cardSize,
  type,
}: CardRepeatorProp) {
  return (
    <>
      {data.map((item, index) => (
        <div key={index}>
          <Card
            borderEnable={false}
            alignItems="center"
            cardSize={cardSize}
            title={item.title}
            paragraph={item.paragraph}
            cardCtaLabel={item.ctaLabel}
            cardCtaLink={item.ctaLink}
            active={false}
            type={type}
          />
        </div>
      ))}
    </>
  );
}
