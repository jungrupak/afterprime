import { Blocks } from "@/types/blocks";
import styles from "./style.module.scss";
type USPBlockProps = Blocks["inner-page-usp"];

export default function USPBlock({ usps = [] }: USPBlockProps) {
  return (
    <section className={`${styles.innerPageUsp} compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <div className={`${styles.uspWrapper}`}>
          {usps.map((usp, i) => (
            <div key={i} className={`${styles.uspcard}`}>
              <h2 className="h2-size">{usp.title}</h2>
              <p className="paragraph">{usp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
