"use client"
import { use, useState } from "react";
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

  const isActive = (href: string, exact = false) => {
    if (href === "/admin") {
      return pathName === "/admin" || pathName === "/admin/dashboard";
    }

    if (href === "/admin/setting") {
      return (
        pathName === "/admin/setting" ||
        pathName.startsWith("/admin/setting/") ||
        pathName.startsWith("/admin/dashboard/setting") ||
        pathName.startsWith("/admin/dashboard/setting/")
      );
    }

    return exact ? pathName === href : pathName === href || pathName.startsWith(href + "/");
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    setShowLogoutPopup(false);
    router.push('/login');
  }

  return (
    <div className="shadow-lg w-full h-full p-2 sm:p-3 grid grid-rows-[auto_1fr] gap-4 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center justify-center">
        <Image src="/images/logoUpdate.png" alt="logo" height={1000} width={1000} className="hidden lg:block w-[190px] object-cover" />
        <Image src="/logo-small.png" alt="logo" height={500} width={500} className="w-10 aspect-square lg:hidden" />
      </div>
      <div className="flex flex-col justify-between items-center gap-3.5">
        <div className="h-fit space-y-3.5">
          {SidebarData?.map((data) => {
            const Icon = data?.icon;
            return (
              <div key={data?.id} title={data?.name}>
                <Link
                  href={data.href}
                  className={`w-fit sm:w-full flex items-center gap-2 text-[#161A1E] text-[18px] leading-120%  rounded-full p-2 sm:px-4 sm:py-2.5 ${isActive(data.href)
                    ? "bg-[#FF4D4F] font-normal text-white"
                    : "hover:bg-gray-100 font-normal"
                    }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive(data.href) ? "text-white" : "text-[#161A1E]"
                      }`}
                  />
                  <span className="hidden lg:inline whitespace-nowrap">{data?.name}</span>
                </Link>
              </div>
            );
          })}
        </div>
        <div className="h-fit w-full text-white">
          <button type="button" onClick={() => setShowLogoutPopup(true)} className="flex items-center gap-2 text-[#161A1E] text-[18px] leading-120%  rounded-full px-4 py-2.5 bg-[#F70300] w-full cursor-pointer">
            <div>
              <LuLogOut className="w-5 h-5 text-white" />
            </div>
            <div className="hidden lg:inline text-white">
              Logout
            </div>
          </button>
        </div>
      </div>
      {showLogoutPopup && <ConfirmationPopup isOpen={showLogoutPopup} title="Are you sure?" description="You want to logout?" onCancel={() => setShowLogoutPopup(false)} onConfirm={handleLogout} cancelText="Cancel" confirmText="Logout" />}
    </div>
  );
};

export default Sidebar;