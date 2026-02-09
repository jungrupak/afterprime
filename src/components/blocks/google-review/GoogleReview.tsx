import { Blocks } from "@/types/blocks";
import Script from "next/script";

type Props = Blocks["reviews-section"];

export default function GoogleReview(props: Props) {
  const {
    google_reviews_section_section_title,
    google_reviews_section_section_paragraph,
    google_reviews_section_enable_page_layout,
  } = props;

  const title = google_reviews_section_section_title || "";
  const isFullReview = google_reviews_section_enable_page_layout;
  return (
    <>
      <section id="googleReviewSection" className={`compact-section`}>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container_small">
          {isFullReview === "1" ? (
            ""
          ) : (
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

          {/* Elfsight Google Reviews | Untitled Google Reviews 2 */}
          {isFullReview === "1" ? (
            <div>
              <Script
                src="https://elfsightcdn.com/platform.js"
                async
                strategy="lazyOnload"
              />
              <div
                className="elfsight-app-383f83ad-f18c-4f42-a4d8-efafe534664a"
                data-elfsight-app-lazy
              ></div>
            </div>
          ) : (
            <div>
              <Script
                src="https://elfsightcdn.com/platform.js"
                async
                strategy="lazyOnload"
              />
              <div
                className="elfsight-app-c914b6f5-207f-4d4b-8ad5-fb0838758591"
                data-elfsight-app-lazy
              ></div>
            </div>
          )}

          {/* Elfsight Google Reviews | Untitled Google Reviews 2 Ends */}
        </div>
      </section>
    </>
  );
}
