"use client";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { entriesAtom } from "@/utils/atoms";
import type { FC } from "react";

export const HomePage: FC = () => {
  const [entries, setEntries] = useAtom(entriesAtom);
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);

  const handleMood = (mood: "good" | "neutral" | "bad") => {
    setEntries({ ...entries, [today]: mood });
    router.push(`/report/${today.slice(0, 4)}/${today.slice(5, 7)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
      <h1 className="text-3xl font-bold">MoodSnap</h1>
      <p className="text-lg">How are you feeling today?</p>
      <div className="flex space-x-8">
        <button onClick={() => handleMood("good")} className="text-5xl hover:scale-110 transition" aria-label="Good">
          😊
        </button>
        <button
          onClick={() => handleMood("neutral")}
          className="text-5xl hover:scale-110 transition"
          aria-label="Neutral"
        >
          😐
        </button>
        <button onClick={() => handleMood("bad")} className="text-5xl hover:scale-110 transition" aria-label="Bad">
          😞
        </button>
      </div>
      <button
        onClick={() => router.push("/about")}
        className="mt-4 px-6 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500"
      >
        Donate
      </button>
    </div>
  );
};
