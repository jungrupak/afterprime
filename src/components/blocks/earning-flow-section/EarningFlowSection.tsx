"use client";
import styles from "./EarningFlow.module.scss";
import Lists from "@/components/ui/Lists";
import Btn from "@/components/ui/Button";
import BoxedBlock from "@/components/boxed-block/BoxedBlock";
import { EarningCalc } from "@/utils/earning-calculator/EarningCalc";
import type { Blocks } from "@/types/blocks";

type EarningFlowBlock = Blocks["earning-flow-block"];

export function EarningFlowSection(block: EarningFlowBlock) {
  const {
    earning_flow_section_heading = "",
    earning_flow_is_cta_visible,
    earning_flow_button_text,
    earning_flow_button_link,
  } = block;

  // Extract numbered list items dynamically
  const listItems: string[] = Object.entries(block)
    .filter(
      ([key]) =>
        key.startsWith("earning_flow_list_items_") &&
        key.endsWith("_list_point") // be careful with key names
    )
    .sort((a, b) => {
      const numA = Number(a[0].match(/\d+/)?.[0]);
      const numB = Number(b[0].match(/\d+/)?.[0]);
      return (numA || 0) - (numB || 0);
    })
    .map(([_, value]) => (value !== undefined ? String(value) : ""));
  //Ends

  return (
    <section className={`${styles.section_earning_flow}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <BoxedBlock isBoxed={false} vAlign="center">
          {/* Left */}
          <div>
            <h2
              className="h2-size mb-6 text-center md:text-left"
              dangerouslySetInnerHTML={{
                __html: earning_flow_section_heading || "&nbsp;",
              }}
            ></h2>
            <div className="mt-12">
              <Lists bulletVarient="arrow-blue" listItems={listItems} />
            </div>
            {earning_flow_is_cta_visible === "1" && (
              <div className="mt-16 text-center md:text-left">
                <Btn
                  href="#"
                  size="large"
                  varient="primary-ghost"
                  isArrowVisible={true}
                >
                  {earning_flow_button_text || "Button"}
                </Btn>
              </div>
            )}
          </div>
          {/* Left Ends */}

          {/* Right */}
          <div>
            <EarningCalc />
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
//
