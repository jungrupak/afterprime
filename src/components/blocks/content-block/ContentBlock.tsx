"use client";

import styles from "./style.module.scss";
import Image from "next/image";
import Button from "@/components/ui/Button";
import TypeformButton from "@/components/ui/typeForm";

interface BlockContent {
  content_block_with_image_heading?: string;
  content_block_with_image_content?: string;
  content_block_with_image_enable_cta_button?: string;
  content_block_with_image_button_group_cta_label?: string;
  content_block_with_image_button_group_cta_link?: string;
  content_block_with_image_block_image_image_alignment?: string;
  content_block_with_image_block_image_add_image?: {
    url?: string;
    alt?: string;
  };
  content_block_with_image_is_type_form_cta?: string | undefined;
}

export default function ContentBlock({
  content_block_with_image_heading,
  content_block_with_image_content,
  content_block_with_image_enable_cta_button,
  content_block_with_image_button_group_cta_label,
  content_block_with_image_button_group_cta_link,
  content_block_with_image_block_image_image_alignment,
  content_block_with_image_block_image_add_image,
  content_block_with_image_is_type_form_cta,
}: BlockContent) {
  const contents = String(content_block_with_image_content || "");
  const htmlContent = contents
    .split(/\r?\n\r?\n/)
    .map((para?: string) => `<p>${para}</p>`)
    .join("");

  return (
    <>
      <section className={`compact-section`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className={`ap_container_small`}>
          <div className={`grid grid-cols-1 lg:grid-cols-2 xl:gap-25 gap-10`}>
            <div
              className={` ${
                content_block_with_image_block_image_image_alignment === "left"
                  ? "order-1"
                  : "order-2"
              } h-full`}
            >
              {content_block_with_image_block_image_add_image?.url ? (
                <Image
                  src={content_block_with_image_block_image_add_image?.url}
                  alt={
                    content_block_with_image_block_image_add_image?.alt ||
                    "image alt text"
                  }
                  height={400} // fixed height
                  width={0} // set to 0, will be overridden by CSS
                  sizes="100vw"
                  className={`${styles.responsiveImg}`}
                />
              ) : null}
            </div>

            <div
              className={`${styles.contetPart} ${
                content_block_with_image_block_image_image_alignment === "left"
                  ? "order-2"
                  : "order-1"
              }`}
            >
              <h2 className="h2-size" style={{ fontWeight: "600" }}>
                {content_block_with_image_heading}
              </h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: htmlContent ?? "&nbsp;",
                }}
              />
              {content_block_with_image_is_type_form_cta === "1" && (
                <TypeformButton buttonText="Get Invite Code" size="Large" />
              )}

              {content_block_with_image_enable_cta_button === "1" && (
                <Button
                  varient="primary-ghost"
                  href={content_block_with_image_button_group_cta_link || ""}
                  isArrowVisible={true}
                  size="large"
                >
                  {content_block_with_image_button_group_cta_label}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
