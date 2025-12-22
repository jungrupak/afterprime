"use client";
import styles from "./Input.module.scss";
import NubersInputArrow from "../NubersInputArrow";

interface InputBoxProps {
  defaultValue?: string;
  type?: string;
  value?: string;
  onchange: (value: string) => void;
  error?: string;
}

export default function Input({
  type = "text",
  value,
  onchange,
  error,
}: InputBoxProps) {
  return (
    <div
      className={`${styles.inputWrapper} ${
        type === "number" ? styles.numberInput : ""
      }`}
    >
      <input
        type={type}
        step="0.01"
        value={value}
        className={`${styles.inputBox}`}
        onChange={(e) => onchange && onchange(e.target.value)}
      />

      {/* {type === "number" && <NubersInputArrow />} */}

      {error && <p className="text-[red] text-[11px] mt-[5px]">{error}</p>}
    </div>
  );
}
