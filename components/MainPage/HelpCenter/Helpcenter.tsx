"use client";

import { Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Headphones, User, CreditCard, LifeBuoy, MessageCircle } from "lucide-react";

export default function HelpCenterPage() {
  return (
    <div className="bg-[#F7F7F7] min-h-screen py-12">
      <div className="containers mx-auto px-4">

        <h1 className="text-[36px] font-semibold text-[#333] mb-6">Help Center</h1>

        <div className="relative mb-10">
          <Search className="absolute left-4 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search articles, FAQs, or topics..."
            className="w-full py-3 pl-12 pr-4 rounded-lg bg-white border border-gray-200 focus:ring-2 focus:ring-red-300 outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">

          <div className="bg-white hover:shadow-lg shadow border border-transparent hover:border-red-200 p-6 rounded-lg text-center cursor-pointer transition">
            <User className="mx-auto text-red-500 mb-3" size={26} />
            <p className="font-medium text-[#333]">Account & Profile</p>
          </div>

          <div className="bg-white hover:shadow-lg shadow border border-transparent hover:border-red-200 p-6 rounded-lg text-center cursor-pointer transition">
            <CreditCard className="mx-auto text-red-500 mb-3" size={26} />
            <p className="font-medium text-[#333]">Payments & Billing</p>
          </div>

          <div className="bg-white shadow border border-red-300 p-6 rounded-lg text-center cursor-pointer transition">
            <LifeBuoy className="mx-auto text-red-500 mb-3" size={26} />
            <p className="font-medium text-[#333]">Support & Contact</p>
          </div>

        </div>

        <h2 className="text-[20px] font-semibold text-[#444] mb-4">Support & Contact</h2>

        <div className="bg-white rounded-xl shadow p-4">

          <Accordion type="single" collapsible>
            
            {/* Item 1 */}
            <AccordionItem value="item-1" className="border-b">
              <AccordionTrigger className="text-[16px] py-4">
                How to contact customer support
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                You can contact our customer support through chat or email. We are available 24/7.
              </AccordionContent>
            </AccordionItem>

            {/* Item 2 */}
            <AccordionItem value="item-2" className="border-b">
              <AccordionTrigger className="text-[16px] py-4">
                Reporting technical issues or bugs
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                Submit any technical issues through our support form or live chat.
              </AccordionContent>
            </AccordionItem>

            {/* Item 3 */}
            <AccordionItem value="item-3" className="border-b">
              <AccordionTrigger className="text-[16px] py-4">
                Dispute resolution process
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                Our team will review disputes within 48 hours and get back to you.
              </AccordionContent>
            </AccordionItem>

            {/* Item 4 */}
            <AccordionItem value="item-4" className="border-b">
              <AccordionTrigger className="text-[16px] py-4">
                Community guidelines and code of conduct
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                Please follow our guidelines to keep the platform supportive and safe.
              </AccordionContent>
            </AccordionItem>

            {/* Item 5 */}
            <AccordionItem value="item-5">
              <AccordionTrigger className="text-[16px] py-4">
                Providing feedback and feature requests
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-4">
                You can submit any feedback or suggestions via the request form.
              </AccordionContent>
            </AccordionItem>

          </Accordion>

        </div>


        <div className="bg-white shadow rounded-xl mt-12 p-10 text-center">

          <LifeBuoy size={40} className="text-red-400 mx-auto mb-4" />

          <h3 className="text-[20px] font-semibold text-[#333] mb-2">Need More Help?</h3>
          <p className="text-gray-500 mb-8">Can’t find what you’re looking for? Our support team is ready to assist you.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Live Chat */}
            <div className="border rounded-xl p-6 shadow-sm bg-white">
              <MessageCircle size={30} className="text-red-500 mx-auto mb-3" />
              <p className="font-semibold text-[#333]">Live Chat</p>
              <p className="text-gray-500 text-sm mb-4">Average response: 2 min</p>
              <button className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-full">
                Chat with Support
              </button>
            </div>

            {/* Email Support */}
            <div className="border rounded-xl p-6 shadow-sm bg-white">
              <Headphones size={30} className="text-red-500 mx-auto mb-3" />
              <p className="font-semibold text-[#333]">Email Support</p>
              <p className="text-gray-500 text-sm mb-4">Average response: 24 hrs</p>
              <button className="bg-red-500 hover:bg-red-600 text-white w-full py-2 rounded-full">
                Submit a Request
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
