"use client";

import { useState } from "react";
import styles from "./style.module.scss";

interface FounderVideoProps {
  videoId: string;
  title: string;
}

export default function FounderVideo({ videoId, title }: FounderVideoProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className={styles.founder_video}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.founder_video_frame}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.founder_video}
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      <img
        src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        alt={title}
        className={styles.founder_video_poster}
      />
      <span className={styles.founder_video_overlay} />
      <span className={styles.founder_video_play}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M8 5v14l11-7L8 5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}
