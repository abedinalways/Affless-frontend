import React from "react";

export default function ContactUs() {
  return (
    <div className="container mx-auto">
        <div className=" ">
      {/* Banner Wrapper */}
      <div className="relative rounded-3xl overflow-hidden ">

        {/* Background Image */}
        <div
          className="
            bg-cover bg-center bg-no-repeat 
           h-[500px] md:h-[383px] w-full 
            p-[50px] sm:p-16 
          " 
          style={{ backgroundImage: "url('/contact-us.png')" }} 
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Banner Content */}
    <div >
           <div className=" ">
           <div className="relative z-10 px-[100px] lg:px-[150px]">
            <p className="text-white font-['Plus_Jakarta_Sans'] text-[16px] font-bold leading-[150%]"
>CONTACT US</p>
            <h3 className="text-white font-['Plus_Jakarta_Sans'] text-[48px] font-bold leading-[118%]"
>
              Still Have Questions?
            </h3>

            <p className="text-white font-['Plus_Jakarta_Sans'] text-[16px] font-medium leading-[150%] mt-2"
>
             Our support team is here to help you with any concerns about safety, payments, or disputes.
            </p>

            <div className="flex flex-wrap items-center gap-[42px] mt-8">
              <button className="bg-[#FF4D4F] text-white p-[14px] rounded-xl text-[16px] font-normal leading-[150%]">
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
