/** @format */

"use client";

import Image, { StaticImageData } from "next/image";
import { Star, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useSearchParams } from "next/navigation";

export const editors = [
  {
    id: "1",
    name: "Jane Cooper",
    country: "United States",
    avatar: "/images/jonekeper.png",
    budget: "562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],

    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed", "5 Revisions included", "Fast response / Communication", "Timezone overlap / Language", "Tools (Adobe Premiere Pro)"],
    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: "2",
    name: "Robert Fox",
    country: "United States",
    avatar: "/images/robatfox.png",
    budget: "562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed", "5 Revisions included", "Fast response / Communication", "Timezone overlap / Language", "Tools (Adobe Premiere Pro)"],

    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: "3",
    name: "Bessie Cooper",
    country: "Algeria",
    avatar: "/images/basse.png",
    budget: "562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed", "5 Revisions included", "Fast response / Communication", "Timezone overlap / Language", "Tools (Adobe Premiere Pro)"],

    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: "4",
    name: "Jane Cooper",
    country: "United States",
    avatar: "/images/coper.png",
    budget: "562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],

    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed", "5 Revisions included", "Fast response / Communication", "Timezone overlap / Language", "Tools (Adobe Premiere Pro)"],
    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: "5",
    name: "Robert Fox",
    country: "United States",
    avatar: "/images/shavanagh.png",
    budget: "562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    skills: [
      "YouTube Long-form",
      "Within 3 Days",
      "127 Jobs Completed",
      "5 Revisions included",
      "Fast response / Communication",
      "Timezone overlap / Language",
      "Tools (Adobe Premiere Pro)"
    ],

    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
  {
    id: "6",
    name: "Bessie Cooper",
    country: "Algeria",
    avatar: "/images/bel.png",
    budget: "562",
    rating: 4.9,
    reviews: 338,
    // skills: ["Final Cut Pro", "Sony Vegas Pro", "Filmora"],
    skills: ["YouTube Long-form", "Within 3 Days", "127 Jobs Completed", "5 Revisions included", "Fast response / Communication", "Timezone overlap / Language", "Tools (Adobe Premiere Pro)"],

    description:
      "In this digital age, video is a powerful tool that can engage with millions of people around the world,and convey stories in a way that words can'L",
  },
];

export type EditorCardProps = {
  id: string;
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
  id,
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
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

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

  const visibleSkills = skills;

  return (
    <div className='w-full grid bg-white p-6 rounded-xl shadow-sm border '>
      {/* Header */}
      <div className='flex items-center gap-4'>
        <Link
          href='/editor-profile/1'
        >
          <Image
            src={avatar}
            alt={name}
            width={70}
            height={70}
            className='rounded-full object-cover '
          />
        </Link>
        <div>
          <Link
            href='/editor-profile/1'
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
        <p className='text-[16px] text-[#777980]  font-medium' title="The minimum job price set by the editor. The final cost may vary based on the amount of work.">
          Starting Price : <span className=''>${Number(budget).toFixed(2)}</span>
        </p>
        <div className='flex items-center gap-1 text-[16px] text-[#777980]'>
          <Star size={18} className='text-yellow-500 fill-yellow-500' />
          <span>
            {rating}({reviews} Reviews)
          </span>
        </div>
      </div>
      {/* Description */}
      <p className='text-[#777980] text-[14px] font-normal mt-3 '>
        {description}
      </p>
      {/* Skills */}
      <div className='w-full py-6 overflow-hidden'>
        <Carousel opts={{ loop: true }}>
          <CarouselContent className="-ml-2">
            {visibleSkills.map((skill, idx) => (
              <CarouselItem key={idx} className="basis-auto pl-2">
                <span
                  key={idx}
                  className='select-none whitespace-nowrap bg-gray-100 px-4 py-1 rounded-full text-[12px] md:text-sm text-center'>
                  {skill}
                </span>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white disabled:bg-gray-400 left-0 z-99 cursor-pointer disabled:cursor-not-allowed" />
          <CarouselNext className="bg-white right-0 z-10 cursor-pointer disabled:cursor-not-allowed" />
        </Carousel>
      </div>

      {/* Hire Button */}
      <div className='flex w-full gap-4'>
        <Link
          href={`/client/hire-vedio-editor?redirect=${redirect ? redirect + "_" : ""}findeditors`}
          className='cursor-pointer w-full'>
          <div className=' text-center bg-red-500 cursor-pointer w-full text-white  p-3 rounded-lg font-medium hover:bg-red-600 duration-300 '>
            Hire Editor
          </div>
        </Link>
        <Link href={`/client/message/${id}?redirect=${redirect ? redirect + "_" : ""}findeditors`} className='cursor-pointer w-full'>
          <div className=' text-center bg-[#FFEDED] cursor-pointer w-full text-[#FF4D4F]  p-3 rounded-lg font-medium hover:bg-red-100 duration-300 '>
            Message
          </div>
        </Link>
      </div>
    </div>
  );
}
