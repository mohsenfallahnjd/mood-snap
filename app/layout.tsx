import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Viewport } from "next";
import { Navbar } from "./_sections/Navbar";
import { Footer } from "./_sections/Footer";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: false,
  themeColor: "#3B82F6",
};

export const metadata: Metadata = {
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
  manifest: "/manifest.json",
  appleWebApp: {
    title: "MoodSnap",
    capable: true,
    statusBarStyle: "default",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="container mx-auto py-6 min-h-[calc(100vh-100px)]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
