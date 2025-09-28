import React from "react";
import styles from "./ui.module.scss";
import Link from "next/link";

type CardProps = {
  alignItems?: "center" | "left" | "right";
  cardSize?: "compact" | "regular" | "large" | "small";
  title?: string;
  paragraph?: string;
  borderEnable?: boolean;
  cardCtaLabel?: string;
  cardCtaLink?: string;
  active?: boolean;
  type?: "bold" | "regular";
  linkTarget?: "Self" | "Blank";
  key?: number;
};

export default function Card({
  title,
  paragraph,
  borderEnable,
  alignItems,
  cardSize,
  cardCtaLabel,
  cardCtaLink,
  active,
  type,
  key,
  linkTarget = "Self",
}: CardProps) {
  return (
    <div
      key={key}
      className={`${styles.cardItem} ${borderEnable === true ? "border-2" : ""}
        ${active === true ? styles.activeCard : ""}
        ${type === "bold" ? styles.cardBold : ""}
        ${
          alignItems === "center"
            ? "text-center"
            : alignItems === "left"
            ? "text-left"
            : alignItems === "right"
            ? "text-right"
            : ""
        }
        ${
          cardSize === "compact"
            ? styles.cardCompact
            : cardSize === "regular"
            ? styles.cardRegular
            : cardSize === "large"
            ? styles.cardLarge
            : cardSize === "small"
            ? styles.cardSmall
            : ""
        }`}
    >
      <h3>{title}</h3>
      <p>{paragraph}</p>

      {cardCtaLink && cardCtaLink && (
        <div className={`${styles.cardCta}`}>
          <Link
            className="card_href_link hover:underline"
            href={cardCtaLink || ""}
            target={linkTarget === "Self" ? "_self" : "_blank"}
          >
            {cardCtaLabel}
            <svg
              width="20"
              height="21"
              viewBox="0 0 20 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="9.58093"
                cy="10.4996"
                r="9.58093"
                transform="rotate(-90 9.58093 10.4996)"
                fill="#FDFCF7"
              />
              <path
                d="M8.59319 6.69727L12.8014 10.9055L8.59319 15.1137L7.57739 14.0979L10.7698 10.9055L7.57739 7.71306L8.59319 6.69727Z"
                fill="#0C0C0D"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}
