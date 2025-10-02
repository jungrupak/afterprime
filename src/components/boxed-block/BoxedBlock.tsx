"use client";
import styles from "./style.module.scss";

interface BlockProps {
  children?: React.ReactNode;
  isBoxed?: boolean;
  vAlign?: string;
  className?: string;
}
export default function BoxedBlock({
  children,
  isBoxed,
  className,
  vAlign = "Top",
}: BlockProps) {
  const checkAlign =
    vAlign === "Top"
      ? "items-start"
      : vAlign === "Middle"
      ? "items-center"
      : vAlign === "Bottom"
      ? "items-end"
      : vAlign === "Stretched"
      ? "stretched"
      : "";
  return (
    <>
      <div
        className={`${className || ""}${
          isBoxed === true ? styles.styleBoxed : ""
        } ${checkAlign} grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-10`}
      >
        {children}
      </div>
    </>
  );
}
