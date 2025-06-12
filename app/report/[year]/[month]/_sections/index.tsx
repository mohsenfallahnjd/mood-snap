"use client";

import { type FC, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { entriesAtom } from "@/utils/atoms";
import { ProgressBar } from "./ProgressBar";
import { CalendarGrid } from "./CalendarGrid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export const ReportPage: FC = () => {
  const entries = useAtomValue(entriesAtom);
  const router = useRouter();

  const { year, month } = useParams(); // strings like "2025", "06"
  // Parse ints
  const y = Number(year);
  const m = Number(month);

  // Format to "Month YYYY"
  const formatted = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
  }).format(new Date(y, m - 1));

  useEffect(() => {
    if (!year || !month) {
      router.replace("/");
    }
  }, [year, month, router]);

  const { positiveRate, totalDays } = useMemo(() => {
    const prefix = `${year}-${month}`;
    const filtered = Object.entries(entries).filter(([date]) => date.startsWith(prefix));
    const total = filtered.length;
    const goodCount = filtered.filter(([, mood]) => mood === "good").length;
    const rate = total > 0 ? Math.round((goodCount / total) * 100) : 0;
    return { positiveRate: rate, totalDays: total };
  }, [entries, year, month]);

  const prev = () => {
    let y = +year!;
    let m = +month! - 1;
    if (m < 1) {
      y--;
      m = 12;
    }
    router.push(`/report/${y}/${String(m).padStart(2, "0")}`);
  };
  const next = () => {
    let y = +year!;
    let m = +month! + 1;
    if (m > 12) {
      y++;
      m = 1;
    }
    router.push(`/report/${y}/${String(m).padStart(2, "0")}`);
  };

  return (
    <div className="p-4 space-y-6 mt-16">
      {/* ---- Header with formatted date ---- */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Report: {formatted}</h1>
        <div className="flex gap-2">
          <button className="mt-2 sm:mt-0 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={prev}>
            <ChevronLeftIcon className="w-4 h-4" />
          </button>

          <button className="mt-2 sm:mt-0 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={next}>
            <ChevronRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ---- Animated ProgressBar ---- */}
      <div className="space-y-2">
        <ProgressBar percent={positiveRate} />
        <p className="text-sm text-gray-600">
          {positiveRate}% good days ({totalDays} days)
        </p>
      </div>

      {/* ---- Calendar + local notice ---- */}
      <CalendarGrid year={String(y)} month={String(m)} entries={entries} />
      <p className="text-xs text-gray-500">
        Data stored locally on this device. Clearing browser data or switching devices will reset your history.
      </p>
    </div>
  );
};
