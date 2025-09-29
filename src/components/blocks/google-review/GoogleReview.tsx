import { Blocks } from "@/types/blocks";

type Props = Blocks["reviews-section"];

export default function GoogleReview(props: Props) {
  const {
    google_reviews_section_section_title,
    google_reviews_section_section_paragraph,
  } = props;

  const title = google_reviews_section_section_title || "";
  return (
    <>
      <section id="googleReviewSection">
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="max-w-[700px] mx-auto text-center">
            <h2 className="h2-size mb-6">
              Real Traders,
              <span> Real Support.</span>
            </h2>
            <p className="paragraph max-w-2xl mx-auto mb-20 opacity-90">
              Be supported by traders like you — we only hire from our
              community, so help is instant, human, and real.
            </p>
          </div>
          {/* Elfsight Google Reviews | Untitled Google Reviews 2 */}
          <script src="https://elfsightcdn.com/platform.js" async></script>
          <div
            className="elfsight-app-c914b6f5-207f-4d4b-8ad5-fb0838758591"
            data-elfsight-app-lazy
          ></div>
          {/* Elfsight Google Reviews | Untitled Google Reviews 2 Ends */}
        </div>
      </section>
    </>
  );
}
