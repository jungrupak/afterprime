import React from "react";
import Lists from "../ui/Lists";
import BoxedBlock from "../boxed-block/BoxedBlock";
import Btn from "@/components/ui/Button";
import type { acfBlocks } from "@/types/acf";
import { useAcfRepeaterValues } from "@/hooks/getAcfRepeaterValue";

////////
type DataProps = {
  data: acfBlocks;
};

////////
export function BuiltForTraders({ data }: DataProps) {
  const dataPros = useAcfRepeaterValues(
    data,
    "pros_and_cons_pros_or_advantages",
    "list_item"
  );
  const dataCons = useAcfRepeaterValues(
    data,
    "pros_and_cons_cons_or_disadvantages",
    "list_item"
  );

  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <BoxedBlock isBoxed={false} vAlign="center">
          {/* Left */}
          <div>
            <div className="max-md:text-center md:pr-25">
              <h2 className="h2-size mb-6">
                {data.pros_and_cons_section_title}
              </h2>
              <p className="paragraph">
                {data.pros_and_cons_section_paragraph}
              </p>
              <div className="mt-12">
                <Btn
                  varient="primary-ghost"
                  href={String(data.pros_and_cons_cta_url || "")}
                  isArrowVisible={true}
                  size="large"
                >
                  {data.pros_and_cons_section_cta_label}
                </Btn>
              </div>
            </div>
          </div>
          {/* Left Ends */}

          {/* Right */}
          <div>
            {/* Pros */}
            <div className="mb-16">
              <h3 className="font-bold text-[18px] mb-8">Designed For:</h3>
              <Lists listItems={dataPros} bulletVarient="arrow-blue" />
            </div>
            {/* Ends */}

            {/* Cons */}
            <div>
              <h3 className="font-bold text-[18px] mb-8">Not Designed For:</h3>
              <Lists listItems={dataCons} bulletVarient="arrow-red" />
            </div>
            {/* Cons Ends */}
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
