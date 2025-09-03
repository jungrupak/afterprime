import Button from "@/components/button/Button";
import styles from "./ContentBlock.module.scss";
import Lists from "@/utils/lists/Lists";
import DOMPurify from "isomorphic-dompurify";

//props type that accepted by this component
type acceptedProps = {
  blockTitle?: string;
  blockPara?: string;
  ctaText?: string;
  ctaLink?: string;
  isBoxed?: boolean;
  listItems?: string[];
};
export function ContentBlock({
  blockTitle = "Default Title",
  blockPara = "Default Paragraph",
  ctaText,
  ctaLink,
  isBoxed,
  listItems = [],
}: acceptedProps) {
  const sanitizeHTML = DOMPurify.sanitize(blockTitle);

  return (
    <div className={`${isBoxed ? styles.boxed : ""}`}>
      <div
        className={`${styles.content_block} grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-40 max-md:gap-10 items-center`}
      >
        <div className="max-md:text-center">
          <h2
            className="h2-size mb-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML }}
          ></h2>
          <p className="paragraph">{blockPara}</p>
          <div className="mt-12">
            <Button
              btnArrow={true}
              btnText={ctaText}
              btnSize="large"
              btnColor="primary-ghost"
              linkTo={ctaLink}
            />
          </div>
        </div>
        <div>
          <Lists items={listItems} bulletStyle="arrow_blue" />
        </div>
      </div>
    </div>
  );
}
