import Button from "@/components/button/Button";
import styles from "./ProsNcons.module.scss";
import Lists from "@/utils/lists/Lists";
import DOMPurify from "isomorphic-dompurify";

//props type that accepted by this component
type acceptedProps = {
  blockTitle?: string;
  blockPara?: string;
  ctaText?: string;
  ctaLink?: string;
  isBoxed?: boolean;
  prosLabel?: string;
  consLabel?: string;
  ProslistItems?: string[];
  ConslistItems?: string[];
};
export function ProsNCons({
  blockTitle = "Default Title",
  blockPara = "Default Paragraph",
  ctaText,
  ctaLink,
  isBoxed,
  prosLabel = "Pros Label",
  consLabel = "Cons Label",
  ProslistItems = [],
  ConslistItems = [],
}: acceptedProps) {
  const sanitizeHTML = DOMPurify.sanitize(blockTitle);

  return (
    <div className={`${isBoxed ? styles.boxed : ""}`}>
      <div
        className={`${styles.content_block} grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-40 max-md:gap-10 `}
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
          <div className="mb-16">
            <h3 className="font-bold text-[18px] mb-8">{prosLabel}</h3>
            <Lists items={ProslistItems} bulletStyle="arrow_blue" />
          </div>
          <div>
            <h3 className="font-bold text-[18px] mb-8">{consLabel}</h3>
            <Lists items={ConslistItems} bulletStyle="arrow_red" />
          </div>
        </div>
      </div>
    </div>
  );
}
