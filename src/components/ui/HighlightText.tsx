import styles from "./ui.module.scss";

interface HighlightTextProp {
  highlight_text?: string;
  content_width?: string;
}

export default function HighlightText({
  highlight_text,
  content_width,
}: HighlightTextProp) {
  return (
    <div className={`${styles.hightLightText}`}>
      <h2 style={{ maxWidth: content_width + "px", marginBottom: "0" }}>
        {highlight_text}
      </h2>
    </div>
  );
}
