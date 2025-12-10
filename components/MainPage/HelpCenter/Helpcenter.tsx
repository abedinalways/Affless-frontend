"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageBanner from "@/components/reusable/Bgbanner";

import UserIcon from "@/components/Icons/userIcon";
import PaymentIcon from "@/components/Icons/payments";
import SupportIcon from "@/components/Icons/supportIcon";
import MassageIcon from "@/components/Icons/massageIcon";
import { IoDocumentTextOutline } from "react-icons/io5";

export default function HelpCenterPage() {
  // NEW — active category state
  const [activeTab, setActiveTab] = useState<"account" | "payment" | "support">(
    "support"
  );

  return (
    <div>
      <PageBanner
        title="Help Center"
        bgImage="/findEditor.jpg"
        links={[{ label: "Home", href: "/" }, { label: "Help Center" }]}
      />

      <div className="bg-[#F7F7F7] min-h-screen lg:py-20">
        <div className="containers mx-auto px-4">
          <h1 className="text-[36px] font-semibold text-[#333] mb-6">
            Help Center
          </h1>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles, FAQs, or topics..."
              className="w-full py-3 pl-12 pr-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-red-300 outline-none"
            />
          </div>

          {/* CATEGORY TABS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-14">
            {/* Account */}
            <div
              onClick={() => setActiveTab("account")}
              className={`bg-white p-6 rounded-lg text-center cursor-pointer transition shadow 
                ${
                  activeTab === "account"
                    ? "border border-red-300 shadow-lg"
                    : "hover:border-red-200 border-transparent"
                }`}
            >
              <UserIcon className="mx-auto text-red-500 mb-3" />
              <p className="font-medium text-[#333]">Account & Profile</p>
            </div>

            {/* Payments */}
            <div
              onClick={() => setActiveTab("payment")}
              className={`bg-white p-6 rounded-lg text-center cursor-pointer transition shadow 
                ${
                  activeTab === "payment"
                    ? "border border-red-300 shadow-lg"
                    : "hover:border-red-200 border-transparent"
                }`}
            >
              <PaymentIcon className="mx-auto text-red-500 mb-3" />
              <p className="font-medium text-[#333]">Payments & Billing</p>
            </div>

            {/* Support */}
            <div
              onClick={() => setActiveTab("support")}
              className={`bg-white p-6 rounded-lg text-center cursor-pointer transition shadow 
                ${
                  activeTab === "support"
                    ? "border border-red-300 shadow-lg"
                    : "hover:border-red-200 border-transparent"
                }`}
            >
              <SupportIcon className="mx-auto text-red-500 mb-3" />
              <p className="font-medium text-[#333]">Support & Contact</p>
            </div>
          </div>

          {/* FAQ SECTION — ONLY SHOW IF SUPPORT ACTIVE */}
          {activeTab === "support" && (
            <>
              <h2 className="text-[18px] font-medium text-[#000] mb-4">
                Support & Contact
              </h2>

              <div className="bg-white rounded-xl shadow p-4">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150%">
                      <div className="flex gap-3">
                        <IoDocumentTextOutline className="w-6 h-6" />
                        <p>How to contact customer support</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4 ">
                      You can reach our customer support team 24/7 through live
                      chat or email. We are ready to assist you with account
                      issues, order-related questions, technical problems, and
                      general support. You can expect a quick response, as our
                      team is committed to providing fast and effective
                      assistance.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150%">
                      <div className="flex gap-3">
                        <IoDocumentTextOutline className="w-6 h-6" />
                        <p>Reporting technical issues or bugs</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4 pl-9">
                      If you encounter any technical issues or bugs, please
                      report them through our support form or live chat. Provide
                      as much detail as possible, including screenshots if
                      available, so our team can diagnose and resolve the
                      problem quickly.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150%">
                      <div className="flex gap-3">
                        <IoDocumentTextOutline className="w-6 h-6" />
                        <p>Dispute resolution process</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4 pl-9">
                      If there is a disagreement between a client and an editor,
                      you may open a dispute through the Resolution Center. Our
                      team Will review the case within 48 hours, gather relevant
                      information, and work toward a fair and transparent
                      outcorne for both sides.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150%">
                      <div className="flex gap-3">
                        <IoDocumentTextOutline className="w-6 h-6" />
                        <p>Community guidelines and code of conduct</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4 pl-9">
                      We ask all users to follow our community guidelines to
                      maintain a professional, safe, and supportive environment.
                      Respectful communication, honest collaboration, and
                      compliance With platform rules ensure a positive
                      experience for everyone.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150%">
                      <div className="flex gap-3">
                        <IoDocumentTextOutline className="w-6 h-6" />
                        <p>providing feedback and feature requests</p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 pb-4 pl-9">
                      We welcome your feedback and suggestions. You can submit
                      new feature requests or share ideas for improvement
                      through our support form. Your input helps us refine the
                      platform and deliver a better experience for the entire
                      community.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </>
          )}

          {/* Bottom Support Boxes (Always Visible) */}
          <div className="bg-white shadow rounded-xl mt-12 p-10 text-center">
            <SupportIcon className="text-red-400 bg-[#FFEEEE] mx-auto mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />

            <h3 className="text-[20px] font-semibold text-[#333] mb-2">
              Need More Help?
            </h3>
            <p className="text-gray-500 mb-8">
              Can’t find what you’re looking for? Our support team is ready to
              assist you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Live Chat */}
              <div className="shadow-0  lg:shadow-2xl rounded-xl p-0 md:p-6 bg-white pt-3.5">
                <div className="flex items-start gap-4">
                  <MassageIcon className="text-red-400 bg-[#FFEEEE] mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />

                  <div className="text-left">
                    <p className="font-medium text-[18px] text-[#333]">
                      Live Chat
                    </p>
                    <p className=" font-normal text-normal mb-4 text-[#777980] pt-3">
                      Average response: 2 min
                    </p>
                  </div>
                </div>

                <button className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg">
                 Email Support
                </button>
              </div>

              {/* Email Support */}
              <div className="shadow-0  lg:shadow-2xl rounded-xl p-0 md:p-6 bg-white pt-3.5">
                <div className="flex items-start gap-4">
                  <MassageIcon className="text-red-400 bg-[#FFEEEE] mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />

                  <div className="text-left">
                    <p className="font-medium text-[18px] text-[#333]">
                      Email Support
                    </p>
                    <p className=" font-normal text-normal mb-4 text-[#777980] pt-3">
                      Average response: 24 hrs
                    </p>
                  </div>
                </div>

                <button className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg">
                  Submit a Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { Search } from "lucide-react";
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { IoDocumentTextOutline } from "react-icons/io5";
// import { Headphones, User, CreditCard, LifeBuoy, MessageCircle } from "lucide-react";
// import PageBanner from "@/components/reusable/Bgbanner";
// import { BiSupport } from "react-icons/bi";
// import UserIcon from "@/components/Icons/userIcon";
// import PaymentIcon from "@/components/Icons/payments";
// import SupportIcon from "@/components/Icons/supportIcon";
// import MassageIcon from "@/components/Icons/massageIcon";
// import { FcDocument } from "react-icons/fc";
// export default function HelpCenterPage() {
//   return (
//     <div>
//           <div>
//         <PageBanner
//   title="Help Center"
//   bgImage="/findEditor.jpg"
//   links={[
//     { label: "Home", href: "/" },
//     { label: "Help Center" }
//   ]}
// />

//       </div>
//       <div className="bg-[#F7F7F7] min-h-screen lg:py-20">
//       <div className="containers mx-auto px-4">

//         <h1 className="text-[36px] font-semibold text-[#333] mb-6">Help Center</h1>

//         <div className="relative">
//           <Search className="absolute left-4 top-3 text-gray-400" size={20} />
//           <input
//             type="text"
//             placeholder="Search articles, FAQs, or topics..."
//             className="w-full py-3 pl-12 pr-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-red-300 outline-none"
//           />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-14">

//           <div className="bg-white hover:shadow-lg shadow border border-transparent hover:border-red-200 p-6 rounded-lg text-center cursor-pointer transition">
//             <UserIcon className="mx-auto text-red-500 mb-3"  />
//             <p className="font-medium text-[#333]">Account & Profile</p>
//           </div>

//           <div className="bg-white hover:shadow-lg shadow border border-transparent hover:border-red-200 p-6 rounded-lg text-center cursor-pointer transition">
//             <PaymentIcon className="mx-auto text-red-500 mb-3" />
//             <p className="font-medium text-[#333]">Payments & Billing</p>
//           </div>

//           <div className="bg-white shadow border border-red-300 p-6 rounded-lg text-center cursor-pointer transition">
//             <SupportIcon className="mx-auto text-red-500 mb-3"  />
//             <p className="font-medium text-[#333]">Support & Contact</p>
//           </div>

//         </div>

//         <h2 className="text-[18px] font-medium text-[#000] mb-4">Support & Contact</h2>

//         <div className="bg-white rounded-xl shadow p-4">

//           <Accordion type="single" collapsible>

//             {/* Item 1 */}
//             <AccordionItem value="item-1" className="border-none">
//               <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150%  ">

//                <div className="flex gap-3">
//                 <IoDocumentTextOutline  className="w-6 h-6"/>
//                  <p>How to contact customer support</p>
//                </div>
//               </AccordionTrigger>
//               <AccordionContent className="text-gray-600 pb-4">
//                 You can contact our customer support through chat or email. We are available 24/7.
//               </AccordionContent>
//             </AccordionItem>

//             {/* Item 2 */}
//             <AccordionItem value="item-2" className="border-none">
//               <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150% ">
//                 <div className="flex gap-3">
//                 <IoDocumentTextOutline  className="w-6 h-6"/>
//                  <p>Reporting technical issues or bugs</p>
//                </div>
//               </AccordionTrigger>
//               <AccordionContent className="text-gray-600 pb-4">
//                 Submit any technical issues through our support form or live chat.
//               </AccordionContent>
//             </AccordionItem>

//             {/* Item 3 */}
//             <AccordionItem value="item-3" className="border-none">
//               <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150% ">
//                  <div className="flex gap-3">
//                 <IoDocumentTextOutline  className="w-6 h-6"/>
//                  <p>Dispute resolution process</p>
//                </div>
//               </AccordionTrigger>
//               <AccordionContent className="text-gray-600 pb-4">
//                 Our team will review disputes within 48 hours and get back to you.
//               </AccordionContent>
//             </AccordionItem>

//             {/* Item 4 */}
//             <AccordionItem value="item-4" className="border-none">
//               <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150% ">
//                  <div className="flex gap-3">
//                 <IoDocumentTextOutline  className="w-6 h-6"/>
//                  <p>Community guidelines and code of conduct</p>
//                </div>
//               </AccordionTrigger>
//               <AccordionContent className="text-gray-600 pb-4">
//                 Please follow our guidelines to keep the platform supportive and safe.
//               </AccordionContent>
//             </AccordionItem>

//             {/* Item 5 */}
//             <AccordionItem value="item-5">
//               <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150% ">
//              <div className="flex gap-3">
//                 <IoDocumentTextOutline  className="w-6 h-6"/>
//                  <p>Providing feedback and feature requests</p>
//                </div>
//               </AccordionTrigger>
//               <AccordionContent className="text-gray-600 pb-4">
//                 You can submit any feedback or suggestions via the request form.
//               </AccordionContent>
//             </AccordionItem>

//           </Accordion>

//         </div>

//         <div className="bg-white shadow rounded-xl mt-12 p-10 text-center">

//          <div className="  ">
//            <SupportIcon  className="text-red-400 bg-[#FFEEEE] mx-auto mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />
//          </div>

//           <h3 className="text-[20px] font-semibold text-[#333] mb-2">Need More Help?</h3>
//           <p className="text-gray-500 mb-8">Can’t find what you’re looking for? Our support team is ready to assist you.</p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

//             {/* Live Chat */}
// <div className="shadow-0  lg:shadow-2xl rounded-xl p-0 md:p-6 bg-white">
//   <div className="flex items-start gap-4">
//       <MassageIcon  className="text-red-400 bg-[#FFEEEE] mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />

//     <div className="text-left">
//       <p className="font-medium text-[18px] text-[#333]">Live Chat</p>
//       <p className=" font-normal text-normal mb-4 text-[#777980] pt-3">Average response: 2 min</p>
//     </div>
//   </div>

//   <button className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg">
//     Email Support
//   </button>
// </div>

//             {/* Email Support */}
//         <div className="shadow-0  lg:shadow-2xl rounded-xl p-0 md:p-6 bg-white pt-3.5">
//   <div className="flex items-start gap-4">
//       <MassageIcon  className="text-red-400 bg-[#FFEEEE] mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />

//     <div className="text-left">
//       <p className="font-medium text-[18px] text-[#333]">Email Support</p>
//       <p className=" font-normal text-normal mb-4 text-[#777980] pt-3">Average response: 24 hrs</p>
//     </div>
//   </div>

//   <button className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-lg">
//     Submit a Request
//   </button>
// </div>

//           </div>

//         </div>

//       </div>
//     </div>
//     </div>
//   );
// }
