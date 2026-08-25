"use client";
import styles from "./Accordion.module.scss";
import { useState } from "react";

export interface AccordionObjectsKeys {
  question?: string;
  answer?: string;
}

interface AccordionProps {
  faqObjects?: AccordionObjectsKeys[];
  answerFluid?: boolean;
  defaultOpenIndex?: number;
}

export default function Accordion({
  faqObjects,
  answerFluid = false,
  defaultOpenIndex = 0,
}: AccordionProps) {
  const [isOpenAnswer, setIsOpenAnswer] = useState(defaultOpenIndex);

  // Process all answers with the hook at top level
  if (!faqObjects) return null;
  const processedAnswers = faqObjects.map((item) => {
    const raw = item.answer || "";
    const isHtml = /<[a-z][\s\S]*>/i.test(raw);
    return isHtml
      ? raw
      : raw
          .split(/\n+/)
          .map((line) => `<p>${line.trim()}</p>`)
          .join("");
  });
  return (
    <div className={`${styles.accordion_wrapper}`}>
      {faqObjects.map((item, index) => (
        <div key={index} className={`${styles.accordion_item} mb-2 last:mb-0`}>
          <h3
            onClick={() =>
              setIsOpenAnswer((prev) => (prev === index ? -1 : index))
            }
            className={`${
              isOpenAnswer === index ? styles.active : ""
            } reading-text-md font-[600]`}
          >
            {item.question}
            <span>+</span>
          </h3>
          <div
            className={`${styles.accordion_content_wrapper} ${
              isOpenAnswer === index ? styles.visible : styles.hidden
            } mt-6 max-md:mt-4`}
          >
            <div
              className={`reading-text-xs font-[400] mb-4 last:mb-0 rtl:text-right rtl:[direction:ltr] ${
                answerFluid === true ? "md:pr-[18vw]" : "md:pr-[60px]"
              } md:rtl:pr-0`}
              dangerouslySetInnerHTML={{
                __html: processedAnswers[index],
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
