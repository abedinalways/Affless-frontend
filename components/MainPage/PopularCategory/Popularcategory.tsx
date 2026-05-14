import AddsIcon from "@/components/Icons/Adds";
import MailIcon from "@/components/Icons/MailIcon";
import VideoIcon from "@/components/Icons/VideoIcon";
import Youtube from "@/components/Icons/Youtube";
import { YoutubeIcon } from "lucide-react";
import React from "react";
import { BsBadgeCc } from "react-icons/bs";
import { FiMusic } from "react-icons/fi";
import { GrMicrophone } from "react-icons/gr";
import { LuCalendarDays } from "react-icons/lu";
import { RxImage } from "react-icons/rx";

const data = [
  {
    id: 1,
    icon: <YoutubeIcon className="text-red-400" />,
    bg: "bg-[#FEE8E8] border border-[#FECACA]",
    title: "Long-Form YouTube",
    desc: " Long-Form YouTube videos, educational content, vlogs, and tutorials.",
  },
  {
    id: 2,
    icon: <VideoIcon />,
    bg: "bg-[#FCEAF4] border border-[#FBCFE8]",
    title: "Shorts / Reels / TikToks",
    desc: "Viral short-form content",
  },
  {
    id: 3,
    icon: <RxImage className="text-blue-500" />,
    bg: "bg-[#E3EFFE] border border-[#C0DCFE]",
    title: "Thumbnails",
    desc: "High-conversion thumbnails",
  },
  {
    id: 4,
    icon: <AddsIcon className="" />,
    bg: "bg-[#E3FCEC] border border-[#BBF7D0]",
    title: "Ads/UGC",
    desc: "Commercial & user content",
  },
  {
    id: 5,
    icon: <GrMicrophone className="text-[#AB61EF]" />,
    bg: "bg-[#F6EEFF] border border-[#E9D5FF]",
    title: "Podcasts",
    desc: "Audio editing & mixing",
  },
  {
    id: 6,
    icon: <LuCalendarDays className="text-[#EA580C]" />,
    bg: "bg-[#FFF0DD] border border-[#FED7AA]",
    title: "Weddings / Events",
    desc: "Special occasions",
  },
  {
    id: 7,
    icon: <FiMusic className="text-green-600" />,
    bg: "bg-[#D6FBF3] border border-[#E6FCF8]",
    title: "Color & Audio",
    desc: "Post-production polish",
  },
  {
    id: 8,
    icon: <BsBadgeCc className="text-[#4F46E5]" />,
    bg: "bg-[#E4EAFF] border border-[#C7D2FE]",
    title: "Captions / Subtitles",
    desc: "Accessibility & engagement",
  },
];

export default function Popularcategory() {
  return (
    <div className="containers mx-auto py-10 lg:py-10">
      <h2 className="text-center font-[Poppins] text-[36px] leading-[124%] font-medium text-[#333] [text-strokeWidth:1px] md:text-[64px]">
        Popular Categories
      </h2>
      <p className="mt-4 text-center font-[Poppins] text-[18px] leading-[150%] font-normal text-[#4A4C56]">
        Find the perfect editor for any job
      </p>

      <div className="grid grid-cols-2 justify-center gap-3 pt-[50px] md:grid-cols-2 lg:grid-cols-2 lg:gap-6 xl:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.id}
            className={`rounded-xl p-3 shadow-sm md:p-6 ${item.bg} transition hover:shadow-md`}
          >
            <div className="mb-4 text-2xl">{item.icon}</div>

            <p className="pb-1.5 font-[Poppins] text-[12px] leading-[150%] font-medium whitespace-break-spaces text-[#333] lg:text-sm">
              {item.title}
            </p>
            <p className="mt-2 font-[Poppins] text-[14px] leading-[150%] font-normal text-[#4A4C56] lg:text-xs">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
