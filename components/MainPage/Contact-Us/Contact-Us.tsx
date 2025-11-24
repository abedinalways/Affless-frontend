import React from "react";

export default function ContactUs() {
  return (
    <div className="container mx-auto">
        <div className=" py-16">
      {/* Banner Wrapper */}
      <div className="relative rounded-3xl overflow-hidden ">

        {/* Background Image */}
        <div
          className="
            bg-cover bg-center bg-no-repeat 
           h-[500px] md:h-[383px] w-full 
            p-10 sm:p-16 
          " 
          style={{ backgroundImage: "url('/contact-us.png')" }} 
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Banner Content */}
    <div>
           <div className=" ">
           <div className="relative z-10 px-[100px] lg:px-[300px]">
            <p className="text-white">CONTACT US</p>
            <h3 className="text-white font-poppins text-3xl sm:text-4xl font-semibold leading-[130%] max-w-2xl">
              Still Have Questions?
            </h3>

            <p className="text-white font-poppins text-base sm:text-lg leading-[150%] max-w-3xl mt-4">
             Our support team is here to help you with any concerns about safety, payments, or disputes.
            </p>

            <div className="flex flex-wrap items-center gap-[42px] mt-8">
              <button className="bg-[#FF4D4F] text-white px-6 py-4 rounded-xl font-poppins text-base sm:text-lg">
               Contact Support
              </button>

            
            </div>
          </div>
       </div>
    </div>
        </div>

      </div>
    </div>
    </div>
  );
}
