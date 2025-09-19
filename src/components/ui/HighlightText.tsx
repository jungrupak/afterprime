import styles from "./ui.module.scss";

interface HighlightTextProp {
  textValue?: string;
  maxWidth?: number;
}

export default function HighlightText({ textValue }: HighlightTextProp) {
  return (
    <div className={`${styles.hightLightText}`}>
      <h2 className="md:max-w-[900px]">{textValue}</h2>
    </div>
  );
}
