"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown, MdMailOutline } from "react-icons/md";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useRouter, usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { FiLogOut } from "react-icons/fi";
import Notification from "@/components/Notification/Notification";
import { CookieHelper } from "@/helper/cookie.helper";
import toast from "react-hot-toast";
import type { InboxItem } from "@/app/type";
import { inboxDataForClient } from "@/public/demodata";

export default function ClientDashboardHeader() {
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationOpenMode, setNotificationOpenMode] = useState<"hover" | "click" | null>(null);
  const [notificationData, setNotificationData] = useState(inboxDataForClient);

  // ✅ active style
  const activeCls = "text-[#FF4D4F] font-semibold";
  const inactiveCls = "text-[#333] hover:text-[#FF4D4F] transition-colors";

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");


  const businessRoutes = [
    "/client/manage-job",
    "/client/find-editors",
    "/client/job-proposal",
    "/client/payment-history",
    "/client/profile",
    "/client/find-editor-match",
    "/client/post-job",
    "/client/hire-vedio-editor",
    "/client/find-editor",
    "/confirm-deposit",
    "/client/bids-details",
  ];

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

  const businessActive = businessRoutes.some((r) => isActive(r));

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

  // Ensure that this logic runs only once
  // useEffect(() => {
  //   setLoading(true);
  //   // Simulate an async operation like form submission
  //   setTimeout(() => {
  //     setLoading(false);
  //     localStorage.setItem("isLogin", "true");
  //     router.push("/editor-dashboard");
  //   }, 2000);
  // }, []); // The empty dependency array ensures it runs only once after the first render

  const handleBecomeEditorClick = () => {
    try {
      const token = JSON.parse(CookieHelper.get({ key: 'user' }))
      if (token.status === 'logged_in') {
        CookieHelper.set({
          key: "user", value: JSON.stringify({
            status: 'logged_in',
            user_type: 'editor'
          })
        })
        setUser("editor");
        router.push("/editor");
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

  const handleNotificationRead = (id: number) => {
    console.log("Notification read with id:", id);
    setNotificationData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isRead: true } : item
      )
    );
  };

  return (
    <div className="containers bg-white">
      <nav>
        <div className="flex justify-between items-center py-3">
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
                  href="/client"
                  className={isActive("/client", true) ? activeCls : inactiveCls}
                >
                  Dashboard
                </Link>
              </li>

              {/* My Business Dropdown */}
              <li className="relative">
                <div ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className={`flex items-center gap-1 cursor-pointer select-none ${businessActive ? activeCls : inactiveCls
                      }`}
                  >
                    My Business
                    <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
                      <MdKeyboardArrowDown />
                    </span>
                  </button>

                  {open && (
                    <div className="absolute left-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3 z-50">
                      <Link
                        href="/client/manage-job?redirect=dashboardclient"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/manage-job") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Manage Jobs
                      </Link>
                      <Link
                        href="/client/post-job?redirect=dashboardclient"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/post-job") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Post a Job
                      </Link>

                      <Link
                        href="/client/find-editor?redirect=dashboardclient"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/find-editor") || isActive("/client/hire-vedio-editor") || isActive("/client/confirm-deposit") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Find Editors
                      </Link>

                      <Link
                        href="/client/job-proposal?redirect=dashboardclient"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/job-proposal") || isActive("/client/bids-details") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Job Proposals
                      </Link>

                      <Link
                        href="/client/payment-history?redirect=dashboardclient"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/payment-history") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Payment History
                      </Link>

                      <Link
                        href="/client/profile?redirect=dashboardclient"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/profile") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Profile
                      </Link>
                    </div>
                  )}
                </div>
              </li>

              <li>
                <Link
                  href="/pricing?redirect=dashboardclient"
                  className={isActive("/pricing") ? activeCls : inactiveCls}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* ---------- RIGHT SECTION (DESKTOP) ---------- */}
          <div className="flex gap-4 sm:gap-8 items-center">
            <Link
              href="/editor"
              onClick={handleBecomeEditorClick}
              className={`hidden lg:block cursor-pointer ${isActive("/editor") ? activeCls : inactiveCls
                }`}
            >
              Become an Editor
            </Link>

            <div
              className="h-fit leading-0 relative"
              ref={notificationRef}
              onMouseEnter={handleNotificationMouseEnter}
              onMouseLeave={handleNotificationMouseLeave}
            >
              <button type="button" className="" onClick={handleNotificationClick}>
                <IoMdNotificationsOutline className={`w-7 h-7 cursor-pointer hover:text-[#FF4D4F] ${showNotifications ? "text-[#FF4D4F]" : ""}`} />
              </button>
              <div
                className={`leading-normal absolute -right-1/2 translate-x-1/4 md:left-auto md:translate-x-0 md:right-0 mt-3 w-[412px] max-w-[80vw] rounded-xl border bg-white shadow-lg transition-all duration-200 z-50 ${showNotifications ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2"}`}
              >
                <Notification data={notificationData} handleClick={handleNotificationRead} />
              </div>
            </div>

            <Link href="/client/message/1?redirect=dashboardclient">
              <MdMailOutline
                className={`w-7 h-7 cursor-pointer ${isActive("/client/message") ? "text-[#FF4D4F]" : "text-[#333] hover:text-[#FF4D4F] transition-colors duration-300"
                  }`}
              />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className={`flex cursor-pointer border-2 rounded-full ${(isActive("/client/profile") || profileDropdown) ? "border-[#FF4D4F]" : "border-transparent hover:border-[#FF4D4F] transition-border duration-300"}`}
              >
                <Image
                  src="/images/jone3.png"
                  alt="profile"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full"
                />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3 z-50">
                  <Link
                    href="/client/profile?redirect=dashboardclient"
                    className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/profile") ? activeCls : inactiveCls
                      }`}
                    onClick={() => setProfileDropdown(false)}
                  >
                    Profile
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
            <button
              className="lg:hidden text-3xl cursor-pointer"
              onClick={() => setMobileMenu(true)}
            >
              <HiOutlineMenu />
            </button>
          </div>

          {/* ---------- MOBILE HAMBURGER ---------- */}
        </div>
      </nav>

      {/* ========== MOBILE MENU OVERLAY ========== */}
      {mobileMenu && (
        <div
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-xs"
          onClick={() => setMobileMenu(false)}
        />
      )}

      {/* ========== MOBILE MENU SLIDE ========== */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg z-50 py-5 transform transition-transform duration-300 ${mobileMenu ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Close Button */}
        <button
          className="text-2xl cursor-pointer p-0.5 hover:bg-gray-50 rounded-full fixed top-1 left-1 duration-300"
          title="Close menu"
          onClick={() => setMobileMenu(false)}
        >
          <HiX />
        </button>

        {/* Mobile Items */}
        <ul className="text-lg pt-3">
          <li>
            <Link
              href="/client"
              onClick={() => setMobileMenu(false)}
              className={`block px-4 py-2 hover:bg-gray-100 duration-300 ${isActive("/client", true) ? activeCls : inactiveCls
                }`}
            >
              Dashboard
            </Link>
          </li>

          {/* Mobile dropdown */}
          <li>
            <button
              className={`flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 duration-300 cursor-pointer ${businessActive ? activeCls : inactiveCls
                }`}
              onClick={() => setMobileDropdown((prev) => !prev)}
            >
              My Business
              <MdKeyboardArrowDown
                className={`transition-transform ${mobileDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {mobileDropdown && (
              <ul className="mt-2 ml-3 text-base">
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/manage-job") ? activeCls : inactiveCls
                      }`}
                    href="/client/manage-job?redirect=dashboardclient"
                    onClick={() => setMobileMenu(false)}
                  >
                    Manage Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/post-job") ? activeCls : inactiveCls
                      }`}
                    href="/client/post-job?redirect=dashboardclient"
                    onClick={() => setMobileMenu(false)}
                  >
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/find-editor") || isActive("/hire-vedio-editor") || isActive("/confirm-deposit") ? activeCls : inactiveCls
                      }`}
                    href="/client/find-editor?redirect=dashboardclient"
                    onClick={() => setMobileMenu(false)}
                  >
                    Find Editors
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/job-proposal") || isActive("/client/bids-details") ? activeCls : inactiveCls
                      }`}
                    href="/client/job-proposal?redirect=dashboardclient"
                    onClick={() => setMobileMenu(false)}
                  >
                    Job Proposals
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/payment-history") ? activeCls : inactiveCls
                      }`}
                    href="/client/payment-history?redirect=dashboardclient"
                    onClick={() => setMobileMenu(false)}
                  >
                    Payment History
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/profile") ? activeCls : inactiveCls
                      }`}
                    href="/client/profile?redirect=dashboardclient"
                    onClick={() => setMobileMenu(false)}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link
              href="/pricing?redirect=dashboardclient"
              onClick={() => setMobileMenu(false)}
              className={`block px-4 py-2 hover:bg-gray-100 duration-300 ${isActive("/pricing") ? activeCls : inactiveCls
                }`}
            >
              Pricing
            </Link>
          </li>

          <li className="mb-4">
            <button
              onClick={handleBecomeEditorClick}
              className={`cursor-pointer px-4 py-2 hover:bg-gray-100 duration-300 w-full text-left ${isActive("/editor") ? activeCls : inactiveCls
                }`}
            >
              Become an Editor
            </button>
          </li>

          {/* <li className="pt-4 border-t flex justify-center">
            <button
              onClick={handleLogout}
              className="text-white bg-[#ff4b4b] font-medium px-4 py-1 rounded-lg flex items-center gap-2 cursor-pointer"
            >
              <FiLogOut />
              <span>Logout</span>
            </button>
          </li> */}
        </ul>
      </div>
    </div>
  );
}
