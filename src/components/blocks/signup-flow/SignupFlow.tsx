import Image from "next/image";
import styles from "./SignupFlow.module.scss";
import { signupFlowContent } from "./signupFlowContent";
import { getTranslatedStatic } from "@/lib/content/getTranslatedStatic";
import { getRequestLocale } from "@/lib/locale/getRequestLocale";

const paymentMethods = [
  { src: "/img/method-icons/visa-card.png", alt: "Visa" },
  { src: "/img/method-icons/master-card.png", alt: "Mastercard" },
  { src: "/img/method-icons/btc.png", alt: "Bitcoin" },
  { src: "/img/method-icons/neteller.png", alt: "Neteller" },
  { src: "/img/method-icons/skrill.png", alt: "Skrill" },
  { src: "/img/method-icons/bank-wire.png", alt: "Bank Transfer" },
  { src: "/img/method-icons/apple-pay.png", alt: "Apple Pay" },
  { src: "/img/method-icons/google-pay.png", alt: "Google Pay" },
];

function ApplyIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 2h9l5 5v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 2v5h5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8 12h8M8 16h8M8 8h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RegisterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M3 21c0-4 3-6.5 7-6.5s7 2.5 7 6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M16 15.5l2 2 3-3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FundIcon() {
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
        d="M16 13.5h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TradeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 2v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="4.5"
        y="5"
        width="3"
        height="6"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M6 11v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 8v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="10.5"
        y="11"
        width="3"
        height="7"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M12 18v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 4v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="16.5"
        y="7"
        width="3"
        height="8"
        rx="0.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M18 15v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
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

const stepIcons = [ApplyIcon, RegisterIcon, FundIcon, TradeIcon];

export default async function SignupFlow() {
  const locale = await getRequestLocale();
  const t = await getTranslatedStatic("signup-flow", locale, signupFlowContent);

  return (
    <section className={`py-[clamp(40px_,10vw_,60px)]! compact-section`}>
      <div className="ap_container_small">
        <h2 className={`mb-3! md:mb-5!`}>{t.heading}</h2>
        <p className="paragraph">{t.subheading}</p>

        <div className={styles.stepsWrapper}>
          <div className={styles.stepsGrid}>
            {t.steps.map((step, index) => {
              const Icon = stepIcons[index];
              return (
                <div className={styles.stepCard} key={step.title}>
                  <div className={styles.iconBadge} aria-hidden="true">
                    <Icon />
                  </div>
                  <p className={styles.stepEyebrow}>
                    {t.stepLabel} 0{index + 1}
                  </p>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                  {index < t.steps.length - 1 && (
                    <div className={styles.stepArrow} aria-hidden="true">
                      <StepArrowIcon />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className={styles.paymentMethods}>
          {paymentMethods.map((method) => (
            <div className={styles.paymentChip} key={method.alt}>
              <Image
                src={method.src}
                alt={method.alt}
                width={60}
                height={26}
                style={{ height: "26px", width: "auto" }}
              />
            </div>
          ))}
          <p className={styles.paymentsLabel}>{t.paymentsLabel}</p>
        </div>
      </div>
    </section>
  );
}
