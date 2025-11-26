import PageBanner from "@/components/reusable/Bgbanner";
import React from "react";
import TikmarkIcon from "@/components/Icons/TikmarkIcon";

export default function PaymentProtectionPage() {
  return (
    <div>
      {/* 🔹 PAGE BANNER */}
      <PageBanner
        title="Payment Protection"
        bgImage="/findEditor.jpg"
        links={[
          { label: "Home", href: "/" },
          { label: "Payment Protection" },
        ]}
      />

      {/* 🔹 HERO SECTION */}
      <div
        className="h-full md:h-[394px] bg-cover bg-center relative overflow-hidden my-20"
        style={{ backgroundImage: `url('/images/Phone.jpg')` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="containers relative z-10 h-full flex flex-col md:flex-row justify-between items-center py-20">

          {/* LEFT TEXT BLOCK */}
          <div className="max-w-lg text-white space-y-4 ">
            {/* Badge */}
            <button className="bg-[#534E45] px-4 py-2 rounded-md text-[14px] font-medium flex items-center gap-2">
              <TikmarkIcon className="w-4 h-4" /> 100% Secure
            </button>

            <p className="text-[28px] font-semibold leading-[130%]">
              Pay Safely. Hire Confidently.
            </p>

            <p className="text-[16px] leading-[150%] text-white/90">
              Your payments are protected until your project is completed to your satisfaction.
            </p>

            <button className="py-3 px-6 bg-[#FF4D4F] rounded-md text-[16px] font-medium">
              Learn How It Works
            </button>
          </div>

          {/* RIGHT ROUND ICON */}
          <div className="flex justify-center items-center mt-10 md:mt-0">
            <div className="w-[150px] h-[150px] rounded-full bg-white/30 backdrop-blur flex items-center justify-center">
              <div className="w-[70px] h-[70px] rounded-full bg-white flex items-center justify-center">
                <TikmarkIcon className="w-[32px] h-[32px] text-black" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
