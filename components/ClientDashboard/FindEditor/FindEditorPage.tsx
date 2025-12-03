"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiStarFullOutline } from "react-icons/ti";
import Pagination from "@/components/reusable/pagination";
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

const allEditors: Editor[] = [
  {
    id: 1,
    name: "Jerome Bell",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "Professional",
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
    experience: "Professional",
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
    experience: "Professional",
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
    experience: "Professional",
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
    experience: "Professional",
    country: "Pakistan",
    match: 75,
    image: "/images/Floyd.jpg",
  },
];

export default function FindEditorPage() {
  // Pagination setup
  const [page, setPage] = useState(1);
  const pageSize = 2; // how many cards per page

  const startIndex = (page - 1) * pageSize;
  const visibleEditors = allEditors.slice(startIndex, startIndex + pageSize);

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="containers mx-auto flex gap-8">

        {/* LEFT FILTER SIDEBAR */}
        <aside className="w-1/4 bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6 space-y-6">

          {/* Job Category */}
          <div>
            <h3 className="font-bold text-[20px] mb-3">Job Category</h3>

            <div className="space-y-4">
              {[
                ["Long-Form Video", "54"],
                ["Shorts/Reels/TikToks", "9+"],
                ["Photo", "36+"],
                ["Audio", "28+"],
              ].map(([label, count], i) => (
                <label key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span className="text-[16px]">{label}</span>
                  </div>
                  <span className="bg-red-100 text-[#FF4D4F] px-3 py-1 rounded-md">
                    {count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-bold text-[20px] mb-3">Platform</h3>

            <div className="space-y-4">
              {[
                ["YouTube", "372+"],
                ["TikTok", "36+"],
                ["Instagram", "36+"],
                ["X (Twitter)", "36+"],
                ["Facebook", "36+"],
                ["Snapchat", "36+"],
              ].map(([name, count], i) => (
                <label key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input type="checkbox"  />
                    <span className="text-[16px]">{name}</span>
                  </div>
                  <span className="bg-red-100 text-[#FF4D4F] px-3 py-1 rounded-md">
                    {count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div>
            <h3 className="font-bold text-[20px] mb-3">Budget</h3>

            <div className="flex justify-between text-sm text-gray-500">
              <span>$5</span>
              <span>$35</span>
            </div>

            <input type="range" min="5" max="35" className="w-full mt-2" />
          </div>

          {/* Project Duration */}
          <div>
            <h3 className="font-bold text-[20px] mb-3">Project Duration</h3>

            <div className="space-y-3">
              {[
                "Express 24H",
                "Up to 3 days",
                "Up to 7 days",
                "Anytime",
              ].map((label, i) => (
                <label key={i} className="flex items-center gap-2">
                  <input type="checkbox"  />
                  <span className="text-[16px]">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE: EDITOR LIST */}
        <div className="w-3/4 space-y-6">

          {visibleEditors.map((editor) => (
            <div
              key={editor.id}
              className="bg-white rounded-xl p-5 shadow-sm flex justify-between"
            >
              <div className="flex gap-4">
                <Image
                  src={editor.image}
                  alt={editor.name}
                  width={200}
                  height={160}
                  className="rounded-lg object-cover"
                />

                <div>
                  <h2 className="text-[22px] font-medium">{editor.name}</h2>

                  <p className="text-[15px] text-gray-700 flex items-center gap-1">
                    <TiStarFullOutline className="text-[#FAAD14]" />
                    {editor.rating} ({editor.reviews} Review)
                  </p>

                  <div className="flex gap-3 mt-3 text-sm text-gray-700">

                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      Link Building
                    </span>

                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">
                      {editor.experience}
                    </span>

                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                      {editor.country}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-4">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-full text-sm">
                      Hire Editor
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-500 rounded-full text-sm">
                      Message
                    </button>
                  </div>
                </div>
              </div>

             
            </div>
          ))}

          {/* PAGINATION */}
          <Pagination
            page={page}
            pageSize={pageSize}
            total={allEditors.length}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
}
