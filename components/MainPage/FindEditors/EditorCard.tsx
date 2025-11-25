"use client";

import Image from "next/image";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

/* ----------------------------------------
   EDITORS JSON DATA
-----------------------------------------*/
export const editors = [
  {
    name: "Jane Cooper",
    country: "Charlton, United States",
    avatar: "/avatar1.jpg",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    description:
      "In this digital age, video is a powerful tool that can engage millions of people around the world...",
  },
  {
    name: "Robert Fox",
    country: "United States",
    avatar: "/avatar2.jpg",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    description:
      "In this digital age, video is a powerful tool that can engage millions of people around the world...",
  },
  {
    name: "Bessie Cooper",
    country: "Algeria",
    avatar: "/avatar3.jpg",
    budget: "$562",
    rating: 4.9,
    reviews: 338,
    skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    description:
      "In this digital age, video is a powerful tool that can engage millions of people around the world...",
  },
];

/* ----------------------------------------
   EDITOR CARD COMPONENT
-----------------------------------------*/
export type EditorCardProps = {
  name: string;
  country: string;
  avatar: string;
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
          className="rounded-full object-cover"
        />

        <div>
          <h2 className="text-[22px] font-semibold">{name}</h2>

          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <MapPin size={15} />
            <span>{country}</span>
          </div>
        </div>
      </div>

      {/* Budget + Rating */}
      <div className="mt-4 flex items-center gap-4">
        <p className="text-[16px] text-black font-medium">
          Project Budget: <span className="text-red-500">{budget}</span>
        </p>

        <div className="flex items-center gap-1 text-[16px]">
          <Star size={18} className="text-yellow-500 fill-yellow-500" />
          <span>
            {rating}({reviews})
          </span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 mt-3 leading-relaxed">{description}</p>

      {/* Skills */}
      <div className="flex items-center mt-5 gap-4 lg:gap-[100px]">
        <ChevronLeft className="cursor-pointer" />
        {skills.map((skill, idx) => (
          <span
            key={idx}
            className="bg-gray-100 px-4 py-1 rounded-full text-sm w-full"
          >
            {skill}
          </span>
        ))}
        <ChevronRight className="cursor-pointer" />
      </div>

      {/* Hire Button */}
      <button className="w-full bg-red-500 text-white mt-6 py-3 rounded-lg font-medium">
        Hire Editor
      </button>
      
    </div>
  );
}
