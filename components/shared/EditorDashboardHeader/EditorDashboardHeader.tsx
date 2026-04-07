"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown, MdMailOutline } from "react-icons/md";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Inbox from "@/components/ClientEditor/Inbox/Inbox";
import { FiLogOut } from "react-icons/fi";
import Notification from "@/components/Notification/Notification";
import { CookieHelper } from "@/helper/cookie.helper";
import toast from "react-hot-toast";

type InboxItem = {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string; // image path
  online?: boolean;
  href?: string;
};

const inboxData: InboxItem[] = [
  {
    id: 1,
    name: "Aisha Patel",
    lastMessage: "Sent the revised storyboard and shot list for review.",
    time: "2 hours ago",
    avatar: "/images/jone1.png",
    online: true,
    href: "/editor/message/1?redirect=dashboardeditor"
  },
  {
    id: 2,
    name: "Miguel Santos",
    lastMessage: "Uploaded the color grade draft—feedback welcome.",
    time: "Yesterday",
    avatar: "/images/jone3.png",
    online: true,
    href: "/editor/message/2?redirect=dashboardeditor"
  },
  {
    id: 3,
    name: "Priya Nair",
    lastMessage: "Quick question about the intro music licensing.",
    time: "3 days ago",
    avatar: "/images/Jerome.jpg",
    online: true,
    href: "/editor/message/3?redirect=dashboardeditor"
  },
  {
    id: 4,
    name: "Ethan Brooks",
    lastMessage: "Final export is ready; scheduling delivery now.",
    time: "1 week ago",
    avatar: "/images/jone2.png",
    online: false,
    href: "/editor/message/4?redirect=dashboardeditor"
  },
  {
    id: 5,
    name: "Support Team",
    lastMessage: "Ticket #4821 resolved. Let us know if you need more help.",
    time: "2 weeks ago",
    avatar: "/images/headset.svg",
    online: true,
  },
];

