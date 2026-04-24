"use client";
import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Only load + play video on desktop. Mobile: saves bandwidth, battery, and
    // avoids triggering autoplay network requests blocked by mobile browsers anyway.
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const video = videoRef.current;
    if (!video) return;

    const source = document.createElement("source");
    source.src = "https://motion.afterprime.com/web/low-res.mp4";
    source.type = "video/mp4";
    video.appendChild(source);
    video.load();
  }, []);

  return (
    <div className="home_banner_video">
      <video
        ref={videoRef}
        playsInline
        className="mui-1eodtn4-video"
        controls={false}
        data-automation="VideoPlayer"
        height="100%"
        width="100%"
        style={{ height: "calc(100vh + 42vh)" }}
        loop
        muted
        autoPlay
        poster="/img/hero-video-poster.jpg"
        preload="none"
        aria-label="video-player"
        controlsList="nodownload"
      />
    </div>
  );
}
