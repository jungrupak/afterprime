import Btn from "@/components/ui/Button";
import styles from "./ui.module.scss";
import Lists from "@/utils/lists/Lists";
import DOMPurify from "isomorphic-dompurify";

//props type that accepted by this component
type AcceptedProps = {
  blockTitle?: string;
  blockPara?: string;
  ctaText?: string;
  ctaLink?: string;
  isBoxed?: boolean;
  listItems?: string[];
  blockRightGraphicImg?: string;
};
export function ContentBlock({
  blockTitle = "Default Title",
  blockPara = "Default Paragraph",
  ctaText,
  ctaLink,
  isBoxed,
  blockRightGraphicImg,
  listItems = [],
}: AcceptedProps) {
  const sanitizeHTML = DOMPurify.sanitize(blockTitle);

  return (
    <div className={`${isBoxed ? styles.boxed : ""}`}>
      <div
        className={`${styles.content_block} grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10 items-center`}
      >
        <div className="max-md:text-center md:pr-20">
          <h2
            className="h2-size mb-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML }}
          ></h2>
          <p className="paragraph">{blockPara}</p>
          <div className="mt-12">
            <Btn size="regular" varient="primary-ghost" isArrowVisible={true}>
              {ctaText}
            </Btn>
          </div>
        </div>
        <div>
          {blockRightGraphicImg && (
            <img src={blockRightGraphicImg} alt="Block Right Graphics" />
          )}
          <Lists items={listItems} bulletStyle="arrow_blue" />
        </div>
      </div>
    </div>
  );
}
