import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 1. ورودی‌های روزانه: key: 'moodSnap:entries'
export const entriesAtom = atomWithStorage<Record<string, "good" | "neutral" | "bad">>("moodSnap:entries", {});

// 2. زبان
// export const languageAtom = atomWithStorage<string>("moodSnap:settings:language", "fa");

// 3. یادآور فعال/غیرفعال
export const reminderAtom = atomWithStorage<boolean>("moodSnap:settings:reminderEnabled", false);

// 4. اتم مشتق برای درصد مثبت ماه (مثال)
export const positiveRateAtom = atom((get) => {
  const entries = get(entriesAtom);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const days = Object.entries(entries).filter(([date, _mood]) => date.startsWith(`${year}-${month}`));
  if (!days.length) {
    return 0;
  }
  const positiveCount = days.filter(([, m]) => m === "good").length;
  return Math.round((positiveCount / days.length) * 100);
});
