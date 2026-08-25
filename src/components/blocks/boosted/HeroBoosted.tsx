"use client";
import { useEffect, useState } from "react";
import styles from "./HeroBoosted.module.scss";
import { boostedContent } from "./boostedContent";

const TICK_MS = 40;
const TICK_STEP = 7;
const HOLD_MS = 2400;

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function HeroBoosted() {
  const { hero } = boostedContent;
  const { widget } = hero;
  const [equity, setEquity] = useState(widget.startEquity);
  const [cycle, setCycle] = useState(0);

  // Drives one climb from startEquity to targetEquity per cycle.
  useEffect(() => {
    setEquity(widget.startEquity);
    const intervalId = setInterval(() => {
      setEquity((prev) => {
        const next = prev + TICK_STEP;
        return next >= widget.targetEquity ? widget.targetEquity : next;
      });
    }, TICK_MS);
    return () => clearInterval(intervalId);
  }, [cycle, widget.startEquity, widget.targetEquity]);

  // Once the climb finishes, hold, then start a new cycle (loop).
  useEffect(() => {
    if (equity < widget.targetEquity) return;
    const resetId = setTimeout(() => setCycle((c) => c + 1), HOLD_MS);
    return () => clearTimeout(resetId);
  }, [equity, widget.targetEquity]);

  const isGraduated = equity >= widget.graduationEquity;
  const progressPct = Math.min(
    100,
    ((equity - widget.startEquity) /
      (widget.graduationEquity - widget.startEquity)) *
      100
  );
  const withdrawable = Math.max(0, equity - widget.graduationEquity);

  return (
    <section className={`${styles.hero} compact-section`}>
      <div className={`ap_container ${styles.hero_grid}`}>
        <div className={styles.hero_copy}>
          <p className={styles.eyebrow}>{hero.eyebrow}</p>
          <h1 className={`${styles.heading} h1-size`}>
            {hero.headingPrefix}
            <span className={styles.highlight}>{hero.headingHighlight}</span>
          </h1>
          <p className={styles.subhead}>{hero.subhead}</p>
          <div className={styles.cta_row}>
            {/* TODO: wire to TradeCore signup flow */}
            <a href="#" className={styles.cta_primary}>
              {hero.ctaPrimary}
            </a>
            <a href="#how-it-works" className={styles.cta_secondary}>
              {hero.ctaSecondary}
            </a>
          </div>
          <ul className={styles.trust_row}>
            {hero.trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className={styles.widget}>
          <div className={styles.widget_top}>
            <span className={styles.widget_label}>{widget.accountLabel}</span>
            {isGraduated && (
              <span className={styles.badge}>{widget.badge}</span>
            )}
          </div>
          <div className={styles.equity}>
            <span className={styles.equity_value}>
              ${formatCurrency(equity)}
            </span>
          </div>
          <p className={styles.equity_caption}>{widget.equityCaption}</p>

          <div className={styles.progress_labels}>
            <span>${formatCurrency(widget.startEquity)}</span>
            <span>
              ${formatCurrency(widget.graduationEquity)}{" "}
              {widget.graduationCaption}
            </span>
          </div>
          <div className={styles.progress_track}>
            <div
              className={styles.progress_fill}
              style={{ width: `${progressPct}%` }}
            />
          </div>

          <div className={styles.stat_grid}>
            <div className={styles.stat}>
              <span className={styles.stat_label}>{widget.floorLabel}</span>
              <span className={styles.stat_value}>
                ${formatCurrency(widget.startEquity)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.stat_label}>{widget.nopLabel}</span>
              <span className={styles.stat_value}>
                ${formatCurrency(widget.maxNop)}
              </span>
            </div>
            <div className={styles.stat}>
              <span className={styles.stat_label}>
                {widget.withdrawableLabel}
              </span>
              <span className={`${styles.stat_value} ${styles.positive}`}>
                ${formatCurrency(withdrawable)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
