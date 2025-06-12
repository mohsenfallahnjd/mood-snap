"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { entriesAtom, calculateStreak, streakAtom } from "@/utils/atoms";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { ChartBarIcon, ShareIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [entries, setEntries] = useAtom(entriesAtom);
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [justRecorded, setJustRecorded] = useState(!!entries[today]);
  const streak = calculateStreak(entries, today);

  const [streakEnabled] = useAtom(streakAtom);
  useEffect(() => {
    setTimeout(() => {
      setJustRecorded(!!entries[today]);
    }, 500);
  }, [entries, today]);

  const handlePick = (mood: "good" | "neutral" | "bad") => {
    setEntries({ ...entries, [today]: mood });
    setJustRecorded(true);
  };

  const handleShare = async () => {
    const el = document.getElementById("shareable-area");
    if (!el) {
      return alert("Nothing to share yet!");
    }
    const canvas = await html2canvas(el, { scale: 2 });
    canvas.toBlob(async (blob) => {
      if (!blob) {
        return;
      }
      const file = new File([blob], "moodsnap.png", { type: "image/png" });
      const shareData: ShareData = {
        files: [file],
        title: "My MoodSnap Entry",
        text: `I’m feeling ${entries[today] || "🤔"} today! How are you feeling today?`,
        url: "https://moodsnap.me",
      };
      if (navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 text-center h-180 flex flex-col justify-center">
      {/* Motivational Quote */}
      {/* <blockquote className="italic text-gray-700 mb-6">“Happiness is a journey, not a destination.”</blockquote> */}
      {/* Wrap the mood picker so it’s shareable */}
      {streakEnabled && streak > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          You’re on a <span className="font-semibold text-blue-500">{streak}-day streak</span>!
        </p>
      )}
      <div id="shareable-area" className="text-center">
        {/* Greeting & Streak */}
        <h1 className="text-2xl font-semibold mb-6">How are you feeling today?</h1>
        <div className="flex justify-center space-x-8 mb-8">
          <button onClick={() => handlePick("good")} className="text-6xl hover:scale-110 transition">
            😊
          </button>
          <button onClick={() => handlePick("neutral")} className="text-6xl hover:scale-110 transition">
            😐
          </button>
          <button onClick={() => handlePick("bad")} className="text-6xl hover:scale-110 transition">
            😞
          </button>
        </div>
      </div>

      {justRecorded && (
        <div className="flex flex-col items-center space-y-3 fade-in-up">
          <span className="px-4 py-2 mb-5 bg-green-100 text-green-800 rounded-full">Mood recorded!</span>
          <button
            onClick={() => router.push(`/report/${today.slice(0, 4)}/${today.slice(5, 7)}`)}
            className="w-full inline-flex items-center justify-center shadow-lg rounded-full px-5 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-400 transition"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            See Today’s Report
          </button>

          <button
            onClick={handleShare}
            className="
            w-full
    inline-flex items-center 
    bg-gradient-to-r from-blue-500 to-indigo-500 
    hover:from-blue-600 hover:to-indigo-600 
    text-white font-medium 
    px-5 py-2 rounded-full 
    shadow-lg 
    transform transition 
    active:scale-95
    justify-center
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400
  "
          >
            <ShareIcon className="w-5 h-5 mr-2" />
            Share Your Mood
          </button>
        </div>
      )}

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
