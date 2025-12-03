"use client";

import Image from "next/image";
import Link from "next/link";
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
  return (
    <div className="min-h-screen bg-[#f6f6f6] py-10 ">
      <div className="containers mx-auto flex gap-8">

        {/* LEFT FILTER SIDEBAR */}
        <div className="w-1/4 bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6 space-y-6">

          {/* Project Types */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 leading-150% text-[#333]">Project Types</h3>

      <div className="space-y-4">
              <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333] leading-150%"> YouTube Editing</span>
              </div>
               <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F] ">32+</span>
            </label>

            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333] leading-150%">Marketing Video Editing</span>
              </div>
               <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F] ">36+</span>
            </label>

            <label className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-[16px] font-normal text-[#333] leading-150%">Business Video Editing</span>
              </div>
               <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F] ">555+</span>
            </label>

            <label className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
               <span className="text-[16px] font-normal text-[#333] leading-150%">Music Video Editing</span>
              </div>
             <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F] ">36+</span>
            </label>
      </div>
          </div>

          {/* Skill Level */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 leading-150% text-[#333]">Skill Level</h3>

     <div className="space-y-4">
               <label className="flex items-center gap-2 ">
              <input type="checkbox" />
              <span className="text-[16px] font-normal text-[#333] leading-150%">Beginner</span>
              <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F] ">
                372+
              </span>
            </label>

            <label className="flex items-center gap-2 ">
              <input type="checkbox" />
              <span className="text-[16px] font-normal text-[#333] leading-150%">Intermediate</span>
              <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F] ">
                36+
              </span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-[16px] font-normal text-[#333] leading-150%">Expert</span>
               <span className="text-[14px] font-normal ml-auto w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F] ">
                36+
              </span>
            </label>
          </div>
     </div>

          {/* Budget */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 leading-150% text-[#333]">Project Budget:</h3>

            <div className="flex justify-between text-sm">
              <span>$5</span>
              <span>$35</span>
            </div>

            <input type="range" min="5" max="35" className="w-full mt-2 " />
          </div>

          {/* Deadline */}
          <div>
            <h3 className="font-semibold mb-3">Deadline</h3>

           <div className="space-y-4">
             <label className="flex items-center gap-2 ">
              <input type="checkbox" />
             <span className="text-[16px] font-normal text-[#333] leading-150%">Express 24H</span>
            </label>

            <label className="flex items-center gap-2 ">
              <input type="checkbox" />
              <span className="text-[16px] font-normal text-[#333] leading-150%">Up to 3 days</span>
            </label>

            <label className="flex items-center gap-2 ">
              <input type="checkbox" />
              <span className="text-[16px] font-normal text-[#333] leading-150%">Up to 7 days</span>
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-[16px] font-normal text-[#333] leading-150%">Anytime</span>
            </label>
           </div>
          </div>

          {/* Button */}
          <button className="mt-4 w-full rounded-lg bg-[#ff4b4b] text-white p-2.5 text-[16px] font-normal">
            Find Another Match
          </button>
        </div>

        {/* RIGHT SIDE: EDITOR LIST */}
        <div className="w-3/4 space-y-6">
          {editors.map((editor) => (
            <div
              key={editor.id}
              className="bg-white rounded-xl p-5 shadow-sm flex justify-between "
            >
              {/* Left: Image + Basic Info */}
              <div className="flex gap-4">
                <div className=" overflow-hidden">
                  <Image
                    src={editor.image}
                    alt={editor.name}
                    width={251}
                    height={184}
                    className="object-cover rounded-lg  "
                  />
                </div>

                <div>
                  <h2 className="text-[20px] md:text-[24px] font-medium leading-150% text-[#333] pb-2.5">{editor.name}</h2>

                  {/* Rating */}
                  <p className="text-[16px] font-normal text-[#333] flex items-center gap-1">
                    <TiStarFullOutline className="text-[#FAAD14] " /> {editor.rating} ({editor.reviews} Review)
                  </p>

                  <div className="flex gap-3 mt-2 text-xs text-gray-600 py-4">

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
                   <div className="flex gap-3 mt-3 ">
                  <Link href="/client/hire-vedio-editor">
                  <button className="px-4 py-2 bg-[#ff4b4b] text-white text-xs rounded-full">
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
              <div className="text-right">

                {/* Match Score */}
                <span
                  className={`px-3.5 text-[14px] py-1.5  rounded-full font-semibold
                    ${
                      editor.match >= 70
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
          ))}
        </div>

      </div>
    </div>
  );
}
