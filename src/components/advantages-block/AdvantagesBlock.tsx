import BlockWithCards from "@/components/content-block-with-cards/BlockWithCards";
import CardRepeator from "../card-repeater/CardRepeater";
import type { CardDataObject } from "@/types/cardObject";
export default function AdvantagesBlock() {
  const cardsData: CardDataObject[] = [
    {
      title: "Zero commissions",
      paragraph: "Zero commissions on institutional spreads.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "Low-Cost Verified",
      paragraph: "Independently benchmarked against competitors.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "A-book+",
      paragraph: "Pure A-book+, no internalization, no conflicts.",
      ctaLabel: "",
      ctaLink: "",
    },
    {
      title: "High-volume",
      paragraph: "Infrastructure built for high-volume, professional traders.",
      ctaLabel: "",
      ctaLink: "",
    },
  ];

  return (
    <>
      <BlockWithCards>
        <div
          className={`contentTextBlockWrapper max-md:text-center`}
          style={{ maxWidth: "480px" }}
        >
          <h2 className="h2-size mb-6" style={{ fontWeight: "600" }}>
            Advantages Trading with Afterprime
          </h2>
          <p className="paragraph">
            Forex trading is about compounding small advantages. One pip saved
            on cost scales into long-term profitability. By making pricing
            transparent and execution conflict-free, Afterprime helps traders
            turn discipline into edge.
          </p>
        </div>
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6 text-center w-full">
          <CardRepeator type="bold" cardSize="compact" data={cardsData} />
        </div>
      </BlockWithCards>
    </>
  );
}
