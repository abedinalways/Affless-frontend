"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { stories } from "@/app/(main)/success-story/data";
import PageBanner from "@/components/reusable/Bgbanner";
import Pagination from "@/components/reusable/pagination";

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

  const pageStories = filteredStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div>
      <PageBanner
        title="Success Stories"
        bgImage="/findEditor.jpg"
        links={[{ label: "Home", href: "/" }, { label: "Success Stories" }]}
      />

      <div className="containers mx-auto py-16">
        {/* FILTERS */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center bg-white p-5 rounded-xl">
          <p className="text-gray-700 font-medium">Filter by:</p>

          <div className="flex flex-col gap-4 w-full lg:grid md:grid-cols-3 lg:gap-6 text-[16px]">
            {/* Story Type */}
            <div className="flex items-center justify-between gap-3">
              <p className="text-gray-700 font-medium whitespace-nowrap">
                Story Type
              </p>
              <FilterSelect
                value={storyType}
                setValue={setStoryType}
                options={[
                  "All",
                  "Editor Success",
                  "Client Success",
                  "Income Growth",
                  "Career Transformation",
                  "Platform Experience",
                ]}
              />
            </div>

            {/* Category */}
            <div className="flex items-center justify-between gap-3">
              <p className="text-gray-700 font-medium">Category</p>
              <FilterSelect
                value={category}
                setValue={setCategory}
                options={[
                  "All",
                  " YouTube Long-form",
                  "Shorts/Reels/TikTok",
                  "Thumbnails",
                  "Ads/UGC",
                  "Podcasts",
                  "Weddings/Events",
                  "Color & Audio",
                  "Captions/Subtitles",
                ]}
              />
            </div>

            {/* Country */}
            <div className="flex items-center justify-between gap-3">
              <p className="text-gray-700 font-medium">Country</p>
              <FilterSelect
                value={country}
                setValue={setCountry}
                options={[
                  "All",
                  "USA",
                  "Canada",
                  "Mexico",
                  "United Kingdom",
                  "Australia",
                  "Germany",
                  "France",
                  "India",
                  "Philippines",
                  "Nigeria",
                  "Brazil",
                  "South Africa",
                  "Indonesia",
                  "Pakistan",
                  "Bangladesh",
                ]}
              />
            </div>
          </div>
        </div>

        {/* STORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
          {pageStories.map((story) => (
            <div key={story.id} className="bg-white shadow-2xl rounded-2xl p-6">
              <Image
                src={story.image}
                alt={story.name}
                width={500}
                height={500}
                className="rounded-xl w-full h-[209px] object-cover"
              />

              <div className="flex justify-between pt-4">
                <h3 className="text-[#333] text-[18px] font-medium">
                  {story.name}
                </h3>
                <p className="text-[#777980] text-[12px] text-right">
                  {story.role}
                </p>
              </div>

              <p className="text-[#4A4C56] text-[14px] py-4">
                {story.description}
              </p>

              <Link href={`/success-story/${story.id}`}>
                <button className="flex items-center gap-1 text-[#FF4D4F] text-[14px] font-medium hover:bg-[#FF4D4F] hover:text-white  py-1 rounded-sm duration-300 cursor-pointer">
                  Read Story <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* ✅ NEW PAGINATION */}
        <Pagination
          page={currentPage}
          pageSize={ITEMS_PER_PAGE}
          total={filteredStories.length}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

// FILTER SELECT COMPONENT
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
