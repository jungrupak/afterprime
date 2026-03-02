import styles from "./style.module.scss";
interface SectionProps {
  children?: React.ReactNode;
}

export default function BlockWIthCards({ children }: SectionProps) {
  return (
    <section className={`${styles.sectionBlockWithCards}`}>
      <div className="ap_container relative">
        {/* <div className={`dotted_bg_in_container dotted-block`}></div> */}
        <div
          className={`${styles.content_block} flex gap-28 max-md:gap-10 max-md:flex-col items-center`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
