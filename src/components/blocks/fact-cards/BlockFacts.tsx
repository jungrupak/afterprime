import React from "react";
import styles from "./SectionFacts.module.scss";
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
    <section className="compact-section">
      <div className="ap_container_small text-center">
        {block.facts_block_title && <h2>{block.facts_block_title}</h2>}
        {cards.length > 0 && (
          <div className={styles.factGrid}>
            {cards.map((card, index) => (
              <div key={index} className={styles.factCard}>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>
        )}
        {block.facts_info_text && (
          <p className={styles.infoText}>{block.facts_info_text}</p>
        )}
      </div>
    </section>
  );
}
