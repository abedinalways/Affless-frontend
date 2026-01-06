"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import DubbleUser from "@/components/Icons/dubbleuser";

// shadcn (DESKTOP ONLY)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavbarWithoutLogin() {
  const [mobileMenu, setMobileMenu] = useState(false);

  // ✅ mobile dropdown states
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setMobileServiceOpen(false);
    setMobileContactOpen(false);
  };

  return (
    <div className="containers bg-white">
      <nav>
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
                  className="object-cover"
                />
              </div>
            </Link>

            {/* ---------- DESKTOP MENU ---------- */}
            <ul className="hidden xl:flex items-center gap-10 text-[#333] font-poppins text-base">
              <li>
                <Link href="/">Home</Link>
              </li>

              {/* Service (Desktop) */}
              <DropdownMenu>
                <DropdownMenuTrigger>Service</DropdownMenuTrigger>
                <DropdownMenuContent className="mt-4">
                  <DropdownMenuItem asChild>
                    <Link href="/howWork">How It Works</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/find-editors">Find Editors</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/jobs">Browse Jobs</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/pricing">Pricing</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Contact (Desktop) */}
              <DropdownMenu>
                <DropdownMenuTrigger>Contact</DropdownMenuTrigger>
                <DropdownMenuContent className="mt-4">
                  <DropdownMenuItem asChild>
                    <Link href="/success-story">Success Stories</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/help-center">Help Center</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ul>
          </div>

          {/* ---------- RIGHT SECTION (DESKTOP) ---------- */}
          <div className="flex gap-5">
            <Link href="/login" className="hidden xl:flex">
              <button className="flex items-center gap-2 bg-[#FF4D4F] text-white px-5 py-2 rounded-xl cursor-pointer">
                <DubbleUser /> Sign In
              </button>
            </Link>
            <Link href="/singup" className="hidden xl:flex">
              <button className="flex items-center gap-2 bg-[#FF4D4F] text-white px-5 py-2 rounded-xl cursor-pointer">
                <DubbleUser /> Sign Up
              </button>
            </Link>
          </div>

          {/* ---------- HAMBURGER (MOBILE) ---------- */}
          <button
            className="xl:hidden text-3xl cursor-pointer"
            onClick={() => setMobileMenu(true)}
          >
            <HiOutlineMenu />
          </button>
        </div>
      </nav>

      {/* ---------- OVERLAY ---------- */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* ---------- MOBILE MENU ---------- */}
      <div
        className={`fixed top-0 left-0 w-fit h-full bg-white z-50 py-6 transform transition-transform duration-300 ${
          mobileMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close */}
        <button
          className="text-2xl cursor-pointer fixed top-1 right-1"
          onClick={closeMobileMenu}
        >
          <HiX />
        </button>

        <ul className="text-lg font-medium pt-6 px-4 flex flex-col gap-3">
          <Link href="/" onClick={closeMobileMenu}>
            Home
          </Link>

          {/* Service (Mobile) */}
          <button
            type="button"
            className="text-left"
            onClick={() => setMobileServiceOpen((prev) => !prev)}
          >
            Service
          </button>

          {mobileServiceOpen && (
            <div className="flex flex-col pl-4 gap-2">
              <Link href="/howWork" onClick={closeMobileMenu}>
              
                How It Works
              </Link>
              <Link href="/find-editors" onClick={closeMobileMenu}>
                Find Editors
              </Link>
              <Link href="/jobs" onClick={closeMobileMenu}>
                Browse Jobs
              </Link>
              <Link href="/pricing" onClick={closeMobileMenu}>
                Pricing
              </Link>
            </div>
          )}

          {/* Contact (Mobile) */}
          <button
            type="button"
            className="text-left"
            onClick={() => setMobileContactOpen((prev) => !prev)}
          >
            Contact
          </button>

          {mobileContactOpen && (
            <div className="flex flex-col pl-4 gap-2">
              <Link href="/success-story" onClick={closeMobileMenu}>
                Success Stories
              </Link>
              <Link href="/help-center" onClick={closeMobileMenu}>
                Help Center
              </Link>
            </div>
          )}

          {/* Auth buttons */}
          <div className="flex gap-4 pt-4">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="bg-[#FF4D4F] text-white px-5 py-2 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <DubbleUser /> Sign In
              </div>
            </Link>
            <Link
              href="/singup"
              onClick={closeMobileMenu}
              className="bg-[#FF4D4F] text-white px-5 py-2 rounded-xl"
            >
              <div className="flex items-center gap-2">
                <DubbleUser /> Sign Up
              </div>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  );
}
