import type { FC } from "react";

export const CalendarGrid: FC<{ entries: Record<string, string>; year: string; month: string }> = ({
  entries,
  year,
  month,
}) => {
  const daysInMonth = new Date(+year, +month, 0).getDate();
  const cells = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  return (
    <div className="overflow-x-auto">
      <div className="inline-grid grid-cols-7 gap-1 w-full">
        {cells.map((day) => {
          const dateKey = `${year}-${month.padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const mood = entries[dateKey];
          const bgColor =
            mood === "good"
              ? "bg-green-300"
              : mood === "neutral"
                ? "bg-yellow-300"
                : mood === "bad"
                  ? "bg-red-300"
                  : "bg-transparent";
          return (
            <div
              key={day}
              className={`w-full h-12  border rounded ${bgColor} flex items-center justify-center text-sm sm:text-base`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};
