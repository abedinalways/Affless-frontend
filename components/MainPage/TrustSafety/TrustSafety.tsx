import AdminIcon from "@/components/Icons/AdminIcon";
import DisputeIcon from "@/components/Icons/DisputeIcon";
import KycIcon from "@/components/Icons/kycIcon";
import SecureIcon from "@/components/Icons/secureIcon";
import Image from "next/image";
import React from "react";

const items = [
  {
    id: 1,
    iconBg: "bg-[#DBEAFE]",
    iconSrc: <SecureIcon/>, // replace with your actual icon if needed
    title: "Secure Payments",
    desc: "All payments processed through Stripe and PayPal for maximum security."
  },
  {
    id: 2,
    iconBg: "bg-[#DCFCE7]",
    iconSrc: <KycIcon/>, // replace with your actual icon
    title: "KYC Verification",
    desc: "We confirm user identity to keep the platform safe and compliant."
  },
  {
    id: 3,
    iconBg: "bg-[#FFEDD5]",
    iconSrc: <DisputeIcon/>, // replace with your actual icon
    title: "Dispute Resolution",
    desc: "Fair process for revisions, refunds, and resolving conflicts."
  },
  {
    id: 4,
    iconBg: "bg-[#F3E8FF]",
    iconSrc: <AdminIcon/>, // replace with your actual icon
    title: "Admin Support",
    desc: "Our team can intervene when needed to ensure fair outcomes."
  }
];

export default function TrustSafety() {
  return (
    <div className="containers mx-auto py-8 lg:py-20">
      {/* Heading */}
      <h2 className="text-[#333] text-center f text-[32px] md:text-[40px] lg:text-[64px] font-medium leading-[124%] "
>Trust & Safety</h2>
      <p className="text-[#4A4C56] text-center f text-[18px] font-normal leading-[150%] mt-[18px]"
>
        Your security is our priority
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[50px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-[#FFFFFF] border  p-6 rounded-xl shadow-lg hover:shadow-lg transition"
          >
            {/* Icon + BG */}
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full ${item.iconBg} mb-5`}
            >
              <p>{item.iconSrc}</p>
            </div>

            {/* Text */}
            <h3 className="text-[#333] f text-[24px] font-medium leading-[150%] mb-[24px]"
>{item.title}</h3>
            <p className="text-[#4A4C56] f text-[16px] font-normal leading-[150%]"
>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
