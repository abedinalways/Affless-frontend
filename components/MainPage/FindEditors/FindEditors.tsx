/** @format */

"use client";

import { useState } from "react";
import BreadCrumb from "@/components/reusable/BreadCumb";
import FilterSidebar from "./FilterSidebar"; // Keep this as the desktop filter sidebar
import EditorCard, { editors } from "./EditorCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageBanner from "@/components/reusable/Bgbanner";
import { FaSitemap } from "react-icons/fa";
import Pagination from "@/components/reusable/pagination";
import { useSearchParams } from "next/navigation";

export default function FindEditors() {
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const itemsPerPage = 10; // HOW MANY EDITORS PER PAGE
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect");

  const totalPages = Math.ceil(editors.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const displayedEditors = editors.slice(startIndex, startIndex + itemsPerPage);

  // Go Previous
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Go Next
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Generate page numbers array dynamically
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {/* Banner */}
      <PageBanner
        title='Find Editors'
        bgImage='/findEditor.jpg'
        links={[{ label: redirectUrl === "/client" ? "Dashboard" : redirectUrl === "/client/manage-job" ? "Manage Jobs" : "Home", href: redirectUrl || "/" }, { label: "Find Editors" }]}
      />

      {/* Main Section */}
      <div className='containers mx-auto flex gap-8 lg:mt-10'>
        {/* Sidebar - hidden on small screens */}
        <div className='hidden lg:block'>
          <FilterSidebar />
        </div>

        {/* Mobile Filter Section (Visible only on small screens) */}
        <div
          className={`fixed inset-0 lg:hidden h-screen bg-[#0003] z-999 grid ${
            mobileMenu ? "w-full translate-x-0" : "w-fit -translate-x-full "
          } duration-300`}
          onClick={() => setMobileMenu(false)}>
          <FilterSidebar
            isMobile={true}
            handleMenu={() => setMobileMenu(false)}
          />
        </div>

        {/* Editors List */}
        <div className='flex-1 space-y-6'>
          <div className='grid items-center justify-end lg:hidden mt-8'>
            <button
              type='button'
              onClick={() => setMobileMenu(true)}
              className='flex items-center gap-2 border px-5 py-1 rounded-md text-[#ff4d4f] border-[#ff4d4f] font-medium cursor-pointer hover:bg-[#ff4d4f] hover:text-white duration-300'>
              <FaSitemap />
              <span>Filters</span>
            </button>
          </div>

          {/* Only Show Editors For This Page */}
          {displayedEditors.map((editor, idx) => (
            <EditorCard key={idx} {...editor} />
          ))}

          {/* Pagination */}
          <Pagination 
            page={currentPage} 
            totalPages={totalPages} 
            onPageChange={(page) => setCurrentPage(page)}
            total={displayedEditors.length}
            pageSize={itemsPerPage}
          />
        </div>
      </div>
    </div>
  );
}
