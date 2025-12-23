import styles from "./Calculator.module.scss";
import TradingCalculator from "@/components/trading-calculator/TradingCalculator";
export default function Page() {
  return (
    <section className={`${styles.pageCalcWrap}`}>
      <div className="grainy_bg"></div>
      <div className={`${styles.pageCalcWrapContainer}`}>
        <h2>Afterprime Trading Calculator</h2>
        <TradingCalculator />
      </div>
    </section>
  );
}
