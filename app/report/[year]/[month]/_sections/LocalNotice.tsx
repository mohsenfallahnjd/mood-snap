import type { FC } from "react";

export const LocalNotice: FC = () => {
  return (
    <p className="text-xs text-gray-500 mt-4">
      Data stored locally on this device. Clearing browser data or switching devices will reset your history.
    </p>
  );
};
