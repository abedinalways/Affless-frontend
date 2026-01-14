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

  // ✅ active style
  const activeCls = "text-[#FF4D4F] font-semibold";
  const inactiveCls = "text-[#333] hover:text-[#FF4D4F] transition-colors";

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const businessRoutes = [
    "/client/manage-job",
    "/client/find-editor",
    "/client/job-proposal",
    "/client/payment-history",
    "/client/profile",
  ];

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

  return (
    <div className="containers bg-white">
      <nav>
        <div className="flex justify-between items-center py-3">
          {/* ---------- LEFT SECTION ---------- */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <Link href="/">
              <div className="w-32 h-[42px] flex justify-center items-center overflow-hidden">
                <Image
                  src="/images/logoUpdate.png"
                  width={128}
                  height={100}
                  alt="Logo"
                  className=" object-cover justify-start"
                />
              </div>
            </Link>

            {/* DESKTOP MENU (Visible on lg and larger) */}
            <ul className="hidden lg:flex items-center gap-8 text-[#333] font-poppins text-base relative">
              <li>
                <Link
                  href="/client/dashboard"
                  className={isActive("/client/dashboard") ? activeCls : inactiveCls}
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
                        href="/client/manage-job"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/manage-job") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Manage Job
                      </Link>

                      <Link
                        href="/client/find-editor"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/find-editor") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Find Editor
                      </Link>

                      <Link
                        href="/client/job-proposal"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/job-proposal") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Job Proposal
                      </Link>

                      <Link
                        href="/client/payment-history"
                        className={`block px-4 py-2 hover:bg-gray-100 ${isActive("/client/payment-history") ? activeCls : inactiveCls
                          }`}
                        onClick={() => setOpen(false)}
                      >
                        Payment History
                      </Link>

                      <Link
                        href="/client/profile"
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
                  href="/pricing"
                  className={isActive("/pricing") ? activeCls : inactiveCls}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* ---------- RIGHT SECTION (DESKTOP) ---------- */}
          <div className="flex gap-8 items-center">
            <Link
              href="/editor"
              onClick={handleBecomeEditorClick}
              className={`hidden lg:block cursor-pointer ${isActive("/editor") ? activeCls : inactiveCls
                }`}
            >
              Become a Editor
            </Link>

            <div className="relative group">
              <IoMdNotificationsOutline className="w-7 h-7 cursor-pointer" />
              <div
                className="
      absolute right-0 mt-3 w-[412px]
      rounded-xl border bg-white shadow-lg
      opacity-0 invisible translate-y-2
      group-hover:opacity-100 group-hover:visible group-hover:translate-y-0
      transition-all duration-200 z-50
    "
              >
                <Notification />
              </div>
            </div>

            <Link href="/client/message">
              <MdMailOutline
                className={`w-7 h-7 cursor-pointer ${isActive("/client/message") ? "text-[#FF4D4F]" : "text-[#333]"
                  }`}
              />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileDropdownRef}>
              <button
                onClick={() => setProfileDropdown(!profileDropdown)}
                className="flex cursor-pointer"
              >
                <Image
                  src="/images/profile.png"
                  alt="profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              </button>

              {profileDropdown && (
                <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3 z-50">
                  <Link
                    href="/client/profile"
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
        className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 py-5 transform transition-transform duration-300 ${mobileMenu ? "translate-x-0" : "translate-x-full"
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
              href="/client/dashboard"
              onClick={() => setMobileMenu(false)}
              className={`block px-4 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/dashboard") ? activeCls : inactiveCls
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
                    href="/client/manage-job"
                    onClick={() => setMobileMenu(false)}
                  >
                    Manage Job
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/find-editor") ? activeCls : inactiveCls
                      }`}
                    href="/client/find-editor"
                    onClick={() => setMobileMenu(false)}
                  >
                    Find Editor
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/job-proposal") ? activeCls : inactiveCls
                      }`}
                    href="/client/job-proposal"
                    onClick={() => setMobileMenu(false)}
                  >
                    Job Proposal
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/payment-history") ? activeCls : inactiveCls
                      }`}
                    href="/client/payment-history"
                    onClick={() => setMobileMenu(false)}
                  >
                    Payment History
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block px-3 py-2 hover:bg-gray-100 duration-300 ${isActive("/client/profile") ? activeCls : inactiveCls
                      }`}
                    href="/client/profile"
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
              href="/pricing"
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
