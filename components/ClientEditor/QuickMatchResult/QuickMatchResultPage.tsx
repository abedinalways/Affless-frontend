"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaSitemap } from "react-icons/fa6";
import { TiStarFullOutline } from "react-icons/ti";
import { X } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Loading from "@/components/shared/Loading";

interface Client {
  id: number;
  name: string;
  rating: number;
  reviews: number;
  hireRate?: number;
  jobsPosted?: number;
  editorsWorkedWith?: number;
  match: number;
  image: string;
}

const clients: Client[] = [
  {
    id: 1,
    name: "Jerome Bell",
    rating: 4.9,
    reviews: 338,
    hireRate: 96,
    jobsPosted: 28,
    editorsWorkedWith: 12,
    match: 84,
    image: "/images/Jerome.jpg",
  },
  {
    id: 2,
    name: "Courtney Henry",
    rating: 4.9,
    reviews: 338,
    hireRate: 92,
    jobsPosted: 19,
    editorsWorkedWith: 9,
    match: 75,
    image: "/images/Courtney.jpg",
  },
  {
    id: 3,
    name: "Annette Black",
    rating: 4.9,
    reviews: 338,
    hireRate: 78,
    jobsPosted: 11,
    editorsWorkedWith: 6,
    match: 27,
    image: "/images/Annette.jpg",
  },
  {
    id: 4,
    name: "Esther Howard",
    rating: 4.9,
    reviews: 338,
    hireRate: 88,
    jobsPosted: 22,
    editorsWorkedWith: 10,
    match: 75,
    image: "/images/Esther.jpg",
  },
  {
    id: 5,
    name: "Floyd Miles",
    rating: 4.9,
    reviews: 338,
    hireRate: 90,
    jobsPosted: 16,
    editorsWorkedWith: 8,
    match: 75,
    image: "/images/Floyd.jpg",
  },
];

export default function QuickMatchResult() {
  const router = useRouter();
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // ✅ Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = showFilters ? "hidden" : "auto";
  }, [showFilters]);

  const handleReMatch = () => {
    setIsLoading(true);
    setTimeout(() => {
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
              href="/editor"
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
            {clients.map((client) => (
              <div
                key={client.id}
                className="bg-white rounded-xl p-5 shadow-sm gap-6"
              >
                <div className="grid lg:grid-cols-[auto_1fr] grid-cols-1 xl:grid-cols-1 gap-6">
                  <div className="w-full grid gap-4">
                    <Link href={`/client-profile/${client.id}`}>
                      <Image
                        src={client.image}
                        alt={client.name}
                        width={500}
                        height={500}
                        className="object-cover rounded-lg w-full lg:w-60 xl:w-full h-60 xl:h-full xl:aspect-video"
                      />
                    </Link>
                  </div>

                  <div className="w-full">
                    <div className="flex justify-between">
                      <div>
                        <Link href={`/client-profile/${client.id}`}>
                          <h2 className="text-[20px] md:text-[24px] font-medium text-[#333] pb-2.5">
                            {client.name}
                          </h2>
                        </Link>
                        <p className="text-[16px] font-normal text-[#333] flex items-center gap-1">
                          <TiStarFullOutline className="text-[#FAAD14]" />{" "}
                          {client.rating} ({client.reviews} Review)
                        </p>
                      </div>

                      <div>
                        <span
                          className={`p-2 lg:px-3.5 lg:text-[12px] text-[10px] py-1.5 rounded-full font-semibold
                          ${client.match >= 70
                              ? "bg-[#EEFAE9] text-[#52C41A]"
                              : client.match <= 40
                                ? "bg-[#FEE9EA] text-[#F5222D]"
                                : "bg-yellow-100 text-yellow-600"
                            }`}
                        >
                          {client.match}% Match
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-2 text-xs text-gray-600 py-4 flex-wrap">
                      <span className="px-3 py-1 text-[14px] bg-[#F2F3F3] text-[#333] rounded-full">
                        🎯 {client.hireRate}% Hire Rate
                      </span>
                      <span className="px-3 py-1 bg-[#F2F3F3] rounded-full flex items-center gap-1">
                        📄 {client.jobsPosted} Jobs Posted
                      </span>
                      <span className="px-3 py-1 bg-[#F2F3F3] rounded-full flex items-center gap-1">
                        🤝 Worked with {client.editorsWorkedWith} editors
                      </span>
                    </div>

                    <div className="flex  gap-3 mt-3">
                      <div>
                        <Link href={`/editor/message?id=${client.id}&requestjob=true`} className="w-full px-4 py-2 bg-[#ff4b4b] text-white text-xs rounded-full  cursor-pointer">
                          Request a Job
                        </Link>
                      </div>

                      <Link href={`/editor/message?id=${client.id}&return=find-client-match`} className="px-4 py-2 bg-[#F2F3F3] text-gray-700 text-xs rounded-full ">
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
