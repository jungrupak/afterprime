import React from "react";

export default function BulletTickBlue() {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 rounded-full mt-[2px]"
      style={{
        width: 30,
        height: 30,
        backgroundColor: "var(--secondary-color)",
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 13L9.5 17.5L19 7"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
