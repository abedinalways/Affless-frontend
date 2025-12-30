import Link from "next/link";
import React from "react";

export default function Banner() {
  return (
  <div className="">
  {/* Banner Wrapper */}
  <div className="relative overflow-hidden">

    {/* Background Image */}
    <div
      className="
        bg-cover bg-center bg-no-repeat 
        h-[500px] md:h-[700px] w-full relative
      "
      style={{ backgroundImage: "url('/banner.png')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Banner Content */}
      <div className="absolute inset-0 flex items-center  containers">
        
        {/* Left aligned content */}
        <div className="relative z-10 ">
          
          <h3
            className="
              text-white font-[Poppins]
              lg:text-[72px] md:text-[50px] text-[32px]
              font-medium leading-[120%]
            "
          >
            Find the Right Editor <br className="hidden md:block" /> or the Right Client
          </h3>

          <p
            className="
              text-white font-[Poppins] text-[16px]
              font-normal leading-[150%] mt-6 max-w-2xl
            "
          >
            Editor Marketplace connects clients and editors across YouTube,
            Tiktok, Instagram, X (Twitter), Snapchat, Facebook, podcasts, ads,
            and more, with clear fees, secure payments, and fast results.
          </p>

          <div className="flex items-center gap-5 md:gap-[42px] mt-8 cursor-pointer">
            <Link href="/client/post-job" className="bg-[#FF4D4F] text-white px-3 md:px-6.5 py-4 md:py-4.5 rounded-xl font-poppins text-base sm:text-lg cursor-pointer">
              Post a Job Free
            </Link>

            <Link href="/editor" className="text-white px-3 md:px-6.5 py-4.5 md:py-4 rounded-xl font-poppins text-base sm:text-lg border border-[#FF4D4F] cursor-pointer">
              Become an Editor
            </Link>
          </div>

        </div>
      </div>

    </div>
  </div>
</div>

  );
}
