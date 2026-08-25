"use client";
import { useEffect, useState } from "react";
import styles from "./HeroBoosted.module.scss";
import { boostedContent, type BoostedHeroContent } from "./boostedContent";
import Button from "@/components/ui/Button";

interface HeroBoostedProps {
  content?: BoostedHeroContent;
}

const CLIMB_MS = 3200;
const HOLD_MS = 2400;
const CONFETTI_COLORS = ["#433bf9", "#ff301d", "#22c55e", "#fdfdf7"];
const CONFETTI_PARTICLES = Array.from({ length: 10 }, (_, i) => i);

// easeOutQuint — fast start, gentle settle, no overshoot on a real money figure.
function easeOutQuint(t: number): number {
  return 1 - Math.pow(1 - t, 5);
}

function formatCurrency(value: number): string {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export default function HeroBoosted({
  content = boostedContent.hero,
}: HeroBoostedProps) {
  const hero = content;
  const { widget } = hero;
  const [equity, setEquity] = useState(widget.startEquity);
  const [cycle, setCycle] = useState(0);

  // Drives one eased climb from startEquity to targetEquity per cycle.
  useEffect(() => {
    setEquity(widget.startEquity);
    let frameId: number;
    const startTime = performance.now();
    const span = widget.targetEquity - widget.startEquity;

    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / CLIMB_MS);
      setEquity(widget.startEquity + span * easeOutQuint(t));
      if (t < 1) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [cycle, widget.startEquity, widget.targetEquity]);

  // Once the climb finishes, hold, then start a new cycle (loop).
  useEffect(() => {
    if (equity < widget.targetEquity) return;
    const resetId = setTimeout(() => setCycle((c) => c + 1), HOLD_MS);
    return () => clearTimeout(resetId);
  }, [equity, widget.targetEquity]);

  const isGraduated = equity >= widget.graduationEquity;
  const isClimbing = !isGraduated;
  const progressPct = Math.min(
    100,
    ((equity - widget.startEquity) /
      (widget.graduationEquity - widget.startEquity)) *
      100,
  );
  const withdrawable = Math.max(0, equity - widget.graduationEquity);

  return (
    <section className={`${styles.hero}`}>
      <div className={`ap_container_small ${styles.hero_grid}`}>
        <div className={styles.hero_copy}>
          <h1 className={`font-size-heading-xl mt-13 md:mt-18 font-semibold`}>
            {hero.headingPrefix}
            <span className={styles.highlight}>{hero.headingHighlight}</span>
          </h1>
          <p className={`reading-text-lg mt-5 md:mt-10 font-light`}>
            {hero.subhead}
          </p>
          <div className={`${styles.cta_row} mt-5 md:mt-10`}>
            {/* TODO: wire to TradeCore signup flow */}
            <Button varient="secondary" size="regular">
              {hero.ctaPrimary}
            </Button>
            <Button
              varient="decent-ghost"
              size="regular"
              onclick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            >
              {hero.ctaSecondary}
            </Button>
          </div>
        </div>

        <div>
          <div className={styles.widget}>
            {isGraduated && (
              <span className={styles.grad_cap} key={`cap-${cycle}`}>
                🎓
              </span>
            )}
            <div className={styles.widget_top}>
              <span className={styles.widget_label}>{widget.accountLabel}</span>
              {isGraduated && (
                <span className={styles.badge_wrap}>
                  <span className={styles.badge}>{widget.badge}</span>
                  <span className={styles.confetti} key={cycle}>
                    {CONFETTI_PARTICLES.map((i) => (
                      <span
                        key={i}
                        className={styles.confetti_particle}
                        style={{
                          // @ts-expect-error -- CSS custom properties aren't in React's style typings
                          "--angle": `${(360 / CONFETTI_PARTICLES.length) * i}deg`,
                          "--color":
                            CONFETTI_COLORS[i % CONFETTI_COLORS.length],
                          "--delay": `${i * 0.02}s`,
                        }}
                      />
                    ))}
                  </span>
                </span>
              )}
            </div>
            <div className={styles.equity}>
              <span
                className={`${styles.equity_value} ${
                  isClimbing ? styles.climbing : ""
                }`}
              >
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
                className={`${styles.progress_fill} ${
                  isClimbing ? styles.climbing : ""
                }`}
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

          <ul className={`${styles.trust_row}`}>
            {hero.trustPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
