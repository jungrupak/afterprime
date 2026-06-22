"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./GeoInterstitial.module.scss";

interface GeoInterstitialProps {
  isOpen: boolean;
}

const REDIRECT_URL = "https://app.afterprime.com/live?t=pass";
const REDIRECT_DELAY_MS = 6000;
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
      const pct = Math.min(
        100,
        Math.round((elapsed / REDIRECT_DELAY_MS) * 100),
      );
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
        <div className={styles.label}>Node Allocation Secured</div>
        <div className={styles.headline}>Invite Code Successfully Waived</div>
        <div className={`${styles.alertWrap} flex gap-5 items-start`}>
          <span className={`mt-[6px]`}>
            <svg
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.30274 12.2001L3.16876 12.7001L2.30274 12.2001ZM7.15248 3.80011L6.28645 3.30011V3.30011L7.15248 3.80011ZM12.6953 3.80011L13.5613 3.30011V3.30011L12.6953 3.80011ZM17.5451 12.2001L18.4111 11.7001V11.7001L17.5451 12.2001ZM9.11015 1.17291L9.51689 2.08645V2.08645L9.11015 1.17291ZM10.7373 1.17291L10.3306 2.08645V2.08645L10.7373 1.17291ZM1.82031 16.6181L1.23253 17.4271H1.23253L1.82031 16.6181ZM1.00664 15.2091L2.00116 15.1045L1.00664 15.2091ZM18.0275 16.6181L18.6153 17.4271V17.4271L18.0275 16.6181ZM18.8411 15.2091L19.8357 15.3136V15.3136L18.8411 15.2091ZM9.97363 13.0001H10.9736C10.9736 12.4478 10.5259 12.0001 9.97363 12.0001V13.0001ZM9.97363 13.1001L9.97339 14.1001C10.2386 14.1001 10.4931 13.9948 10.6807 13.8073C10.8682 13.6197 10.9736 13.3653 10.9736 13.1001H9.97363ZM9.87403 13.1H8.87403C8.87403 13.6522 9.32159 14.0999 9.87378 14.1L9.87403 13.1ZM9.87403 13.0001V12.0001C9.32174 12.0001 8.87403 12.4478 8.87403 13.0001H9.87403ZM10.9238 6.00006C10.9238 5.44777 10.4761 5.00006 9.92383 5.00006C9.37154 5.00006 8.92383 5.44777 8.92383 6.00006H9.92383H10.9238ZM8.92383 10.0001C8.92383 10.5523 9.37154 11.0001 9.92383 11.0001C10.4761 11.0001 10.9238 10.5523 10.9238 10.0001H9.92383H8.92383ZM14.7737 17.0001V16.0001H5.07422V17.0001V18.0001H14.7737V17.0001ZM2.30274 12.2001L3.16876 12.7001L8.0185 4.30011L7.15248 3.80011L6.28645 3.30011L1.43671 11.7001L2.30274 12.2001ZM12.6953 3.80011L11.8293 4.30011L16.679 12.7001L17.5451 12.2001L18.4111 11.7001L13.5613 3.30011L12.6953 3.80011ZM7.15248 3.80011L8.0185 4.30011C8.4831 3.4954 8.7977 2.95241 9.0665 2.57189C9.33832 2.1871 9.47179 2.10653 9.51689 2.08645L9.11015 1.17291L8.70342 0.259364C8.15486 0.503599 7.76421 0.949033 7.43296 1.41797C7.09869 1.89117 6.73129 2.52963 6.28645 3.30011L7.15248 3.80011ZM12.6953 3.80011L13.5613 3.30011C13.1165 2.52955 12.749 1.89111 12.4146 1.41786C12.0832 0.948903 11.6925 0.50356 11.144 0.259364L10.7373 1.17291L10.3306 2.08645C10.3758 2.10657 10.5093 2.18724 10.7812 2.572C11.05 2.95248 11.3647 3.49548 11.8293 4.30011L12.6953 3.80011ZM9.11015 1.17291L9.51689 2.08645C9.7758 1.97118 10.0717 1.97118 10.3306 2.08645L10.7373 1.17291L11.144 0.259364C10.3673 -0.0864546 9.48014 -0.0864545 8.70342 0.259364L9.11015 1.17291ZM5.07422 17.0001V16.0001C4.14507 16.0001 3.51757 15.9991 3.0537 15.9565C2.58466 15.9135 2.4481 15.8381 2.4081 15.8091L1.82031 16.6181L1.23253 17.4271C1.71826 17.78 2.29922 17.8957 2.87098 17.9481C3.44792 18.0011 4.1845 18.0001 5.07422 18.0001V17.0001ZM2.30274 12.2001L1.43671 11.7001C0.991843 12.4706 0.622696 13.108 0.38008 13.6342C0.139638 14.1556 -0.0506351 14.7165 0.0121197 15.3136L1.00664 15.2091L2.00116 15.1045C1.99599 15.0553 1.99905 14.8994 2.19628 14.4717C2.39133 14.0487 2.7042 13.5048 3.16876 12.7001L2.30274 12.2001ZM1.82031 16.6181L2.4081 15.8091C2.17866 15.6424 2.03077 15.3862 2.00116 15.1045L1.00664 15.2091L0.0121197 15.3136C0.101012 16.1594 0.544835 16.9275 1.23253 17.4271L1.82031 16.6181ZM14.7737 17.0001V18.0001C15.6634 18.0001 16.4 18.0011 16.9769 17.9481C17.5486 17.8957 18.1295 17.78 18.6153 17.4271L18.0275 16.6181L17.4397 15.8091C17.3997 15.8382 17.2631 15.9135 16.7941 15.9565C16.3303 15.9991 15.7029 16.0001 14.7737 16.0001V17.0001ZM17.5451 12.2001L16.679 12.7001C17.1436 13.5048 17.4565 14.0487 17.6515 14.4717C17.8487 14.8994 17.8518 15.0553 17.8466 15.1045L18.8411 15.2091L19.8357 15.3136C19.8984 14.7165 19.7082 14.1556 19.4677 13.6342C19.2251 13.108 18.8559 12.4706 18.4111 11.7001L17.5451 12.2001ZM18.0275 16.6181L18.6153 17.4271C19.3029 16.9275 19.7468 16.1594 19.8357 15.3136L18.8411 15.2091L17.8466 15.1045C17.817 15.3862 17.6691 15.6424 17.4397 15.8091L18.0275 16.6181ZM9.97363 13.0001H8.97363V13.1001H9.97363H10.9736V13.0001H9.97363ZM9.97363 13.1001L9.97388 12.1001L9.87427 12.1L9.87403 13.1L9.87378 14.1L9.97339 14.1001L9.97363 13.1001ZM9.87403 13.1H10.874V13.0001H9.87403H8.87403V13.1H9.87403ZM9.87403 13.0001V14.0001H9.97363V13.0001V12.0001H9.87403V13.0001ZM9.92383 6.00006H8.92383V10.0001H9.92383H10.9238V6.00006H9.92383Z"
                fill="#CD7F18"
              />
            </svg>
          </span>
          <div>
            <div>
              An open slot has been detected in your node sector. Reserving
              instant registration sequence now.
            </div>

            <div className={`${styles.progressWrapper}`}>
              <div className={styles.actionRow}>
                <span className={styles.processingLabel}>
                  Processing&hellip;
                </span>
                <span className={styles.actionPercent}>{percent}%</span>

                {/* <div className={styles.actionLabel}>Action</div> */}
              </div>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{ width: `${percent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>,
    document.body,
  );
};

export default GeoInterstitial;
