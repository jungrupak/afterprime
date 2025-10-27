import styles from "./MarginLeverageTable.module.scss";

export default function SectionTableMarginLeverage() {
  return (
    <>
      <section>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="mb-10 md:mb-20">
            <h2 className={`${styles.sectionTitle}`}>Margin and Leverage</h2>
            <p className="paragraph max-w-[800px]">
              CFDs are leveraged products — you only need to deposit a fraction
              of your trade&apos;s total value as margin, giving you greater
              market exposure with less capital.
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
                <tr>
                  <td>Forex</td>
                  <td>1%</td>
                  <td>1:100</td>
                </tr>
                <tr>
                  <td>Metals</td>
                  <td> 1% </td>
                  <td>1:100</td>
                </tr>
                <tr>
                  <td>Commodities</td>
                  <td> 1% </td>
                  <td> 1:100 </td>
                </tr>
                <tr>
                  <td>Crypto</td>
                  <td> 33.3% </td>
                  <td> 1:3 </td>
                </tr>
                <tr>
                  <td>Shares</td>
                  <td> 20% </td>
                  <td> 1:5 </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
