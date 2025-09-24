"use client";
import styles from "./style.module.scss";

interface BlockProps {
  children?: React.ReactNode;
  isBoxed?: boolean;
  vAlign?: "start" | "center" | "end";
  className?: string;
}
export default function BoxedBlock({
  children,
  isBoxed,
  className,
  vAlign = "start",
}: BlockProps) {
  const checkAlign =
    vAlign === "start"
      ? "start"
      : vAlign === "center"
      ? "center"
      : vAlign === "end"
      ? "end"
      : "";
  return (
    <>
      <div
        className={`${className || ""} ${
          isBoxed === true ? styles.styleBoxed : ""
        } grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10`}
        style={{ alignItems: checkAlign }}
      >
        {children}
      </div>
    </>
  );
}
