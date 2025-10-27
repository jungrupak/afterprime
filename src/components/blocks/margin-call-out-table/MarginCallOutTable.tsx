import styles from "./MarginCallOut.module.scss";

export default function SectionMarginCallOut() {
  return (
    <>
      <section>
        {/* grain bg effect */}
        <div className="grainy_bg"></div>
        {/* grain bg effect */}
        <div className="ap_container">
          <div className="mb-10 md:mb-20">
            <h2 className={`${styles.sectionTitle}`}>
              Margin Call and Stop Out Levels
            </h2>
            <p className="paragraph max-w-[800px]">
              A margin call alerts you when available margin is running low. If
              losses continue and your equity hits the stop-out level, open
              positions will start closing automatically to prevent further
              losses.
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
                <tr>
                  <td>Forex</td>
                  <td>120%</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>Metals</td>
                  <td>120%</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>Commodities</td>
                  <td>120%</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>Crypto</td>
                  <td>120%</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td>Shares</td>
                  <td>120%</td>
                  <td>80%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}
