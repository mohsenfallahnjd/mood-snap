// app/history/page.tsx
"use client";

import { type FC, useMemo, useState } from "react";
import { useAtom } from "jotai";
import { entriesAtom } from "@/utils/atoms";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
  type ChartOptions,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Title,
  ChartDataLabels,
  Filler
);

export const HistoryPage: FC = () => {
  const [entries] = useAtom(entriesAtom);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Prepare last 28 days
  const last28 = useMemo(() => {
    const out: { date: string; value: number | null }[] = [];
    for (let i = 27; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const mood = entries[key];
      out.push({
        date: key,
        value: mood === "good" ? 2 : mood === "neutral" ? 1 : mood === "bad" ? 0 : null,
      });
    }
    return out;
  }, [entries]);

  const labels = last28.map((d) => d.date.slice(5)); // "MM-DD"
  const data = {
    labels,
    datasets: [
      {
        label: "Mood over time",
        data: last28.map((d) => d.value),
        borderColor: "rgba(59, 130, 246, 0.8)",
        backgroundColor: function (context: any) {
          const value = context.dataset.data[context.dataIndex];

          if (value === 2) {
            return "rgba(34,197,94,0.5)"; // good = green
          }
          if (value === 1) {
            return "rgba(234,179,8,0.5)"; // neutral = yellow
          }
          if (value === 0) {
            return "rgba(239,68,68,0.5)"; // bad = red
          }
          return "transparent";
        },
        tension: 0.3,
        fill: true,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options: ChartOptions<"line" | "bar"> = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Last 28 Days",
        font: { size: 18 },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const val = ctx.parsed.y;
            const mood = val === 2 ? "Good" : val === 1 ? "Neutral" : "Bad";
            return `${mood} (${val})`;
          },
        },
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      y: {
        min: 0,
        max: 2,
        ticks: {
          stepSize: 1,
          callback: (v: any) => (v === 2 ? "😊" : v === 1 ? "😐" : "😞"),
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
      },
    },
  };

  // Summary counts
  const summary = useMemo(() => {
    let good = 0,
      neutral = 0,
      bad = 0;
    last28.forEach((d) => {
      if (d.value === 2) {
        good++;
      } else if (d.value === 1) {
        neutral++;
      } else if (d.value === 0) {
        bad++;
      }
    });
    return { good, neutral, bad };
  }, [last28]);

  return (
    <div className="space-y-6 p-4 max-w-3xl mx-auto mt-16">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">😊 Good</p>
          <p className="text-2xl">{summary.good}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">😐 Neutral</p>
          <p className="text-2xl">{summary.neutral}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">😞 Bad</p>
          <p className="text-2xl">{summary.bad}</p>
        </div>
      </div>

      <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Your Mood Trends</h2>
          <button
            onClick={() => setChartType(chartType === "line" ? "bar" : "line")}
            className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition"
          >
            {chartType === "line" ? <>📊 Bar Chart</> : <>📈 Line Chart</>}
          </button>
        </div>

        {/* Chart Container with subtle gradient background */}
        <div className="w-full h-96 rounded-lg p-4">
          {chartType === "line" ? <Line options={options} data={data} /> : <Bar options={options} data={data} />}
        </div>
      </div>
    </div>
  );
};
