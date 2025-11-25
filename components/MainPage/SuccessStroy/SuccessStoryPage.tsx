"use client";

import Image from "next/image";
import { useState, useMemo } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// ----------------------------
// STORY JSON DATA
// ----------------------------
const stories = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Video Editor",
    type: "Success",
    category: "Editing",
    country: "USA",
    image: "/story1.jpg",
    description: "From zero clients to full-time editor in 6 months.",
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Creator",
    type: "Team Growth",
    category: "Management",
    country: "Canada",
    image: "/story2.jpg",
    description: "Built a team of 10 editors and scaled content 5x.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Video Editor",
    type: "Income",
    category: "Editing",
    country: "Mexico",
    image: "/story3.jpg",
    description: "Turned passion for editing into $8K/month income stream.",
  },
  {
    id: 4,
    name: "David Park",
    role: "Client",
    type: "Client Story",
    category: "Business",
    country: "USA",
    image: "/story4.jpg",
    description: "Launched successful product with help from platform editors.",
  },
];

// ============================================================
// SINGLE COMPONENT (FILTERS + CARDS + PAGINATION)
// ============================================================
export default function SuccessStroyPage() {
  const [storyType, setStoryType] = useState("All");
  const [category, setCategory] = useState("All");
  const [country, setCountry] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

// FILTER LOGIC
// ==============================
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
    <div className="container mx-auto py-16">

      {/* FILTERS */}
      <div className="flex flex-wrap gap-6 items-center bg-white p-5 rounded-xl shadow-sm border">
        <span className="text-gray-700 font-medium">Filter by:</span>

        {/* Story Type */}
        <FilterSelect
          value={storyType}
          setValue={setStoryType}
          options={["All", "Success", "Team Growth", "Client Story", "Income"]}
        />

        {/* Category */}
        <FilterSelect
          value={category}
          setValue={setCategory}
          options={["All", "Editing", "Management", "Business"]}
        />

        {/* Country */}
        <FilterSelect
          value={country}
          setValue={setCountry}
          options={["All", "USA", "Canada", "Mexico"]}
        />
      </div>

      {/* STORY CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-14">
        {pageStories.map((story) => (
          <div
            key={story.id}
            className="bg-white shadow-md rounded-2xl p-4"
          >
            <Image
              src={story.image}
              alt={story.name}
              width={400}
              height={250}
              className="rounded-xl w-full h-[230px] object-cover"
            />

            <h3 className="text-[20px] font-semibold mt-4">{story.name}</h3>
            <p className="text-gray-500 text-sm">{story.role}</p>

            <p className="mt-2 text-gray-600">{story.description}</p>

            <button className="flex items-center gap-1 mt-4 text-red-500 font-medium">
              Read Story <ArrowRight size={16} />
            </button>
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
  );
}

// ============================================================
// REUSABLE SELECT COMPONENT
// ============================================================
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
    <div className="relative">
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="appearance-none bg-white px-4 py-2 border rounded-xl pr-10"
      >
        {options.map((op) => (
          <option key={op}>{op}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
    </div>
  );
}

// ============================================================
// PAGINATION COMPONENT
// ============================================================
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
