"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./GeoInterstitial.module.scss";

interface GeoInterstitialProps {
  isOpen: boolean;
}

const REDIRECT_URL = "https://app.afterprime.com/live";
const REDIRECT_DELAY_MS = 60000;
const TICK_MS = 100;

const GeoInterstitial: React.FC<GeoInterstitialProps> = ({ isOpen }) => {
  const [visible, setVisible] = useState(false);
  const [percent, setPercent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const raf = requestAnimationFrame(() => setVisible(true));

    const tick = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / REDIRECT_DELAY_MS) * 100));
      setPercent(pct);

      if (elapsed >= REDIRECT_DELAY_MS) {
        clearInterval(tick);
        window.location.href = REDIRECT_URL;
      }
    }, TICK_MS);

    return () => {
      document.body.style.overflow = previousOverflow;
      cancelAnimationFrame(raf);
      clearInterval(tick);
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className={`${styles.overlay} ${visible ? styles.visible : ""}`}>
      <div className={styles.card}>
        <div className={styles.label}>
          <span className={styles.dot} />
          Node Allocation Secured
        </div>
        <div className={styles.headline}>Invite Code Successfully Waived</div>
        <p className={styles.body}>
          An open slot has been detected in your node sector. Reserving
          instant registration sequence now.
        </p>
        <div className={styles.actionLabel}>Action</div>
        <div className={styles.actionRow}>
          <span className={styles.actionPercent}>{percent}%</span>
          <span className={styles.processingLabel}>Processing&hellip;</span>
        </div>
        <div className={styles.barTrack}>
          <div className={styles.barFill} style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default GeoInterstitial;
