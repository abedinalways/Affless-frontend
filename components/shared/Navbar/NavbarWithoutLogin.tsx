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

export default function NavbarWithoutLogin() {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="containers bg-white">
      <nav className="">
        <div className="flex justify-between items-center py-3">

          {/* ---------- LEFT SECTION ---------- */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/">
              <div className="w-[100px] h-[50px] flex justify-center items-center overflow-hidden">
                <Image
                  src="/images/logoUpdate.png"
                  width={100}
                  height={100}
                  alt="Logo"
                  className=" object-cover justify-start "
                />
              </div>
            </Link>

            {/* DESKTOP MENU (hidden on small and medium devices) */}
            <ul className="hidden xl:flex items-center gap-8 text-[#333] font-poppins text-base">
              <li><Link href="/">Home</Link></li>
              <li><Link href="/jobs">Browse Jobs</Link></li>
              <li><Link href="/find-editors">Find Editors</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
            </ul>
          </div>

          {/* ---------- RIGHT SECTION (DESKTOP) ---------- */}
          <div className="flex gap-5">
            <Link href="/login" className="hidden xl:flex">
              <button className="flex items-center gap-2 bg-[#FF4D4F] text-white px-5 py-2 rounded-xl font-poppins text-base cursor-pointer">
                <DubbleUser /> Sign In
              </button>
            </Link>
            <Link href="/singup" className="hidden xl:flex">
              <button className="flex items-center gap-2 bg-[#FF4D4F] text-white px-5 py-2 rounded-xl font-poppins text-base cursor-pointer">
                <DubbleUser /> Sign Up
              </button>
            </Link>
          </div>

          {/* ---------- HAMBURGER (MOBILE) ---------- */}
          <button className="xl:hidden text-3xl cursor-pointer" onClick={() => setMobileMenu(true)}>
            <HiOutlineMenu />
          </button>
        </div>
      </nav>

      {/* *********** MOBILE MENU (FULL WIDTH LEFT → RIGHT) *********** */}
      {/* DARK OVERLAY */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-xs"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* MENU CONTENT */}
      <div
        className={`fixed top-0 left-0 w-fit h-full bg-white z-50 py-6 transform transition-transform duration-300 
        ${mobileMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Close Button */}
        <button className="text-2xl cursor-pointer p-0.5 hover:bg-gray-50 rounded-full fixed top-1 right-1 duration-300" title="Close menu" onClick={() => setMobileMenu(false)}>
          <HiX />
        </button>

        {/* Mobile Nav Items */}
        <ul className="text-lg font-medium pt-3">
          <li><Link href="/" className="block px-4 py-2 hover:bg-gray-100 duration-300" onClick={() => setMobileMenu(false)}>Home</Link></li>
          <li><Link href="/jobs" className="block px-4 py-2 hover:bg-gray-100 duration-300" onClick={() => setMobileMenu(false)}>Browse Jobs</Link></li>
          <li><Link href="/find-editors" className="block px-4 py-2 hover:bg-gray-100 duration-300" onClick={() => setMobileMenu(false)}>Find Editors</Link></li>
          <li><Link href="/pricing" className="block px-4 py-2 hover:bg-gray-100 duration-300" onClick={() => setMobileMenu(false)}>Pricing</Link></li>

          <li className="px-4">
            <div className="flex gap-4">
              <Link
                href="/login"
                onClick={() => setMobileMenu(false)}
                className="inline-block bg-[#FF4D4F] opacity-80 hover:opacity-100 text-white px-5 py-2 rounded-xl mt-4 duration-300"
              >
                <div className="flex items-center gap-2">
                  <DubbleUser /> Sign In
                </div>
              </Link>
              <Link
                href="/singup"
                onClick={() => setMobileMenu(false)}
                className="inline-block bg-[#FF4D4F] opacity-80 hover:opacity-100 text-white px-5 py-2 rounded-xl mt-4 duration-300"
              >
                <div className="flex items-center gap-2">
                  <DubbleUser /> Sign Up
                </div>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
