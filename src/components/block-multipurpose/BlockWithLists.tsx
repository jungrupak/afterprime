import React from "react";
import styles from "./style.module.scss";
import Button from "../ui/Button";

interface BlockContents {
  children?: React.ReactNode;
  isBoxed?: boolean;
  blockTitle?: string;
  blockParagraph?: string;
  btnUrl?: string;
  btnText?: string;
}

export default function BlockWithLists({
  children,
  isBoxed,
  blockTitle,
  blockParagraph,
  btnUrl,
  btnText,
}: BlockContents) {
  return (
    <>
      <section className={``}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div
            className={`${styles.compWrapper} ${
              isBoxed ? styles.boxed : ""
            } grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 items-center`}
          >
            <div className={`max-md:text-center md:pr-20`}>
              <h2 className={`h2-size mb-6`} style={{ fontWeight: "600" }}>
                {blockTitle}
              </h2>
              <p className={`paragraph mb-10 md:mb-20`}>{blockParagraph}</p>
              <Button
                varient="primary-ghost"
                href={btnUrl || ""}
                size="large"
                isArrowVisible={true}
              >
                {btnText}
              </Button>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </section>
    </>
  );
}
