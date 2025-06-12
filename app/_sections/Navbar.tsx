"use client";

import { type FC, useState } from "react";
import Link from "next/link";

export const Navbar: FC = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/history", label: "History" },
    {
      href: `/report/${new Date().getFullYear()}/${String(new Date().getMonth() + 1).padStart(2, "0")}`,
      label: "Report",
    },
    { href: "/settings", label: "Settings" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="bg-white border-b shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <span className="text-xl font-bold">MoodSnap</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="text-gray-700 hover:text-blue-600">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden bg-white border-t shadow-inner transition-max-h duration-300 overflow-hidden ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        {links.map((link) => (
          <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span className="block px-4 py-2 text-gray-700 hover:bg-gray-100">{link.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};
