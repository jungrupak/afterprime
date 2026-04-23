import styles from "./style.module.scss";
import { Blocks } from "@/types/blocks";
import DollarSavingsCalculator from "@/components/all-calculators/CostSavingCalculator/CostSavingCalculator";

type SectionProps = Blocks["section-datavisualization"];

export default function DataVisual(props: SectionProps) {
  const {
    data_visialization_section_section_title,
    data_visialization_section_paragraph,
  } = props;

  return (
    <section className={`${styles.section_earning_flow} compact-section`}>
      <div className="ap_container_small">
        <div className={`${styles.costAdvantageSection}`}>
          <div
            className="h2-size font-semibold"
            dangerouslySetInnerHTML={{
              __html: data_visialization_section_section_title || "&nbsp;",
            }}
          />
          <div className="flex items-end justify-between mb-5 md:mb-10">
            <p
              className="paragraph max-w-[800px]"
              dangerouslySetInnerHTML={{
                __html: data_visialization_section_paragraph ?? "&nbsp;",
              }}
            />
          </div>
          <DollarSavingsCalculator />
        </div>
      </div>
    </section>
  );
}
