import styles from "./style.module.scss";
import Image from "next/image";
import { Blocks } from "@/types/blocks";

type FounderCardProps = Blocks["founder-messages"];

export default function FoundersCard(props: FounderCardProps) {
  const { founder_message_cart_title, founder_message_card_paragraph } = props;
  const founderImg = "/img/founder-image.jpg";

  return (
    <section>
      <div className="grainy_bg"></div>
      <div className="ap_container">
        <div
          className={`${styles.founders_block} grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] min-md:gap-40 items-center group`}
        >
          <div className={styles.founder_image}>
            <div className={`${styles.dotted_bg} dotted-block`}></div>
            <Image
              width={600}
              height={600}
              src={founderImg}
              alt="Founders Image"
            />
          </div>
          <div className={styles.founder_story}>
            <div className={`${styles.dotted_bg} dotted-block`}></div>
            <h2 className={styles.heading}>{founder_message_cart_title}</h2>
            <p className={styles.paragraph}>{founder_message_card_paragraph}</p>
            <span className={styles.founder_info}>
              <strong>&bull; Jeremy & Elan,</strong> Co-Founders of Afterprime
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
