"use client";
import styles from "./AccountMechanics.module.scss";
import {
  boostedContent,
  type BoostedMechanicsContent,
} from "./boostedContent";
import { useInView } from "./useInView";

interface AccountMechanicsProps {
  content?: BoostedMechanicsContent;
}

function EntryFeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20 12.5 12.9 3.9a2 2 0 0 0-1.6-.7L5 3.5a1.5 1.5 0 0 0-1.5 1.5l-.3 6.3a2 2 0 0 0 .6 1.6l8.3 8.3a1.5 1.5 0 0 0 2.1 0l6.1-6.1a1.5 1.5 0 0 0 0-2.1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle
        cx="8.5"
        cy="8.5"
        r="1.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function SimulatedBalanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="3"
        y="6"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 10h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="14.5"
        r="1.4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function CutoffIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 9l6 6 3-3 7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 19h5v-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 21h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GraduationTargetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
    </svg>
  );
}

function EquityFloorIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 3l7 3.2v5c0 4.6-3 8.4-7 9.8-4-1.4-7-5.2-7-9.8v-5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 12.2l2.1 2.1L15.3 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MaxNopIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4 15a8 8 0 1 1 16 0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 15l4-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="15" r="1.3" fill="currentColor" />
    </svg>
  );
}

const statIcons = [
  EntryFeeIcon,
  SimulatedBalanceIcon,
  CutoffIcon,
  GraduationTargetIcon,
  EquityFloorIcon,
  MaxNopIcon,
];

export default function AccountMechanics({
  content = boostedContent.mechanics,
}: AccountMechanicsProps) {
  const mechanics = content;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="account-mechanics" className="compact-section">
      <div
        ref={ref}
        className={`ap_container_small ${styles.wrapper} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <div className={styles.heading_block}>
          <p className={styles.eyebrow}>{mechanics.eyebrow}</p>
          <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
            {mechanics.heading}
          </h2>
        </div>

        <div className={`${styles.grid} mt-6! md:mt-12!`}>
          {mechanics.stats.map((stat, index) => {
            const Icon = statIcons[index];
            return (
              <div key={stat.label} className={styles.stat}>
                <div className={styles.iconBadge} aria-hidden="true">
                  <Icon />
                </div>
                <p
                  className={`${styles.stat_label} ${
                    stat.accent ? styles.stat_label_accent : ""
                  }`}
                >
                  {stat.label}
                </p>
                <p className={styles.stat_value}>{stat.value}</p>
                <p className={styles.stat_caption}>{stat.caption}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
