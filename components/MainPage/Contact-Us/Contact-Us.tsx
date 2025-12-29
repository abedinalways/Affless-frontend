import React from "react";

import { Plus_Jakarta_Sans } from "next/font/google";
import Link from "next/link";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function ContactUs() {
  return (
    <div className="containers mx-auto">
      <div className="pt-8 md:pt-20 ">
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
            <div className="absolute inset-0 flex items-center px-5 lg:px-0 " >
              <div className=" ">
                <div className="relative z-10 px-[5x] lg:px-[150px]">
                  <p className={`text-white text-[16px] font-bold leading-[150%] ${plusJakartaSans.className}`}
                  >CONTACT US</p>
                  <h3 className={`text-white text-[32px] lg:text-[48px] font-bold leading-[118%] ${plusJakartaSans.className} mt-4`}
                  >
                    Still Have Questions?
                  </h3>

                  <p className={`text-white text-[16px] font-medium leading-[150%] mt-2 ${plusJakartaSans.className}`}
                  >
                    Our support team is here to help you with any concerns about safety, payments, or disputes.
                  </p>

                  <div className="flex flex-wrap items-center gap-[42px] mt-8">
                    <Link href="/help-center" className="bg-[#FF4D4F] text-white p-2.5 rounded-xl text-[16px] font-normal leading-[150%]">
                      Contact Support
                    </Link>
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
