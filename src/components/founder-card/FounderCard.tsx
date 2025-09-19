import React from "react";
import styles from "./style.module.scss";

interface FounderCardProps {
  cardTitle?: string;
  cardParagraph?: string;
}

export default function FoundersCard({
  cardTitle,
  cardParagraph,
}: FounderCardProps) {
  const founderImg = "/img/founder-image.jpg";
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div
          className={`${styles.founders_block} grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] min-md:gap-40 items-center group`}
        >
          <div className={`${styles.founder_image}`}>
            <div className={`${styles.dotted_bg} dotted-block`}></div>
            <img src={founderImg} alt="" />
          </div>
          <div className={`${styles.founder_story}`}>
            <div className={`${styles.dotted_bg} dotted-block`}></div>
            <h2 className={`${styles.heading}`}>{cardTitle}</h2>
            <p className={`${styles.paragraph}`}>{cardParagraph}</p>
            <span className={`${styles.founder_info}`}>
              <strong>&bull; Jeremy & Elan,</strong> Co-Founders of Afterprime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
