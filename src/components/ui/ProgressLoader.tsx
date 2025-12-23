import React from "react";

export default function ProgressLoader() {
  return (
    <svg width="40" height="10" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="clip">
          <rect x="0" y="0" width="40" height="10" rx="5" ry="5" />
        </clipPath>

        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: "#222230ff", stopOpacity: 0 }}
          />
          <stop
            offset="50%"
            style={{ stopColor: "#2b2b3cff", stopOpacity: 1 }}
          />
          <stop
            offset="100%"
            style={{ stopColor: "#222230ff", stopOpacity: 0 }}
          />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="40" height="10" rx="5" ry="5" fill="#444456ff" />

      <rect
        x="-40"
        y="0"
        width="40"
        height="10"
        fill="url(#gradient)"
        clipPath="url(#clip)"
      >
        <animate
          attributeName="x"
          from="-40"
          to="40"
          dur="1.5s"
          repeatCount="indefinite"
          calcMode="spline"
          keySplines="0.4 0 0.2 1"
          keyTimes="0;1"
        />
      </rect>
    </svg>
  );
}
