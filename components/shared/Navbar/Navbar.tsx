"use client";

import Image from "next/image";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdMailOutline } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import DubbleUser from "@/components/Icons/dubbleuser";

// shadcn
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    // 🔓 LOGGED OUT NAVBAR
    return (
      <div className="containers">
        <nav>
          <div className="flex justify-between items-center py-3">
            {/* Left section */}
            <div className="flex items-center gap-10">
              {/* Logo */}
              <div className="w-[100px] h-[50px] flex justify-center items-center overflow-hidden">
                <Image
                  src="/fdf.png"
                  alt="logo"
                  height={500}
                  width={500}
                  className="w-full object-cover"
                />
              </div>

              {/* Menu */}
              <ul className="hidden md:flex items-center gap-8 text-[#333] font-poppins text-base">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/service">Service</Link></li>
                <li><Link href="/jobs">Browse Jobs</Link></li>
                <li><Link href="/find-editors">Find Editors</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>

            {/* Right: Sign In */}
            <Link href="/login" className="flex">
              <button className="flex items-center gap-2 bg-[#FF4D4F] text-white px-5 py-2 rounded-xl font-poppins text-base">
                <DubbleUser /> Sign In
              </button>
            </Link>
          </div>
        </nav>
      </div>
    );
  }

  // 🔐 LOGGED IN NAVBAR
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

              {/* ✅ My Business – shadcn DropdownMenu */}
              <li className="relative">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 cursor-pointer select-none">
                      My Business
                      <MdKeyboardArrowDown className="w-4 h-4" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href="/manage-job">Manage Job</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/find-editor">Find Editor</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/job-proposal">Job Proposal</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/payment-history">Payment History</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>

              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex gap-8 items-center">
            <Link href="#" className="">
              Become an Editor
            </Link>

            <IoMdNotificationsOutline className="w-7 h-7 cursor-pointer" />
            <MdMailOutline className="w-7 h-7 cursor-pointer" />

            <Link href="#" className="flex">
              <Image
                src="/images/profile.png"
                alt="profile"
                width={32}
                height={32}
                className="rounded-full"
              />
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

