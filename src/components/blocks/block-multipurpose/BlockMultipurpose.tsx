import BoxedBlock from "@/components/boxed-block/BoxedBlock";
import Button from "@/components/ui/Button";
import Lists from "@/components/ui/Lists";
import { Blocks } from "@/types/blocks";
import Image from "next/image";

type PropData = Blocks["block-multipurpose"];

export function MultipurposeBlock({
  multipurpose_block_is_boxed,
  multipurpose_block_section_heading,
  multipurpose_block_section_content,
  multipurpose_block_block_cta_label,
  multipurpose_block_has_feature_bullet_list,
  multipurpose_block_block_has_featured_image,
  multipurpose_block_featured_image,
  ...restProps
}: PropData) {
  //repeater keys to gra their values

  //function to get list data

  ////////
  const isBoxed = Number(multipurpose_block_is_boxed || 0);
  const heading = String(multipurpose_block_section_heading || "");
  const contents = String(multipurpose_block_section_content || "");
  const htmlContent = contents
    .split(/\r?\n\r?\n/)
    .map((para?: string) => `<p>${para}</p>`)
    .join("");

  const ctaText = String(multipurpose_block_block_cta_label || "");

  // Local function to extract values into an array
  const getListItemsArray = (): string[] => {
    const items: string[] = [];
    let i = 0;

    // Type assertion so TypeScript knows restProps may contain the keys
    const bulletLists = restProps as Record<string, string | undefined>;

    while (
      bulletLists[`multipurpose_block_feature_bullet_lists_${i}_list_item`]
    ) {
      items.push(
        bulletLists[`multipurpose_block_feature_bullet_lists_${i}_list_item`]!
      );
      i++;
    }

    return items;
  };

  const bulletLists = getListItemsArray();

  ////////
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <BoxedBlock isBoxed={isBoxed === 1 ? true : false} vAlign="center">
          {/* Left */}
          <div>
            <div className="max-md:text-center md:pr-25">
              <h2
                className="h2-size mb-6"
                dangerouslySetInnerHTML={{ __html: heading }}
              ></h2>
              <div
                className="wysWygEditor"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
              <div className="mt-12">
                <Button
                  varient="primary-ghost"
                  href="#"
                  isArrowVisible={true}
                  size="large"
                >
                  {ctaText}
                </Button>
              </div>
            </div>
          </div>
          {/* Left ends */}

          {/* Right */}
          <div>
            <Lists listItems={bulletLists} bulletVarient="arrow-blue" />

            <div className="my-20">
              {multipurpose_block_block_has_featured_image &&
                multipurpose_block_featured_image?.url && (
                  <Image
                    src={multipurpose_block_featured_image.url || ""}
                    height={600}
                    width={500}
                    style={{ width: "100%" }}
                    alt={multipurpose_block_featured_image.url || ""}
                  />
                )}
            </div>
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
