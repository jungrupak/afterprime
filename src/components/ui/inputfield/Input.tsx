"use client";
import styles from "./Input.module.scss";

interface InputBoxProps {
  defaultValue?: string;
  type?: string;
  value?: string;
  steps?: string;
  placeholder?: string;
  className?: string;
  wrapperClassName?: string;
  onchange: (value: string) => void;
  error?: string;
}

export default function Input({
  type = "text",
  value,
  steps,
  placeholder,
  className,
  wrapperClassName,
  onchange,
  error,
}: InputBoxProps) {
  return (
    <div
      className={`${styles.inputWrapper} ${
        type === "number" ? styles.numberInput : ""
      } ${wrapperClassName || ""}`}
    >
      <input
        type={type}
        step={steps || "0.01"}
        value={value}
        placeholder={placeholder}
        className={`${styles.inputBox} ${className || ""}`}
        onChange={(e) => onchange && onchange(e.target.value)}
      />

      {/* {type === "number" && <NubersInputArrow />} */}

      {error && <p className="text-[red] text-[11px] mt-[5px]">{error}</p>}
    </div>
  );
}
