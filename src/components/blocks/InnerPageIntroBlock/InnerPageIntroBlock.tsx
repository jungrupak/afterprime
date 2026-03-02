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
    <section
      className={`${styles.sectionIntroBlockGeneric} py-[clamp(40px_,10vw_,60px)]!`}
    >
      <div className="ap_container_small">
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
