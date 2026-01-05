"use client";

import Image, { StaticImageData } from "next/image";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";


export const editors = [
  {
    name: "Jane Cooper",
    country: "Charlton, United States",
    avatar: "/images/jonekeper.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora",],
    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    name: "Robert Fox",
    country: "United States",
    avatar: "/images/robatfox.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    description:
    "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    name: "Bessie Cooper",
    country: "Algeria",
    avatar: "/images/basse.png",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
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
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm border ">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt={name}
          width={70}
          height={70}
          className="rounded-full object-cover "
        />
        <div>
          <Link href="/editor/editor-profile" className="text-[20px] md:text-[24px] font-medium leading-150% text-[#333]">{name}</Link>

          <div className="flex items-center gap-1 text-[14px] leading-150% font-normal text-[#777980]">
            <MapPin size={15} />
            <span>{country}</span>
          </div>
        </div>
      </div>
      {/* Budget + Rating */}
      <div className="mt-4 flex items-center gap-5">
        <p className="text-[16px] text-[#777980]  font-medium">
          Project Budget: <span className="">{budget}</span>
        </p>
        <div className="flex items-center gap-1 text-[16px] text-[#777980]">
          <Star size={18} className="text-yellow-500 fill-yellow-500" />
          <span>
            {rating}({reviews})
          </span>
        </div>
      </div>
      {/* Description */}
      <p className="text-[#777980] text-[14px] font-normal mt-3 ">{description}</p>
      {/* Skills */}
      <div className="flex py-6 gap-2 md:gap-4  justify-between">
        <ChevronLeft className="opacity-50 cursor-not-allowed" />
       <div className="flex justify-between lg:gap-9  gap-4">
         {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-gray-100 px-2 md:px-4 py-1 rounded-full text-[12px] md:text-sm text-center"
          >
            {skill}
          </span>
        ))}
       </div>
        <ChevronRight className="cursor-not-allowed opacity-50" />
      </div>
      {/* Hire Button */}
   <div className=" text-center bg-red-500 cursor-pointer w-full text-white  p-3 rounded-lg font-medium hover:bg-red-600 duration-300 ">
       <Link href="/client/hire-vedio-editor" className="cursor-pointer">
        Hire Editor
      </Link>
   </div>
    </div>
  );
}
