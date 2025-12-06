"use client";

import LocationIcon from "@/components/Icons/LocationIcon";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { CiUser } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import InboxIcon from "./../../Icons/InboxIcon";
import Pagination from "@/components/reusable/pagination";
import PageBanner from "@/components/reusable/Bgbanner";
import { HiH2 } from "react-icons/hi2";

interface Editor {
  id: number;
  name: string;
  title: string;
  rating: number;
  reviews: number;
  skills: number;
  experience: string;
  country: string;
  match: number;
  image: string;
}

const editors: Editor[] = [
  {
    id: 1,
    title: "I will do SEO backlinks with blogger outreach for high quality link building",
    name: "Marvin McKinney",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 84,
    image: "/images/Marvin1.jpg",
  },
  {
    id: 2,
    name: "Wade Warren",
    title: "I will do SEO backlinks with blogger outreach for high quality link building",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 75,
    image: "/images/Marvin2.jpg",
  },
  {
    id: 3,
    name: "Leslie Alexander",
    title: "I will do SEO backlinks with blogger outreach for high quality link building",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 27,
    image: "/images/Marvin3.jpg",
  },
  {
    id: 4,
    name: "Guy Hawkins",
    title: "I will do SEO backlinks with blogger outreach for high quality link building",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 75,
    image: "/images/Marvin4.jpg",
  },
  {
    id: 5,
    name: "Jerome Bell",
    title: "I will do SEO backlinks with blogger outreach for high quality link building",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 75,
    image: "/images/Marvin5.jpg",
  },
];

// How many editor cards per page?
const PAGE_SIZE = 4;

export default function QuickMatchResultPage() {
  const [range, setRange] = useState([5, 35]);
  const [page, setPage] = useState(1);

  // Later when filters apply → replace with filtered array
  const filteredData = editors;

  // Paginated result
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  return (
    <div className="min-h-screen bg-[#f6f6f6] py-10">
      <div>
        <PageBanner

          title="Quick Match Results"
          bgImage="/findEditor.jpg"
          desc="Discover the best matches tailored just for you — based on your preferences and goals"
          links={[
            { label: "Home", href: "/" },
            { label: "Quick Match Results" }
          ]}
        />
      </div>
      <div className="containers mx-auto flex flex-col lg:flex-row gap-8 py-10 lg:py-20 ">

        {/* ----- LEFT SIDEBAR FILTERS ----- */}
        <div className="w-full lg:w-1/4 hidden lg:block bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6 space-y-6">

          {/* Project Types */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 text-[#333]">
              Project Types
            </h3>

            <div className="space-y-4">
              {["YouTube Editing", "Marketing Video Editing", "Business Video Editing", "Music Video Editing"].map((label, i) => (
                <label key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-[16px] text-[#333]">{label}</span>
                  </div>
                  <span className="text-[14px] w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">
                    {i === 2 ? "555+" : "36+"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 text-[#333]">
              Skill Level
            </h3>
            <div className="space-y-4">
              {["Beginner", "Intermediate", "Expert"].map((label, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-[16px] text-[#333]">{label}</span>
                  <span className="text-[14px] ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">
                    {i === 0 ? "372+" : "36+"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div>
            <h3 className="font-bold text-[20px] mb-3">Project Budget:</h3>

            <div className="w-full flex flex-col items-center gap-3 mb-8">
              <div className="w-full flex justify-between px-2 text-gray-500 text-sm font-medium">
                <span>${range[0]}</span>
                <span>${range[1]}</span>
              </div>

              <Slider
                defaultValue={[5, 35]}
                max={100}
                min={0}
                step={1}
                value={range}
                onValueChange={setRange}
                className="w-full"
              />
            </div>
          </div>

          {/* Deadline */}
          <div>
            <h3 className="font-semibold mb-3">Deadline</h3>
            <div className="space-y-4">
              {["Express 24H", "Up to 3 days", "Up to 7 days", "Anytime"].map((label, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-[16px] text-[#333]">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="mt-4 w-full rounded-lg bg-[#ff4b4b] text-white p-2.5 text-[16px]">
            Find Another Match
          </button>
        </div>
        <div className="lg:hidden grid grid-cols-2  gap-4 mb-4">
          <select className="p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            <option>Job Category</option>
            <option>SEO</option>
            <option>Video Editing</option>
            <option>Web Development</option>
            {/* Add more options here */}
          </select>
          <select className="p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            <option>Platform</option>
            <option>Upwork</option>
            <option>Fiverr</option>
            <option>Freelancer</option>
            {/* Add more options here */}
          </select>
          <select className="p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            <option>Delivery Time</option>
            <option>3 Days</option>
            <option>5 Days</option>
            <option>7 Days</option>
            {/* Add more options here */}
          </select>
          <select className="p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            <option>Budget</option>
            <option>$10 - $50</option>
            <option>$50 - $100</option>
            <option>$100+</option>
            {/* Add more options here */}
          </select>
        </div>

        {/* ----- RIGHT SIDE EDITOR LIST ----- */}
        <div className="lg:w-3/4 w-full space-y-6">

          {paginatedData.map((editor) => (
            <div key={editor.id} className="bg-white rounded-xl p-5 shadow-sm">

              <div className="flex flex-col lg:flex-row gap-6">
                <Image
                  src={editor.image}
                  alt={editor.name}
                  width={251}
                  height={184}
                  className="object-cover rounded-lg  w-[251px]"
                />

                <div className="w-full">
                  <h3 className="text-[18px] font-semibold text-[#333] pb-4">
                    {editor.title}
                  </h3>

                  {/* Name + Match */}
                  <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                      <CiUser className="w-5 h-5" />
                      <h2 className="text-[16px] font-medium text-[#333]">{editor.name}</h2>
                    </div>

                    <span
                      className={`p-2 px-3.5 rounded-full font-normal ${editor.match >= 70
                        ? "bg-[#EEFAE9] text-[#52C41A]"
                        : editor.match <= 40
                          ? "bg-[#FEE9EA] text-[#F5222D]"
                          : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {editor.match}% Match
                    </span>
                  </div>

                  {/* Skills, Experience, Country, Rating */}
                  <div className="grid grid-cols-2 lg:grid-cols-2 md:grid-cols-4 xl:grid-cols-4 gap-2 mt-2 py-4 text-xs text-[#333]">
                    <span className="px-3 py-1 bg-[#F2F3F3] rounded-full text-center text-[14px]">
                      {editor.skills} Skill+
                    </span>
                    <span className="px-3 py-1 bg-[#F2F3F3] rounded-full flex items-center justify-center gap-2">
                      <InboxIcon /> {editor.experience}
                    </span>
                    <span className="px-3 py-1 bg-[#F2F3F3] rounded-full flex items-center justify-center gap-2">
                      <LocationIcon /> {editor.country}
                    </span>
                    <p className="text-[16px] flex items-center gap-3">
                      <TiStarFullOutline className="text-[#FAAD14]" />
                      {editor.rating} ({editor.reviews})
                    </p>
                  </div>
                  <div className="font-normal text-[14px] leading-150% text-[#333]">
                    Project Duration: 5 Days
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* ⭐ PAGINATION AT BOTTOM ⭐ */}
          <Pagination
            page={page}
            pageSize={PAGE_SIZE}
            total={filteredData.length}
            onPageChange={(p) => setPage(p)}
          />
        </div>

      </div>
    </div>
  );
}
