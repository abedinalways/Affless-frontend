"use client";

import React, { useState } from "react";
import AddPortfolioModal from "./AddPortfolioModal";
import PortfolioCarousel from "./PortfolioCarosule";
import { GoPlus } from "react-icons/go";

export default function PortfolioSection({ showAddBtn = true }: { showAddBtn?: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full rounded-2xl border border-gray-200 bg-white p-6">
      {/* ✅ Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] font-medium text-[#333] leading-150%">
          Portfolio of past projects
        </h3>

        {showAddBtn && <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center gap-0 lg:gap-2 rounded-lg border border-gray-300 px-2  lg:px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
        >
          <span className="text-lg font-semibold"><GoPlus /></span>
          Add New
        </button>}
      </div>

      {/* ✅ Carousel */}
      <div className="mt-6">
        <PortfolioCarousel />
      </div>

      {/* ✅ Modal */}
      <AddPortfolioModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
