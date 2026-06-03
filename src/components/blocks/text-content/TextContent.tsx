import styles from "./style.module.scss";
import { Blocks } from "@/types/blocks";

type PropData = Blocks["text-content"];

export function TextContentBlock({ reading_text_content }: PropData) {
  const contents = String(reading_text_content || "");
  const htmlContent = contents
    .split(/\r?\n\r?\n/)
    .map((para?: string) => `<p>${para}</p>`)
    .join("");

  return (
    <>
      <section className={`compact-section`}>
        <div className={`ap_container_small`}>
          <div className={styles.textContent} dangerouslySetInnerHTML={{ __html: htmlContent ?? "" }} />
        </div>
      </section>
    </>
  );
}
