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
      <div className="ap_container_small">
        <div className={`${styles.sectionIntroContents}`}>
          <div>
            <h3
              className={`font-size-heading-sm mb-4 md:mb-6 opacity-80 font-semibold`}
            >
              {intro_block_title_}
            </h3>
          </div>
          <div>
            <p className={`reading-text-md font-[300] opacity-60`}>
              {intro_block_description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
