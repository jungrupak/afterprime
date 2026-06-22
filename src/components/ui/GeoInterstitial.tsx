"use client";

import { useEffect, useState } from "react";
import styles from "./GeoInterstitial.module.scss";

interface GeoInterstitialProps {
  isOpen: boolean;
}

const REDIRECT_URL = "https://app.afterprime.com/live";
const REDIRECT_DELAY_MS = 60000;

const GeoInterstitial: React.FC<GeoInterstitialProps> = ({ isOpen }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const raf = requestAnimationFrame(() => setVisible(true));
    const redirectTimer = setTimeout(() => {
      window.location.href = REDIRECT_URL;
    }, REDIRECT_DELAY_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(redirectTimer);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${visible ? styles.visible : ""}`}>
      <div className={styles.card}>
        <div className={styles.label}>
          <span className={styles.dot} />
          Verifying Region..
        </div>
        <h2 className={styles.headline}>Invite Code Successfully waved!</h2>
        <div className={styles.body}>
          Redirecting you to the Afterprime Live trading platform.
        </div>
        <div className={styles.barTrack}>
          <div className={styles.barFill} />
        </div>
      </div>
    </div>
  );
};

export default GeoInterstitial;
