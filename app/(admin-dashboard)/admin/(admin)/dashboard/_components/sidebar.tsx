"use client"
import {use, useState} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarData } from "./Dashboard-sidebar";
import Image from "next/image";
import { LuLogOut } from "react-icons/lu";
import ConfirmationPopup from "@/components/shared/ConfirmationPopup";
import { IoWarningOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const pathName = usePathname();
  const router = useRouter();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);


  const handleLogout = ()=>{
    toast.success("Logged out successfully!");
    setShowLogoutPopup(false);
    router.push('/login');
  }

  return (
    <div className="h-screen shadow-lg  w-16 md:w-[250px] px-3 grid grid-rows-[auto_1fr]">
      <div>
        <Image src="/Logo.png" alt="logo" height={10} width={100} />
      </div>
      <div className="flex flex-col justify-between">
        <div className="h-fit">
          {SidebarData?.map((data) => {
            const Icon = data?.icon;
            return (
              <div key={data?.id}>

                <Link
                  href={data.href}
                  className={`flex items-center gap-2 text-[#161A1E] text-[18px] leading-120%  rounded-full my-2 px-2 py-1 ${pathName === data?.href
                    ? "bg-[#FF4D4F] font-normal text-white"
                    : ""
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 ${pathName === data.href ? "text-white" : "text-[#161A1E]"
                      }`}
                  />

                  <span className="hidden md:inline">{data?.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="h-fit">
            <button type="button" onClick={()=>setShowLogoutPopup(true)} className="flex items-center gap-2 text-[#161A1E] text-[18px] leading-120%  rounded-full my-2 px-2 py-1 hover:bg-gray-100 w-full cursor-pointer">
              <div>
                <LuLogOut className="w-5 h-5 text-[#161A1E]" />
              </div>
              <div className="">
                Logout
              </div>
            </button>
        </div>
      </div>
      {showLogoutPopup && <ConfirmationPopup Icon={IoWarningOutline} title="Are you sure?" message="You want to logout?" button="Logout" OnCancel={() => setShowLogoutPopup(false)} OnConfirm={handleLogout} />}
    </div>
  );
};

export default Sidebar;