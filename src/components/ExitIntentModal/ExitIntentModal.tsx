"use client";
import { useEffect, useState } from "react";
import styles from "./ExitIntentModal.module.scss";
import Button from "@/components/ui/Button";
import { useExitIntent, SUBSCRIBED_KEY } from "./useExitIntent";
import {
  exitIntentModalContent,
  type ExitIntentModalContent,
} from "./exitIntentModalContent";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Fallback for when the live comparison feed is unavailable — keeps the
// stat callout from ever rendering blank in a conversion-focused modal.
const FALLBACK_STAT_PERCENT = 43;

interface ExitIntentModalProps {
  content?: ExitIntentModalContent;
  statPercent?: number | null;
}

export default function ExitIntentModal({
  content: c = exitIntentModalContent,
  statPercent,
}: ExitIntentModalProps) {
  const { isOpen, close } = useExitIntent();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  if (!isOpen) return null;

  async function handleSubmit() {
    if (status === "loading") return;

    if (!EMAIL_RE.test(email.trim())) {
      setErrorText(c.invalidEmailMessage);
      setStatus("error");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_SIGNUP_ENDPOINT;
    if (!endpoint) {
      console.error("NEXT_PUBLIC_NEWSLETTER_SIGNUP_ENDPOINT is not set");
      setErrorText(c.errorMessage);
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorText("");

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source: "exit_intent_modal",
        }),
      });

      if (!res.ok) {
        throw new Error("signup_failed");
      }

      localStorage.setItem(SUBSCRIBED_KEY, "1");
      setStatus("success");
    } catch {
      setErrorText(c.errorMessage);
      setStatus("error");
    }
  }

  return (
    <div
      className={`${styles.overlay} ${visible ? styles.active : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-modal-heading"
      >
        <Button
          varient="decent-ghost"
          size="x-small"
          onclick={close}
          className={styles.closeBtn}
        >
          <span className="sr-only">{c.closeButtonLabel}</span>
          &times;
        </Button>

        <div className={styles.mediaCol}>
          <video
            className={styles.mediaVideo}
            src="/jelly-bg.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          <div className={styles.mediaOverlay} />
          <div className={styles.statRow}>
            <div className={styles.statNumber}>
              <span>{statPercent ?? FALLBACK_STAT_PERCENT}</span>%
            </div>
            <div className={styles.statLabel}>
              <span className={`text-[18px] leading-[1.4] block`}>
                {c.statLabel}
              </span>{" "}
              <span className="opacity-60">{c.statLabel2}</span>
            </div>
          </div>
        </div>

        <div className={styles.contentCol}>
          {status === "success" ? (
            <div className={styles.success}>
              <div className={styles.check}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--electric-blue)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.checkIcon}
                >
                  <polyline
                    points="20 6 9 17 4 12"
                    pathLength="1"
                    className={styles.checkPath}
                  ></polyline>
                </svg>
              </div>
              <h2
                id="exit-intent-modal-heading"
                className={styles.heading}
                style={{ fontSize: 24 }}
              >
                {c.successHeading}
              </h2>
              <p className={styles.bodyCopy}>{c.successBody}</p>
              <div className={styles.successListWrap}>
                <div className={styles.successListHeading}>
                  {c.successListHeading}
                </div>
                <ul className={styles.successList}>
                  {c.successList.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <p className={styles.successFooter}>{c.successFooter}</p>
              <button className={styles.okBtn} onClick={close}>
                {c.successCloseLabel}
              </button>
            </div>
          ) : (
            <>
              <div className={styles.eyebrow}>{c.eyebrow}</div>
              <h2 id="exit-intent-modal-heading" className={styles.heading}>
                {c.heading}
              </h2>
              <p className={styles.bodyCopy}>
                <i>
                  <b>{c.aloneCurrentText}</b>{" "}
                </i>{" "}
                {c.bodyCopy}
              </p>

              <div className={styles.form}>
                <input
                  type="email"
                  placeholder={c.emailPlaceholder}
                  className={styles.emailInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                  disabled={status === "loading"}
                />
                {status === "error" && (
                  <p className={styles.errorMsg} role="alert">
                    {errorText}
                  </p>
                )}
                <button
                  type="button"
                  className={styles.ctaBtn}
                  onClick={handleSubmit}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <span className={styles.spinner} />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                    </svg>
                  )}
                  {status === "loading" ? c.submitLabelLoading : c.submitLabel}
                </button>
              </div>

              <button className={styles.dismiss} onClick={close}>
                {c.dismissLabel}
              </button>
              <div className={styles.finePrint}>{c.finePrint}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
