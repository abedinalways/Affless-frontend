"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import PasswordModal from "@/components/AdminDashboard/PassordModal/page";
export default function SettingsPage() {
  const [openModal, setOpenModal] = useState(false);
  const items = [
    { title: "Personal Information", href: "/admin/setting/personal-information" },
    { title: "Change Password", modal: true }, // 👉 modal trigger
    { title: "Terms & Condition", href: "/admin/dashboard/setting/term-conditions" },
    { title: "Privacy Policy", href: "/admin/dashboard/setting/privacy-policy" },
    { title: "About Us", href: "/admin/dashboard/setting/about-us" },
  ];
  return (
    <>
      <div className="bg-[#FAF4E5] p-6 rounded-2xl border border-[#E5D7B8]">
        <h1 className="text-[32px] font-semibold text-[#FF4D4F]">Settings</h1>
        <hr className="my-4 border-[#E5D7B8]" />

        <div className="space-y-4 flex flex-col">
          {items.map((item) =>
            item.modal ? (
              <div
                key={item.title}
                onClick={() => setOpenModal(true)}
                className="bg-white border border-[#F5C6C6] rounded-xl p-4 flex items-center justify-between hover:bg-[#FFF5F5] transition cursor-pointer"
              >
                <span className="text-[#161A1E] text-base font-medium">
                  {item.title}
                </span>
                <ChevronRight className="text-[#444]" size={20} />
              </div>
            ) : (
              <Link href={item.href!} key={item.title}>
                <div className="bg-white border border-[#F5C6C6] rounded-xl p-4 flex items-center justify-between hover:bg-[#FFF5F5] transition cursor-pointer">
                  <span className="text-[#161A1E] text-base font-medium">
                    {item.title}
                  </span>
                  <ChevronRight className="text-[#444]" size={20} />
                </div>
              </Link>
            ))}
        </div>
      </div>
      <PasswordModal 
        open={openModal} 
        onClose={(v:boolean) => setOpenModal(v)}
      />
    </>
  );
}
