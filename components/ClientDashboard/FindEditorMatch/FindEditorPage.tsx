"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSitemap } from "react-icons/fa6";
import { TiStarFullOutline } from "react-icons/ti";
import { X } from "lucide-react";
import FilteringCategory from "./FilteringCategory";
import FilterSidebar from "@/components/MainPage/FindEditors/FilterSidebar";
import Pagination from "@/components/reusable/pagination";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/Loading";
import { useSearchParams } from "next/navigation";

interface Editor {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  jobsCompleted?: number;
  avgResponseTime?: string;
  clientsWorkedWith?: number;
  match: number;
  image: string;
}

const editors: Editor[] = [
  {
    id: 1,
    name: "Jerome Bell",
    rating: 4.9,
    reviews: 338,
    jobsCompleted: 128,
    avgResponseTime: "2",
    clientsWorkedWith: 46,
    match: 84,
    image: "/images/Jerome.jpg",
  },
  {
    id: 2,
    name: "Courtney Henry",
    rating: 4.9,
    reviews: 338,
    jobsCompleted: 94,
    avgResponseTime: "5",
    clientsWorkedWith: 38,
    match: 75,
    image: "/images/Courtney.jpg",
  },
  {
    id: 3,
    name: "Annette Black",
    rating: 4.9,
    reviews: 338,
    jobsCompleted: 57,
    avgResponseTime: "1",
    clientsWorkedWith: 21,
    match: 27,
    image: "/images/Annette.jpg",
  },
  {
    id: 4,
    name: "Esther Howard",
    rating: 4.9,
    reviews: 338,
    jobsCompleted: 112,
    avgResponseTime: "10",
    clientsWorkedWith: 40,
    match: 75,
    image: "/images/Esther.jpg",
  },
  {
    id: 5,
    name: "Floyd Miles",
    rating: 4.9,
    reviews: 338,
    jobsCompleted: 86,
    avgResponseTime: "8",
    clientsWorkedWith: 33,
    match: 75,
    image: "/images/Floyd.jpg",
  },
  {
    id: 6,
    name: "Kristin Watson",
    rating: 4.8,
    reviews: 291,
    jobsCompleted: 103,
    avgResponseTime: "3",
    clientsWorkedWith: 36,
    match: 81,
    image: "/images/Courtney.jpg",
  },
  {
    id: 7,
    name: "Darrell Steward",
    rating: 4.7,
    reviews: 214,
    jobsCompleted: 68,
    avgResponseTime: "2",
    clientsWorkedWith: 27,
    match: 63,
    image: "/images/Jerome.jpg",
  },
  {
    id: 8,
    name: "Jenny Wilson",
    rating: 4.9,
    reviews: 362,
    jobsCompleted: 140,
    avgResponseTime: "5",
    clientsWorkedWith: 52,
    match: 89,
    image: "/images/Esther.jpg",
  },
  {
    id: 9,
    name: "Albert Flores",
    rating: 4.6,
    reviews: 173,
    jobsCompleted: 49,
    avgResponseTime: "9",
    clientsWorkedWith: 18,
    match: 44,
    image: "/images/Annette.jpg",
  },
  {
    id: 10,
    name: "Savannah Nguyen",
    rating: 4.8,
    reviews: 267,
    jobsCompleted: 88,
    avgResponseTime: "2",
    clientsWorkedWith: 31,
    match: 72,
    image: "/images/Floyd.jpg",
  },
  {
    id: 11,
    name: "Bessie Cooper",
    rating: 4.7,
    reviews: 198,
    jobsCompleted: 74,
    avgResponseTime: "4",
    clientsWorkedWith: 25,
    match: 58,
    image: "/images/Courtney.jpg",
  },
  {
    id: 12,
    name: "Dianne Russell",
    rating: 4.9,
    reviews: 319,
    jobsCompleted: 116,
    avgResponseTime: "3",
    clientsWorkedWith: 43,
    match: 86,
    image: "/images/Jerome.jpg",
  },
  {
    id: 13,
    name: "Guy Hawkins",
    rating: 4.5,
    reviews: 142,
    jobsCompleted: 41,
    avgResponseTime: "2",
    clientsWorkedWith: 16,
    match: 39,
    image: "/images/Annette.jpg",
  },
  {
    id: 14,
    name: "Marvin McKinney",
    rating: 4.8,
    reviews: 255,
    jobsCompleted: 92,
    avgResponseTime: "7",
    clientsWorkedWith: 34,
    match: 77,
    image: "/images/Esther.jpg",
  },
  {
    id: 15,
    name: "Wade Warren",
    rating: 4.6,
    reviews: 184,
    jobsCompleted: 61,
    avgResponseTime: "4",
    clientsWorkedWith: 23,
    match: 52,
    image: "/images/Floyd.jpg",
  },
];

const MATCH_COUNT = 5;

const getRandomEditors = (
  source: Editor[],
  count: number,
  excludeIds: number[] = []
) => {
  const candidates = excludeIds.length
    ? source.filter((editor) => !excludeIds.includes(editor.id))
    : source;

  const pool = candidates.length >= count ? candidates : source;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  const randomSelection = shuffled.slice(0, count);

  return randomSelection.sort((a, b) => b.match - a.match);
};

