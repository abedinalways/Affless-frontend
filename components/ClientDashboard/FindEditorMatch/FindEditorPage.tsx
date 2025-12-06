"use client";

import { Slider } from "@/components/ui/slider";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

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
  const [range, setRange] = React.useState([5, 35]);
  return (
    <div className="min-h-screen bg-[#f6f6f6] py-10">
      <div className="containers mx-auto flex flex-col lg:flex-row gap-8">

        {/* LEFT FILTER SIDEBAR */}
        <div className="w-full lg:w-1/4 hidden lg:block bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6 space-y-6">
          {/* Project Types */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 text-[#333]">Project Types</h3>
            <div className="space-y-4">
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-[16px] font-normal text-[#333]"> YouTube Editing</span>
                </div>
                <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">32+</span>
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-[16px] font-normal text-[#333]">Marketing Video Editing</span>
                </div>
                <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">36+</span>
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-[16px] font-normal text-[#333]">Business Video Editing</span>
                </div>
                <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">555+</span>
              </label>
              <label className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-[16px] font-normal text-[#333]">Music Video Editing</span>
                </div>
                <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">36+</span>
              </label>
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 text-[#333]">Skill Level</h3>
            <div className="space-y-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333]">Beginner</span>
                <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">372+</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333]">Intermediate</span>
                <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">36+</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333]">Expert</span>
                <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">36+</span>
              </label>
            </div>
          </div>

          {/* Budget */}
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
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333]">Express 24H</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333]">Up to 3 days</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333]">Up to 7 days</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333]">Anytime</span>
              </label>
            </div>
          </div>

          {/* Button */}
          <button className="mt-4 w-full rounded-lg bg-[#ff4b4b] text-white p-2.5 text-[16px] font-normal">
            Find Another Match
          </button>
        </div>


        {/* RIGHT SIDE: EDITOR LIST */}
        <div className="lg:w-3/4 w-full space-y-6 ">
          {editors.map((editor) => (
            <div key={editor.id} className="bg-white rounded-xl p-5 shadow-sm  gap-6">
              {/* Left: Image + Basic Info */}
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

                <div className=" w-full">
               
                   <div className="flex justify-between">
                    <div>
                       <h2 className="text-[20px] md:text-[24px] font-medium text-[#333] pb-2.5">{editor.name}</h2>
                  <p className="text-[16px] font-normal text-[#333] flex items-center gap-1">
                    <TiStarFullOutline className="text-[#FAAD14]" /> {editor.rating} ({editor.reviews} Review)
                  </p>
                    </div>
                    <div>
                         <div className=" ">
                <span
                  className={`p-2 lg:px-3.5 lg:text-[12px] text-[10px] py-1.5 rounded-full font-semibold
                    ${editor.match >= 70
                        ? "bg-[#EEFAE9] text-[#52C41A]"
                        : editor.match <= 40
                        ? "bg-[#FEE9EA] text-[#F5222D]"
                        : "bg-yellow-100 text-yellow-600"
                    }
                  `}
                >
                  {editor.match}% Match
                </span>
              </div>
                    </div>
                   </div>

                  <div className="flex gap-2 mt-2 text-xs text-gray-600 py-4">
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

                  <div className="flex flex-col md:flex-row gap-3 mt-3">
                    <Link href="/client/hire-vedio-editor">
                      <button className="px-4 py-2 bg-[#ff4b4b] text-white text-xs rounded-full w-full">
                        Hire Editor
                      </button>
                    </Link>
                    <button className="px-4 py-2 bg-[#F2F3F3] text-gray-700 text-xs rounded-full">
                      Message
                    </button>
                  </div>
                 
                
                </div>
              </div>

              {/* Right Section */}
             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
