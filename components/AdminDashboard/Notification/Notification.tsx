"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

type Notification = {
  id: number;
  message: string;
  time: string;
};

const notifications: Notification[] = [
  { id: 1, message: "You have received $500 from John Doe", time: "Fri, 12:30pm" },
  { id: 2, message: "New User registered.", time: "Fri, 12:30pm" },
  { id: 3, message: "New User registered.", time: "Fri, 12:30pm" },
  { id: 4, message: "New User registered.", time: "Fri, 12:30pm" },
];

export default function Notification() {
  const [selectedId, setSelectedId] = useState<number | null>(1); // default first selected

  return (
    <div className="bg-[#FAF3E0]  p-5 rounded-3xl border">
      <h1 className="text-3xl font-semibold text-red-500 mb-6">Notifications</h1>
      <hr className="border-red-200 mb-6" />

      <div className="space-y-4">
        {notifications.map((item) => {
          const isSelected = selectedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedId(item.id)}
              className={`
                cursor-pointer rounded-xl p-2 border flex gap-4 items-start
                ${isSelected ? "bg-red-500 text-white" : "bg-[#F1EAD7] text-[#333]"}
              `}
            >
              {/* Icon */}
              <div
                className={`p-2 rounded-full border ${
                  isSelected ? "border-white text-white" : "border-red-500 text-red-500"
                }`}
              >
                <Bell size={22} />
              </div>

              {/* Text */}
              <div>
                <p className="font-medium text-[18px] leading-150% ">{item.message}</p>
                <p className={`text-sm mt-1 ${isSelected ? "text-white" : "text-[#4A4C56]"}`}>
                  {item.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
