import React from "react";
import Image from "next/image";
import Youtube from "@/components/Icons/Youtube";
import Link from "next/link";

export default function Subscribe() {
  return (
    <div className="pt-8 lg:pt-0 ">
      <div className="w-full bg-[#E74C4C] py-10 text-center text-white containers   ">

        {/* YouTube Icon */}
        <div className="flex justify-center mb-6 ">
          <Youtube />
        </div>

        {/* Heading */}
        <h2 className="text-white text-center font-[Poppins] text-[32px] lg:text-[48px] font-semibold leading-[120%]"
        >
          Subscribe to our YouTube channel
        </h2>

        {/* Description */}
        <p className="text-[#E9E9EA] text-center font-[Poppins] text-[18px] font-medium leading-[120%] mt-5"
        >
          Get editing tips, tutorials, and unlock a one-time discount:
          5% for clients, 2.5% for editors
        </p>

        {/* Button */}
        <div className="grid items-center justify-center">
          <Link href='https://www.youtube.com' target="_blank" className="text-[#FF4D4F] block w-fit font-[Poppins] text-[16px] font-normal leading-[150%] bg-[#FFFFFF] hover:bg-[#FFEDED] py-[18px] px-[26px] rounded-lg mt-5 cursor-pointer duration-300"
          >
            Subscribe Now
          </Link>
        </div>

      </div>
    </div>
  );
}
