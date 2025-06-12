"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { FC } from "react";

export const Footer: FC = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <footer className="py-6 text-center text-sm text-gray-500">
      © 2025 MoodSnap —
      <Link href="/contact">
        <span className="text-blue-600 hover:underline ml-1">Contact Us</span>
      </Link>
    </footer>
  );
};
