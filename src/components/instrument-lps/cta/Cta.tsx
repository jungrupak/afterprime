import React from "react";
import styles from "./Cta.module.scss";
import Button from "@/components/ui/Button";

interface CtaFields {
  heading?: string;
  paragraph?: string;
  cta_link?: string;
}

interface ComponentProps {
  content?: CtaFields;
}

export default function Cta({ content }: ComponentProps) {
  if (!content) return null;
  return (
    <section className={`md:py-20!`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}

      <div className={`ap_container_small relative z-1 w-full`}>
        <div
          className={`${styles.bottomCta} flex flex-col justify-center items-center text-center`}
        >
          <div>
            <h2 className={`md:mb-8! leading-[1]`}>{content.heading}</h2>
            <p
              className={`paragraph mb-8 md:mb-10 opacity-80`}
              dangerouslySetInnerHTML={{
                __html: content.paragraph || "Cta Paragraph",
              }}
            />
            <Button
              varient="primary"
              size="large"
              linkTarget={"_blank"}
              href={content.cta_link || "#"}
              className="group"
            >
              <svg
                width="17"
                height="18"
                viewBox="0 0 17 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ fill: "none" }}
              >
                <path
                  d="M4.33333 8.2V5C4.33333 3.93913 4.77232 2.92172 5.55372 2.17157C6.33512 1.42143 7.39493 1 8.5 1C9.60507 1 10.6649 1.42143 11.4463 2.17157C12.2277 2.92172 12.6667 3.93913 12.6667 5V8.2M2.66667 8.2H14.3333C15.2538 8.2 16 8.91634 16 9.8V15.4C16 16.2837 15.2538 17 14.3333 17H2.66667C1.74619 17 1 16.2837 1 15.4V9.8C1 8.91634 1.74619 8.2 2.66667 8.2Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ fill: "none" }}
                  className="group-hover:stroke-[#000000]"
                />
              </svg>
              Apply for Invite Code
            </Button>
            <div className={`mt-5 opacity-65`}>
              Invite only access for approved trading profiles.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
