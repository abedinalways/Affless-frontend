import AddsIcon from '@/components/Icons/Adds';
import MailIcon from '@/components/Icons/MailIcon'
import VideoIcon from '@/components/Icons/VideoIcon';
import Youtube from '@/components/Icons/Youtube';
import { YoutubeIcon } from 'lucide-react';
import React from 'react'
import { BsBadgeCc } from 'react-icons/bs';
import { FiMusic } from 'react-icons/fi';
import { GrMicrophone } from 'react-icons/gr';
import { LuCalendarDays } from 'react-icons/lu';
import { RxImage } from 'react-icons/rx';

const data = [
  {
    id: 1,
    icon: <YoutubeIcon className='text-red-400' />,
    bg: "bg-[#FEE8E8] border border-[#FECACA]",
    title: "Long-form YouTube",
    desc: "videos, educational content, vlogs, and tutorials"
  },
  {
    id: 2,
    icon: <VideoIcon />,
    bg: "bg-[#FCEAF4] border border-[#FBCFE8]",
    title: "Shorts/Reels/TikToks",
    desc: "Viral short-form content"
  },
  {
    id: 3,
    icon: <RxImage className='text-blue-500' />,
    bg: "bg-[#E3EFFE] border border-[#C0DCFE]",
    title: "Thumbnails",
    desc: "High-conversion thumbnails"
  },
  {
    id: 4,
    icon: <AddsIcon className='' />,
    bg: "bg-[#E3FCEC] border border-[#BBF7D0]",
    title: "Ads/UGC",
    desc: "Commercial & user content"
  },
  {
    id: 5,
    icon: <GrMicrophone className='text-[#AB61EF]' />,
    bg: "bg-[#F6EEFF] border border-[#E9D5FF]",
    title: "Podcasts",
    desc: "Audio editing & mixing"
  },
  {
    id: 6,
    icon: <LuCalendarDays className='text-[#EA580C]'/>,
    bg: "bg-[#FFF0DD] border border-[#FED7AA]",
    title: "Weddings/Events",
    desc: "Special occasions"
  },
  {
    id: 7,
    icon: <FiMusic className='text-green-600' />,
    bg: "bg-[#D6FBF3] border border-[#E6FCF8]",
    title: "Color & Audio",
    desc: "Post-production polish"
  },
  {
    id: 8,
    icon: <BsBadgeCc className='text-[#4F46E5]' />,
    bg: "bg-[#E4EAFF] border border-[#C7D2FE]",
    title: "Captions/Subtitles",
    desc: "Accessibility & engagement"
  }
];

export default function Popularcategory() {
  return (
    <div className="containers mx-auto lg:py-20 py-10">
      <h2 className="text-[#333] text-center font-[Poppins] text-[36px] md:text-[64px] font-medium leading-[124%] [text-stroke-width:1px] "
>Popular Categories</h2>
      <p className="text-[#4A4C56] text-center font-[Poppins] text-[18px] font-normal leading-[150%] mt-4"
>
        Find the perfect editor for any project
      </p>

      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-6 justify-center pt-[50px]">

        {data.map((item) => (
          <div
            key={item.id}
            className={`p-3 md:p-6 rounded-xl shadow-sm ${item.bg} transition hover:shadow-md`}
          >
            <div className="text-2xl mb-4">{item.icon}</div>

      <p className="text-[#333] font-[Poppins] text-[14px] lg:text-[24px] font-medium leading-[150%] pb-1.5 whitespace-normal">
  {item.title}
</p>


            <p className="text-[#4A4C56] font-[Poppins] text-[14px] lg:text-[16px] font-normal leading-[150%] mt-2"
>{item.desc}</p>
          </div>
        ))}

      </div>
    </div>
  );
}
