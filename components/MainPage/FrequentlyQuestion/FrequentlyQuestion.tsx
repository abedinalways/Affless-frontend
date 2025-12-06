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
            "Editor Marketplace is a platform that connects YouTubers and other creators with skilled video editors. Clients can easily post projects, set their budgets, and hire editors with confidence through our secure escrow system. Editors can showcase their skills, receive work opportunities, and get paid safely.",
        },
        {
          question: "Who can use Editor Marketplace?",
          answer:
            "Any video creator looking for editing services, and any editor offering editing work, can use the platform. This includes YouTubers, brands, marketers, agencies, freelancers, and students.",
        },
      ],
    },

    {
      icon:<PaymentFaqIcon/>,
      category: "Payments & Fees",
      items: [
        { question: "How do payments work?", answer: "Clients deposit funds into an escrow system before work begins. Editors complete the project, deliver the work, and once the client approves, the payment is released from escrow to the editor." },
        { question: "What fees do clients pay?", answer: "Clients pay a 20% service fee on top of each project. This fee helps support secure payments, customer support, platform safety, and dispute protection." },
        { question: "Are there payment processor fees?", answer: "Yes. Standard payment processor fees (Stripe, PayPal, etc.) apply depending on the client’s location and payment method. These fees are displayed during checkout." },
        { question: "When do editors get paid?", answer: "Editors are paid immediately after the client approves the final delivery. If the client does not respond within the auto-approval time window, the payment will be released automatically." },
      ],
    },

    {
        icon:<PaymentFaqIcon/>,
      category: "Escrow, Disputes & Refunds",
      items: [
        { question: "What is escrow?", answer: "Escrow protects both clients and editors by securely holding the client’s funds until the work is completed and approved. This ensures editors are paid fairly and clients receive the quality they expect." },
        { question: "Can I get a refund?", answer: "Refunds may be possible if the editor fails to deliver work or if a project is canceled before any work begins. Refund requests are reviewed by our support team to ensure fairness." },
        {
          question: "What if an editor never delivers?",
          answer: "If an editor misses the delivery deadline and does not communicate, clients may request cancellation. Escrow funds will be returned after review.",
        },
      ],
    },

    {
        icon:<PlaneIcon/>,
      category: "Boosts & Promotions",
      items: [
        { question: "What are job boosts?", answer: "Boosts allow editors to increase the visibility of their posted services. A boosted listing appears higher in search results, increasing views and potential orders" },
        { question: "How much do boosts cost?", answer: "Boost prices vary depending on the visibility tier selected. Editors can choose from multiple boost levels based on how much reach they want." },
      ],
    },

    {
  icon:<TiGift />,
      category: "Special Promotions",
      items: [
        { question: "What’s the YouTube subscription reward?", answer: "Clients who subscribe to our official YouTube channel may be eligible for limited promotional rewards, discounts, or platform perks when available. All reward availability is subject to change and may vary over time." },
       
      ],
    },

    {
        icon:<HiOutlineLightBulb />,
      category: "Technical",
      items: [
        { question: "Do I need to install software?", answer: "No. Editor Marketplace works entirely online. Clients and editors can manage everything from their browser without installing any software." },
        { question: "What if I find a bug?", answer: "If you encounter a bug, please report it using the support form. Include screenshots and details so our team can resolve the issue quickly." },
      ],
    },
        {
  icon:<PoliceIcon />,
      category: "Policies & Rules",
      items: [
        { question: "Can I work with clients/editors outside the platform?", answer: "No. For safety and payment protection, all communication and payments must remain on the platform. Off-platform payments violate policy and may result in penalties." },
        { question: "What happens if someone violates the rules?", answer: "Rule violations—such as off-platform payments, abuse, fraud, harassment, or any attempt to bypass platform policies—may result in warnings, penalties, reduced visibility, removal of boosts, temporary restrictions or suspension, or permanent account removal. The exact consequences depend on the severity and frequency of the violation." },
        
      ],
    },

    // {
    //     icon:<HiOutlineLightBulb />,
    //   category: "Technical",
    //   items: [
    //     { question: "Do I need to install software to use the platform?", answer: "No, it works in your browser." },
    //     { question: "What if I encounter a bug or technical issue?", answer: "Report it to support." },
    //   ],
    // },
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

        <div className="containers mx-auto py-8 lg:py-10 space-y-6">

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
