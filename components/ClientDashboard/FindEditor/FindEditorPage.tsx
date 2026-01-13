"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { TiStarFullOutline } from "react-icons/ti";
import Pagination from "@/components/reusable/pagination";
import PageBanner from "@/components/reusable/Bgbanner";
import { FaSitemap } from "react-icons/fa";
import FindFilterCategory from "./FindFilterCategory";

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
  { id: 1, name: "Jerome Bell", rating: 4.9, reviews: 338, skills: 3, experience: "Professional", country: "Pakistan", match: 84, image: "/images/Jerome.jpg" },
  { id: 2, name: "Courtney Henry", rating: 4.9, reviews: 338, skills: 3, experience: "Professional", country: "Pakistan", match: 75, image: "/images/Courtney.jpg" },
  { id: 3, name: "Annette Black", rating: 4.9, reviews: 338, skills: 3, experience: "Professional", country: "Pakistan", match: 27, image: "/images/Annette.jpg" },
  { id: 4, name: "Esther Howard", rating: 4.9, reviews: 338, skills: 3, experience: "Professional", country: "Pakistan", match: 75, image: "/images/Esther.jpg" },
  { id: 5, name: "Floyd Miles", rating: 4.9, reviews: 338, skills: 3, experience: "Professional", country: "Pakistan", match: 75, image: "/images/Floyd.jpg" },
];

export default function FindEditorPage() {
  const [page, setPage] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);

  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  const visibleEditors = allEditors.slice(startIndex, startIndex + pageSize);

  // ✅ Prevent background scroll on drawer open
  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "auto";
  }, [mobileMenu]);

  return (
    <div className="min-h-screen">
      <PageBanner
        title="Find Editors"
        bgImage="/findEditor.jpg"
        links={[
          { label: "Home", href: "/" },
          { label: "Find Editors" },
        ]}
      />

      <div className="containers mx-auto flex flex-col lg:flex-row gap-8 lg:pt-20">
        {/* ✅ Desktop Sidebar */}
        <FindFilterCategory />

        {/* ✅ Mobile Filter Button */}
        <div className="grid items-center justify-end lg:hidden mt-9">
          <button
            type="button"
            onClick={() => setMobileMenu(true)}
            className="flex items-center gap-2 border px-5 py-1 rounded-md text-[#ff4d4f] border-[#ff4d4f] font-medium cursor-pointer hover:bg-[#ff4d4f] hover:text-white duration-300"
          >
            <FaSitemap />
            <span>Filters</span>
          </button>
        </div>

        {/* ✅ Mobile Drawer */}
        {mobileMenu && (
          <div className="fixed inset-0 z-9999 lg:hidden flex">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setMobileMenu(false)}
            />

            {/* Drawer */}
            <div className="relative w-[85%] max-w-[340px] h-full bg-white shadow-xl animate-slideInLeft">
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <h3 className="text-[18px] font-semibold text-[#222]">
                  Filters
                </h3>

                <button
                  onClick={() => setMobileMenu(false)}
                  className="p-2 rounded-md hover:bg-gray-100 transition cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
                <FindFilterCategory isMobile />
              </div>
            </div>
          </div>
        )}

        {/* ✅ Right Side Content */}
        <div className="w-full lg:w-3/4 space-y-6">
          {visibleEditors.map((editor) => (
            <div
              key={editor.id}
              className="bg-white rounded-xl p-5 shadow-sm flex w-full justify-between"
            >
              <div className="flex flex-col lg:flex-row w-full justify-between gap-6">
                <Image
                  src={editor.image}
                  alt={editor.name}
                  width={500}
                  height={160}
                  className="rounded-lg object-cover w-full lg:w-[200px] aspect-3/2"
                />

                <div className="flex flex-col w-full">
                  <h2 className="text-[22px] font-medium">{editor.name}</h2>

                  <p className="text-[15px] text-gray-700 flex items-center gap-1">
                    <TiStarFullOutline className="text-[#FAAD14]" />
                    {editor.rating} ({editor.reviews} Review)
                  </p>

                  <p className="text-[12px] text-[#777980]">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </p>

                  <div className="flex gap-3 mt-4">
                    <Link
                      href="/client/hire-vedio-editor"
                      className="px-4 py-2 bg-red-500 text-white rounded-full text-sm"
                    >
                      Hire Editor
                    </Link>

                    <Link
                      href="/client/message"
                      className="px-4 py-2 bg-red-100 text-red-500 rounded-full text-sm"
                    >
                      Message
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}

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
