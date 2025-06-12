import type { ReactNode } from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
};

export const metadata = {
  metadataBase: new URL("https://moodsnap.me"),
  title: "MoodSnap – Simple Daily Mood Tracker",
  description:
    "Track your daily mood with one click, view monthly reports and trends, all data stored locally on your device.",
  openGraph: {
    title: "MoodSnap",
    description: "A minimalist app to record and visualize your daily mood trends.",
    url: "https://moodsnap.me",
    siteName: "MoodSnap",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoodSnap",
    description: "Record your mood in seconds and explore your emotional trends.",
    images: ["/images/twitter-image.png"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-white shadow p-4">
          <nav className="container mx-auto flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
            <Link href="/history" className="text-gray-700 hover:text-blue-500">
              History
            </Link>
            <Link
              href={`/report/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}`}
              className="text-gray-700 hover:text-blue-500"
            >
              Report
            </Link>
            <Link href="/settings" className="text-gray-700 hover:text-blue-500">
              Settings
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500">
              About
            </Link>
          </nav>
        </header>
        <main className="container mx-auto py-6">{children}</main>
      </body>
    </html>
  );
}
