import React from "react";

export default function Banner() {
  return (
    <div className=" ">
      {/* Banner Wrapper */}
      <div className="relative overflow-hidden ">

        {/* Background Image */}
        <div
          className="
            bg-cover bg-center bg-no-repeat 
           h-[500px] md:h-[700px] w-full 
            p-10 sm:p-16 
          " 
          style={{ backgroundImage: "url('/banner.png')" }} 
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Banner Content */}
      <div className="flex items-center min-h-[500px]">
  <div className="relative z-10 px-[100px] lg:px-[150px]">
    <h3 className="text-white font-[Poppins] text-[72px] font-semibold leading-[120%]"
>
      Find the Right Editor <br /> or the Right Client
    </h3>

    <p className="text-white font-[Poppins] text-[16px] font-normal leading-[150%] mt-6"
>
      Editor Marketplace connects clients and editors across YouTube,
      Tiktok, Instagram, X (Twitter), Snapchat, Facebook, podcasts, ads,
      and more, with clear fees, secure payments, and fast results.
    </p>

    <div className="flex flex-wrap items-center gap-[42px] mt-8">
      <button className="bg-[#FF4D4F] text-white px-6 py-4 rounded-xl font-poppins text-base sm:text-lg">
        Post a Job Free
      </button>

      <button className="text-white px-6 py-4 rounded-xl font-poppins text-base sm:text-lg border border-[#FF4D4F]">
        Become an Editor
      </button>
    </div>
  </div>
</div>

        </div>

      </div>
    </div>
  );
}
