"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { entriesAtom, calculateStreak, streakAtom } from "@/utils/atoms";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [entries, setEntries] = useAtom(entriesAtom);
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const streak = calculateStreak(entries, today);

  const [streakEnabled] = useAtom(streakAtom);
  const handlePick = (mood: "good" | "neutral" | "bad") => {
    setEntries({ ...entries, [today]: mood });
    router.push(`/report/${today.slice(0, 4)}/${today.slice(5, 7)}`);
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center mt-16">
      {/* Greeting & Streak */}
      <h1 className="text-2xl font-semibold mb-6">How are you feeling today?</h1>
      {streakEnabled && streak > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          You’re on a <span className="font-semibold text-blue-500">{streak}-day streak</span>!
        </p>
      )}

      {/* Motivational Quote */}
      {/* <blockquote className="italic text-gray-700 mb-6">“Happiness is a journey, not a destination.”</blockquote> */}

      {/* Mood Picker */}
      <div className="flex justify-center space-x-8 mb-8">
        {["good", "neutral", "bad"].map((mood) => (
          <button
            key={mood}
            className="text-5xl hover:scale-110 transition"
            onClick={() => handlePick(mood as "good" | "neutral" | "bad")}
          >
            {mood === "good" ? "😊" : mood === "neutral" ? "😐" : "😞"}
          </button>
        ))}
      </div>

      {/* Quick Links */}
      {/* <div className="flex justify-center space-x-4 mb-6">
        <Link href={`/report/${today.slice(0, 4)}/${today.slice(5, 7)}`}>
          <span className="px-4 py-2 bg-blue-100 rounded hover:bg-blue-200 transition">Today’s Report</span>
        </Link>
        <Link href="/history">
          <span className="px-4 py-2 bg-green-100 rounded hover:bg-green-200 transition">View Trends</span>
        </Link>
      </div> */}

      {/* Donate */}
      <div className="mt-12 text-sm text-gray-500">
        Enjoying MoodSnap?{" "}
        <Link href="/about#donate">
          <span className="text-yellow-600 underline">Support us</span>
        </Link>
      </div>
    </div>
  );
}
