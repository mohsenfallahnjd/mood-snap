import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const entriesAtom = atomWithStorage<Record<string, "good" | "neutral" | "bad">>("moodSnap:entries", {});

// export const languageAtom = atomWithStorage<string>("moodSnap:settings:language", "fa");

export const reminderAtom = atomWithStorage<boolean>("moodSnap:settings:reminderEnabled", false);

export const streakAtom = atomWithStorage<boolean>("moodSnap:settings:streakEnabled", false);

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

export function calculateStreak(
  entries: Record<string, "good" | "neutral" | "bad">,
  todayStr = new Date().toISOString().slice(0, 10)
): number {
  let streak = 0;
  let cursor = new Date(todayStr);

  while (true) {
    const key = cursor.toISOString().slice(0, 10);
    if (entries[key]) {
      streak++;
      // move back one day
      cursor.setDate(cursor.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
