import React from "react";
import SpecificationTable from "@/components/instrument-lps/product-specification/SpecificationTable";
// import CostBreakdown from "@/components/instrument-lps/cost-brakdown/CostBreakdown";
import CostBreakdownTable from "@/components/instrument-lps/cost-brakdown/CostBreakdownTable";
import CalculatorToolsBlock from "@/app/(site)/[slug]/[inst]/CalculatorToolsBlock";

interface TextBlockSection {
  acf_fc_layout: "text_block";
  text_contents: string;
}

interface ProductSpecSection {
  acf_fc_layout: "product_spec";
  instrument_name: string;
}

interface CostBreakdownBlock {
  acf_fc_layout: "cost_breakdown";
  instrument: string;
}

interface CalculatorTools {
  acf_fc_layout: "calculator_tools";
  instrument: string;
}

type PageBuilderSection =
  | TextBlockSection
  | ProductSpecSection
  | CostBreakdownBlock
  | CalculatorTools;

export function renderSection(
  section: PageBuilderSection,
  index: number,
  slug?: string,
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

    case "calculator_tools":
      return (
        <div key={index}>
          <CalculatorToolsBlock instrumentSlug={section.instrument ?? ""} />
        </div>
      );

    default: {
      const _exhaustiveCheck: never = section;
      return null;
    }
  }
}
