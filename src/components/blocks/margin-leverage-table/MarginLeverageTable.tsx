import styles from "./MarginLeverageTable.module.scss";

export default function SectionTableMarginLeverage() {
  //Static Data Const
  const title = "Margin and Leverage";
  const paragraph =
    "CFDs are leveraged products, you only need to deposit a fraction of your trade's total value as margin, giving you greater market exposure with less capital.";
  const tableData = [
    {
      assetsClass: "Forex",
      margin: "1%",
      leverage: "1:100",
    },
    {
      assetsClass: "Metals",
      margin: "1%",
      leverage: "1:100",
    },
    {
      assetsClass: "Commodities",
      margin: "1%",
      leverage: "1:100",
    },
    {
      assetsClass: "Indices",
      margin: "1%",
      leverage: "1:100",
    },
    {
      assetsClass: "Crypto",
      margin: "33%",
      leverage: "1:3",
    },
  ];
  //Ends

  return (
    <>
      <section className={`compact-section`}>
        <div className="ap_container_small">
          <div className="">
            <h2
              className={`font-size-heading-md mb-4 md:mb-6 font-semibold`}
            >
              {title}
            </h2>
            <p className="reading-text-md mb-8 md:mb-12">
              {paragraph}
            </p>
          </div>
          <div className="genericTable">
            <table>
              <thead>
                <tr>
                  <th>Asset Class</th>
                  <th>Margin</th>
                  <th>Leverage</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.assetsClass}</td>
                    <td>{item.margin}</td>
                    <td>{item.leverage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
