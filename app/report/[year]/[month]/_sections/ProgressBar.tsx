"use client";

import { type FC, useEffect, useState } from "react";

type Props = {
  percent: number; // 0–100
};

export const ProgressBar: FC<Props> = ({ percent }) => {
  const [width, setWidth] = useState(0);

  // When `percent` changes, animate to the new value
  useEffect(() => {
    // slight delay to trigger transition on mount too
    const timeout = setTimeout(() => setWidth(percent), 50);
    return () => clearTimeout(timeout);
  }, [percent]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="bg-blue-500 h-full rounded-full transition-[width] duration-500 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};