export default function EditorDashboardHeader() {
  const pathname = usePathname();

  const [open, setOpen] = useState(false); // Desktop dropdown
  const [mobileMenu, setMobileMenu] = useState(false); // Mobile menu
  const [mobileDropdown, setMobileDropdown] = useState(false); // Mobile dropdown
  const [profileDropdown, setProfileDropdown] = useState(false); // Profile dropdown
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const profileDropdownRef = useRef<HTMLDivElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const closeDesktopJobDropdown = () => setOpen(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationOpenMode, setNotificationOpenMode] = useState<"hover" | "click" | null>(null);

  const closeMobileAll = () => {
    setMobileDropdown(false);
    setMobileMenu(false);
  };

  const closeProfile = () => setProfileDropdown(false);

  // ✅ active style
  const activeCls = "text-[#FF4D4F] font-semibold";
  const inactiveCls = "text-[#333] hover:text-[#FF4D4F] transition-colors";

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const isExactActive = (href: string) => pathname === href;

  const jobRoutes = [
    "/editor/hire-request",
    "/editor/myproposal",
    "/editor/browse-job",
    "/editor/editor-profile",
    "/editor/earning",
    "/editor/delivery",
    "/editor/extend-delivery"
  ];

  const jobActive = jobRoutes.some((r) => isActive(r));

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
        setNotificationOpenMode(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleBecomeClientClick = () => {
    try {
      const token = JSON.parse(CookieHelper.get({ key: 'user' }))
      if (token.status === 'logged_in') {
        CookieHelper.set({
          key: "user", value: JSON.stringify({
            status: 'logged_in',
            user_type: 'client'
          })
        })
        setUser("client");
        router.push("/client");
      } else {
        toast.error(`Please login first to become ${user === 'editor' ? 'a client' : 'an editor'}`);
        router.push('/login');
      }
    } catch {
      toast.error(`Please login first to become ${user === 'editor' ? 'a client' : 'an editor'}`);
      router.push('/login');
    }
  }

  const handleLogout = () => {
    CookieHelper.destroy({ key: "user" });
    setUser("");
    router.push("/");
  };

  const handleNotificationMouseEnter = () => {
    if (!showNotifications) {
      setShowNotifications(true);
      setNotificationOpenMode("hover");
    }
  };

  const handleNotificationMouseLeave = () => {
    if (notificationOpenMode === "hover") {
      setShowNotifications(false);
      setNotificationOpenMode(null);
    }
  };

  const handleNotificationClick = () => {
    if (showNotifications && notificationOpenMode === "click") {
      setShowNotifications(false);
      setNotificationOpenMode(null);
      return;
    }

    setShowNotifications(true);
    setNotificationOpenMode("click");
  };

  return (
    <div className="bg-white">
      <div className="containers">
        <nav>
          <div className="flex justify-between items-center py-3 ">
            {/* ---------- LEFT SECTION ---------- */}
            <div className="flex items-center gap-10">
              {/* Logo */}
              <Link href="/">
                <div className="w-24 sm:w-32 h-[42px] flex justify-center items-center overflow-hidden">
                  <Image
                    src="/images/logoUpdate.png"
                    width={128}
                    height={42}
                    alt="Logo"
                    className=" object-cover justify-start"
                  />
                </div>
              </Link>

              {/* DESKTOP MENU (Visible on lg and larger) */}
              <ul className="hidden lg:flex items-center gap-8 text-[#333] font-poppins text-base relative">
                <li>
                  <Link
                    href="/editor"
                    className={isExactActive("/editor") ? activeCls : inactiveCls}
                  >
                    Dashboard
                  </Link>
                </li>

                {/* My Business Dropdown */}
                <li className="relative">
                  <div ref={dropdownRef}>
                    <button
                      onClick={() => setOpen(!open)}
                      className={`flex items-center gap-1 cursor-pointer select-none ${jobActive ? activeCls : inactiveCls
                        }`}
                    >
                      Jobs
                      <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
                        <MdKeyboardArrowDown />
                      </span>
                    </button>

                    {open && (
                      <div className="absolute left-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3 z-50">

                        <Link
                          href="/editor/myproposal?redirect=dashboardeditor"
                          className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/editor/myproposal") || isActive("/editor/delivery") || isActive("/editor/extend-delivery") ? activeCls : inactiveCls }`}
                          onClick={closeDesktopJobDropdown}
                        >
                          My Jobs
                        </Link>
                        <Link
                          href="/editor/hire-request?redirect=dashboardeditor"
                          className={`block px-4 py-2 hover:bg-gray-100 capitalize ${isActive("/editor/hire-request") ? activeCls : inactiveCls
                            }`}
                          onClick={closeDesktopJobDropdown}
                        >
                          My job proposals
                        </Link>

                        <Link
                          href="/editor/browse-job?redirect=dashboardeditor"
                          className={`block px-4 py-2 hover:bg-gray-100 ${(isActive("/editor/browse-job") || isActive("/editor/browse-job/")) ? activeCls : inactiveCls
                            }`}
                          onClick={closeDesktopJobDropdown}
                        >
                          Browse Jobs
                        </Link>

                        <Link
                          href="/editor/editor-profile"
                          className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/editor/editor-profile") ? activeCls : inactiveCls
                            }`}
                          onClick={closeDesktopJobDropdown}
                        >
                          Profile
                        </Link>

                        <Link
                          href="/editor/earning"
                          className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/editor/earning") ? activeCls : inactiveCls
                            }`}
                          onClick={closeDesktopJobDropdown}
                        >
                          Earnings
                        </Link>
                      </div>
                    )}
                  </div>
                </li>

                <li>
                  <Link
                    href="/pricing"
                    className={isActive("/pricing") ? activeCls : inactiveCls}
                  >
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            {/* ---------- RIGHT SECTION (DESKTOP) ---------- */}
            <div className="flex gap-4 sm:gap-8 items-center">
              <button
                onClick={handleBecomeClientClick}
                className={`hidden lg:block cursor-pointer ${isActive("/client") ? activeCls : inactiveCls}`}
              >
                Become an Client
              </button>

              <div
                className="h-fit leading-0 relative"
                ref={notificationRef}
                onMouseEnter={handleNotificationMouseEnter}
                onMouseLeave={handleNotificationMouseLeave}
              >
                <button type="button" className="" onClick={handleNotificationClick}>
                  <IoMdNotificationsOutline className="w-7 h-7 cursor-pointer hover:text-[#FF4D4F]" />
                </button>
                <div
                  className={`leading-normal absolute -right-1/2 translate-x-1/4 md:left-auto md:translate-x-0 md:right-0 mt-3 w-[412px] max-w-[80vw] rounded-xl border bg-white shadow-lg transition-all duration-200 z-50 ${showNotifications ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}
                >
                  <Notification data={inboxData} />
                </div>
              </div>

              <Link href="/editor/message/1?redirect=dashboardeditor" className="relative group">
                {/* Icon */}
                <MdMailOutline
                  className={`w-7 h-7 cursor-pointer ${isActive("/editor/message") ? "text-[#FF4D4F]" : "text-[#333] hover:text-[#FF4D4F] transition-colors duration-300"
                    }`}
                />
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button onClick={() => setProfileDropdown(!profileDropdown)} className={`w-8 h-8 flex cursor-pointer rounded-full ${isActive("/editor/editor-profile") ? "border-[#FF4D4F]" : "border-transparent hover:border-[#FF4D4F] transition-border duration-300"}`}>
                  <Image src="/images/photographer.jpg" alt="profile" width={32} height={32} className="w-8 h-8 rounded-full object-cover" />
                </button>

                {profileDropdown && (
                  <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3 z-50">
                    <Link
                      href="/editor/editor-profile"
                      className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/editor/editor-profile") ? activeCls : inactiveCls
                        }`}
                      onClick={() => setProfileDropdown(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/editor/earning"
                      className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/editor/earning") ? activeCls : inactiveCls
                        }`}
                      onClick={() => setProfileDropdown(false)}
                    >
                      Earnings
                    </Link>
                    <hr className="my-2" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
              {/* ---------- MOBILE HAMBURGER ---------- */}
              <button
                className="lg:hidden text-3xl cursor-pointer"
                onClick={() => setMobileMenu(true)}
              >
                <HiOutlineMenu />
              </button>
            </div>

          </div>
        </nav>

        {/* ========== MOBILE MENU OVERLAY ========== */}
        {mobileMenu && (
          <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs lg:hidden" onClick={() => setMobileMenu(false)} />
        )}

        {/* ========== MOBILE MENU SLIDE ========== */}
        <div
          className={`fixed top-0 left-0 w-fit min-w-[250px] h-full bg-white shadow-lg z-50 p-5 transform transition-transform duration-300 ${mobileMenu ? "translate-x-0 lg:-translate-x-full" : "-translate-x-full"
            }`}
        >
          {/* Close Button */}
          <button
            className="text-2xl cursor-pointer p-0.5 hover:bg-gray-50 rounded-full fixed top-1 right-1 duration-300"
            onClick={() => setMobileMenu(false)}
          >
            <HiX />
          </button>

          {/* Mobile Items */}
          <ul className="text-lg pt-4">
            <li>
              <Link
                href="/editor"
                className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isExactActive("/editor") ? activeCls : inactiveCls
                  }`}
                onClick={() => setMobileMenu(false)}
              >
                Dashboard
              </Link>
            </li>

            {/* Mobile dropdown */}
            <li>
              <button
                className={`flex items-center justify-between w-full px-3 py-2 hover:bg-gray-100 duration-300 cursor-pointer ${jobActive ? activeCls : inactiveCls
                  }`}
                onClick={() => setMobileDropdown(!mobileDropdown)}
              >
                Jobs
                <MdKeyboardArrowDown
                  className={`transition-transform ${mobileDropdown ? "rotate-180" : ""}`}
                />
              </button>

              {mobileDropdown && (
                <ul className="mt-2 ml-3 text-base">
                  <li>
                    <Link
                      href="/editor/myproposal"
                      className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/editor/myproposal") ? activeCls : inactiveCls
                        }`}
                      onClick={() => setMobileMenu(false)}
                    >
                      My Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/editor/hire-request"
                      className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/editor/hire-request") ? activeCls : inactiveCls
                        }`}
                      onClick={() => setMobileMenu(false)}
                    >
                      My Job Proposals
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/editor/browse-job?redirect=dashboardeditor"
                      className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/browse-job") ? activeCls : inactiveCls
                        }`}
                      onClick={() => setMobileMenu(false)}
                    >
                      Browse Jobs
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/editor/editor-profile"
                      className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/editor/editor-profile") ? activeCls : inactiveCls
                        }`}
                      onClick={() => setMobileMenu(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/editor/earning"
                      className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/editor/earning") ? activeCls : inactiveCls
                        }`}
                      onClick={() => setMobileMenu(false)}
                    >
                      Earnings
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li>
              <Link
                href="/pricing"
                className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/pricing") ? activeCls : inactiveCls
                  }`}
                onClick={() => setMobileMenu(false)}
              >
                Pricing
              </Link>
            </li>

            <li>
              <button
                onClick={handleBecomeClientClick}
                className={`cursor-pointer px-3 py-2 hover:bg-gray-100 duration-300 w-full text-left ${isActive("/client") ? activeCls : inactiveCls
                  }`}
              >
                Become a Client
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
