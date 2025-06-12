import type { FC } from "react";

export const ProgressBar: FC<{ value: number }> = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-4">
    <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${value}%` }} />
  </div>
);
