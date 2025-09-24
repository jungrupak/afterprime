import styles from "./Section.module.scss";
import BoxedBlock from "../boxed-block/BoxedBlock";

interface SectionContent {
  children?: React.ReactNode;
  sectionClass?: string;
  noiseEffect?: boolean;
  container?: "boxed" | "noBoxed";
  contentAlign?: "start" | "center" | "end";
  containerClass?: string;
}

export default function Section({
  children,
  sectionClass,
  containerClass,
  noiseEffect,
  contentAlign = "start",
  container = "noBoxed",
}: SectionContent) {
  return (
    <>
      <section className={sectionClass || ""}>
        {/* grain bg effect */}
        {noiseEffect && <div className="grainy_bg"></div>}

        {/* grain bg effect */}
        <div className="ap_container">
          <BoxedBlock
            isBoxed={container === "boxed" ? true : false}
            vAlign={contentAlign}
            className={containerClass || ""}
          >
            {children}
          </BoxedBlock>
        </div>
      </section>
    </>
  );
}
