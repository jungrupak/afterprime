import styles from "./../Section.module.scss";

interface ContentTexts {
  children: React.ReactNode;
  className?: string;
}
export function SectionTextContent({ children, className }: ContentTexts) {
  return (
    <>
      <div className={`${styles.contentPart} ${className || ""}`}>
        {children}
      </div>
    </>
  );
}
