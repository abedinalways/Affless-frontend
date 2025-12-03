"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import DubbleUser from "@/components/Icons/dubbleuser";

// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="containers">
      <nav>
        <div className="flex justify-between items-center py-3">

          {/* ---------- LEFT SECTION ---------- */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/">
              <div className="w-[100px] h-[50px] flex justify-center items-center overflow-hidden">
                <Image
                  src="/fdf.png"
                  alt="logo"
                  height={500}
                  width={500}
                  className="w-full object-cover"
                />
              </div>
            </Link>

            {/* DESKTOP MENU */}
            <ul className="hidden md:flex items-center gap-8 text-[#333] font-poppins text-base">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/service">Service</Link></li>
              <li><Link href="/jobs">Browse Jobs</Link></li>
              <li><Link href="/find-editors">Find Editors</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* ---------- RIGHT SECTION (DESKTOP) ---------- */}
          <Link href="/login" className="hidden md:flex">
            <button className="flex items-center gap-2 bg-[#FF4D4F] text-white px-5 py-2 rounded-xl font-poppins text-base cursor-pointer">
              <DubbleUser /> Sign In
            </button>
          </Link>

          {/* ---------- HAMBURGER (MOBILE) ---------- */}
          <button className="md:hidden text-3xl" onClick={() => setMobileMenu(true)}>
            <HiOutlineMenu />
          </button>
        </div>
      </nav>

      {/* *********** MOBILE MENU (FULL WIDTH LEFT → RIGHT) *********** */}
      {/* DARK OVERLAY */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* MENU CONTENT */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 p-6 transform transition-transform duration-300 
        ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button className="text-3xl mb-6" onClick={() => setMobileMenu(false)}>
          <HiX />
        </button>

        {/* Mobile Nav Items */}
        <ul className="space-y-6 text-lg font-medium">
          <li><Link href="/" onClick={() => setMobileMenu(false)}>Home</Link></li>
          <li><Link href="/service" onClick={() => setMobileMenu(false)}>Service</Link></li>
          <li><Link href="/jobs" onClick={() => setMobileMenu(false)}>Browse Jobs</Link></li>
          <li><Link href="/find-editors" onClick={() => setMobileMenu(false)}>Find Editors</Link></li>
          <li><Link href="/pricing" onClick={() => setMobileMenu(false)}>Pricing</Link></li>

          <li>
            <Link
              href="/login"
              onClick={() => setMobileMenu(false)}
              className="inline-block bg-[#FF4D4F] text-white px-5 py-2 rounded-xl mt-4"
            >
              <div className="flex items-center gap-2">
                <DubbleUser /> Sign In
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
