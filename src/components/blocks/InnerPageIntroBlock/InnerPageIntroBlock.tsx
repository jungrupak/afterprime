import styles from "./style.module.scss";
//

interface Props {
  intro_block_title_?: string;
  intro_block_description?: string;
}

export default function InnerPageIntroBlock({
  intro_block_title_,
  intro_block_description,
}: Props) {
  return (
    <section className={`${styles.sectionIntroBlockGeneric}`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <div className={`${styles.sectionIntroContents}`}>
          <div>
            <h3>{intro_block_title_}</h3>
          </div>
          <div>
            <p>{intro_block_description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
