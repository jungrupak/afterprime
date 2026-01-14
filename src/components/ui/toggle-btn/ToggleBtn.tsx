"use client";
import styles from "./ToggleBtn.module.scss";
import React, { useState } from "react";

interface ToggleBtn {
  activeValue?: string;
  optionA?: string;
  optionB?: string;
  onclick?: () => void;
}

export default function ToggleBtn({
  activeValue,
  optionA,
  optionB,
  onclick,
}: ToggleBtn) {
  const [activeOptn, setActiveOptn] = useState(optionA);

  const handleClick = () => {
    setActiveOptn((prev) => (prev === optionA ? optionB : optionA));
    onclick?.();
  };

  return (
    <div className={`${styles.toggleWrapper}`}>
      <span
        className={`${activeOptn === optionA ? styles.active : ""}`}
        onClick={handleClick}
        style={{ pointerEvents: activeOptn === optionA ? "none" : "auto" }}
      >
        BUY
      </span>
      <span
        className={`${activeOptn === optionB ? styles.active : ""}`}
        style={{ pointerEvents: activeOptn === optionB ? "none" : "auto" }}
        onClick={handleClick}
      >
        SELL
      </span>
    </div>
  );
}
