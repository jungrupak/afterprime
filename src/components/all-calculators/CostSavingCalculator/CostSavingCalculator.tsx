"use client";

import { useState, useEffect } from "react";
import styles from "./CostSavingCalculator.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Plugin,
  TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Type definitions for API response
interface BrokerData {
  broker: string;
  symbol: string;
  cost: number;
  costPerLot: number;
  savingPercentage: number;
}

interface ApiResponse {
  brokers: BrokerData[];
  secondBestVsAfterprimePct: number;
  top10VsAfterprimeAvgPct: number;
  industryVsAfterprimeAvgPct: number;
}

// Type for chart bar data
interface ChartBarData {
  label: string;
  value: number;
  color: string;
}

// Type for monthly totals calculation
interface MonthlyTotals {
  ap: number;
  top10: number;
  indAvg: number;
  bro: number;
}

const SPECIAL_BROKERS = new Set([
  "Afterprime",
  "Second Best",
  "Top 10 Avg",
  "Industry Avg",
]);

export default function DollarSavingsCalculator() {
  const [lots, setLots] = useState<number>(100);
  const [selectedBroker, setSelectedBroker] = useState<string>("Second Best");
  const [brokersData, setBrokersData] = useState<BrokerData[]>([]);
  const [brokerList, setBrokerList] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch cost data from API
  useEffect(() => {
    const fetchCostData = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch("https://feed.afterprime.com/api/costs");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();

        // Validate API response structure
        if (!data.brokers || !Array.isArray(data.brokers)) {
          throw new Error("Invalid API response structure");
        }

        setBrokersData(data.brokers);

        // Create broker list excluding Afterprime and special labels
        const brokers: string[] = data.brokers
          .filter((b: BrokerData) => !SPECIAL_BROKERS.has(b.broker))
          .map((b: BrokerData) => b.broker)
          .sort();

        // Add special brokers at the beginning
        const specialBrokers: string[] = [
          "Second Best",
          "Top 10 Avg",
          "Industry Avg",
        ];
        const fullList: string[] = [...specialBrokers, ...brokers];

        setBrokerList(fullList);
        setError(null);
      } catch (err) {
        console.error("Error fetching cost data:", err);
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        setError(`Unable to load broker data: ${errorMessage}`);
        setBrokersData([]);
        setBrokerList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCostData();
  }, []);

  const formatUSD = (value: number): string => {
    return value.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });
  };

  const getBrokerCost = (brokerName: string): number => {
    const broker: BrokerData | undefined = brokersData.find(
      (b: BrokerData) => b.broker === brokerName,
    );
    return broker ? broker.costPerLot : 0;
  };

  const computeMonthlyTotals = (
    lots: number,
    brokerName: string,
  ): MonthlyTotals => {
    const ap: number = getBrokerCost("Afterprime") * lots;
    const top10: number = getBrokerCost("Top 10 Avg") * lots;
    const indAvg: number = getBrokerCost("Industry Avg") * lots;
    const bro: number = getBrokerCost(brokerName) * lots;
    return { ap, top10, indAvg, bro };
  };

  const { ap, top10, indAvg, bro }: MonthlyTotals = computeMonthlyTotals(
    lots,
    selectedBroker,
  );
  const moSave: number = Math.max(0, bro - ap);
  const totSave: number = moSave;

  const cycleBroker = (direction: number): void => {
    const idx: number = brokerList.indexOf(selectedBroker);
    let nextIdx: number = idx + direction;
    if (nextIdx < 0) nextIdx = brokerList.length - 1;
    if (nextIdx >= brokerList.length) nextIdx = 0;
    setSelectedBroker(brokerList[nextIdx]);
  };

  const handleReset = (): void => {
    setLots(100);
    setSelectedBroker("Second Best");
  };

  const handleLotsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1 && value <= 1000) {
      setLots(value);
    } else if (e.target.value === "") {
      setLots(1);
    }
  };

  const handleLotsNumberChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const value: number = parseInt(e.target.value, 10) || 1;
    const clampedValue: number = Math.min(Math.max(value, 1), 1000);
    setLots(clampedValue);
  };

  const handleBrokerChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSelectedBroker(e.target.value);
  };

  // Prepare chart data
  const others: ChartBarData[] = [
    { label: selectedBroker, value: bro, color: "#3b82f6" },
    { label: "Top 10 Avg", value: top10, color: "#ef4444" },
    { label: "Industry Avg", value: indAvg, color: "#ef4444" },
  ].sort((a: ChartBarData, b: ChartBarData) => a.value - b.value);

  const labels: string[] = ["Afterprime"].concat(
    others.map((o: ChartBarData) => o.label),
  );
  const values: number[] = [ap].concat(
    others.map((o: ChartBarData) => o.value),
  );
  const colors: string[] = ["#22c55e"].concat(
    others.map((o: ChartBarData) => o.color),
  );
  const deltas: number[] = values.map((v: number, i: number) =>
    i === 0 ? 0 : v - ap,
  );

  // Custom plugin for delta labels
  const deltaLabelsPlugin: Plugin<"bar"> = {
    id: "DeltaLabels",
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      const meta = chart.getDatasetMeta(0);

      if (!meta || !meta.data) return;

      ctx.save();
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "bottom";
      ctx.fillStyle = "#ef4444";

      deltas.forEach((d: number, i: number) => {
        if (i === 0) return; // no label on Afterprime
        const bar = meta.data[i];
        if (!bar) return;

        const x: number = bar.x;
        const y: number = bar.y - 6;
        //const label: string = "+$" + (bro - ap * 20);
        const label: string = "";
        ctx.fillText(label, x, y);
      });

      ctx.restore();
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "Monthly Cost",
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 6,
      },
    ],
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context: TooltipItem<"bar">): string {
            return "Monthly Cost: $" + context.parsed.y.toFixed(2);
          },
        },
      },
    },
    layout: {
      padding: {
        right: 10,
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#cbd5e1",
        },
        grid: {
          color: "rgba(148,163,184,.15)",
        },
      },
      y: {
        ticks: {
          color: "#cbd5e1",
          callback: function (tickValue: string | number): string {
            const value: number =
              typeof tickValue === "string" ? parseFloat(tickValue) : tickValue;
            return "$" + value.toLocaleString();
          },
        },
        grid: {
          color: "rgba(148,163,184,.15)",
        },
      },
    },
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingState}>
          <div className={styles.spinner}></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error && brokersData.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorState}>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryBtn}
            type="button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const benchmarkBrokers: string[] = [
    "Second Best",
    "Top 10 Avg",
    "Industry Avg",
  ];
  const regularBrokers: string[] = brokerList.filter(
    (name: string) => !benchmarkBrokers.includes(name),
  );

  return (
    <div
      className={`max-md:flex max-md:flex-col lg:grid lg:grid-cols-[350px_1fr] w-full gap-5`}
    >
      {/* Left: Calculator */}
      <div className={styles.calculator}>
        <div className={styles.calcHeader}>
          <div className={styles.calcTitle}>Your Savings Calculator</div>
          <span className={styles.badge}>ForexBenchmark verified</span>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.label}>Lots per month (1–1000)</div>
          <div className={styles.sliderRow}>
            <input
              type="range"
              min="1"
              max="1000"
              step="1"
              value={lots}
              onChange={handleLotsChange}
              className={styles.slider}
              aria-label="Lots per month"
            />
            <input
              type="number"
              min="1"
              max="1000"
              step="1"
              value={lots}
              onChange={handleLotsNumberChange}
              className={styles.numberInput}
              aria-label="Lots per month (number input)"
            />
          </div>
        </div>

        <div className={styles.inputGroup}>
          <div className={styles.label}>Compare your savings vs broker</div>
          <div className={styles.brokerRow}>
            <button
              onClick={() => cycleBroker(-1)}
              className={styles.iconBtn}
              title="Previous broker"
              aria-label="Previous broker"
              disabled={brokerList.length === 0}
              type="button"
            >
              ◀
            </button>
            <select
              value={selectedBroker}
              onChange={handleBrokerChange}
              className={styles.select}
              aria-label="Select broker for comparison"
            >
              {brokerList.length === 0 ? (
                <option value="Second Best">Second Best</option>
              ) : (
                <>
                  <optgroup label="Benchmarks">
                    {benchmarkBrokers.map((name: string) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Brokers">
                    {regularBrokers.map((name: string) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </optgroup>
                </>
              )}
            </select>
            <button
              onClick={() => cycleBroker(1)}
              className={styles.iconBtn}
              title="Next broker"
              aria-label="Next broker"
              disabled={brokerList.length === 0}
              type="button"
            >
              ▶
            </button>
          </div>
        </div>

        <div className={styles.results}>
          <div className={styles.headline}>
            Trading {lots} lots / month saves ${moSave.toFixed(2)} monthly vs{" "}
            {selectedBroker}.
          </div>
          <div className={styles.subline}>
            ${(totSave * 12).toFixed(2)} annually. Graph shows monthly total
            cost.
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Savings per month vs broker</div>
            <div className={styles.statValue}>${moSave.toFixed(2)}</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>Total savings over 12 months</div>
            <div className={styles.statValue}>${(totSave * 12).toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Right: Graph */}
      <div className={styles.chartSection}>
        <div className={styles.chartHeader}>
          <div>
            <div className={styles.chartTitle}>Monthly Total Cost</div>
            <div className={styles.chartSubtitle}>
              Bars show total trading cost for your selected lots per month.
            </div>
          </div>
          <button
            onClick={handleReset}
            className={styles.resetBtn}
            type="button"
          >
            Reset
          </button>
        </div>
        <div className={styles.chartWrap}>
          <Bar
            data={chartData}
            options={chartOptions}
            plugins={[deltaLabelsPlugin]}
          />
        </div>
        <div className={styles.chartFootnote}>
          Source: ForexBenchmark 7‑day averages (spread+commission).
          {/* Day session 04:00–22:00. Past averages don&apos;t guarantee future
            outcomes. */}
        </div>
      </div>
    </div>
  );
}
