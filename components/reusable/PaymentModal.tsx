"use client";

import React, { useEffect } from "react";

export default function Modal({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null; // 

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* modal box */}
      <div className="relative z-10 w-[95%] max-w-2xl rounded-2xl bg-white p-6 shadow-xl">
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-500 cursor-pointer"
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
