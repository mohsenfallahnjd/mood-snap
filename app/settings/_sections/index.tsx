"use client";
import { useAtom } from "jotai";
import { reminderAtom } from "@/utils/atoms";
import { type FC, useEffect } from "react";

export const SettingsPage: FC = () => {
  const [reminderEnabled, setReminderEnabled] = useAtom(reminderAtom);

  useEffect(() => {
    if ("Notification" in window) {
      if (reminderEnabled && Notification.permission !== "granted") {
        Notification.requestPermission();
      }
    }
  }, [reminderEnabled]);

  const handleToggle = () => {
    setReminderEnabled(!reminderEnabled);
    if (!reminderEnabled) {
      // Schedule next notification in 24h
      setTimeout(
        () => {
          new Notification("MoodSnap Reminder", {
            body: "Don't forget to record your mood today!",
          });
        },
        24 * 60 * 60 * 1000
      );
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="flex items-center space-x-4">
        <label htmlFor="reminder" className="font-medium">
          Enable Daily Reminder
        </label>
        <input id="reminder" type="checkbox" checked={reminderEnabled} onChange={handleToggle} className="h-5 w-5" />
      </div>
      <p className="text-sm text-gray-600">
        {reminderEnabled
          ? "You will receive a browser notification every 24 hours."
          : "Enable reminders to get notified daily to record your mood."}
      </p>
    </div>
  );
};
