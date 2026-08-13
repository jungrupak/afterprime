"use client";
import { useState } from "react";
import styles from "./ExitIntentModal.module.scss";
import { useExitIntent } from "./useExitIntent";
import { exitIntentModalContent as c } from "./exitIntentModalContent";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ExitIntentModal() {
  const { isOpen, close } = useExitIntent();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");

  if (!isOpen) return null;

  async function handleSubmit() {
    if (!EMAIL_RE.test(email.trim())) {
      setErrorText(c.invalidEmailMessage);
      setStatus("error");
      return;
    }

    const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_SIGNUP_ENDPOINT;
    if (!endpoint) {
      console.error("NEXT_PUBLIC_NEWSLETTER_SIGNUP_ENDPOINT is not set");
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
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "signup_failed");
      }

      setStatus("success");
    } catch {
      setErrorText(c.errorMessage);
      setStatus("error");
    }
  }

  return (
    <div
      className={`${styles.overlay} ${styles.active}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={close} aria-label="Close">
          &times;
        </button>

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
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <h2 className={styles.heading} style={{ fontSize: 17 }}>
              {c.successHeading}
            </h2>
            <p className={styles.bodyCopy}>{c.successBody}</p>
            <button className={styles.dismiss} onClick={close}>
              {c.successCloseLabel}
            </button>
          </div>
        ) : (
          <>
            <div className={styles.eyebrow}>{c.eyebrow}</div>
            <h2 className={styles.heading}>{c.heading}</h2>
            <p className={styles.bodyCopy}>{c.bodyCopy}</p>

            <div className={styles.statRow}>
              <div className={styles.statNumber}>{c.statNumber}</div>
              <div className={styles.statLabel}>{c.statLabel}</div>
            </div>

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
              <button
                type="button"
                className={styles.ctaBtn}
                onClick={handleSubmit}
                disabled={status === "loading"}
              >
                {status === "loading" && <span className={styles.spinner} />}
                {status === "loading" ? c.submitLabelLoading : c.submitLabel}
                {status !== "loading" && (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                )}
              </button>
              {status === "error" && (
                <p className={styles.errorMsg}>{errorText}</p>
              )}
            </div>

            <button className={styles.dismiss} onClick={close}>
              {c.dismissLabel}
            </button>
            <div className={styles.finePrint}>{c.finePrint}</div>
          </>
        )}
      </div>
    </div>
  );
}
