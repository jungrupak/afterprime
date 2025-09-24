import React from "react";
import styles from "@/components/ui/ui.module.scss";

interface Dl {
  label?: string;
  description?: string;
}

interface ListProps {
  bulletVarient?: "default" | "arrow-red" | "arrow-blue" | "number" | "disc";
  bulletSize?: "default" | "small" | "large";
  listItems?: Dl[];
}

export default function DefinationLists({
  bulletVarient = "default",
  bulletSize = "default",
  listItems = [],
}: ListProps) {
  return (
    <>
      <ul
        className={`${styles.uiLists} ${
          bulletSize === "small"
            ? styles.sizeSmall
            : bulletSize === "large"
            ? styles.sizeLarge
            : ""
        } ${
          bulletVarient === "default"
            ? styles.default
            : bulletVarient === "arrow-red"
            ? styles.arrowRed
            : bulletVarient === "arrow-blue"
            ? styles.arrowBlue
            : bulletVarient === "disc"
            ? styles.disc
            : bulletVarient === "number"
            ? styles.number
            : ""
        }
        `}
      >
        {listItems.map((li, index) => (
          <li key={index}>
            <h2 className="font-[700] mb-2">{li.label}</h2>
            <p>{li.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
