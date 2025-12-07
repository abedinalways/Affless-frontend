"use client";

import FilterSidebar from '@/components/MainPage/FindEditors/FilterSidebar'
import PageBanner from '@/components/reusable/Bgbanner'
import Pagination from '@/components/reusable/pagination';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState, useMemo } from 'react'

export const data = [
  { id: 1, img: "/images/Marvin1.jpg", title: "I will do SEO backlinks with blogger outreach for high quality link building", profileImage: "/images/profile.png", name: "Guy Hawkins", review: "4.9(338)", link: "Link Building", profesion: "Professional", country: "Pakistan", delevery: "Delivery: 6 -Months", category: "SEO", platform: "Upwork", deliveryTime: "3 Days", budget: "10-50" },
  { id: 2, img: "/images/Marvin2.jpg", title: "I will do SEO backlinks with blogger outreach for high quality link building", profileImage: "/images/profile.png", name: "Kristin Watson", review: "4.9(338)", link: "Link Building", profesion: "Professional", country: "Pakistan", delevery: "Delivery: 6 -Months", category: "Video Editing", platform: "Fiverr", deliveryTime: "5 Days", budget: "50-100" },
  { id: 3, img: "/images/Marvin3.jpg", title: "I will do SEO backlinks with blogger outreach for high quality link building", profileImage: "/images/profile.png", name: "Jacob Jones", review: "4.9(338)", link: "Link Building", profesion: "Professional", country: "Pakistan", delevery: "Delivery: 6 -Months", category: "Web Development", platform: "Freelancer", deliveryTime: "7 Days", budget: "100+" },
  { id: 4, img: "/images/Marvin4.jpg", title: "I will do SEO backlinks with blogger outreach for high quality link building", profileImage: "/images/profile.png", name: "Kristin Watson", review: "4.9(338)", link: "Link Building", profesion: "Professional", country: "Pakistan", delevery: "Delivery: 6 -Months", category: "SEO", platform: "Upwork", deliveryTime: "3 Days", budget: "10-50" },
  { id: 5, img: "/images/Marvin1.jpg", title: "I will do SEO backlinks with blogger outreach for high quality link building", profileImage: "/images/profile.png", name: "Guy Hawkins", review: "4.9(338)", link: "Link Building", profesion: "Professional", country: "Pakistan", delevery: "Delivery: 6 -Months", category: "Video Editing", platform: "Fiverr", deliveryTime: "5 Days", budget: "50-100" },
  { id: 6, img: "/images/Marvin2.jpg", title: "I will do SEO backlinks with blogger outreach for high quality link building", profileImage: "/images/profile.png", name: "Guy Hawkins", review: "4.9(338)", link: "Link Building", profesion: "Professional", country: "Pakistan", delevery: "Delivery: 6 -Months", category: "Web Development", platform: "Freelancer", deliveryTime: "7 Days", budget: "100+" },
];

const PAGE_SIZE = 4;

export default function BrowseJob() {
  const [page, setPage] = useState(1);

  // Mobile filter states
  const [category, setCategory] = useState("");
  const [platform, setPlatform] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [budget, setBudget] = useState("");

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
        desc="Find the best editor according to your work type, budget, and delivery time."
        links={[{ label: "Home", href: "/" }, { label: "Browse Jobs" }]}
      />

      <div className="containers py-10 lg:py-20">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block">
            <FilterSidebar />
          </div>

          <div className="lg:hidden grid grid-cols-2 gap-4 mb-4">
            {/* Mobile filters */}
            {/* ...filters code */}
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
              {paginatedData.map((item) => (
                <Link key={item.id} href={`/editor/browse-job/${item.id}`}>
                  <div className="bg-white p-6 rounded-lg">
                    <div className="flex flex-row lg:flex-col gap-1.5">
                      <Image src={item.img} alt="editor" width={100} height={100} className="w-full object-cover rounded-lg" />
                      <p className="pt-0 lg:pt-5 font-semibold text-[16px] lg:text-[18px]">{item.title}</p>
                    </div>

                    <div className="flex justify-between py-4">
                      <div className="flex gap-2">
                        <Image src={item.profileImage} alt="profile" width={20} height={20} />
                        <h3>{item.name}</h3>
                      </div>
                      <div>{item.review}</div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1.5 pb-4">
                      <span className="px-2.5 py-1 bg-[#DBE3FC] rounded-full">{item.link}</span>
                      <span className="px-2.5 py-1 bg-[#C6F7EE] rounded-full">{item.profesion}</span>
                      <span className="px-2.5 py-1 bg-[#F9EDC9] rounded-full">{item.country}</span>
                    </div>

                    <div>{item.delevery}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10">
              <Pagination page={page} pageSize={PAGE_SIZE} total={filteredData.length} onPageChange={(p) => setPage(p)} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
