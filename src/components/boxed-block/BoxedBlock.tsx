import styles from "./style.module.scss";

interface BlockProps {
  children?: React.ReactNode;
  isBoxed?: boolean;
  vAlign?: string;
  className?: string;
  isStacked?: string;
}
export default function BoxedBlock({
  children,
  isBoxed,
  className,
  vAlign = "Top",
  isStacked = "0",
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

  const stacked = isStacked === "1";

  return (
    <>
      <div
        className={`${className || ""}${
          isBoxed === true ? styles.styleBoxed : ""
        } ${stacked ? styles.stackedNoPadding : ""} ${checkAlign} grid ${
          stacked
            ? "grid-cols-1"
            : "grid-cols-[repeat(auto-fit,minmax(250px,1fr))]"
        } gap-10 md:gap-20`}
      >
        {children}
      </div>
    </>
  );
}
