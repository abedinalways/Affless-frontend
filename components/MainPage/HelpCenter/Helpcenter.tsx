"use client";

import { useEffect, useState } from "react";
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

import EmailChat from "./EmailChat";
import LiveChatModal from "./ChatModal";

type ChatType = "live" | "email" | null;
type TabType = "account" | "payment" | "support";

type FaqItem = {
  id: string;
  title: string;
  content: string;
  contentClassName: string;
};

const searchSuggestions = [
  {
    id: "acc-1",
    title: "How to reset my password?",
    activeTab: "account" as TabType
  },
  {
    id: "acc-2",
    title: "Can I change my account type (client/editor)?",
    activeTab: "account" as TabType
  },
  {
    id: "acc-3",
    title: "How do I reset my password?",
    activeTab: "account" as TabType
  },
  {
    id: "acc-4",
    title: "How do I delete my account?",
    activeTab: "account" as TabType
  },
  {
    id: "acc-5",
    title: "Why is my account under review?",
    activeTab: "account" as TabType
  },
  {
    id: "pay-1",
    title: "How are payments processed on the platform?",
    activeTab: "payment" as TabType
  },
  {
    id: "pay-2",
    title: "When are editors paid?",
    activeTab: "payment" as TabType
  },
  {
    id: "pay-3",
    title: "What fees does the platform charge?",
    activeTab: "payment" as TabType
  },
  {
    id: "pay-4",
    title: "Can clients request refunds?",
    activeTab: "payment" as TabType
  },
  {
    id: "pay-5",
    title: "What payment methods are supported?",
    activeTab: "payment" as TabType
  },
  {
    id: "item-1",
    title: "How to contact customer support",
    activeTab: "support" as TabType
  },
  {
    id: "item-2",
    title: "Reporting technical issues or bugs",
    activeTab: "support" as TabType
  },
  {
    id: "item-3",
    title: "Dispute resolution process",
    activeTab: "support" as TabType
  },
  {
    id: "item-4",
    title: "Community guidelines and code of conduct",
    activeTab: "support" as TabType
  },
  {
    id: "item-5",
    title: "Providing feedback and feature requests",
    activeTab: "support" as TabType
  }
]

