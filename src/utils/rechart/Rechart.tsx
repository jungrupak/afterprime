"use client";
import styles from "./Rechart.module.scss";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Demo data
const data = [
  { name: "Mon", uv: 120, pv: 80, amt: 60 },
  { name: "Tue", uv: 200, pv: 130, amt: 100 },
  { name: "Wed", uv: 150, pv: 110, amt: 90 },
  { name: "Thu", uv: 260, pv: 150, amt: 120 },
  { name: "Fri", uv: 300, pv: 170, amt: 140 },
  { name: "Sat", uv: 280, pv: 160, amt: 130 },
  { name: "Sun", uv: 240, pv: 140, amt: 110 },
];

export default function Rechart() {
  return (
    <div>
      <div className={`${styles.chart_wrapper} h-72 w-[600px]`}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0 0" stroke="#484848ff" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="uv"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
            <Area
              type="monotone"
              dataKey="pv"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorPv)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
