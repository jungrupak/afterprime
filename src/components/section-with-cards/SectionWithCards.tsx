import styles from "./SectionWithCards.module.scss";
import CardRepeator from "../card-repeater/CardRepeater";
import type { CardDataObject } from "@/types/cardObject";

interface SectionProps {
  sectionHeading?: React.ReactNode;
  sectionSubtitle?: string;
  numberOfCardInRow: number;
  headingLayout: "TwoCol" | "CenterAligned" | "LeftAligned";
  cardItems: CardDataObject[];
}

export function SectionWithCards({
  numberOfCardInRow,
  headingLayout,
  sectionHeading,
  sectionSubtitle,
  cardItems,
}: SectionProps) {
  return (
    <section className={`${styles.sectionWithCards}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        {(headingLayout === "TwoCol" && (
          <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
            <div>{sectionHeading}</div>
            <div>
              <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
                {sectionSubtitle}
              </p>
            </div>
          </div>
        )) ||
          (headingLayout === "CenterAligned" && (
            <div className="grid grid-cols-1 gap-6 text-center">
              <div>{sectionHeading}</div>
              <div>
                <p className="paragraph max-w-2xl mx-auto max-md:mb-10">
                  {sectionSubtitle}
                </p>
              </div>
            </div>
          )) ||
          (headingLayout === "LeftAligned" && (
            <div className="grid grid-cols-1 gap-6 max-md:text-center">
              <div>{sectionHeading}</div>
              <div>
                <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
                  {sectionSubtitle}
                </p>
              </div>
            </div>
          ))}

        {/* Cards */}
        <div
          className={`ap_cards_wrapper grid ${
            numberOfCardInRow === 3
              ? "grid-cols-[repeat(auto-fit,minmax(350px,1fr))]"
              : numberOfCardInRow === 4
              ? "grid-cols-[repeat(auto-fit,minmax(300px,1fr))]"
              : numberOfCardInRow === 5
              ? "grid-cols-[repeat(auto-fit,minmax(230px,1fr))]"
              : numberOfCardInRow === 6
              ? "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]"
              : numberOfCardInRow === 2
              ? "grid-cols-[repeat(auto-fit,minmax(550px,1fr))]"
              : "grid-cols-[repeat(auto-fit,minmax(1000px,1fr))]"
          }  gap-6 text-center md:mt-18`}
        >
          <CardRepeator cardSize="large" data={cardItems} />
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
