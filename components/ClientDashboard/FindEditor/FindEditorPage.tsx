"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiStarFullOutline } from "react-icons/ti";
import Pagination from "@/components/reusable/pagination";
import { Slider } from "@/components/ui/slider";
import PageBanner from "@/components/reusable/Bgbanner";
import { FaSitemap } from "react-icons/fa";
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
  const [mobileMenu, setMobileMenu] = useState(false);
  const pageSize = 5; // how many cards per page

  const startIndex = (page - 1) * pageSize;
  const visibleEditors = allEditors.slice(startIndex, startIndex + pageSize);


  const [range, setRange] = React.useState([5, 35]);
  return (
    <div className="min-h-screen  py-10">
      <div>
        <PageBanner
          title="Find Editors"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Home", href: "/" },
            { label: "Find Editors" }
          ]}
        />
      </div>
      <div className="containers mx-auto flex flex-col lg:flex-row gap-8 lg:pt-20">
        {/* LEFT FILTER SIDEBAR */}
        <aside className="w-[330px] xl:w-1/4 hidden lg:block  bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6 space-y-6">
          {/* Job Category */}
          <div>
            <h3 className="font-bold text-[20px] mb-3">Job Category</h3>
            <div className="space-y-4">
              {[
                ["YouTube Long-form", "54"],
                ["Shorts/Reels/TikToks", "9+"],
                ["Thumbnails", "36+"],
                ["Ads/UGC", "28+"],
                ["Podcasts", "28+"],
                ["Weddings/Events", "28+"],
                ["Captions/Subtitles", "28+"],
                ["Color & Audio", "28+"],
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
                    <input type="checkbox" />
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
                  <input type="checkbox" />
                  <span className="text-[16px]">{label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        <div className='grid items-center justify-end lg:hidden'>
          <button type="button" onClick={() => setMobileMenu(true)} className='flex items-center gap-2 border px-5 py-1 rounded-md text-[#ff4d4f] border-[#ff4d4f] font-medium cursor-pointer hover:bg-[#ff4d4f] hover:text-white duration-300'>
            <FaSitemap />
            <span>Filters</span>
          </button>
        </div>

        {/* RIGHT SIDE: EDITOR LIST */}
        <div className="w-full lg:w-3/4 space-y-6 ">

          {visibleEditors.map((editor) => (
            <div
              key={editor.id}
              className="bg-white rounded-xl p-5  shadow-sm flex w-full justify-between"
            >
              <div className="flex flex-col lg:flex-row w-full justify-between gap-4 md:gap-5 lg:gap-6">
                <Image
                  src={editor.image}
                  alt={editor.name}
                  width={500}
                  height={160}
                  className="rounded-lg object-cover w-full lg:w-[200px] "
                />

                <div className="flex flex-col w-full">
                  <h2 className="text-[22px] font-medium">{editor.name}</h2>

                  <p className="text-[15px] text-gray-700 flex items-center gap-1">
                    <TiStarFullOutline className="text-[#FAAD14]" />
                    {editor.rating} ({editor.reviews} Review)
                  </p>
                  <p className="text-[12px] font-normal leading-150% text-[#777980]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy</p>
                  {/* <div className="grid grid-cols-3 lg:grid-cols-2 2xl:grid-cols-4 gap-3 mt-3 text-sm text-gray-700">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full flex justify-center">
                      Link Building
                    </span>
                    <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full flex justify-center">
                      {editor.experience}
                    </span>
                    <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex justify-center">
                      {editor.country}
                    </span>
                  </div> */}

                  <div className="flex gap-3 mt-4">
                    <Link href="/client/hire-vedio-editor" className="px-4 py-2 opacity-80 hover:opacity-100 duration-300 bg-red-500 text-white rounded-full text-sm">
                      Hire Editor
                    </Link>
                    <Link href="/client/message" className="px-4 py-2 bg-red-100 text-red-500 rounded-full text-sm opacity-80 hover:opacity-100 duration-300">
                      Message
                    </Link>
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
