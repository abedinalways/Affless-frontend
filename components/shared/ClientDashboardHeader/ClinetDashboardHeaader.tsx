"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown, MdMailOutline } from "react-icons/md";

export default function ClientDashboardHeader() {
  const [open, setOpen] = useState(false);
 const dropdownRef = useRef<HTMLDivElement | null>(null);


  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="containers">
      <nav>
        <div className="flex justify-between items-center py-3">

          {/* Left Section */}
          <div className="flex items-center gap-10">

            {/* Logo */}
            <div className="w-[100px] h-[50px] flex justify-center items-center overflow-hidden">
              <Image
                src="/fdf.png"
                alt="logo"
                width={500}
                height={500}
                className="w-full object-cover"
              />
            </div>

            {/* Main Menu */}
            <ul className="hidden md:flex items-center gap-8 text-[#333] font-poppins text-base relative">

              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>

              {/* My Business Dropdown */}
              <li className="relative" >
              <div ref={dropdownRef}>
                  <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-1 cursor-pointer select-none"
                >
                  My Business
                  <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
                 <MdKeyboardArrowDown />
                  </span>
                </button>

                {open && (
                  <div className="absolute left-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3 z-50">
                    <Link href="/manage-job" className="block px-4 py-2 hover:bg-gray-100">
                      Manage Job
                    </Link>
                    <Link href="/find-editor" className="block px-4 py-2 hover:bg-gray-100">
                      Find Editor
                    </Link>
                    <Link href="/job-proposal" className="block px-4 py-2 hover:bg-gray-100">
                      Job Proposal
                    </Link>
                    <Link href="/payment-history" className="block px-4 py-2 hover:bg-gray-100">
                      Payment History
                    </Link>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">
                      Profile
                    </Link>
                  </div>
                )}
              </div>
              </li>

              <li>
                <Link href="#">Pricing</Link>
              </li>

            </ul>
          </div>

          {/* Right Section */}
          <div className="flex gap-8 items-center">
            <Link href="#" className="">Become an Editor</Link>

            <IoMdNotificationsOutline className="w-7 h-7 cursor-pointer" />
            <MdMailOutline className="w-7 h-7 cursor-pointer" />

            <Link href="#" className="flex">
              <Image src="/images/profile.png" alt="profile" width={32} height={32} />
            </Link>
          </div>

        </div>
      </nav>
    </div>
  );
}
