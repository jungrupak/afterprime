import React from "react";
import HighlightText from "../ui/HighlightText";

interface HighlightTextProp {
  textValue?: string;
  maxWidth?: number;
}

export default function HighlightBlockQuote({
  textValue,
  maxWidth,
}: HighlightTextProp) {
  return (
    <section>
      {/* grain bg effect */}
      <div className="grainy_bg"></div>
      {/* grain bg effect */}
      <div className="ap_container">
        <HighlightText textValue={textValue} maxWidth={maxWidth} />
      </div>
    </section>
  );
}
