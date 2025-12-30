"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { stories } from "@/app/(main)/success-story/data";
import PageBanner from "@/components/reusable/Bgbanner";

export default function SuccessStroyPage() {
  const [storyType, setStoryType] = useState("All");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // FILTER LOGIC

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      return (
        (storyType === "All" || story.type === storyType) &&
        (category === "All" || story.category === category) &&
        (country === "All" || story.country === country)
      );
    });
  }, [storyType, category, country]);



  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);

  const pageStories = filteredStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="">

      <div>
        <PageBanner
          title="Success Stories"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Home", href: "/" },
            { label: "Success Stories" }
          ]}
        />

      </div>
      <div className="containers mx-auto py-16">
        {/* FILTERS */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center bg-white p-5 rounded-xl">
          <p className="text-gray-700 font-medium ">Filter by:</p>
          <div className="flex flex-col gap-4 w-full lg:w-6/8 lg:grid md:grid-cols-3 lg:gap-6 text-[16px]">
            {/* Story Type */}
            <div className="flex items-center justify-between gap-3 lg:flex-row ">
              <p className="text-gray-700 font-medium whitespace-nowrap">Story Type</p>
              <FilterSelect
                value={storyType}
                setValue={setStoryType}
                options={["All", "Editor Success", "Client Success", "Income Growth", "Career Transformation", "Platform Experience"]}
              />
            </div>

            {/* Category */}
            <div className="flex items-center justify-between gap-3 ">
              <p className="text-gray-700 font-medium ">Category</p>
              <FilterSelect
                value={category}
                setValue={setCategory}

                options={["All", " YouTube Long-form", "Shorts/Reels/TikTok", "Thumbnails", "Ads/UGC", "Podcasts", "Weddings/Events", "Color & Audio", "Captions/Subtitles"]}
              />
            </div>

            {/* Country */}
            <div className="flex items-center justify-between gap-3 ">
              <p className="text-gray-700 font-medium ">Country</p>
              All
              <FilterSelect
                value={country}
                setValue={setCountry}
                options={["All", "USA", "Canada", "Mexico", "United Kingdom", "Australia", "Germany", "France", "India", "Philippines", "Nigeria", "Brazil", "South Africa", "Indonesia", "Pakistan", "Bangladesh"]}
              />
            </div>
          </div>
        </div>

        {/* STORY CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {pageStories.map((story) => (
            <div
              key={story.id}
              className="bg-[#FFFFFF] shadow-2xl rounded-2xl p-6"
            >
              <Image
                src={story.image}
                alt={story.name}
                width={500}
                height={500}
                className="rounded-xl w-full h-[209px] object-cover "
              />

              <div className="flex justify-between pt-4">
                <h3 className="text-[#333] font-poppins text-[18px] font-medium leading-[120%]">{story.name}</h3>
                <p className="text-[#777980] text-right font-poppins text-[12px] font-normal leading-[150%]">{story.role}</p>
              </div>

              <p className="text-[#4A4C56] font-poppins text-[14px] font-normal leading-[150%] py-4">{story.description}</p>

              <Link href={`/success-story/${story.id}`}>
                <button className="flex items-center gap-1 text-[#FF4D4F] font-poppins text-[14px] font-medium leading-[150%] cursor-pointer px-2 py-0.5 rounded-sm hover:bg-[#FF4D4F] hover:text-white duration-300 leading-0">
                  Read Story <ArrowRight size={16} />
                </button>
              </Link>

            </div>
          ))}
        </div>

        {/* PAGINATION */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

// REUSABLE SELECT COMPONENT
function FilterSelect({
  value,
  setValue,
  options,
}: {
  value: string;
  setValue: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative w-[60%] lg:w-full">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="appearance-none bg-white px-4 py-2 border rounded-xl pr-10 w-full"
      >
        {options.map((op) => (
          <option key={op}>{op}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}


// PAGINATION COMPONENT

function Pagination({
  currentPage,
  totalPages,
  setPage,
}: {
  currentPage: number;
  totalPages: number;
  setPage: (n: number) => void;
}) {
  return (
    <div className="flex justify-center items-center gap-4 mt-12">

      {/* Prev */}
      <button
        onClick={() => currentPage > 1 && setPage(currentPage - 1)}
        className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-gray-100"
      >
        <ChevronLeft className="text-gray-700" />
      </button>

      <div className="flex gap-4">
        {/* Pages 1,2,3 */}
        {[1, 2, 3].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n)}
            className={
              currentPage === n
                ? "w-12 h-12 rounded-full bg-red-500 text-white font-semibold"
                : "w-12 h-12 rounded-full bg-red-100 text-red-500 font-semibold"
            }
          >
            {n}
          </button>
        ))}

        {/* ... */}
        <button className="w-12 h-12 rounded-full bg-red-50 text-red-400">
          …
        </button>

        {/* Last Page */}
        <button
          onClick={() => setPage(totalPages)}
          className={
            currentPage === totalPages
              ? "w-12 h-12 rounded-full bg-red-500 text-white font-semibold"
              : "w-12 h-12 rounded-full bg-red-100 text-red-500 font-semibold"
          }
        >
          {totalPages}
        </button>
      </div>

      {/* Next */}
      <button
        onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
        className="w-12 h-12 rounded-full border flex items-center justify-center hover:bg-gray-100"
      >
        <ChevronRight className="text-gray-700" />
      </button>
    </div>
  );
}
