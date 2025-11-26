import MailIcon from '@/components/Icons/MailIcon'
import React from 'react'

const data = [
  {
    id: 1,
    icon: <MailIcon />,
    bg: "bg-[#FEE8E8] border border-[#FECACA]",
    title: "YouTube Long-form",
    desc: "Educational, vlogs, tutorials"
  },
  {
    id: 2,
    icon: <MailIcon />,
    bg: "bg-[#FCEAF4] border border-[#FBCFE8]",
    title: "Shorts/Reels/TikTok",
    desc: "Viral short-form content"
  },
  {
    id: 3,
    icon: <MailIcon />,
    bg: "bg-[#E3EFFE] border border-[#C0DCFE]",
    title: "Thumbnails",
    desc: "High-conversion thumbnails."
  },
  {
    id: 4,
    icon: <MailIcon />,
    bg: "bg-[#E3FCEC] border border-[#BBF7D0]",
    title: "Ads/UGC",
    desc: "Commercial & user content"
  },
  {
    id: 5,
    icon: <MailIcon />,
    bg: "bg-[#F6EEFF] border border-[#E9D5FF]",
    title: "Podcasts",
    desc: "Audio editing & mixing"
  },
  {
    id: 6,
    icon: <MailIcon />,
    bg: "bg-[#FFF0DD] border border-[#FED7AA]",
    title: "Weddings/Events",
    desc: "Special occasions"
  },
  {
    id: 7,
    icon: <MailIcon />,
    bg: "bg-[#D6FBF3] border border-[#E6FCF8]",
    title: "Color & Audio",
    desc: "Post-production polish"
  },
  {
    id: 8,
    icon: <MailIcon />,
    bg: "bg-[#E4EAFF] border border-[#C7D2FE]",
    title: "Captions/Subtitles",
    desc: "Accessibility & engagement"
  }
];

export default function Popularcategory() {
  return (
    <div className="containers mx-auto py-20">
      <h2 className="text-[#333] text-center font-[Poppins] text-[64px] font-normal leading-[124%] [text-stroke-width:1px] [text-stroke-color:#333]"
>Popular Categories</h2>
      <p className="text-[#4A4C56] text-center font-[Poppins] text-[18px] font-normal leading-[150%] mt-4"
>
        Find the perfect editor for any project
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-6 justify-center pt-[50px]">

        {data.map((item) => (
          <div
            key={item.id}
            className={`p-6 rounded-xl shadow-sm ${item.bg} transition hover:shadow-md`}
          >
            <div className="text-2xl mb-4">{item.icon}</div>

            <p className="text-[#333] font-[Poppins] text-[24px] font-medium leading-[150%]"
>{item.title}</p>
            <p className="text-[#4A4C56] font-[Poppins] text-[16px] font-normal leading-[150%] mt-2"
>{item.desc}</p>
          </div>
        ))}

      </div>
    </div>
  );
}
