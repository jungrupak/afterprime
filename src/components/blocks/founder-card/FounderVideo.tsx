"use client";

import { useRef, useState } from "react";
import styles from "./style.module.scss";

interface FounderVideoProps {
  videoId: string;
  title: string;
}

const YT_ORIGIN = "https://www.youtube.com";

export default function FounderVideo({ videoId, title }: FounderVideoProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    const nextMuted = !muted;
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func: nextMuted ? "mute" : "unMute",
        args: [],
      }),
      YT_ORIGIN,
    );
    setMuted(nextMuted);
  };

  const src = `${YT_ORIGIN}/embed/${videoId}?autoplay=1&mute=1&start=2&end=1008&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1`;

  return (
    <div className={styles.founder_video}>
      {/* <iframe
        ref={iframeRef}
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        className={styles.founder_video_frame}
      /> */}

      <iframe
        src="https://www.youtube.com/embed/VPkRLPJqeek?autoplay=1&mute=1&start=2&end=1008&loop=1&playlist=VPkRLPJqeek&modestbranding=1&rel=0&playsinline=1&controls=0&enablejsapi=1"
        title="Since 2018. Built without conflicts."
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowFullScreen
        className="style-module-scss-module__Lse4UW__founder_video_frame"
      ></iframe>

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
