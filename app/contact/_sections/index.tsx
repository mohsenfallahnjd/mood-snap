import type { FC } from "react";

export const Contact: FC = () => {
  return (
    <div className="mx-auto p-6 space-y-6 mt-20 w-full">
      <h1 className="text-3xl font-bold">Contact Us</h1>
      <p className="text-gray-700">
        We’d love to hear from you—whether you have feedback, questions, or just want to say hi!
      </p>

      <ul className="space-y-4">
        <li>
          📧 <strong>Email:</strong>{" "}
          <a href="mailto:support@moodsnap.me" className="text-blue-600 hover:underline">
            support@moodsnap.me
          </a>
        </li>
      </ul>
    </div>
  );
};
