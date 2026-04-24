"use client";
import { useEffect, useRef } from "react";
import { Blocks } from "@/types/blocks";

type Props = Blocks["reviews-section"];

const ELFSIGHT_SRC = "https://elfsightcdn.com/platform.js";

export default function GoogleReview(props: Props) {
  const {
    google_reviews_section_section_title,
    google_reviews_section_section_paragraph,
    google_reviews_section_enable_page_layout,
  } = props;

  const title = google_reviews_section_section_title || "";
  const isFullReview = google_reviews_section_enable_page_layout;

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Only inject Elfsight platform.js when section enters the viewport.
    // Prevents 254KB googleReviews.js from blocking TBT on initial load.
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (document.querySelector(`script[src="${ELFSIGHT_SRC}"]`)) return;

        const script = document.createElement("script");
        script.src = ELFSIGHT_SRC;
        script.async = true;
        document.body.appendChild(script);
      },
      { rootMargin: "200px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="googleReviewSection" className="compact-section">
      <div className="ap_container_small">
        {isFullReview !== "1" && (
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="h2-size mb-6">
              Built by Traders. <span>Backed by Traders.</span>
            </h2>
            <p className="paragraph max-w-2xl mx-auto mb-20 opacity-90">
              Support comes from experienced traders drawn from our own
              community, practical help from people who understand execution,
              risk, and real trading conditions.
            </p>
          </div>
        )}

        {isFullReview === "1" ? (
          <div
            className="elfsight-app-383f83ad-f18c-4f42-a4d8-efafe534664a"
            data-elfsight-app-lazy
          />
        ) : (
          <div
            className="elfsight-app-c914b6f5-207f-4d4b-8ad5-fb0838758591"
            data-elfsight-app-lazy
          />
        )}
      </div>
    </section>
  );
}
