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
      assetsClass: "Indices",
      marginCall: "120%",
      levels: "80%",
    },
    {
      assetsClass: "Crypto",
      marginCall: "120%",
      levels: "80%",
    },
  ];
  //Ends

  return (
    <>
      <section className={`compact-section`}>
        <div className="ap_container_small">
          <div className="">
            <h2
              className={`font-size-heading-md mb-4 md:mb-6 opacity-80 font-semibold`}
            >
              {title}
            </h2>
            <p className="reading-text-md opacity-60 mb-8 md:mb-12">
              {paragraph}
            </p>
          </div>
          <div className="genericTable">
            <table>
              <thead>
                <tr>
                  <th>Asset Class</th>
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
