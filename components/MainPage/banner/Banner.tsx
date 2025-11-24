import React from "react";

export default function Banner() {
  return (
    <div className=" py-16">
      {/* Banner Wrapper */}
      <div className="relative rounded-3xl overflow-hidden ">

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
       <div className="flex ">
           <div className="relative z-10 px-[100px] lg:px-[300px]">
            <h3 className="text-white font-poppins text-3xl sm:text-4xl font-semibold leading-[130%] max-w-2xl">
              Find the Right Editor <br /> or the Right Client
            </h3>

            <p className="text-white font-poppins text-base sm:text-lg leading-[150%] max-w-3xl mt-4">
              Editor Marketplace connects clients and editors across YouTube,
              Tiktok, Instagram, X (Twitter), Snapchat, Facebook, podcasts, ads,
              and more, with clear fees, secure payments, and fast results.
            </p>

            <div className="flex flex-wrap items-center gap-[42px] mt-8">
              <button className="bg-[#FF4D4F] text-white px-6 py-4 rounded-xl font-poppins text-base sm:text-lg">
                Post a Job Free
              </button>

              <button className=" text-white px-6 py-4   rounded-xl font-poppins text-base sm:text-lg border border-[#FF4D4F]">
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
