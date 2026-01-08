"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import DubbleUser from "@/components/Icons/dubbleuser";
import { FaAngleDown } from "react-icons/fa";

// shadcn (DESKTOP ONLY)
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function NavbarWithoutLogin() {
  const pathname = usePathname();

  const [mobileMenu, setMobileMenu] = useState(false);

  // ✅ mobile dropdown states
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
    setMobileServiceOpen(false);
    setMobileContactOpen(false);
  };

  // ✅ active style
  const activeCls = "text-[#FF4D4F] font-semibold";
  const inactiveCls = "text-[#333] hover:text-[#FF4D4F] transition-colors";

  const isActive = (href: string) => pathname === href;

  const serviceRoutes = ["/howWork", "/find-editors", "/jobs", "/pricing"];
  const contactRoutes = ["/success-story", "/help-center"];

  const serviceActive = serviceRoutes.includes(pathname);
  const contactActive = contactRoutes.includes(pathname);

  return (
    <div className="containers bg-white">
      <nav>
        <div className="flex justify-between items-center py-4.5">
          {/* ---------- LEFT SECTION ---------- */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/" className="cursor-pointer">
              <div className="w-32 h-[42px] flex justify-center items-center overflow-hidden">
                <Image
                  src="/images/logoUpdate.png"
                  width={128}
                  height={42}
                  alt="Logo"
                  className="object-cover"
                />
              </div>
            </Link>

            {/* ---------- DESKTOP MENU ---------- */}
            <ul className="hidden xl:flex items-center gap-10 font-poppins text-base">
              <li>
                <Link
                  href="/"
                  className={isActive("/") ? activeCls : inactiveCls}
                >
                  Home
                </Link>
              </li>

              {/* Service (Desktop) */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`cursor-pointer ${serviceActive ? activeCls : inactiveCls}`}
                >
                  <div className="flex items-center gap-1">
                    <span>Service</span>
                    <FaAngleDown className={`${serviceActive ? "rotate-180" : ""}`} />
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="z-1000">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/howWork"
                      className={`cursor-pointer ${isActive("/howWork") ? activeCls : inactiveCls}`}
                    >
                      How It Works
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/find-editors"
                      className={`cursor-pointer ${isActive("/find-editors") ? activeCls : inactiveCls}`}
                    >
                      Find Editors
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/jobs"
                      className={`cursor-pointer ${isActive("/jobs") ? activeCls : inactiveCls}`}
                    >
                      Browse Jobs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/pricing"
                      className={`cursor-pointer ${isActive("/pricing") ? activeCls : inactiveCls}`}
                    >
                      Pricing
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Contact (Desktop) */}
              <DropdownMenu>
                <DropdownMenuTrigger
                  className={`cursor-pointer ${contactActive ? activeCls : inactiveCls}`}
                >
                  <div className="flex items-center gap-1">
                    <span>Contact</span>
                    <FaAngleDown />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="z-1000">
                  <DropdownMenuItem asChild>
                    <Link
                      href="/success-story"
                      className={`cursor-pointer ${isActive("/success-story") ? activeCls : inactiveCls}`}
                    >
                      Success Stories
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/help-center"
                      className={`cursor-pointer ${isActive("/help-center") ? activeCls : inactiveCls}`}
                    >
                      Help Center
                    </Link>
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
        className={`fixed top-0 left-0 w-fit h-full bg-white z-50 py-6 transform transition-transform duration-300 ${mobileMenu ? "translate-x-0" : "-translate-x-full"
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
          <Link
            href="/"
            onClick={closeMobileMenu}
            className={`${isActive("/") ? activeCls : inactiveCls} cursor-pointer`}
          >
            Home
          </Link>

          {/* Service (Mobile) */}
          <button
            type="button"
            className={`text-left cursor-pointer ${serviceActive ? activeCls : inactiveCls}`}
            onClick={() => setMobileServiceOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-1">
              <span>Service</span>
              <FaAngleDown />
            </div>
          </button>

          {mobileServiceOpen && (
            <div className="flex flex-col pl-4 gap-2">
              <Link
                href="/howWork"
                onClick={closeMobileMenu}
                className={`${isActive("/howWork") ? activeCls : inactiveCls} cursor-pointer`}
              >
                How It Works
              </Link>
              <Link
                href="/find-editors"
                onClick={closeMobileMenu}
                className={`${isActive("/find-editors") ? activeCls : inactiveCls} cursor-pointer`}
              >
                Find Editors
              </Link>
              <Link
                href="/jobs"
                onClick={closeMobileMenu}
                className={`${isActive("/jobs") ? activeCls : inactiveCls} cursor-pointer`}
              >
                Browse Jobs
              </Link>
              <Link
                href="/pricing"
                onClick={closeMobileMenu}
                className={`${isActive("/pricing") ? activeCls : inactiveCls} cursor-pointer`}
              >
                Pricing
              </Link>
            </div>
          )}

          {/* Contact (Mobile) */}
          <button
            type="button"
            className={`text-left cursor-pointer ${contactActive ? activeCls : inactiveCls}`}
            onClick={() => setMobileContactOpen((prev) => !prev)}
          >
            <div className="flex items-center gap-1">
              <span>Contact</span>
              <FaAngleDown />
            </div>
          </button>

          {mobileContactOpen && (
            <div className="flex flex-col pl-4 gap-2">
              <Link
                href="/success-story"
                onClick={closeMobileMenu}
                className={`${isActive("/success-story") ? activeCls : inactiveCls} cursor-pointer`}
              >
                Success Stories
              </Link>
              <Link
                href="/help-center"
                onClick={closeMobileMenu}
                className={`${isActive("/help-center") ? activeCls : inactiveCls} cursor-pointer`}
              >
                Help Center
              </Link>
            </div>
          )}

          {/* Auth buttons */}
          <div className="flex gap-4 pt-4">
            <Link
              href="/login"
              onClick={closeMobileMenu}
              className="bg-[#FF4D4F] text-white px-5 py-2 rounded-xl cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <DubbleUser /> Sign In
              </div>
            </Link>

            <Link
              href="/singup"
              onClick={closeMobileMenu}
              className="bg-[#FF4D4F] text-white px-5 py-2 rounded-xl cursor-pointer"
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
