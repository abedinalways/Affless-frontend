"use client";

import FilterSidebar from "@/components/MainPage/FindEditors/FilterSidebar";
import PageBanner from "@/components/reusable/Bgbanner";
import Pagination from "@/components/reusable/pagination";
import Image from "next/image";
import Link from "next/link";
import { FaSitemap } from "react-icons/fa";
import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const data = [
  {
    id: 1,
    img: "/images/Marvin1.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Guy Hawkins",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Thumbnails",
    platform: "YouTube",
    deliveryTime: "3 Days",
    budget: "50",
  },
  {
    id: 2,
    img: "/images/Marvin2.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Kristin Watson",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Shorts/Reels/TikToks",
    platform: "TikTok",
    deliveryTime: "5 Days",
    budget: "100",
  },
  {
    id: 3,
    img: "/images/Marvin3.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Jacob Jones",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Shorts/Reels/TikToks",
    platform: "Facebook",
    deliveryTime: "7 Days",
    budget: "100",
  },
  {
    id: 4,
    img: "/images/Marvin4.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Kristin Watson",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Ads/UGC",
    platform: "Snapchat",
    deliveryTime: "3 Days",
    budget: "500",
  },
  {
    id: 5,
    img: "/images/Marvin1.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Guy Hawkins",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Captions/Subtitles",
    platform: "X (Twitter)",
    deliveryTime: "5 Days",
    budget: "900",
  },
  {
    id: 6,
    img: "/images/Marvin2.jpg",
    title:
      "I will do SEO backlinks with blogger outreach for high quality link building",
    profileImage: "/images/profile.png",
    name: "Guy Hawkins",
    review: "4.9(338)",
    link: "Link Building",
    profesion: "Professional",
    country: "Pakistan",
    delevery: "Delivery: 6 -Months",
    category: "Long-Form YouTube",
    platform: "YouTube",
    deliveryTime: "7 Days",
    budget: "250",
  },
];

const PAGE_SIZE = 4;

export default function BrowseJob() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const redirectUrl = searchParams.get('redirect') || '/';
  // Mobile filter states
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [budget, setBudget] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  // Filtering Logic
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      return (
        (category ? item.category === category : true) &&
        (platform ? item.platform === platform : true) &&
        (deliveryTime ? item.deliveryTime === deliveryTime : true) &&
        (budget ? item.budget === budget : true)
      );
    });
  }, [category, platform, deliveryTime, budget]);

  // Pagination Logic
  const paginatedData = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredData.slice(start, start + PAGE_SIZE);
  }, [page, filteredData]);

  return (
    <div>
      <PageBanner
        title="Browse Jobs"
        bgImage="/findEditor.jpg"
        desc=" Find the best client jobs based on job type, budget, and project duration."
        links={[{ label: redirectUrl === "/editor"?"Dashboard":"Home", href: redirectUrl || "/" }, { label: "Browse Jobs" }]}
      />

      <div className="containers lg:py-20 ">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          <div
            className={`fixed inset-0 lg:hidden h-full bg-[#0003] z-999 ${mobileMenu ? "w-full translate-x-0" : "w-fit -translate-x-full"
              } duration-300`}
            onClick={() => setMobileMenu(false)}
          >
            <FilterSidebar
              isMobile={true}
              handleMenu={() => setMobileMenu(false)}
            />
          </div>

          <div className="grid items-center justify-end lg:hidden pt-4">
            <button
              type="button"
              onClick={() => setMobileMenu(true)}
              className="flex items-center gap-2 border px-5 py-1 rounded-md text-[#ff4d4f] border-[#ff4d4f] font-medium cursor-pointer hover:bg-[#ff4d4f] hover:text-white duration-300"
            >
              <FaSitemap />
              <span>Filters</span>
            </button>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {paginatedData.map((item) => (
                <div className="bg-white p-4 lg:p-6 rounded-lg">
                  <div className="flex flex-row lg:flex-col gap-1.5">
                    <Link key={item.id} href={`/editor/browse-job/${item.id}`}>
                      <Image
                        src={item.img}
                        alt="editor"
                        width={500}
                        height={500}
                        className="w-full object-cover rounded-lg"
                      />
                      <p className="pt-3 lg:pt-5 font-semibold text-[16px] lg:text-[18px]">
                        {item.title}
                      </p>
                    </Link>
                  </div>

                  <div className="flex justify-between py-4">
                    <Link href="/client-profile/1">
                      <div className="flex gap-2">
                        <Image
                          src={item.profileImage}
                          alt="profile"
                          width={20}
                          height={20}
                        />
                        <h3 className="">{item.name}</h3>
                      </div>
                    </Link>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pb-4">
                    <span className="flex-1 text-nowrap px-2.5 py-1 bg-[#f3f5f6] rounded-full">
                      ${item.budget}
                    </span>
                    <span className="flex-1 text-nowrap px-2.5 py-1 bg-[#f3f5f6] rounded-full">
                      {item.category}
                    </span>
                    <span className="flex-1 text-nowrap px-2.5 py-1 bg-[#f3f5f6] rounded-full">
                      {item.platform}
                    </span>
                  </div>

                  <div>Delivery: {item.deliveryTime}</div>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Pagination
                page={page}
                pageSize={PAGE_SIZE}
                total={filteredData.length}
                onPageChange={(p) => setPage(p)}
                totalPages={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
