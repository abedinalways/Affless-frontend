"use client";

import DubbleUser from "@/components/Icons/dubbleuser";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
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
