"use client";

import SecureIcon from "@/components/Icons/secureIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";
import { MdBlockFlipped } from "react-icons/md";
import { LuTriangleAlert } from "react-icons/lu";
import { TbAlertTriangle, TbAlertTriangleFilled } from "react-icons/tb";
import { IoMdCheckbox } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { FaArrowLeft, FaSquareCheck } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";
import { useEffect, useState } from "react";
import Link from "next/link";
import { routes } from "@/helper/routes";


export default function PlatformSefetyPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "";
  const [bannerLinks, setBannerLinks] = useState<{ label: string; href?: string }[]>([]);
  useEffect(() => {
    setBannerLinks(buildSourceBreadcrumbs(redirectUrl, {
      currentLabel: "Platform Safety Rules",
      fallbackBase: [{ label: "Home", href: "/" }],
    }));
  }, [redirectUrl]);
  return (
    <div>
      <div>
        <PageBanner
          title="Platform Safety Rules"
          bgImage="/findEditor.jpg"
          links={[...bannerLinks]}
        />

      </div>
      <div className=" min-h-screen lg:py-10 containers ">
        {(redirectUrl?.split("_")?.slice(-1)[0] === "postajob" || redirectUrl?.split("_")?.slice(-1)[0] === "hireaneditor") && <div className="grid items-center mb-10">
          <Link
            href={`${buildSourceBreadcrumbs(redirectUrl?.split("_")?.pop())?.[0]?.href}?redirect=${redirectUrl ? redirectUrl?.split("_").slice(0, -1).join("_") : ""}`}
            className="w-fit flex items-center gap-2 border px-5 py-3 rounded-md text-white border-white bg-[#ff4d4f] font-medium cursor-pointer hover:bg-[#fd4447] hover:text-white duration-300"
          >
            <FaArrowLeft />
            <span>Back to {buildSourceBreadcrumbs(redirectUrl?.split("_")?.pop())?.[0]?.label}</span>
          </Link>
        </div>}
        <div className=" bg-white ">
          <div className="  px-4 md:p-8 text-[#333]p-9">

            {/* Header Box */}
            <div className="bg-[#FFF6EE] border border-[#FF8C8B]  rounded-xl shadow-sm p-4 ">
              <h2 className=" font-normal text-[18px] text-[#333] flex items-center gap-2 pb-3.5">
                <MdBlockFlipped className="text-red-500" />
                Off-Platform Communication & Payment Policy
              </h2>
              <p className="text-[18px] lg:text-[24px]  text-[#4A4C56] ">
                Staying safe and compliant as a client or editor.
              </p>
            </div>

            {/* Section Title */}
            <div className="py-6 lg:py-8">
              <h3 className="text-[20px] lg:text-[24px]  text-[#4A4C56]  mb-3">How It Works</h3>
              <p className=" font-normal text-[16px] text-[#333] flex items-center">Editor Marketplace makes it simple for clients and editors to work together safely and professionally. Follow these rules to keep every job fair, secure, and on-platform.</p>
            </div>

            <div className="space-y-8">
              {/* 1. Strict Rule */}
              <div className=" ">
                <h4 className="text-lg lg:text-[24px] font-medium text-[#333] flex items-center gap-2">
                  <span className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full text-[20px] lg:text-[24px]  text-[#FF4D4F]  ">
                    1
                  </span>
                  Strict No Off-Platform Contact Rule
                </h4>

                <p className="font-normal text-[16px] text-[#333] flex items-center pt-3 pb-6">
                  To protect all users and maintain a fair, secure environment, all communication and payment must stay on Editor Marketplace. This means:
                </p>

                <div className="bg-[#F7F6F6] rounded-lg">
                  <ul className="list-disc ml-6 space-y-3.5   ">
                    <li className="text-[#333] font-poppins text-[18px] font-normal leading-[150%]">Do not share or request personal contact details such as phone numbers, email addresses, or social media handles.</li>
                    <li className="text-[#333] font-poppins text-[18px] font-normal leading-[150%]">Do not attempt to move conversations, negotiations, or file exchanges outside the platform (e.g., Instagram, WhatsApp, Telegram).</li>
                    <li className="text-[#333] font-poppins text-[18px] font-normal leading-[150%]">Do not offer or request direct payment outside of Editor Marketplace (e.g., PayPal, CashApp, Venmo).</li>
                  </ul>
                </div>
              </div>

              {/* 2. Why Rule Exists */}
              <div className="bg-white rounded-xl  mb-8">
                <h4 className=" font-medium flex items-center gap-2 text-[18px] lg:text-[24px]  text-[#333] ">
                  <span className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full text-[20px] lg:text-[24px]  text-[#FF4D4F]">
                    2
                  </span>
                  Why This Rule Exists
                </h4>
                <p className="font-normal text-[16px] text-[#333] flex items-center pt-3 pb-6">Keeping all interactions within Editor Marketplace ensures:</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  <div className="border border-[#6D9AFD] bg-[#EFF6FF] p-4 rounded-lg">
                    <h5 className="text-[#1F398E] text-[24px] font-medium leading-[150%] pb-4"> Secure Payment</h5>
                    <p className="text-[#1F398E]  text-[14px] font-normal leading-[150%] ">All payments run through a secure system with escrow protection.</p>
                  </div>

                  <div className="border border-[#6D9AFD] bg-[#EFF6FF] p-4 rounded-lg">
                    <h5 className="text-[#1F398E] text-[24px] font-medium leading-[150%] pb-4">Dispute Protection</h5>
                    <p className="text-[#1F398E]  text-[14px] font-normal leading-[150%] ">Clear records in case of misunderstandings or issues</p>
                  </div>

                  <div className="border border-[#6D9AFD] bg-[#EFF6FF] p-4 rounded-lg">
                    <h5 className="text-[#1F398E] text-[24px] font-medium leading-[150%] pb-4">Fairness & Trust</h5>
                    <p className="text-[#1F398E]  text-[14px] font-normal leading-[150%] ">Preventing scams, undercutting, or manipulation</p>
                  </div>

                  <div className="border border-[#6D9AFD] bg-[#EFF6FF] p-4 rounded-lg">
                    <h5 className="text-[#1F398E] text-[24px] font-medium leading-[150%] pb-4">Secure Payment</h5>
                    <p className="text-[#1F398E]  text-[14px] font-normal leading-[150%] ">Improvements that benefit everyone in the community</p>
                  </div>

                </div>
              </div>

              {/* 3. Violations */}
              <div className="bg-white  rounded-xl mb-6">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-[20px] lg:text-[24px]  text-[#333] ">
                  <span className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full text-[18px] lg:text-[24px]  text-[#FF4D4F] ">
                    3
                  </span>
                  Violations & Consequences
                </h4>
                <p className="font-normal text-[16px] text-[#333] flex items-center pt-3 pb-6">Any attempt by either party (client or editor) to take a job or Payment off-platform will result in:</p>

                {/* First Violation */}
                <div className=" border border-[#FF4D4F] bg-[#FFEEEE] p-5 rounded-xl">
                  <h5 className="font-semibold text-[#FF4D4F] mb-2 flex items-center gap-2">
                    <TbAlertTriangleFilled className="text-yellow-500" /> First Violation (Automated)
                  </h5>

                  <p className="text-[14px] font-normal leading-150% text-[#FF4D4F] pb-4">The following actions are triggered immediately and automatically:</p>

                  <ul className="list-disc ml-6 space-y-2.5 text-sm text-[16px] font-normal leading-150% text-[#333] ">
                    <li>Written warning displayed for 21 days on your dashboard</li>
                    <li>Automatic $25 balance deduction (applies to both clients and editors)</li>
                    <li>Must acknowledge warning before continuing to use the platform</li>
                    <li>Violation logged in enforcement database for transparency</li>
                  </ul>
                </div>

                {/* Second Violation */}
                <div className="mt-6 border border-red-300 bg-red-50 p-5 rounded-xl">
                  <h5 className="font-semibold text-[#FF4D4F] mb-2 flex items-center gap-2">
                    <MdBlockFlipped className="text-red-500" /> Second Violation (Automated – Permanent)
                  </h5>
                  <p className="text-[14px] font-normal leading-150% text-[#FF4D4F] pb-4">No manual review required. The system will:</p>

                  <ul className="list-disc ml-6 space-y-2.5 text-sm text-[16px] font-normal leading-150% text-[#333] ">
                    <li>Permanently deactivate your account immediately</li>
                    <li>Remove access to funds and job history</li>
                    <li>Flag the account as "Terminated for Policy Breach"</li>
                    <li>Block the user from creating new accounts on the platform</li>
                  </ul>
                </div>
              </div>

              {/* 4. Reporting */}
              <div className=" rounded-xl  mb-6">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-[20px] lg:text-[24px]  text-[#4A4C56] pb-3">
                  <span className="w-12 h-12 flex items-center justify-center bg-[#F0FDF4] rounded-full text-[20px] lg:text-[24px]  text-[#00A63E] ">
                    4
                  </span>
                  Reporting & Protection
                </h4>
                <p className="text-[14px] font-normal leading-150%  pb-4">If someone asks to communicate or pay off-platform:</p>

                <div className="border border-[#00A63E]  bg-[#F0FDF4] rounded-lg">
                  <ul className="list-disc space-y-3.5 text-sm text-[18px] font-normal ml-6 leading-150% text-[#333]  p-4 ">
                    <li>Do not share your information. Decline the request immediately.</li>
                    <li>If someone pressures you to move off-platform, report it immediately using the Report User button.</li>
                    <li>The report team will review promptly and take necessary action to keep the community safe.</li>
                  </ul>
                </div>
              </div>

              {/* 5. Example Scenarios */}
              <div className="bg-white rounded-xl ">
                <h4 className="text-lg font-semibold flex items-center gap-2 text-[20px] lg:text-[24px]  text-[#4A4C56] pb-3">
                  <span className="w-12 h-12 flex items-center justify-center bg-[#F0FDF4] rounded-full text-[20px] lg:text-[24px]  text-[#00A63E] ">
                    5
                  </span>
                  Example Scenarios (for clarity)
                </h4>

                <p className=" mb-6">If someone asks to communicate or pay off-platform:</p>

                {/* Allowed */}
                <div className="border border-green-300 bg-green-50 p-4 rounded-lg mb-4">
                  <h5 className=" text-[18px] font-normal flex items-center gap-2 text-[#333]">
                    <FaSquareCheck className="text-green-500" /> Allowed
                  </h5>
                  <p className="text-[18px] font-normal leading-150% pt-3.5">
                    Sharing job files through Editor Marketplace’s built-in upload system. All work-related files, feedback, and deliverables should use our secure file sharing.
                  </p>
                </div>

                {/* Not Allowed */}
                <div className="border border-red-300 bg-red-50 p-4 rounded-lg">
                  <h5 className="font-normal text-[#333] mb-2 flex items-center gap-2 text-[18px]">
                    <RxCross2 className="text-red-500 font-semibold text-2xl" /> Not Allowed
                  </h5>

                  <ul className="list-disc ml-6 text-[18px] font-normal leading-150% space-y-3.5">
                    <li>Can you email me your work?</li>
                    <li>Let’s continue this on WhatsApp — it’s faster.</li>
                    <li>Can you give me your PayPal? I’ll pay you directly.</li>
                    <li>Message me on Instagram for faster communication.</li>
                    <li>Call me at (555) 123-4567 to discuss the job.</li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
