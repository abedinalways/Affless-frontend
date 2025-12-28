"use client";

import Image from "next/image";
import { Mail } from "lucide-react";

type InboxItem = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string; // image path
  online?: boolean;
};

const inboxData: InboxItem[] = [
  {
    id: 1,
    name: "Jane Cooper",
    lastMessage: "Me: How are you?",
    time: "4 Weeks ago",
    avatar: "/images/Jerome.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Jane Cooper",
    lastMessage: "Me: How are you?",
    time: "4 Weeks ago",
    avatar: "/images/headset.svg",
    online: true,
  },
  {
    id: 3,
    name: "Jane Cooper",
    lastMessage: "Me: How are you?",
    time: "4 Weeks ago",
    avatar: "/images/jone1.png",
    online: true,
  },
  {
    id: 4,
    name: "Jane Cooper",
    lastMessage: "Me: How are you?",
    time: "4 Weeks ago",
    avatar: "/images/jone2.png",
    online: false,
  },
  {
    id: 5,
    name: "Jane Cooper",
    lastMessage: "Me: How are you?",
    time: "4 Weeks ago",
    avatar: "/images/jone3.png",
    online: true,
  },
];

export default function Inbox() {
  const count = 0; 

  return (
    <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b">
        <Mail size={18} />
        <p className="font-medium text-[16px]">Inbox ({count})</p>
      </div>

      {/* List */}
      <div>
        {inboxData.map((item) => (
          <button
            key={item.id}
            className="w-full flex items-center justify-between px-5 py-4 border-b last:border-b-0 hover:bg-gray-50 transition cursor-pointer"
            onClick={() => console.log("Open chat:", item.id)}
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative h-11 w-11 rounded-full overflow-hidden bg-gray-200">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  fill
                  className="object-cover"
                />

                {/* Online Dot */}
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                    item.online ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              {/* Name + message */}
              <div className="text-left">
                <p className="font-semibold text-[16px] leading-5 text-gray-900">
                  {item.name}
                </p>
                <p className="text-[13px] text-gray-600 mt-1">
                  {item.lastMessage}
                </p>
              </div>
            </div>

            {/* Time */}
            <p className="text-[12px] text-gray-500 whitespace-nowrap">
              {item.time}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
