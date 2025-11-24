"use client";

import DubbleUser from "@/components/Icons/dubbleuser";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
   <div className=" container w-full mx-auto">
     <nav className=" w-full ">
      <div className=" bg-white   flex  justify-between pt-4 ">

        {/* Left Logo */}
        <div className=" gap-2">
           <Image src="/fdf.png" alt='logo' height={10} width={60} className=""></Image>
        
        </div>

        {/* Menu Items */}
        <ul className="hidden md:flex items-center gap-8 text-[#333] font-poppins text-base">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/service">Service</Link></li>
          <li><Link href="/jobs">Browse Jobs</Link></li>
          <li><Link href="/editors">Find Editors</Link></li>
          <li><Link href="/pricing">Pricing</Link></li>
        </ul>

        {/* Sign In */}
        <Link href="/signin">
          <button className="flex justify-center items-center mx-auto gap-2 bg-[#FF4D4F] text-white px-5 py-2 rounded-xl font-poppins text-base mt-2">
            <span><DubbleUser/></span> Sign In
          </button>
        </Link>

      </div>
    </nav>
   </div>
  );
}
