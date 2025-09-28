"use client";
import BoxedBlock from "../boxed-block/BoxedBlock";
import Btn from "@/components/ui/Button";
import Lists from "../ui/Lists";
import type { acfBlocks } from "@/types/acf";
import { useAcfRepeaterValues } from "@/hooks/getAcfRepeaterValue";

type DataProps = {
  data: acfBlocks;
  isBoxed?: boolean;
};

export function MultipurposeBlock({ data, isBoxed }: DataProps) {
  //repeater keys to gra their values
  const aBookListsItems = useAcfRepeaterValues(
    data,
    "multipurpose_block_feature_bullet_lists",
    "list_item"
  );

  // ////////
  const heading = String(data.multipurpose_block_section_heading || "");
  const contents = String(data.multipurpose_block_section_content || "");
  const htmlContent = contents
    .split(/\r?\n\r?\n/)
    .map((para?: string) => `<p>${para}</p>`)
    .join("");

  ////////
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <BoxedBlock isBoxed={isBoxed} vAlign="center">
          {/* Left */}
          <div>
            <div className="max-md:text-center md:pr-25">
              <h2
                className="h2-size mb-6"
                dangerouslySetInnerHTML={{ __html: heading || "&nbsp;" }}
              ></h2>
              <div
                className="wysWygEditor"
                dangerouslySetInnerHTML={{ __html: htmlContent || "&nbsp;" }}
              />
              <div className="mt-12">
                <Btn
                  varient="primary-ghost"
                  href="#"
                  isArrowVisible={true}
                  size="large"
                >
                  Execution Model
                </Btn>
              </div>
            </div>
          </div>
          {/* Left ends */}

          {/* Right */}
          <div>
            <Lists listItems={aBookListsItems} bulletVarient="arrow-blue" />
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
