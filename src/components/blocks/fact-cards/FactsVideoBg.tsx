"use client";
import { useEffect, useRef } from "react";
import styles from "./SectionFacts.module.scss";

export default function FactsVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const video = videoRef.current;
    if (!video) return;

    const source = document.createElement("source");
    source.src = "https://cfcdn.afterprime.com/tradedesk-small.mp4";
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
  }, []);

  return (
    <div className={styles.factsVideoWrapper} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.factsVideo}
        playsInline
        loop
        muted
        autoPlay
        preload="none"
        controls={false}
      />
      <div className={styles.factsVideoFade} />
    </div>
  );
}
