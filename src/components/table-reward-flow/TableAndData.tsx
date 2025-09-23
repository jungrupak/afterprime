import Tab, { TabItem } from "@/components/ui/Tab";
import style from "./style.module.scss";

interface RowData {
  [key: string]: string | number | undefined; // keys can be anything
}

interface SectionProps {
  sectionTitle?: string;
  sectionParagraph?: string;
  categoryAsNavItem?: string[];
  tableColumnHeading?: string[]; // column order
  tableRowData?: { content: RowData[] }[]; // array of tabs
}

//Forex Table Data

export function TableDataRewardFlow({
  sectionTitle,
  sectionParagraph,
  categoryAsNavItem = [],
  tableColumnHeading = [],
  tableRowData = [],
}: SectionProps) {
  return (
    <>
      <section>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="mb-10 md:mb-20">
            <h2 className={`${style.sectionTitle}`}>{sectionTitle}</h2>
            <p className="paragraph">{sectionParagraph}</p>
          </div>

          <Tab>
            {tableRowData.map((tabData, tabIndex) => (
              <TabItem key={tabIndex} tabNav={categoryAsNavItem[tabIndex]}>
                <div className="genericTable">
                  <table>
                    <thead>
                      <tr>
                        {tableColumnHeading.map((heading, i) => (
                          <th key={i}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tabData.content.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {tableColumnHeading.map((col, cellIndex) => (
                            <td key={cellIndex}>{row[col] ?? "-"}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabItem>
            ))}
          </Tab>
        </div>
      </section>
    </>
  );
}
