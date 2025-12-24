"use client";
import styles from "./Input.module.scss";

interface InputBoxProps {
  defaultValue?: string;
  type?: string;
  value?: string;
  steps?: string;
  onchange: (value: string) => void;
  error?: string;
}

export default function Input({
  type = "text",
  value,
  steps,
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
        step={steps || "0.01"}
        value={value}
        className={`${styles.inputBox}`}
        onChange={(e) => onchange && onchange(e.target.value)}
      />

      {/* {type === "number" && <NubersInputArrow />} */}

      {error && <p className="text-[red] text-[11px] mt-[5px]">{error}</p>}
    </div>
  );
}
