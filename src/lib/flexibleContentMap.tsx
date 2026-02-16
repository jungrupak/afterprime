import React from "react";
import SpecificationTable from "@/components/instrument-lps/product-specification/SpecificationTable";
import CostBreakdown from "@/components/instrument-lps/cost-brakdown/CostBreakdown";
import CostBreakdownTable from "@/components/instrument-lps/cost-brakdown/CostBreakdownTable";

interface TextBlockSection {
  acf_fc_layout: "text_block";
  text_contents: string;
}

interface ProductSpecSection {
  acf_fc_layout: "product_spec";
  instrument_name: string;
}

interface CostBreakdown {
  acf_fc_layout: "cost_breakdown";
  instrument: string;
}

type PageBuilderSection = TextBlockSection | ProductSpecSection | CostBreakdown;

export function renderSection(
  section: PageBuilderSection,
  index: number,
): React.ReactNode {
  switch (section.acf_fc_layout) {
    case "text_block":
      return (
        <div
          key={index}
          dangerouslySetInnerHTML={{ __html: section.text_contents ?? "" }}
        />
      );

    case "product_spec":
      return (
        <div key={index}>
          <SpecificationTable
            instrument={section.instrument_name?.toUpperCase() ?? ""}
          />
        </div>
      );

    case "cost_breakdown":
      return (
        <div key={index}>
          <CostBreakdownTable instrument={section.instrument ?? ""} />
        </div>
      );

    default: {
      const _exhaustiveCheck: never = section;
      return null;
    }
  }
}
