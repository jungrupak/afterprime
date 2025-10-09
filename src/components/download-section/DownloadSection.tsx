import styles from "./DownloadSection.module.scss";
import Card from "../ui/Card";
import type { CardDataObject } from "@/types/cardObject";

interface SectionProps {
  sectionTitle?: string;
  sectionParagraph?: string;
  cards?: CardDataObject[];
}

export function SectionDownloadPlatform({
  sectionTitle,
  sectionParagraph,
  cards = [],
}: SectionProps) {
  return (
    <section className={`${styles.section_generic_cards_content}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-6">
          <div className="">
            <h2 className="h2-size mb-6 text-center md:text-left">
              Download
              <br />
              <span>{sectionTitle}</span>
            </h2>
          </div>
          <div className="">
            <p className="paragraph max-w-2xl opacity-90 max-md:text-center max-md:mb-10">
              {sectionParagraph}
            </p>
          </div>
        </div>
        {/* Cards */}
        <div className="ap_cards_wrapper grid grid-cols-[repeat(auto-fit,minmax(335px,1fr))] gap-6 text-center md:mt-18">
          {cards.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              paragraph={card.paragraph}
              cardCtaLabel={card.ctaLabel}
              cardCtaLink={card.ctaLink}
              cardSize="large"
              active={false}
            />
          ))}
        </div>
        {/* Cards Ends */}
      </div>
    </section>
  );
}
