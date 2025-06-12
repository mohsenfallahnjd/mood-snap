"use client";

import { type FC, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { entriesAtom } from "@/utils/atoms";
import { ProgressBar } from "./ProgressBar";
import { CalendarGrid } from "./CalendarGrid";
import { LocalNotice } from "./LocalNotice";

export const ReportPage: FC = () => {
  const { year, month } = useParams();
  const entries = useAtomValue(entriesAtom);
  const router = useRouter();

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
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Report: {year}-{month}
      </h1>
      <ProgressBar value={positiveRate} />
      <p className="text-sm text-gray-600">
        {positiveRate}% good days ({totalDays} entries)
      </p>
      <div className="flex justify-between">
        <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded">
          Previous
        </button>
        <button onClick={next} className="px-4 py-2 bg-gray-200 rounded">
          Next
        </button>
      </div>
      <CalendarGrid entries={entries} year={year as string} month={month as string} />

      <LocalNotice />
    </div>
  );
};
