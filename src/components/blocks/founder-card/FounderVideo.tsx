"use client";

import { useRef, useState } from "react";
import styles from "./style.module.scss";

interface FounderVideoProps {
  src: string;
  title: string;
}

const LOOP_START = 2;
const LOOP_END = 1008;

export default function FounderVideo({ src, title }: FounderVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const nextMuted = !muted;
    if (videoRef.current) {
      videoRef.current.muted = nextMuted;
    }
    setMuted(nextMuted);
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = LOOP_START;
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.currentTime >= LOOP_END) {
      video.currentTime = LOOP_START;
    }
  };

  return (
    <div className={styles.founder_video}>
      <video
        ref={videoRef}
        src={src}
        title={title}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        className={styles.founder_video_frame}
      />
      <span className={styles.founder_video_overlay} />
      <button
        type="button"
        className={styles.founder_video_mute}
        onClick={toggleMute}
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
            <path
              d="M16 8.5a5 5 0 0 1 0 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M4 4l16 16"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 9v6h4l5 5V4L8 9H4z" fill="currentColor" />
            <path
              d="M16 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
