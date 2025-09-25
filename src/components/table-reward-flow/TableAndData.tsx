import Tab, { TabItem } from "@/components/ui/Tab";
import style from "./style.module.scss";

interface RowData {
  [key: string]: string | number | undefined; // keys can be anything
}
export interface TableDataObjects {
  category?: string;
  content: RowData[];
}

interface SectionProps {
  sectionTitle?: string;
  sectionParagraph?: string;
  tableRowData?: TableDataObjects[]; // array of object
}

//Forex Table Data

export function TableDataRewardFlow({
  sectionTitle,
  sectionParagraph,
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
              <TabItem key={tabIndex} tabNav={tableRowData[tabIndex].category}>
                <div className="genericTable">
                  <table>
                    <thead>
                      <tr>
                        {Object.keys(tabData.content[0]).map((heading, i) => (
                          <th key={i}>{heading}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tabData.content.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {Object.values(row).map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell ?? "-"}</td>
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
