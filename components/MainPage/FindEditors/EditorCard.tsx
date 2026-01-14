/** @format */

"use client";

import Image, { StaticImageData } from "next/image";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export const editors = [
  {
    id: 1,
    name: "Jane Cooper",
    country: "Charlton, United States",
    avatar: "/images/jonekeper.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],

    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed"],
    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: 2,
    name: "Robert Fox",
    country: "United States",
    avatar: "/images/robatfox.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed"],

    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: 3,
    name: "Bessie Cooper",
    country: "Algeria",
    avatar: "/images/basse.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed"],

    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: 4,
    name: "Jane Cooper",
    country: "Charlton, United States",
    avatar: "/images/coper.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],

    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed"],
    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: 5,
    name: "Robert Fox",
    country: "United States",
    avatar: "/images/shavanagh.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    skills: [
      "YouTube Long-form",
      "Within 3 Days",
      "127 Jobs Completed",
      "127 Jobs Completed",
    ],

    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: 6,
    name: "Bessie Cooper",
    country: "Algeria",
    avatar: "/images/bel.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed"],

    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
];

export type EditorCardProps = {
  name: string;
  country: string;
  avatar: string | StaticImageData;
  budget: string;
  rating: number;
  reviews: number;
  skills: string[];
  description: string;
};

export default function EditorCard({
  name,
  country,
  avatar,
  budget,
  rating,
  reviews,
  skills,
  description,
}: EditorCardProps) {
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_PER_PAGE = 3;

  const handleNext = () => {
    if (startIndex + ITEMS_PER_PAGE < skills.length) {
      setStartIndex(startIndex + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (startIndex - ITEMS_PER_PAGE >= 0) {
      setStartIndex(startIndex - ITEMS_PER_PAGE);
    }
  };

  const visibleSkills = skills.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className='w-full bg-white p-6 rounded-xl shadow-sm border '>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Image
          src={avatar}
          alt={name}
          width={70}
          height={70}
          className='rounded-full object-cover '
        />
        <div>
          <Link
            href='/editor/editor-profile'
            className='text-[20px] md:text-[24px] font-medium leading-150% text-[#333]'>
            {name}
          </Link>

          <div className='flex items-center gap-1 text-[14px] leading-150% font-normal text-[#777980]'>
            <MapPin size={15} />
            <span>{country}</span>
          </div>
        </div>
      </div>
      {/* Budget + Rating */}
      <div className='mt-4 flex items-center gap-5'>
        <p className='text-[16px] text-[#777980]  font-medium'>
          Project Budget: <span className=''>{budget}</span>
        </p>
        <div className='flex items-center gap-1 text-[16px] text-[#777980]'>
          <Star size={18} className='text-yellow-500 fill-yellow-500' />
          <span>
            {rating}({reviews})
          </span>
        </div>
      </div>
      {/* Description */}
      <p className='text-[#777980] text-[14px] font-normal mt-3 '>
        {description}
      </p>
      {/* Skills */}
      {/* Skills */}
      <div className='flex py-6 gap-2 items-center justify-between'>
        <ChevronLeft
          className={`cursor-pointer ${
            startIndex === 0 ? "opacity-30" : "opacity-70"
          }`}
          onClick={handlePrev}
        />
        <div className='flex gap-3 flex-1 justify-center'>
          {visibleSkills.map((skill, idx) => (
            <span
              key={idx}
              className='bg-gray-100 px-4 py-1 rounded-full text-[12px] md:text-sm text-center'>
              {skill}
            </span>
          ))}
        </div>
        <ChevronRight
          className={`cursor-pointer ${
            startIndex + ITEMS_PER_PAGE >= skills.length
              ? "opacity-30"
              : "opacity-70"
          }`}
          onClick={handleNext}
        />
      </div>

      {/* Hire Button */}
      <div className='flex w-full gap-4'>
        <Link
          href='/client/hire-vedio-editor'
          className='cursor-pointer w-full'>
          <div className=' text-center bg-red-500 cursor-pointer w-full text-white  p-3 rounded-lg font-medium hover:bg-red-600 duration-300 '>
            Hire Editor
          </div>
        </Link>
        <Link href='/client/message' className='cursor-pointer w-full'>
          <div className=' text-center bg-[#FFEDED] cursor-pointer w-full text-[#FF4D4F]  p-3 rounded-lg font-medium hover:bg-red-100 duration-300 '>
            Message
          </div>
        </Link>
      </div>
    </div>
  );
}
