import styles from "./SectionFacts.module.scss";
import BulletBlue from "@/components/ui/BulletBlue";
import FactsVideoBg from "./FactsVideoBg";
import type { Blocks } from "@/types/blocks";

type SectionFactsProps = Blocks["fact-cards"];

export function BlockFacts(block: SectionFactsProps) {
  const cards = Object.entries(block)
    .filter(
      ([key]) => key.startsWith("facts_fact_card_") && key.endsWith("_title"),
    )
    .sort((a, b) => {
      const numA = Number(a[0].match(/\d+/)?.[0]);
      const numB = Number(b[0].match(/\d+/)?.[0]);
      return (numA || 0) - (numB || 0);
    })
    .map(([key, title]) => {
      const index = key.match(/\d+/)?.[0];
      const descKey =
        `facts_fact_card_${index}_description` as `facts_fact_card_${number}_description`;
      const description = block[descKey];
      return { title: title ?? "", description: description ?? "" };
    });

  return (
    <section
      className={`${styles.sectionFacts} compact-section relative overflow-hidden`}
    >
      <div className="ap_container_small relative z-10">
        <div className={`${styles.factWrapper}`}>
          <FactsVideoBg />
          <div className={styles.factContent}>
            {block.facts_block_title && (
              <h2 className="h2-size mb-0" style={{ fontWeight: 600 }}>
                {block.facts_block_title}
              </h2>
            )}
            {block.facts_info_text && (
              <p className={styles.infoText}>{block.facts_info_text}</p>
            )}
            {cards.length > 0 && (
              <div className={`${styles.factGrid} mt-16`}>
                {cards.map((card, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start text-left"
                  >
                    <BulletBlue />
                    <div>
                      <h3 className={styles.cardTitle}>{card.title}</h3>
                      <p className={styles.cardDesc}>{card.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
