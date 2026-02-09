import HighlightText from "@/components/ui/HighlightText";

interface HighlightTextProp {
  highlight_text?: string;
  content_width?: string;
}

export default function HighlightBlockQuote({
  highlight_text,
  content_width,
}: HighlightTextProp) {
  return (
    <section className={`compact-section`}>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container_small">
        <HighlightText
          highlight_text={highlight_text}
          content_width={content_width}
        />
      </div>
    </section>
  );
}
