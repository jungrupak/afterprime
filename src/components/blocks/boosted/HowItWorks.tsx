"use client";
import styles from "./HowItWorks.module.scss";
import { boostedContent } from "./boostedContent";
import { useInView } from "./useInView";

function KycIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="8.5" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5.5 15.5c.6-1.5 1.8-2.3 3-2.3s2.4.8 3 2.3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M14.5 10h4M14.5 13h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SimulatedIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 20V4M3 20h18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="6"
        y="13"
        width="3"
        height="7"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="12"
        y="9"
        width="3"
        height="11"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="18"
        y="6"
        width="3"
        height="14"
        rx="0.5"
        strokeDasharray="2 2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function GraduateIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2 9l10-4 10 4-10 4-10-4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 9v5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function WithdrawIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M13 13.5h4M17 13.5l-2-2M17 13.5l-2 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StepArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stepIcons = [KycIcon, SimulatedIcon, GraduateIcon, WithdrawIcon];

export default function HowItWorks() {
  const { howItWorks } = boostedContent;
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="how-it-works" className="compact-section">
      <div
        ref={ref}
        className={`ap_container_small ${styles.wrapper} ${
          isVisible ? styles.visible : ""
        }`}
      >
        <p className={styles.eyebrow}>{howItWorks.eyebrow}</p>
        <h2 className="font-size-heading-md mb-4 md:mb-6 font-semibold">
          {howItWorks.heading}
        </h2>
        <p className="reading-text-md mb-8 md:mb-12">
          {howItWorks.subheading}
        </p>

        <div className={styles.stepsWrapper}>
          <div className={styles.stepsGrid}>
            {howItWorks.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <div className={styles.stepCard} key={step.title}>
                  <div className={styles.iconBadge} aria-hidden="true">
                    <Icon />
                  </div>
                  <p className={styles.stepEyebrow}>
                    {howItWorks.stepLabel} 0{index + 1}
                  </p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.body}</p>
                  {index < howItWorks.steps.length - 1 && (
                    <div className={styles.stepArrow} aria-hidden="true">
                      <StepArrowIcon />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
