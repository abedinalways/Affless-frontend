"use client";

import PaymentFaqIcon from "@/components/Icons/PaymentFaq";
import PlaneIcon from "@/components/Icons/PlaneIcon";
import PoliceIcon from "@/components/Icons/PoliceRoles";
import PageBanner from "@/components/reusable/Bgbanner";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { BellRing, GiftIcon } from "lucide-react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { TiGift } from "react-icons/ti";

export default function Frequently() {
  // 🔹 All FAQ Data Inside Same Component
  const faqData = [
    { 
      category: "General Platform Questions",
      items: [
        {
          question: "What is Editor Marketplace?",
          answer:
            "Editor Marketplace is a secure platform that connects clients and editors across YouTube, TikTok, Instagram, and other platforms.",
        },
        {
          question: "Who can use Editor Marketplace?",
          answer:
            "Anyone who wants to hire editors or work as an editor can use the platform.",
        },
      ],
    },

    {
      icon:<PaymentFaqIcon/>,
      category: "Payments & Fees",
      items: [
        { question: "How do payments work?", answer: "Payments are protected by escrow." },
        { question: "What fees do clients pay?", answer: "Clients pay a small service fee." },
        { question: "Are there payment processor fees?", answer: "Yes, depending on provider." },
        { question: "When do editors get paid?", answer: "After the client approves the work." },
      ],
    },

    {
        icon:<PaymentFaqIcon/>,
      category: "Escrow, Disputes & Refunds",
      items: [
        { question: "What is escrow?", answer: "Escrow ensures safe payment until delivery." },
        { question: "Can I get a refund?", answer: "Refunds depend on project terms." },
        {
          question: "What if an editor never delivers?",
          answer: "The platform resolves the issue based on guidelines.",
        },
      ],
    },

    {
        icon:<PlaneIcon/>,
      category: "Boosts & Promotions",
      items: [
        { question: "What are job boosts?", answer: "Boosts increase job visibility." },
        { question: "How much do boosts cost?", answer: "Prices vary based on plan." },
      ],
    },

    {
  icon:<TiGift />,
      category: "Special Promotions",
      items: [
        { question: "What's the YouTube subscription reward??", answer: "No, this violates policy." },
        { question: "What happens if rules are violated?", answer: "Penalties may apply." },
      ],
    },

    {
        icon:<BellRing />,
      category: "Technical",
      items: [
        { question: "Do I need to install software?", answer: "No, it works in your browser." },
        { question: "What if I find a bug?", answer: "Report it to support." },
      ],
    },
        {
  icon:<PoliceIcon />,
      category: "Policies & Rules",
      items: [
        { question: "Can I work with clients/editors outside the platform?", answer: "No, this violates policy." },
        { question: "What happens if someone violates the rules?", answer: "Penalties may apply." },
      ],
    },

    {
        icon:<HiOutlineLightBulb />,
      category: "Technical",
      items: [
        { question: "Do I need to install software to use the platform?", answer: "No, it works in your browser." },
        { question: "What if I encounter a bug or technical issue?", answer: "Report it to support." },
      ],
    },
  ];

  return (
    <div> 
            <div>
                <PageBanner
          title="Frequently Asked Questions"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Home", href: "/" },
            { label: "FAQ" }
          ]}
        />
        
              </div>

        <div className="containers mx-auto py-10 space-y-6">

      {faqData.map((section, idx) => (
        <div key={idx} className="border rounded-lg overflow-hidden">

          {/* 🔴 Category Heading */}
          <div className="bg-[#FF4D4F] text-white px-6 py-5 font-medium text-[20px] md:text-2xl lg:text-[28px] flex gap-4">
            {section.icon}
            {section.category}
          </div>

          {/* Accordion */}
          <Accordion type="single" collapsible className="w-full bg-white">
            {section.items.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${idx}-${index}`}
                className="border-b"
              >
                <AccordionTrigger className="px-6 py-5 text-left text-[15px] font-medium"
                style={{color: 'black'}}
                >
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="px-4 pb-4 text-gray-600 text-[14px] leading-[150%]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
    </div>
  );
}
