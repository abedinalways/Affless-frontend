"use client";

import LocationIcon from "@/components/Icons/LocationIcon";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { CiUser } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";
import InboxIcon from "./../../Icons/InboxIcon";
import Pagination from "@/components/reusable/pagination";
import PageBanner from "@/components/reusable/Bgbanner";

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
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
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
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 84,
    image: "/images/Marvin2.jpg",
  },
  {
    id: 3,
    name: "Leslie Alexander",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 84,
    image: "/images/Marvin3.jpg",
  },
  {
    id: 4,
    name: "Guy Hawkins",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 84,
    image: "/images/Marvin4.jpg",
  },
  {
    id: 5,
    name: "Jerome Bell",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    rating: 4.9,
    reviews: 338,
    skills: 3,
    experience: "2 Year+",
    country: "Pakistan",
    match: 84,
    image: "/images/Marvin5.jpg",
  },
];

// ✅ sidebar data (API theke o ashte parbe)
const jobCategories = [
  { label: "Long-Form Video", count: 54 },
  { label: "Shorts/Reels/TikToks", count: 9 },
  { label: "Thumbnails", count: 96 },
  { label: "Ads / UGC", count: 35 },
  { label: "Podcasts", count: 26 },
  { label: "Weddings / Events", count: 45 },
  { label: "Color & Audio", count: 32 },
  { label: "Captions / Subtitles", count: 53 },
];

const platforms = [
  { label: "YouTube", count: 72 },
  { label: "TikTok", count: 36 },
  { label: "Instagram", count: 36 },
  { label: "X (Twitter)", count: 36 },
  { label: "Facebook", count: 36 },
  { label: "Twitch", count: 36 },
  { label: "Podcast Platforms", count: 36 },
];

const PAGE_SIZE = 4;

export default function QuickMatchResultPage() {
  const [page, setPage] = useState(1);

  // ✅ filter states (API payload ready)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [price, setPrice] = useState({ min: "", max: "" });
  const [delivery, setDelivery] = useState({ min: "", max: "" });

  // ✅ checkbox toggle helper
  const toggle = (value: string, list: string[], setList: any) => {
    setList((prev: string[]) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // ✅ Later API filter logic
  const filteredData = editors;

  // ✅ pagination logic
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  // ✅ API payload ready
  const payload = {
    categories: selectedCategories,
    platforms: selectedPlatforms,
    price,
    delivery,
  };

  // console.log("Payload:", payload);

  return (
    <div className="min-h-screen bg-[#f6f6f6] py-10">
      {/* Banner */}
      <PageBanner
        title="Quick Match Results"
        bgImage="/findEditor.jpg"
        desc="Discover the best matches tailored just for you — based on your preferences and goals"
        links={[{ label: "Home", href: "/" }, { label: "Quick Match Results" }]}
      />

      <div className="containers mx-auto flex flex-col lg:flex-row gap-8 py-10 lg:py-20">
        {/* ✅ LEFT FILTER SIDEBAR */}
        <div className="w-full lg:w-1/4 hidden lg:block bg-white p-6 rounded-xl shadow-sm h-fit sticky top-6 space-y-8">
          {/* Job Category */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 text-[#333]">
              Job Category
            </h3>

            <div className="space-y-4">
              {jobCategories.map((item) => (
                <label
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(item.label)}
                      onChange={() =>
                        toggle(
                          item.label,
                          selectedCategories,
                          setSelectedCategories
                        )
                      }
                    />
                    <span className="text-[16px] text-[#333]">{item.label}</span>
                  </div>

                  <span className="text-[14px] w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">
                    {item.count}+
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 text-[#333]">
              Platform
            </h3>

            <div className="space-y-4">
              {platforms.map((item) => (
                <label
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedPlatforms.includes(item.label)}
                      onChange={() =>
                        toggle(item.label, selectedPlatforms, setSelectedPlatforms)
                      }
                    />
                    <span className="text-[16px] text-[#333]">{item.label}</span>
                  </div>

                  <span className="text-[14px] w-[46px] h-[31px] text-center p-[5px] rounded-md bg-red-100 text-[#FF4D4F]">
                    {item.count}+
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 text-[#333]">
              Price
            </h3>

            <label className="flex items-center gap-2 mb-4">
              <input type="checkbox" />
              <span className="text-[16px] text-[#333]">Any Price</span>
            </label>

            <div className="flex gap-3">
              <input
                value={price.min}
                onChange={(e) => setPrice((p) => ({ ...p, min: e.target.value }))}
                placeholder="Min"
                className="w-full border rounded-lg px-3 py-2 outline-none"
              />
              <input
                value={price.max}
                onChange={(e) => setPrice((p) => ({ ...p, max: e.target.value }))}
                placeholder="Max"
                className="w-full border rounded-lg px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* Delivery time */}
          <div>
            <h3 className="font-medium text-[18px] md:text-[24px] mb-3 text-[#333]">
              Delivery time
            </h3>

            <label className="flex items-center gap-2 mb-4">
              <input type="checkbox" />
              <span className="text-[16px] text-[#333]">Any Delivery Time</span>
            </label>

            <div className="flex gap-3">
              <input
                value={delivery.min}
                onChange={(e) =>
                  setDelivery((p) => ({ ...p, min: e.target.value }))
                }
                placeholder="Min"
                className="w-full border rounded-lg px-3 py-2 outline-none"
              />
              <input
                value={delivery.max}
                onChange={(e) =>
                  setDelivery((p) => ({ ...p, max: e.target.value }))
                }
                placeholder="Max"
                className="w-full border rounded-lg px-3 py-2 outline-none"
              />
            </div>
          </div>

          {/* Button */}
          <button className="mt-4 w-full rounded-lg bg-[#ff4b4b] text-white p-2.5 text-[16px]">
            Find Another Match
          </button>
        </div>

        {/* ✅ RIGHT LIST */}
        <div className="lg:w-3/4 w-full space-y-6">
          {paginatedData.map((editor) => (
            <div key={editor.id} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex flex-col lg:flex-row gap-6">
                <Image
                  src={editor.image}
                  alt={editor.name}
                  width={251}
                  height={184}
                  className="object-cover rounded-lg w-[251px]"
                />

                <div className="w-full">
                  <h3 className="text-[18px] font-semibold text-[#333] pb-4">
                    {editor.title}
                  </h3>

                  <div className="flex justify-between">
                    <div className="flex gap-1 items-center">
                      <CiUser className="w-5 h-5" />
                      <h2 className="text-[16px] font-medium text-[#333]">
                        {editor.name}
                      </h2>
                    </div>

                    <span className="p-2 px-3.5 rounded-full font-normal bg-[#EEFAE9] text-[#52C41A]">
                      {editor.match}% Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2 py-4 text-xs text-[#333]">
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

          {/* Pagination */}
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
