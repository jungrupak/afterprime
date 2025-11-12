"use client";
import Script from "next/script";
export default function GoogleReviewBadge() {
  return (
    <>
      <div>
        <Script src="https://elfsightcdn.com/platform.js" async />
        <div
          className="elfsight-app-8396dec5-bde7-4ee9-b280-ec33390374f6"
          data-elfsight-app-lazy
        ></div>
      </div>
    </>
  );
}
