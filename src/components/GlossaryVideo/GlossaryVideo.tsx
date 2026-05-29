"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  term: string;
}

export default function GlossaryVideo({ term }: Props) {
  const [hidden, setHidden] = useState(false);
  const [ready, setReady] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    const timer = setTimeout(() => {
      if (mounted.current) setReady(true);
    }, 500);
    return () => {
      mounted.current = false;
      clearTimeout(timer);
    };
  }, []);

  const videoUrl = `https://motion.afterprime.com/${encodeURIComponent(term)}-gloss.mp4`;

  return (
    <section
      className="compact-section"
      style={{ display: hidden ? "none" : "block" }}
    >
      <div className="ap_container_small">
        <div
          className={ready ? "" : "pointer-events-none"}
          style={{
            width: "100%",
            background: "#000",
            aspectRatio: "16/9",
            maxHeight: "500px",
            borderRadius: "8px",
            overflow: "hidden",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.1s ease-in",
          }}
        >
          <video
            controls
            muted
            autoPlay
            loop
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={() => setHidden(true)}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
