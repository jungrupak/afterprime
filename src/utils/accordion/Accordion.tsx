"use client";
import styles from "./Accordion.module.scss";
import { useState } from "react";
import { useContentEditor } from "@/hooks/useEditorContent";

export interface AccordionObjectsKeys {
  question?: string;
  answer?: string;
}

interface AccordionProps {
  faqObjects?: AccordionObjectsKeys[];
  answerFluid?: boolean;
}

export default function Accordion({
  faqObjects = [],
  answerFluid = false,
}: AccordionProps) {
  const [isOpenAnswer, setIsOpenAnswer] = useState(0);

  return (
    <div className={`${styles.accordion_wrapper}`}>
      {faqObjects.map((item, index) => (
        <div key={index} className={`${styles.accordion_item} mb-8 last:mb-0`}>
          <h3
            onClick={() =>
              setIsOpenAnswer((prev) => (prev === index ? -1 : index))
            }
            className={`${
              isOpenAnswer === index ? styles.active : ""
            } text-[26px] max-md:text-[20px] font-[600]`}
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
              className={`text-[18px] font-[400] mb-4 last:mb-0 opacity-80 ${
                answerFluid === true ? "md:pr-[18vw]" : "md:pr-[60px]"
              }`}
              dangerouslySetInnerHTML={{
                __html: useContentEditor(item.answer || ""),
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
