"use client";

import DubbleUser from "@/components/Icons/dubbleuser";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="containers w-screen">
      <nav className=" ">
        <div className=" flex  justify-between py-3  ">

          {/* Left Logo */}
          <div className="flex gap-10 justify-center items-center">
            <div className=" gap-2 w-[100px] h-[50px] flex justify-center items-center overflow-hidden">
              <Image src="/fdf.png" alt='logo' height={500} width={500} className=" w-full object-cover"></Image>
            </div>

          {/* Menu Items */}
          <ul className="hidden md:flex items-center gap-8 text-[#333] font-poppins text-base">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/service">Service</Link></li>
            <li><Link href="/jobs">Browse Jobs</Link></li>
            <li><Link href="/findEditors">Find Editors</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* Sign In */}
        <Link href="/login">
          <button className="flex justify-center items-center mx-auto gap-2 bg-[#FF4D4F] text-white px-5 py-2 rounded-xl font-poppins text-base ">
            <span><DubbleUser /></span> Sign In
          </button>
        </Link>
    </div>
      </nav >
    </div >
  );
}
