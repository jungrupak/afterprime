import styles from "./ui.module.scss";
import { Blocks } from "@/types/blocks";
type USPBlockProps = Blocks["inner-page-usp"];

export default function USP({ usps = [] }: USPBlockProps) {
  return (
    <>
      {usps.map((usp, i) => (
        <div key={i} className={`${styles.uspcard}`}>
          <h2 className="h2-size">{usp.title}</h2>
          <p className="paragraph">{usp.description}</p>
        </div>
      ))}
    </>
  );
}
