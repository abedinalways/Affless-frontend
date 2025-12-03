"use client";

import { useState } from "react";
import BreadCrumb from "@/components/reusable/BreadCumb";
import FilterSidebar from "./FilterSidebar";  // Keep this as the desktop filter sidebar
import EditorCard, { editors } from "./EditorCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PageBanner from "@/components/reusable/Bgbanner";

export default function FindEditors() {

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
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
      <div className="containers mx-auto flex flex-col md:flex-row gap-8 mt-9 lg:mt-[160px]">

        {/* Sidebar - hidden on small screens */}
        <div className="hidden md:block">
          <FilterSidebar />
        </div>

        {/* Mobile Filter Section (Visible only on small screens) */}
        <div className="md:hidden flex  gap-4 mb-4">
          <select className="p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            <option>Job Category</option>
            <option>SEO</option>
            <option>Video Editing</option>
            <option>Web Development</option>
            {/* Add more options here */}
          </select>
          <select className="p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            <option>Platform</option>
            <option>Upwork</option>
            <option>Fiverr</option>
            <option>Freelancer</option>
            {/* Add more options here */}
          </select>
          <select className="p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            <option>Delivery Time</option>
            <option>3 Days</option>
            <option>5 Days</option>
            <option>7 Days</option>
            {/* Add more options here */}
          </select>
          <select className="p-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md">
            <option>Budget</option>
            <option>$10 - $50</option>
            <option>$50 - $100</option>
            <option>$100+</option>
            {/* Add more options here */}
          </select>
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

              {[1, 2, 3].map((page) => (
                <li
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-11 h-11 flex items-center justify-center rounded-full font-medium cursor-pointer
                    ${currentPage === page ? "bg-white text-white" : "bg-white text-[#FF5151]"}`}
                >
                  {page}
                </li>
              ))}

              {/* Dots */}
              <li className="w-11 h-11 flex items-center justify-center rounded-full bg-white text-[#FF7B7B]">
                ...
              </li>

              {/* Last Page */}
              <li
                onClick={() => setCurrentPage(totalPages)}
                className={`w-11 h-11 flex items-center justify-center rounded-full cursor-pointer font-medium
                  ${currentPage === totalPages ? "bg-white text-white" : "bg-white text-[#FF5151]"}`}
              >
                {totalPages}
              </li>

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
