import Tab, { TabItem } from "@/components/ui/Tab";
import style from "./style.module.scss";

interface SectionProps {
  sectionTitle?: string;
  sectionParagraph?: string;
}

//Forex Table Data

export function TableDataRewardFlow({
  sectionTitle,
  sectionParagraph,
}: SectionProps) {
  const TableHead = ["Pair", "USD $ per lot  Flow Incentive"];
  const tableData = [
    {
      label: "Forex",
      content: [
        { key: "EURUSD", value: "$5.0" },
        { key: "GBPJPY", value: "$2.20" },
        { key: "AUDUSD", value: "$2.50" },
        { key: "NZDCHF", value: "$1.20" },
        { key: "AUDJPY", value: "$1.50" },
        { key: "GBPNZD", value: "$2.00" },
      ],
    },
    {
      label: "Indices",
      content: [
        { key: "Indices", value: "$1.60" },
        { key: "Indices2", value: "$2.50" },
      ],
    },
    {
      label: "Metals",
      content: [
        { key: "Metal", value: "1.1000" },
        { key: "Metal2", value: "1.1000" },
      ],
    },
  ];

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
            {tableData.map((data, index) => (
              <TabItem key={index} tabNav={data.label}>
                <div className="genericTable">
                  <table>
                    <thead>
                      <tr>
                        {TableHead.map((thead, i) => (
                          <th key={i}>{thead}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.content.map((tr, indx) => (
                        <tr key={indx}>
                          <td>{tr.key}</td>
                          <td>{tr.value}</td>
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