export default function FindEditorsPage() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");
  const [visibleEditors, setVisibleEditors] = useState<Editor[]>(() =>
    getRandomEditors(editors, MATCH_COUNT)
  );
  // ✅ Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "auto";
  }, [showFilters]);

  const handleReMatch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleEditors((previousEditors) => {
        const previousIds = previousEditors.map((editor) => editor.id);
        return getRandomEditors(editors, MATCH_COUNT, previousIds);
      });
      setIsLoading(false);
    }, 1000)
  }

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    )
  }

  return (
    <div className=" bg-[#f6f6f6] py-10">
      <div className="containers mx-auto">
        <div className="space-y-1 pb-5">
          <h1 className="text-xl md:text-2xl font-medium text-[#333]">
            Quick-Match Results
          </h1>
          <p className="text-sm md:text-base text-gray-600">Matches based on past successful collaborations.</p>
        </div>
        <div className="flex flex-wrap items-center justify-between pb-5">
          <div className="grid items-center justify-end ">
            <Link
              href="/client"
              className="flex items-center gap-2 border px-5 py-3 rounded-md text-white border-white bg-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fd4447] hover:text-white duration-300"
            >
              <FaArrowLeft />
              <span>Back to Dashboard</span>
            </Link>
          </div>
          <div className="">
            <button
              type="button"
              onClick={handleReMatch}
              className="w-full flex items-center justify-center gap-2 border px-5 py-3 rounded-md bg-[#ff4d4f] text-white border-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fc373a] hover:text-white duration-300"
            >
              <span>Find Another Match</span>
            </button>
          </div>
          {/* <div className="grid items-center justify-end lg:hidden">
            <button
              type="button"
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 border px-5 py-1 rounded-md text-[#ff4d4f] border-[#ff4d4f] font-medium cursor-pointer hover:bg-[#ff4d4f] hover:text-white duration-300"
            >
              <FaSitemap />
              <span>Filters</span>
            </button>
          </div> */}
        </div>
        <div className="mx-auto grid grid-cols-1 gap-6">
          {/* ✅ Desktop Sidebar */}
          {/* <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          <div
            className={`fixed inset-0 lg:hidden h-full bg-[#0003] z-999 ${showFilters ? "w-full translate-x-0" : "w-fit -translate-x-full"
              } duration-300`}
            onClick={() => setShowFilters(false)}
          >
            <FilterSidebar
              isMobile={true}
              handleMenu={() => setShowFilters(false)}
            />
          </div> */}
          {/* ✅ RIGHT SIDE CONTENT */}
          <div className="w-full grid grid-cols-1 min-[640px]:grid-cols-2 min-[1024px]:grid-cols-1 min-[1280px]:grid-cols-2 min-[1700px]:grid-cols-3 gap-6">
            {visibleEditors.map((editor) => (
              <div
                key={editor.id}
                className="bg-white rounded-xl p-5 shadow-sm gap-6"
              >
                <div className="grid lg:grid-cols-[auto_1fr] grid-cols-1 xl:grid-cols-1 gap-6">
                  <div className="w-full grid gap-4">
                    <Link href={`/editor-profile/${editor.id}`}>
                      <Image
                        src={editor.image}
                        alt={editor.name}
                        width={500}
                        height={500}
                        className="object-cover rounded-lg w-full lg:w-60 xl:w-full h-60 xl:h-full xl:aspect-video"
                      />
                    </Link>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between">
                      <div>
                        <Link href={`/editor-profile/${editor.id}`}>
                          <h2 className="text-[20px] md:text-[24px] font-medium text-[#333] pb-2.5">
                            {editor.name}
                          </h2>
                        </Link>
                        <p className="text-[16px] font-normal text-[#333] flex items-center gap-1">
                          <TiStarFullOutline className="text-[#FAAD14]" />{" "}
                          {editor.rating} ({editor.reviews} Review)
                        </p>
                      </div>

                      <div>
                        <span
                          className={`p-2 lg:px-3.5 lg:text-[12px] text-[10px] py-1.5 rounded-full font-semibold
                          ${editor.match >= 70
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
                        ⭐ {editor.jobsCompleted} Jobs Completed
                      </span>
                      <span className="px-3 py-1 bg-[#F2F3F3] rounded-full flex items-center gap-1">
                        ⚡ Average Response Time: {editor.avgResponseTime} {editor.avgResponseTime === "1" ? "hour" : "hours"}
                      </span>
                      <span className="px-3 py-1 bg-[#F2F3F3] rounded-full flex items-center gap-1">
                        🤝 {editor.clientsWorkedWith} Clients Worked With
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-3">
                      <div>
                        <Link href={`/hire-vedio-editor?id=${editor.id}&redirect=${redirectUrl ? `${redirectUrl}_` : ""}quickmatchclient`} className="w-full px-4 py-2 bg-[#ff4b4b] text-white text-xs rounded-full  cursor-pointer">
                          Hire Editor
                        </Link>
                      </div>

                      <Link href={`/client/message?id=${editor.id}&return=find-editor-match`} className="px-4 py-2 bg-[#F2F3F3] text-gray-700 text-xs rounded-full ">
                        Message
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="w-full pt-4">
          <Pagination
            page={1}
            pageSize={10}
            total={5}
            onPageChange={() => { }}
            totalPages={1}
          />
        </div> */}
        <div className="pt-6">
          <button
            type="button"
            onClick={handleReMatch}
            className="w-full flex items-center justify-center gap-2 border px-5 py-3 rounded-md bg-[#ff4d4f] text-white border-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fc373a] hover:text-white duration-300"
          >
            <span>Find Another Match</span>
          </button>
        </div>
      </div>
    </div>
  );
}
