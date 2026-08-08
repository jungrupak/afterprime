import styles from "./style.module.scss";
import { Blocks } from "@/types/blocks";
import DollarSavingsCalculator from "@/components/all-calculators/CostSavingCalculator/CostSavingCalculator";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { costSavingCalculatorContent } from "@/components/all-calculators/CostSavingCalculator/costSavingCalculatorContent";

type SectionProps = Blocks["section-datavisualization"];

export default async function DataVisual(props: SectionProps) {
  const {
    data_visialization_section_section_title,
    data_visialization_section_paragraph,
  } = props;

  // DollarSavingsCalculator is a Client Component and can't call the Weglot
  // pipeline itself — same "cost-saving-calculator" content/key used by
  // calculators/[slug]/page.tsx, translated here since this block is the
  // only place that renders the calculator without an already-translated
  // content prop from a page-level fetch.
  const locale = await getRequestLocale();
  const costSavingT = await getTranslatedStatic(
    "cost-saving-calculator",
    locale,
    costSavingCalculatorContent,
  );

  return (
    <section className={`${styles.section_earning_flow} compact-section`}>
      <div className="ap_container_small">
        <div className={`${styles.costAdvantageSection}`}>
          <h2
            className="font-size-heading-md mb-4 md:mb-6 opacity-80 font-semibold"
            dangerouslySetInnerHTML={{
              __html: data_visialization_section_section_title || "&nbsp;",
            }}
          />
          <p
            className="reading-text-md opacity-60 mb-8 md:mb-12"
            dangerouslySetInnerHTML={{
              __html: data_visialization_section_paragraph ?? "&nbsp;",
            }}
          />
          <DollarSavingsCalculator content={costSavingT} />
        </div>
      </div>
    </section>
  );
}
