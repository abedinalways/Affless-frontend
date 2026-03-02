"use client";

import Image from "next/image";
import { Mail } from "lucide-react";
import { GrNotification } from "react-icons/gr";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

type InboxItem = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string; // image path
  online?: boolean;
  href?: string;
};

type Proptype = {
  data: InboxItem[];
}

export default function Notification({ data }: Proptype) {
  const count = 1;
  const router = useRouter();
  return (
    <div className="w-full max-w-md rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-3 sm:px-5 sm:py-4 border-b">
        <IoIosNotificationsOutline size={18} />
        <p className="font-medium text-[16px]">Inbox ({count})</p>
      </div>

      {/* List */}
      <div className="h-fit max-h-[70vh] overflow-y-auto">
        {data.map((item, idx) => (
          <button
            key={item.id}
            className={`w-full flex items-center justify-between gap-4 p-3 sm:px-5 sm:py-4 border-b last:border-b-0 hover:bg-gray-50 ${idx === 0 ? "bg-gray-100" : ""} transition ${item.href ? "cursor-pointer" : "cursor-default"}`}
            onClick={() => item?.href && router.push(item.href)}
          >
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="relative w-9 h-9 sm:h-11 sm:w-11 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />

                  {/* Online Dot */}
                </div>
                <span
                  className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${item.online ? "bg-green-500" : "bg-gray-400"
                    }`}
                />
              </div>

              {/* Name + message */}
              <div className="text-left">
                <p className="font-semibold text-[13px] sm:text-[16px] leading-5 text-gray-900">
                  {item.name}
                </p>
                <p className={`text-[11px] sm:text-[13px] text-gray-600 mt-1 ${idx === 0 ? "font-medium text-gray-900" : "font-normal"}`}>
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
