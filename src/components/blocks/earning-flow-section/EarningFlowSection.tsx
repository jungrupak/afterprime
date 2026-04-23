// src/components/blocks/earning-flow-section/EarningFlowSection.tsx
import styles from "./EarningFlow.module.scss";
import Lists from "@/components/ui/Lists";
import Btn from "@/components/ui/Button";
import BoxedBlock from "@/components/boxed-block/BoxedBlock";
import { EarningCalc } from "@/utils/earning-calculator/EarningCalc";
import { normalizeRebatesPayload, type RebateDataType } from "@/lib/rebates";
import type { Blocks } from "@/types/blocks";

type EarningFlowBlock = Blocks["earning-flow-block"];

export async function EarningFlowSection(block: EarningFlowBlock) {
  const {
    earning_flow_section_heading = "",
    earning_flow_is_cta_visible,
    earning_flow_button_text,
    earning_flow_button_link,
  } = block;

  const listItems: string[] = Object.entries(block)
    .filter(
      ([key]) =>
        key.startsWith("earning_flow_list_items_") &&
        key.endsWith("_list_point"),
    )
    .sort((a, b) => {
      const numA = Number(a[0].match(/\d+/)?.[0]);
      const numB = Number(b[0].match(/\d+/)?.[0]);
      return (numA || 0) - (numB || 0);
    })
    .map(([_, value]) => (value !== undefined ? String(value) : ""));

  let initialRebates: RebateDataType[] = [];
  try {
    const res = await fetch(
      "https://scoreboard.argamon.com:8443/api/rebates/current",
      { next: { revalidate: 3600 } },
    );
    if (res.ok) {
      initialRebates = normalizeRebatesPayload(await res.json());
    }
  } catch {
    // silently fall back to empty — EarningCalc handles empty array gracefully
  }

  return (
    <section className={`${styles.section_earning_flow} compact-section`}>
      <div className="ap_container_small">
        <BoxedBlock isBoxed={false} vAlign="center">
          {/* Left */}
          <div>
            <h2
              className="h2-size mb-6 text-center md:text-left"
              dangerouslySetInnerHTML={{
                __html: earning_flow_section_heading || "&nbsp;",
              }}
            />
            <div className="mt-12">
              <Lists bulletVarient="arrow-blue" listItems={listItems} />
            </div>
            {earning_flow_is_cta_visible === "1" && (
              <div className="mt-16 text-center md:text-left">
                <Btn
                  href={earning_flow_button_link || ""}
                  size="large"
                  varient="primary-ghost"
                  isArrowVisible={true}
                >
                  {earning_flow_button_text || "Button"}
                </Btn>
              </div>
            )}
          </div>
          {/* Right */}
          <div>
            <EarningCalc initialRebates={initialRebates} />
          </div>
        </BoxedBlock>
      </div>
    </section>
  );
}
