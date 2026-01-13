"use client";

import React, { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function ProfileEditModal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  // ESC press করলে close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-9999 transition ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* overlay */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* right drawer */}
      <div
        className={`absolute right-0 top-0 h-full w-[95%] sm:w-[450px] bg-white shadow-xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* header */}
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-lg font-semibold text-[#222]">{title}</h2>
          {/* <button
            onClick={onClose}
            className="text-xl text-gray-500 cursor-pointer"
          >
            <FiX />
          </button> */}
        </div>

        {/* content */}
        <div className="p-5 overflow-y-auto h-[calc(100%-60px)]">
          {children}
        </div>
      </div>
    </div>
  );
}
