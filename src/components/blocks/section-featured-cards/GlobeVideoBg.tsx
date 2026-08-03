"use client";
import { useEffect, useRef } from "react";
import styles from "./SectionFeaturesCards.module.scss";

export default function GlobeVideoBg() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const video = videoRef.current;
    if (!video) return;

    const source = document.createElement("source");
    source.src = "https://cfcdn.afterprime.com/globe-bgvid.mp4";
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
  }, []);

  return (
    <div className={styles.globeBgWrapper} aria-hidden="true">
      <video
        ref={videoRef}
        className={styles.globeBgVideo}
        playsInline
        loop
        muted
        autoPlay
        preload="none"
        controls={false}
      />
    </div>
  );
}