export default function HelpCenterPage() {
  const [activeTab, setActiveTab] = useState<TabType>("support");
  const [activeChat, setActiveChat] = useState<ChatType>(null);
  const [filteredSuggestions, setFilteredSuggestions] = useState<typeof searchSuggestions>(searchSuggestions);

  // ✅ search state
  const [searchTerm, setSearchTerm] = useState("");
  // ✅ focus state
  const [isFocused, setIsFocused] = useState(false);
  const [activeAccordionItem, setActiveAccordionItem] = useState("");

  const openLiveChat = () => setActiveChat("live");
  const openEmailChat = () => setActiveChat("email");

  // ✅ ALL FAQs (you will change text later)
  const faqsByTab: Record<TabType, FaqItem[]> = {
    account: [
      {
        id: "acc-1",
        title: "How do I create or edit my profile?",
        content: " Users can manage profile details from their dashboard.",
        contentClassName: "text-gray-600 pb-4",
      },
      {
        id: "acc-2",
        title: "Can I change my account type (client/editor)?",
        content: " Account roles are selected during onboarding.  To change your account role, you will need to make a new account.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "acc-3",
        title: "How do I reset my password?",
        content: "Password resets are available via the login screen.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "acc-4",
        title: "How do I delete my account?",
        content: " Account deletions cannot be done.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "acc-5",
        title: "Why is my account under review?",
        content: " Reviews may occur for security, verification, or policy compliance.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },

    ],

    payment: [
      {
        id: "pay-1",
        title: "How are payments processed on the platform?",
        content: " Payments are securely processed through the platform to ensure protection for both clients and editors.",
        contentClassName: "text-gray-600 pb-4",
      },
      {
        id: "pay-2",
        title: "When are editors paid?",
        content: " Editors receive payment after job completion and client approval, according to the payment rules.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "pay-3",
        title: "What fees does the platform charge?",
        content: " The platform applies service fees as outlined on the Pricing and Payment Rules pages.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "pay-4",
        title: "Can clients request refunds?",
        content: "Refund eligibility depends on job status and dispute resolution outcomes.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "pay-5",
        title: "What payment methods are supported?",
        content: " Supported methods will be listed here (placeholder allowed if backend not ready).",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },

    ],

    support: [
      {
        id: "item-1",
        title: "How to contact customer support",
        content:
          "You can reach our customer support team 24/7 through live chat or email. We are ready to assist you with account issues, order-related questions, technical problems, and general support.",
        contentClassName: "text-gray-600 pb-4",
      },
      {
        id: "item-2",
        title: "Reporting technical issues or bugs",
        content:
          "Submit any technical issues through our support form or live chat. Our team will review the issue and work to resolve it as quickly as possible.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "item-3",
        title: "Dispute resolution process",
        content:
          "Our team will review disputes submitted promptly and follow up with you regarding the next steps.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "item-4",
        title: "Community guidelines and code of conduct",
        content:
          "Please follow our guidelines to keep the platform positive, supportive, and safe for all users.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
      {
        id: "item-5",
        title: "Providing feedback and feature requests",
        content:
          "You can submit any feedback or suggestions through the request form. We appreciate your input as it helps us improve the platform.",
        contentClassName: "text-gray-600 pb-4 pl-9",
      },
    ],
  };

  // ✅ filtering (title + content)
  const q = searchTerm.trim().toLowerCase();
  const currentFaqs = faqsByTab[activeTab];

  const tabTitle =
    activeTab === "account"
      ? "Account & Profile"
      : activeTab === "payment"
        ? "Payments & Billing"
        : "Support & Contact";

  const handleSearchSuggestionClick = (suggestion: { id: string; title: string; activeTab: TabType }) => () => {
    setActiveTab(suggestion.activeTab);
    setActiveAccordionItem(suggestion.id);
    setIsFocused(false);
  }

  useEffect(()=>{
    if(searchTerm.trim() === "") {
      setFilteredSuggestions(searchSuggestions);
      return;
    };

    const matchedSuggestions = searchSuggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(q)
    );
    setFilteredSuggestions(matchedSuggestions);
  },[searchTerm])

  return (
    <div>
      <PageBanner
        title="Help Center"
        bgImage="/findEditor.jpg"
        links={[{ label: "Home", href: "/" }, { label: "Help Center" }]}
      />

      <div className="bg-[#F7F7F7] min-h-screen lg:py-20">
        <div className="containers mx-auto px-4">
          <h1 className="text-[36px] font-semibold text-[#333] mb-6">Help Center</h1>

          <div className="relative">
            <Search className="absolute left-4 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search articles, FAQs, or topics..."
              className="w-full py-3 pl-12 pr-4 focus:rounded-b-none rounded-lg bg-white border border-gray-200 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            />
            {isFocused && (
              <div className="bg-white p-3 rounded-b-lg shadow-md absolute w-full z-10 transition-transform duration-300">
                {filteredSuggestions?.slice(0, 5)?.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion.id}
                    className="block w-full text-start py-2 px-3 hover:bg-gray-100 rounded cursor-pointer text-sm text-gray-700"
                    onClick={handleSearchSuggestionClick(suggestion)}
                  >
                    {suggestion.title}
                  </button>
                ))}
            </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-14">
            <div
              onClick={() => setActiveTab("account")}
              className={`bg-white p-6 rounded-lg text-center cursor-pointer transition shadow 
                ${activeTab === "account" ? "border border-red-300 shadow-lg" : "hover:border-red-200 border-transparent"}`}
            >
              <UserIcon className="mx-auto text-red-500 mb-3" />
              <p className="font-medium text-[#333]">Account & Profile</p>
            </div>

            <div
              onClick={() => setActiveTab("payment")}
              className={`bg-white p-6 rounded-lg text-center cursor-pointer transition shadow 
                ${activeTab === "payment" ? "border border-red-300 shadow-lg" : "hover:border-red-200 border-transparent"}`}
            >
              <PaymentIcon className="mx-auto text-red-500 mb-3" />
              <p className="font-medium text-[#333]">Payments & Billing</p>
            </div>

            <div
              onClick={() => setActiveTab("support")}
              className={`bg-white p-6 rounded-lg text-center cursor-pointer transition shadow 
                ${activeTab === "support" ? "border border-red-300 shadow-lg" : "hover:border-red-200 border-transparent"}`}
            >
              <SupportIcon className="mx-auto text-red-500 mb-3" />
              <p className="font-medium text-[#333]">Support & Contact</p>
            </div>
          </div>

          {/* ✅ One accordion for all tabs */}
          <h2 className="text-[18px] font-medium text-black mb-4">{tabTitle}</h2>

          <div className="bg-white rounded-xl shadow p-4">
            <Accordion type="single" collapsible value={activeAccordionItem} onValueChange={setActiveAccordionItem}>
              {currentFaqs.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger className="text-[18px] font-normal text-[#333] py-4 leading-150% cursor-pointer">
                    <div className="flex gap-3">
                      <IoDocumentTextOutline className="w-6 h-6" />
                      <p>{item.title}</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className={item.contentClassName}>
                    {item.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {currentFaqs.length === 0 && (
              <p className="text-gray-500 text-sm py-4 text-center">No results found.</p>
            )}
          </div>

          {/* --- rest same --- */}
          <div className="bg-white shadow rounded-xl mt-12 p-10 text-center">
            <SupportIcon className="text-red-400 bg-[#FFEEEE] mx-auto mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />

            <h3 className="text-[20px] font-semibold text-[#333] mb-2">Need More Help?</h3>
            <p className="text-gray-500 mb-8">
              Can’t find what you’re looking for? Our support team is ready to assist you.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="shadow-0 lg:shadow-xl rounded-xl p-0 md:p-6 bg-white pt-3.5">
                <div className="flex items-start gap-4">
                  <MassageIcon className="text-red-400 bg-[#FFEEEE] mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />
                  <div className="text-left">
                    <p className="font-medium text-[18px] text-[#333]">Live Chat</p>
                    <p className="font-normal text-normal mb-4 text-[#777980] pt-3">
                      Average response: 2 min
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openLiveChat}
                  className="bg-red-500 hover:bg-red-600 text-white w-full py-2.5 rounded-lg cursor-pointer"
                >
                  Live Chat
                </button>
                <p className="text-[#333] py-2">Live chat support coming soon.</p>
              </div>

              <div className="shadow-0 lg:shadow-xl rounded-xl p-0 md:p-6 bg-white pt-3.5">
                <div className="flex items-start gap-4">
                  <MassageIcon className="text-red-400 bg-[#FFEEEE] mb-4 h-15.5 w-15.5 p-2.5 rounded-lg" />
                  <div className="text-left">
                    <p className="font-medium text-[18px] text-[#333]">Email Support</p>
                    <p className="font-normal text-normal mb-4 text-[#777980] pt-3">
                      Average response: 24 hrs
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={openEmailChat}
                  className="bg-red-500 hover:bg-red-600 text-white w-full py-2.5 rounded-lg cursor-pointer"
                >
                  Submit a Request
                </button>
                <p className="text-[#333] py-2">Support requests will be fully enabled soon.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Only one can be true at a time */}
      <LiveChatModal
        open={activeChat === "live"}
        setOpen={(v: boolean) => setActiveChat(v ? "live" : null)}
      />

      <div className="fixed bottom-6 right-6 z-9999 w-[680px] max-w-[92vw]">
        <EmailChat
          open={activeChat === "email"}
          setOpen={(v: boolean) => setActiveChat(v ? "email" : null)}
        />
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
