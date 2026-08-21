import styles from "./style.module.scss";
import { Blocks } from "@/types/blocks";
import { founderCardContent } from "./founderCardContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";
import FounderVideo from "./FounderVideo";

type FounderCardProps = Blocks["founder-messages"];

const FOUNDER_VIDEO_ID = "VPkRLPJqeek";

export default async function FoundersCard(props: FounderCardProps) {
  const { founder_message_cart_title, founder_message_card_paragraph } = props;
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic(
    "founder-card",
    locale,
    founderCardContent,
  );

  return (
    <section className="compact-section">
      <div className="ap_container_small">
        <div
          className={`${styles.founders_block} grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] min-md:grid-cols-[repeat(auto-fit,minmax(500px,1fr))]  min-[1204px]:gap-40 items-center group`}
        >
          <div className={styles.founder_story}>
            <span className={styles.founder_quote_mark} aria-hidden="true">
              <svg width="40" height="28" viewBox="0 0 40 28" fill="none">
                <path
                  d="M0 28V16.8C0 7.5 5.6 1.4 16.8 0L18.2 4.2C11.9 5.6 8.4 9.1 8.4 14.7H16.8V28H0ZM21.8 28V16.8C21.8 7.5 27.4 1.4 38.6 0L40 4.2C33.7 5.6 30.2 9.1 30.2 14.7H38.6V28H21.8Z"
                  fill="currentColor"
                />
              </svg>
            </span>
            <h2
              className={`font-size-heading-md mb-4 md:mb-6 opacity-80 font-semibold`}
            >
              {founder_message_cart_title}
            </h2>
            <p className={`reading-text-md font-[300]`}>
              {founder_message_card_paragraph}
            </p>
            <span className={styles.founder_info}>
              <strong>Jeremy & Elan</strong>
              <em>{t.coFoundersLabel}</em>
            </span>
          </div>
          <div className={styles.founder_video_col}>
            <FounderVideo
              videoId={FOUNDER_VIDEO_ID}
              title={founder_message_cart_title ?? t.imageAlt}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
