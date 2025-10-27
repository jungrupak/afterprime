import styles from "./MarginCallOut.module.scss";

export default function SectionMarginCallOut() {
  //Static Data Const
  const title = "Margin Call and Stop Out Levels";
  const paragraph =
    "A margin call alerts you when available margin is running low. If losses continue and your equity hits the stop-out level, open positions will start closing automatically to prevent further losses.";
  const tableData = [
    {
      assetsClass: "Forex",
      marginCall: "120%",
      levels: "80%",
    },
    {
      assetsClass: "Metals",
      marginCall: "120%",
      levels: "80%",
    },
    {
      assetsClass: "Commodities",
      marginCall: "120%",
      levels: "80%",
    },
    {
      assetsClass: "Crypto",
      marginCall: "120%",
      levels: "80%",
    },
    {
      assetsClass: "Shares",
      marginCall: "120%",
      levels: "80%",
    },
  ];
  //Ends

  return (
    <>
      <section>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="mb-10 md:mb-20">
            <h2 className={`${styles.sectionTitle}`}>{title}</h2>
            <p className="paragraph max-w-[800px]">{paragraph}</p>
          </div>
          <div className="genericTable">
            <table>
              <thead>
                <tr>
                  <th>Asset Classes</th>
                  <th>Margin Call</th>
                  <th>Stop Out Level</th>
                </tr>
              </thead>

              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.assetsClass}</td>
                    <td>{item.marginCall}</td>
                    <td>{item.levels}</td>
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
