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
          <DollarSavingsCalculator content={costSavingT} />
        </div>
      </div>
    </section>
  );
}
