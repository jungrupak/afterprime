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
      assetsClass: "Metals (excluding XPDUSD and XPTUSD)",
      margin: "1%",
      leverage: "1:100",
    },
    {
      assetsClass: "Platinum (XPTUSD) and Palladium (XPDUSD)",
      margin: "120%",
      leverage: "1:5",
    },
    {
      assetsClass: "Commodities (excluding XTIUSD and XBRUSD)",
      margin: "1%",
      leverage: "1:100",
    },
    {
      assetsClass: "Crude Oil (XTIUSD and XBRUSD)",
      margin: "15%",
      leverage: "1:6.67",
    },
    {
      assetsClass: "Indices",
      margin: "1%",
      leverage: "1:100",
    },
    {
      assetsClass: "Bitcoin (BTCUSD), Ethereum (ETHUSD) and XRP (XRPUSD)",
      margin: "33%",
      leverage: "1:3",
    },
    {
      assetsClass: "Other Cryptocurrencies",
      margin: "100%",
      leverage: "1:1",
    },
  ];
  //Ends

  return (
    <>
      <section className={`compact-section`}>
        <div className="ap_container_small">
          <div className="">
            <h2 className={`font-size-heading-md mb-4 md:mb-6 font-semibold`}>
              {title}
            </h2>
            <p className="reading-text-md mb-8 md:mb-12">{paragraph}</p>
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
