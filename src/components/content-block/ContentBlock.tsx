import styles from "./style.module.scss";
import Image from "next/image";

interface BlockContent {
  blockImgUrl?: string | null;
  children?: React.ReactNode;
  rtl?: boolean;
  vAlign?: "start" | "center" | "end";
}

export default function ContentBlock({
  children,
  blockImgUrl = null,
  rtl,
  vAlign,
}: BlockContent) {
  return (
    <>
      <section>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className={`ap_container`}>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-25 max-md:gap-10 ${
              vAlign === "start"
                ? "items-start"
                : vAlign === "center"
                ? "items-center"
                : vAlign === "end"
                ? "items-end"
                : ""
            }`}
          >
            <div
              className={`max-md:order-2 ${
                rtl === true ? "md:order-2" : ""
              } h-full`}
            >
              <Image
                src={blockImgUrl || ""}
                alt="Model Image"
                height={400} // fixed height
                width={0} // set to 0, will be overridden by CSS
                sizes="100vw"
                className={`${styles.responsiveImg}`}
              />
            </div>
            <div
              className={`${styles.contetPart} max-md:order-1 ${
                rtl === true ? "md:order-1" : ""
              }`}
            >
              {children}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
