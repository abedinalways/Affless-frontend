"use client"
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarData } from "./Dashboard-sidebar";
import Image from "next/image";

const Sidebar = () => {
  const pathName = usePathname();
  return (
    <div className="h-screen shadow-lg  w-16 md:w-[250px] px-3">
      <div>
        <Image src="/Logo.png" alt="logo" height={10} width={100}>

        </Image>
      </div>
      {SidebarData?.map((data) => {
        const Icon = data?.icon;
        return (
          <div key={data?.id}>
           
            <Link
              href={data.href}
              className={`flex items-center gap-2 text-[#161A1E] text-[18px] leading-120%  rounded-full my-2 px-2 py-1 ${
                pathName === data?.href
                  ? "bg-[#FF4D4F] font-normal text-white"
                  : ""
              }`}
            >
             <Icon
  className={`w-5 h-5 ${
    pathName === data.href ? "text-white" : "text-[#161A1E]"
  }`}
/>

              <span className="hidden md:inline">{data?.name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Sidebar;