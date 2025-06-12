"use client";

import { type FC, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { entriesAtom } from "@/utils/atoms";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const formatLast28Days = (entries: Record<string, "good" | "neutral" | "bad">) => {
  const today = new Date();
  const days: string[] = [];
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  const moods = days.map((date) => entries[date] || "neutral");
  return { days, moods };
};

const chartOptions = {
  responsive: true,
  scales: {
    y: { beginAtZero: true, max: 2, ticks: { stepSize: 1 } },
  },
};

const moodToValue = (mood: string) => {
  if (mood === "good") {
    return 2;
  }
  if (mood === "neutral") {
    return 1;
  }
  if (mood === "bad") {
    return 0;
  }
  return 1;
};

export const HistoryPage: FC = () => {
  const entries = useAtomValue(entriesAtom);
  const [chartType, setChartType] = useState<"line" | "bar">("line");
  const [data, setData] = useState({ labels: [] as string[], datasets: [] as any[] });

  useEffect(() => {
    const { days, moods } = formatLast28Days(entries);
    const values = moods.map((m) => moodToValue(m));
    setData({
      labels: days,
      datasets: [
        {
          label: "Mood Trend",
          data: values,
          borderColor: "rgba(54, 162, 235, 0.6)",
          backgroundColor: "rgba(54, 162, 235, 0.4)",
        },
      ],
    });
  }, [entries]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">History & Trends</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => setChartType("line")}
          className={`px-4 py-2 rounded ${chartType === "line" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Line
        </button>
        <button
          onClick={() => setChartType("bar")}
          className={`px-4 py-2 rounded ${chartType === "bar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Bar
        </button>
      </div>
      <div className="w-full h-96">
        {chartType === "line" ? (
          <Line options={chartOptions} data={data} />
        ) : (
          <Bar options={chartOptions} data={data} />
        )}
      </div>
    </div>
  );
};
