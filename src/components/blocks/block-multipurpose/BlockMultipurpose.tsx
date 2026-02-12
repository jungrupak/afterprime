"use client";
import styles from "./BlockMultipurpose.module.scss";
import BoxedBlock from "@/components/boxed-block/BoxedBlock";
import Button from "@/components/ui/Button";
import Lists from "@/components/ui/Lists";
import { Blocks } from "@/types/blocks";
import Image from "next/image";
import TypeformButton from "@/components/ui/typeForm";

type PropData = Blocks["block-multipurpose"];

export function MultipurposeBlock({
  multipurpose_block_is_boxed,
  multipurpose_block_content_vertical_alignment,
  multipurpose_block_section_heading,
  multipurpose_block_section_content,
  multipurpose_block_block_cta_label,
  multipurpose_block_cta_url,
  multipurpose_block_has_feature_bullet_list,
  multipurpose_block_block_has_featured_image,
  multipurpose_block_featured_image,
  multipurpose_block_active_right_column_content_block,
  multipurpose_block_text_content_block_title,
  multipurpose_block_text_content_block_content,
  multipurpose_block_is_type_form_cta,
  ...restProps
}: PropData) {
  //repeater keys to gra their values

  //function to get list data

  ////////
  const isBoxed = Number(multipurpose_block_is_boxed || 0);
  const vrAlign = String(multipurpose_block_content_vertical_alignment || "");
  const heading = String(multipurpose_block_section_heading || "");
  const contents = String(multipurpose_block_section_content || "");
  const htmlContent = contents
    .split(/\r?\n\r?\n/)
    .map((para?: string) => `<p>${para}</p>`)
    .join("");

  const contents_2 = String(
    multipurpose_block_text_content_block_content || "",
  );
  const htmlContent2 = contents_2
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
        bulletLists[`multipurpose_block_feature_bullet_lists_${i}_list_item`]!,
      );
      i++;
    }

    return items;
  };

  const bulletLists = getListItemsArray();

  ////////
  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <BoxedBlock isBoxed={isBoxed === 1 ? true : false} vAlign={vrAlign}>
          {/* Left */}
          <div>
            <div className="max-md:text-center xl:pr-25">
              <h2
                className="h2-size mb-6"
                dangerouslySetInnerHTML={{ __html: heading || "&nbsp;" }}
              ></h2>
              <div
                className="wysWygEditor"
                dangerouslySetInnerHTML={{ __html: htmlContent || "&nbsp;" }}
              />
              <div className="mt-12 btn-group">
                {multipurpose_block_is_type_form_cta === "1" ? (
                  <TypeformButton buttonText="Get Invite Code" size="Large" />
                ) : (
                  <Button
                    varient="primary-ghost"
                    href={multipurpose_block_cta_url || ""}
                    isArrowVisible={true}
                    size="large"
                  >
                    {ctaText}
                  </Button>
                )}
              </div>
            </div>
          </div>
          {/* Left ends */}

          {/* Right */}
          <div className={`${styles.contentRight}`}>
            {multipurpose_block_has_feature_bullet_list === "1" && (
              <Lists listItems={bulletLists} bulletVarient="arrow-blue" />
            )}

            {multipurpose_block_block_has_featured_image === "1" && (
              <div>
                {multipurpose_block_block_has_featured_image &&
                  multipurpose_block_featured_image?.url && (
                    <Image
                      src={
                        multipurpose_block_featured_image.url ||
                        "Image url path"
                      }
                      height={600}
                      width={500}
                      style={{ width: "100%" }}
                      alt={
                        multipurpose_block_featured_image.url ||
                        "Image Alt Text"
                      }
                    />
                  )}
              </div>
            )}

            {multipurpose_block_active_right_column_content_block === "1" && (
              <div className="max-md:text-center md:pr-25">
                <h2 className="h2-size mb-6">
                  {multipurpose_block_text_content_block_title}
                </h2>
                <div
                  className="wysWygEditor"
                  dangerouslySetInnerHTML={{ __html: htmlContent2 || "&nbsp;" }}
                />
              </div>
            )}
          </div>
          {/* Right Ends */}
        </BoxedBlock>
      </div>
    </section>
  );
}
