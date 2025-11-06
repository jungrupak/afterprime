import Image from "next/image";
import styles from "./SimpleContent.module.scss";

type Props = {
  reading_content?: string;
  block_image?: {
    url?: string | undefined;
    alt?: string | undefined;
  };
};

//type Props = Blocks["reading-content"];

export function SimpleContentBlock({ reading_content, block_image }: Props) {
  //   const url = block_image?.url;
  //   const alt = block_image?.alt;

  const { url, alt } = block_image ?? {}; //type safe if block_image is undifined dont throw error in component

  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className={`grid grid-cols-5 gap-20 `}>
          <div
            className={`${styles.editorStyles} col-span-5 md:col-span-3`}
            dangerouslySetInnerHTML={{
              __html: reading_content || "&nbsp;",
            }}
          />
          <div
            className={`${styles.rightSticky} relative col-span-5 md:col-span-2`}
          >
            <Image
              className={`${styles.rightStickyImg}`}
              src={url || ""}
              width={300}
              height={0}
              alt={alt || ""}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
