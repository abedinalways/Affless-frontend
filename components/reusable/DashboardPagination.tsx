"use client";

import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export const PaginationDashboard: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    
    const getPageNumbers = () => {
        const pages = [];

        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (currentPage <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (currentPage > totalPages - 4) {
                pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
            }
        }

        return pages;
    };

    const pages = getPageNumbers();

    return (
        <div className="flex items-center justify-center gap-2 mt-6">

            {/* FIRST PAGE */}
            <button
                className="px-3 py-2 rounded-lg border text-gray-500 hover:bg-gray-100"
                onClick={() => onPageChange(1)}
                disabled={currentPage === 1}
            >
                «
            </button>

            {/* PREVIOUS */}
            <button
                className="px-3 py-2 rounded-lg border text-gray-500 hover:bg-gray-100"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ‹
            </button>

            {/* PAGE NUMBERS */}
            {pages.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === "number" && onPageChange(page)}
                    disabled={page === "..."}
                    className={`px-4 py-2 rounded-lg border 
                        ${currentPage === page ? "bg-red-500 text-white" : "bg-white text-gray-700 hover:bg-gray-100"}
                        ${page === "..." ? "cursor-default" : ""}
                    `}
                >
                    {page}
                </button>
            ))}

            {/* NEXT */}
            <button
                className="px-3 py-2 rounded-lg border text-gray-500 hover:bg-gray-100"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                ›
            </button>

            {/* LAST PAGE */}
            <button
                className="px-3 py-2 rounded-lg border text-gray-500 hover:bg-gray-100"
                onClick={() => onPageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                »
            </button>
        </div>
    );
};
