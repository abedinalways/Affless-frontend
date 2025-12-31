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

  const getPages = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (page <= 3) return [1, 2, 3, "...", totalPages];
    if (page >= totalPages - 2)
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];

    return [1, "...", page - 1, page, page + 1, "...", totalPages];
  };

  const pagesToShow = getPages();

  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`
          w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow-sm
          transition
          ${page === 1 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}
        `}
      >
        <ChevronLeft size={18} />
      </button>

      {/* Page numbers */}
      <ul className="flex items-center gap-3">
        {pagesToShow.map((p, idx) =>
          p === "..." ? (
            <li key={idx} className="text-gray-400 select-none cursor-default">
              ...
            </li>
          ) : (
            <li key={idx}>
              <button
                disabled={page === p}
                onClick={() => onPageChange(Number(p))}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-full font-medium transition
                  ${page === p ? "bg-red-500 text-white cursor-not-allowed" : "bg-red-100 text-red-500 hover:bg-red-200 cursor-pointer"}
                `}
              >
                {p}
              </button>
            </li>
          )
        )}
      </ul>

      {/* Next */}
      <button
        disabled={page === totalPages || totalPages === 0}
        onClick={() => onPageChange(page + 1)}
        className={`
          w-10 h-10 flex items-center justify-center rounded-full border bg-white shadow-sm
          transition
          ${page === totalPages || totalPages === 0 ? "opacity-40 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"}
        `}
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
