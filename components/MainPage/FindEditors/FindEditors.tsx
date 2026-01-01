"use client";

import { useState } from "react";
import BreadCrumb from "@/components/reusable/BreadCumb";
import FilterSidebar from "./FilterSidebar";  // Keep this as the desktop filter sidebar
import EditorCard, { editors } from "./EditorCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageBanner from "@/components/reusable/Bgbanner";
import { FaSitemap } from "react-icons/fa";

export default function FindEditors() {

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const itemsPerPage = 3; // HOW MANY EDITORS PER PAGE

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


  return (
    <div>
      {/* Banner */}
      <PageBanner
        title="Find Editors"
        bgImage="/findEditor.jpg"
        links={[
          { label: "Home", href: "/" },
          { label: "Find Editors" }
        ]}
      />

      {/* Main Section */}
      <div className="containers mx-auto grid gap-8 lg:mt-40">

        {/* Sidebar - hidden on small screens */}
        <div className="hidden lg:block">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Section (Visible only on small screens) */}
        <div className={`fixed inset-0 lg:hidden h-full bg-[#0003] z-999 ${mobileMenu ? "w-full translate-x-0" : "w-fit -translate-x-full"} duration-300`} onClick={() => setMobileMenu(false)}>
          <FilterSidebar isMobile={true} handleMenu={()=>setMobileMenu(false)}/>
        </div>

        <div className='grid items-center justify-end lg:hidden'>
          <button type="button" onClick={() => setMobileMenu(true)} className='flex items-center gap-2 border px-5 py-1 rounded-md text-[#ff4d4f] border-[#ff4d4f] font-medium cursor-pointer hover:bg-[#ff4d4f] hover:text-white duration-300'>
            <FaSitemap />
            <span>Filters</span>
          </button>
        </div>

        {/* Editors List */}
        <div className="flex-1 space-y-6">
          {/* Only Show Editors For This Page */}
          {displayedEditors.map((editor, idx) => (
            <EditorCard key={idx} {...editor} />
          ))}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-12">

            {/* Prev */}
            <button
              onClick={handlePrev}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
            >
              <ChevronLeft className="text-gray-700" size={18} />
            </button>

            {/* Page Numbers */}
            <ul className="flex items-center gap-4">

              {[1].map((page) => (
                <li
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-11 h-11 flex items-center justify-center rounded-full font-medium cursor-pointer
                    ${currentPage === page ? "bg-[#FF5151] text-white" : "bg-white text-[#FF5151]"}`}
                >
                  {page}
                </li>
              ))}

            </ul>

            {/* Next */}
            <button
              onClick={handleNext}
              className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100"
            >
              <ChevronRight className="text-gray-700" size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}
