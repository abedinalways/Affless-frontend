"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
}: {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(total / pageSize);

  // show only first 3 pages for UI (you can improve later)
  const pagesToShow = [1, 2, 3];

  return (
    <div className="flex justify-center items-center gap-3 mt-10">

      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-50 disabled:opacity-40"
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page Numbers */}
      <ul className="flex items-center gap-3">
        {pagesToShow.map((p) => (
          <li key={p}>
            <button
              onClick={() => onPageChange(p)}
              className={`w-10 h-10 flex items-center justify-center rounded-full font-medium 
                ${
                  page === p
                    ? "bg-red-500 text-white"
                    : "bg-red-100 text-red-500"
                }`}
            >
              {p}
            </button>
          </li>
        ))}

        {/* Dots */}
        <li className="w-10 h-10 flex items-center justify-center rounded-full bg-red-50 text-red-400">
          ...
        </li>

        {/* Last Page */}
        <li>
          <button
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 flex items-center justify-center rounded-full font-medium 
              ${
                page === totalPages
                  ? "bg-red-500 text-white"
                  : "bg-red-100 text-red-500"
              }`}
          >
            {totalPages}
          </button>
        </li>
      </ul>

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow hover:bg-gray-50 disabled:opacity-40"
      >
        <ChevronRight size={18} />
      </button>

    </div>
  );
}
