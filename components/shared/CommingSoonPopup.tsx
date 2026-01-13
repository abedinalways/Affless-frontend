"use client";

import React from "react";
import { IoClose } from "react-icons/io5";
import { GiClick } from "react-icons/gi";

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  onBackClick?: () => void;
};

export default function CommingSoonPopup({ 
  isOpen = true, 
  onClose, 
  onBackClick 
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0003] backdrop-blur-xs bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 relative" onClick={(e)=>e.stopPropagation()}>
        {/* <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition"
          aria-label="Close"
        >
          <IoClose size={32} />
        </button> */}

        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-6">
            <GiClick size={48} className="text-red-500" />
          </div>
        </div>

        <h1 className="text-4xl font-bold text-center text-[#333] mb-4">
          Coming Soon
        </h1>
        
        <p className="text-center text-gray-600 text-lg mb-8">
          This resource is being finalized and will be available soon.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-4 rounded-2xl transition cursor-pointer"
        >
          Back to Resources
        </button>
      </div>
    </div>
  );
}