import styles from "./style.module.scss";
//
interface IntroBlockProps {
  blockTitle?: string;
  blockParagraph?: string;
}
export default function GenericIntroBlock({
  blockTitle,
  blockParagraph,
}: IntroBlockProps) {
  return (
    <section className={`${styles.sectionIntroBlockGeneric}`}>
      <div className="ap_container">
        <div className={`${styles.sectionIntroContents}`}>
          <div>
            <h3>{blockTitle}</h3>
          </div>
          <div>
            <p>{blockParagraph}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
