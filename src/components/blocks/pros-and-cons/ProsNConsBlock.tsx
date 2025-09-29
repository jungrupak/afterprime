import React from "react";
import Lists from "@/components/ui/Lists";
import BoxedBlock from "@/components/boxed-block/BoxedBlock";
import Button from "@/components/ui/Button";
import type { Blocks } from "@/types/blocks";

type ProsNConsProps = Blocks["block-pros-and-cons"];

////////
export function ProsNConsBlock({
  pros_and_cons_section_title,
  pros_and_cons_section_paragraph,
  pros_and_cons_section_cta_label,
  pros_and_cons_cta_url,
  pros_and_cons_pros_title_pros_or_advantages,
  pros_and_cons_cons_title_cons_or_disadvantages,
  pros_and_cons,
  pros_and_cons_pros_title_title,
  pros_and_cons_cons_title_title,
  pros_and_cons_is_boxed,
  ...restProps
}: ProsNConsProps) {
  const isBoxed = Number(pros_and_cons_is_boxed || 0);
  const heading = String(pros_and_cons_section_title || "");
  const contents = String(pros_and_cons_section_paragraph || "");
  const htmlContent = contents
    .split(/\r?\n\r?\n/)
    .map((para?: string) => `<p>${para}</p>`)
    .join("");

  const ctaText = String(pros_and_cons_section_cta_label || "");

  //Get pros list items
  // Local function to extract values into an array
  const getProsListsArray = (): string[] => {
    const items: string[] = [];
    let i = 0;

    // Type assertion so TypeScript knows restProps may contain the keys
    const bulletLists = restProps as Record<string, string | undefined>;

    while (
      bulletLists[`pros_and_cons_pros_title_pros_or_advantages_${i}_list_item`]
    ) {
      items.push(
        bulletLists[
          `pros_and_cons_pros_title_pros_or_advantages_${i}_list_item`
        ]!
      );
      i++;
    }

    return items;
  };

  const ProstLists = getProsListsArray();
  //

  const getConsListsArray = (): string[] => {
    const items: string[] = [];
    let i = 0;

    // Type assertion so TypeScript knows restProps may contain the keys
    const bulletLists = restProps as Record<string, string | undefined>;

    while (
      bulletLists[
        `pros_and_cons_cons_title_cons_or_disadvantages_${i}_list_item`
      ]
    ) {
      items.push(
        bulletLists[
          `pros_and_cons_cons_title_cons_or_disadvantages_${i}_list_item`
        ]!
      );
      i++;
    }

    return items;
  };

  const ConsLists = getConsListsArray();
  //

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
              <h2 className="h2-size mb-6">{heading}</h2>
              <div
                className="paragraph"
                dangerouslySetInnerHTML={{ __html: htmlContent || "&nbsp;" }}
              />
              <div className="mt-12">
                <Button
                  varient="primary-ghost"
                  href={``}
                  isArrowVisible={true}
                  size="large"
                >
                  {ctaText}
                </Button>
              </div>
            </div>
          </div>
          {/* Left Ends */}

          {/* Right */}
          <div>
            {/* Pros */}
            <div className="mb-16">
              <h3 className="font-bold text-[18px] mb-8">Designed For:</h3>
              <Lists listItems={ProstLists} bulletVarient="arrow-blue" />
            </div>
            {/* Ends */}

            {/* Cons */}
            <div>
              <h3 className="font-bold text-[18px] mb-8">Not Designed For:</h3>
              <Lists listItems={ConsLists} bulletVarient="arrow-red" />
            </div>
            {/* Cons Ends */}
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
