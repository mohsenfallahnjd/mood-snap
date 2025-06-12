"use client";

import Link from "next/link";
import { useAtom } from "jotai";
import { entriesAtom, calculateStreak, streakAtom } from "@/utils/atoms";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import { ArrowDownTrayIcon, ArrowPathIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { ShareIcon } from "@heroicons/react/24/outline";
import { ShareModal } from "./ShareModal";

const moodMap = {
  good: "/images/moods/good.png",
  neutral: "/images/moods/neutral.png",
  bad: "/images/moods/bad.png",
};

export default function HomePage() {
  const [entries, setEntries] = useAtom(entriesAtom);
  const router = useRouter();
  const today = new Date().toISOString().slice(0, 10);
  const [justRecorded, setJustRecorded] = useState(!!entries[today]);
  const streak = calculateStreak(entries, today);
  const [selected, setSelected] = useState<"good" | "neutral" | "bad" | null>(entries[today]);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [streakEnabled] = useAtom(streakAtom);
  useEffect(() => {
    setTimeout(() => {
      setJustRecorded(!!entries[today]);
      setSelected(entries[today]);
    }, 500);
  }, [entries, today]);

  const handlePick = (mood: "good" | "neutral" | "bad") => {
    setEntries({ ...entries, [today]: mood });
    setJustRecorded(true);
    setSelected(mood);
  };

  const handleRecordAgain = () => {
    setJustRecorded(false);
    setSelected(null);
  };

  const captureImage = async () => {
    const el = document.getElementById("shareable-area");
    if (!el) {
      return null;
    }
    const canvas = await html2canvas(el, { scale: 2, backgroundColor: "#fff" });
    return new Promise<Blob | null>((r) => canvas.toBlob(r));
  };

  const handleGlobalShare = async () => {
    const blob = await captureImage();
    const url = blob && URL.createObjectURL(blob);
    setShareUrl(url);

    const file = blob && new File([blob], "moodsnap.png", { type: "image/png" });
    const shareData: ShareData = {
      files: file ? [file] : undefined,
      title: "My MoodSnap",
      text: `How are you feeling today? I’m feeling ${entries[today] || "🤔"}!`,
      url: "https://moodsnap.me",
    };

    // Try native share
    if (navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        console.log("Failed to share");

        setIsShareModalOpen(true);
      }
    }
  };

  return (
    <div className="w-full mx-auto p-6 text-center h-180 flex flex-col justify-center">
      {/* Motivational Quote */}
      {/* <blockquote className="italic text-gray-700 mb-6">“Happiness is a journey, not a destination.”</blockquote> */}
      {/* Wrap the mood picker so it’s shareable */}
      {streakEnabled && streak > 0 && (
        <p className="text-sm text-gray-600 mb-4">
          You’re on a <span className="font-semibold text-blue-500">{streak}-day streak</span>!
        </p>
      )}

      <div
        id="shareable-area"
        className="w-full max-w-[500px] mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col items-center"
      >
        {/* Greeting & Streak */}
        <h1 className="text-2xl font-semibold mb-6">How are you feeling today?</h1>

        {selected ? (
          // Show the selected mood image
          <img src={moodMap[selected]} alt={selected} className="w-24 h-24 mb-4" />
        ) : (
          // Otherwise show the three picker buttons
          <div className="flex space-x-6">
            {(["good", "neutral", "bad"] as const).map((m) => (
              <button key={m} onClick={() => handlePick(m)}>
                <img src={moodMap[m]} alt={m} className="w-16 h-16 hover:scale-110 transition" />
              </button>
            ))}
          </div>
        )}

        {/* Site link in the snapshot */}
        <p className="mt-auto text-xs" style={{ color: "#6b7280" }}>
          moodsnap.me
        </p>
      </div>

      {justRecorded && (
        <div className="mt-12 flex flex-col items-center space-y-3 fade-in-up w-full max-w-[500px] mx-auto">
          <div className="w-full flex justify-center items-center space-x-3">
            <span className=" px-4 py-2 bg-green-100 text-green-800 rounded-full">Mood recorded!</span>

            <button
              onClick={handleRecordAgain}
              className="inline-flex items-center justify-center shadow-lg rounded-full p-2 bg-white text-black rounded border border-gray-200 transition"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={() => router.push(`/report/${today.slice(0, 4)}/${today.slice(5, 7)}`)}
            className="w-full inline-flex items-center justify-center shadow-lg rounded-full px-5 py-2 bg-yellow-300 text-black rounded hover:bg-yellow-400 transition"
          >
            <ChartBarIcon className="w-5 h-5 mr-2" />
            See Today’s Report
          </button>

          <button
            onClick={handleGlobalShare}
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

          {shareUrl && (
            <a
              href={shareUrl}
              download="moodsnap.png"
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 w-full justify-center rounded-full shadow transition"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" /> Download Image
            </a>
          )}
        </div>
      )}

      {/* Donate */}
      <div className="mt-12 text-sm text-gray-500">
        Enjoying MoodSnap?{" "}
        <Link href="/about#donate">
          <span className="text-yellow-600 underline">Support us</span>
        </Link>
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        text={`How are you feeling today? I’m feeling ${entries[today] || "🤔"}!`}
        url="https://moodsnap.me"
      />
    </div>
  );
}
