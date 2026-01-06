"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSitemap } from "react-icons/fa6";
import { TiStarFullOutline } from "react-icons/ti";
import { X } from "lucide-react";
import FilteringCategory from "./FilteringCategory";

interface Editor {
  id: number;
  name: string;
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
    name: "Jerome Bell",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 84,
    image: "/images/Jerome.jpg",
  },
  {
    id: 2,
    name: "Courtney Henry",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 75,
    image: "/images/Courtney.jpg",
  },
  {
    id: 3,
    name: "Annette Black",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 27,
    image: "/images/Annette.jpg",
  },
  {
    id: 4,
    name: "Esther Howard",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 75,
    image: "/images/Esther.jpg",
  },
  {
    id: 5,
    name: "Floyd Miles",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 75,
    image: "/images/Floyd.jpg",
  },
];

export default function FindEditorsPage() {
  const [showFilters, setShowFilters] = useState(false);

  // ✅ Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "auto";
  }, [showFilters]);
  

  return (
    <div className="min-h-screen bg-[#f6f6f6] py-10">
      <div className="containers mx-auto">

        {/* ✅ MOBILE FILTER BUTTON */}
        <div className="lg:hidden flex justify-end mb-4">
          <button
            onClick={() => setShowFilters(true)}
            className="border px-4 py-2 rounded-lg bg-white text-[#ff4b4b] flex items-center gap-2 font-medium"
          >
            <FaSitemap />
            Filters
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">

          {/* ✅ DESKTOP FILTER SIDEBAR */}
          <div className="hidden lg:block w-full lg:w-1/4">
            <FilteringCategory />
          </div>

          {/* ✅ MOBILE DRAWER FILTER */}
         {showFilters && (
  <div className="fixed top-[70px] left-0 right-0 bottom-0 z-[9999] lg:hidden flex">
    
    {/* Overlay */}
    <div
      className="absolute inset-0 bg-black/40"
      onClick={() => setShowFilters(false)}
    />

    {/* Drawer */}
    <div className="relative w-[85%] max-w-[340px] h-full bg-white shadow-xl animate-slideInLeft">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b">
        <h3 className="text-[18px] font-semibold text-[#222]">Filters</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="p-2 rounded-md hover:bg-gray-100 transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Sidebar content */}
      <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
        <FilteringCategory />
      </div>
    </div>
  </div>
)}


          {/* ✅ RIGHT SIDE CONTENT */}
          <div className="lg:w-3/4 w-full space-y-6">
            {editors.map((editor) => (
              <div
                key={editor.id}
                className="bg-white rounded-xl p-5 shadow-sm gap-6"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex gap-4">
                    <Image
                      src={editor.image}
                      alt={editor.name}
                      width={251}
                      height={184}
                      className="object-cover rounded-lg w-full"
                    />
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between">
                      <div>
                        <h2 className="text-[20px] md:text-[24px] font-medium text-[#333] pb-2.5">
                          {editor.name}
                        </h2>
                        <p className="text-[16px] font-normal text-[#333] flex items-center gap-1">
                          <TiStarFullOutline className="text-[#FAAD14]" />{" "}
                          {editor.rating} ({editor.reviews} Review)
                        </p>
                      </div>

                      <div>
                        <span
                          className={`p-2 lg:px-3.5 lg:text-[12px] text-[10px] py-1.5 rounded-full font-semibold
                          ${
                            editor.match >= 70
                              ? "bg-[#EEFAE9] text-[#52C41A]"
                              : editor.match <= 40
                              ? "bg-[#FEE9EA] text-[#F5222D]"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {editor.match}% Match
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2 text-xs text-gray-600 py-4 flex-wrap">
                      <span className="px-3 py-1 text-[14px] bg-[#F2F3F3] text-[#333] rounded-full">
                        {editor.skills} Skill+
                      </span>
                      <span className="px-3 py-1 bg-[#F2F3F3] rounded-full flex items-center gap-1">
                        ⏳ {editor.experience}
                      </span>
                      <span className="px-3 py-1 bg-[#F2F3F3] rounded-full flex items-center gap-1">
                        🌍 {editor.country}
                      </span>
                    </div>

                    <div className="flex  gap-3 mt-3">
                    <div>
                        <Link href="/client/hire-vedio-editor" className="w-full">
                        <button className="px-4 py-2 bg-[#ff4b4b] text-white text-xs rounded-full  ">
                          Hire Editor
                        </button>
                      </Link>
                    </div>

                      <button className="px-4 py-2 bg-[#F2F3F3] text-gray-700 text-xs rounded-full ">
                        Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
