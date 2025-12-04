"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown, MdMailOutline } from "react-icons/md";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useRouter } from "next/navigation";

export default function EditorDashboardHeader() {
  const [open, setOpen] = useState(false); // Desktop dropdown
  const [mobileMenu, setMobileMenu] = useState(false); // Mobile menu
  const [mobileDropdown, setMobileDropdown] = useState(false); // Mobile dropdown
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Close desktop dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
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
    // Redirect to the editor dashboard
    router.push("/editor-dashboard");
  };

  return (
    <div className="containers">
      <nav>
        <div className="flex justify-between items-center py-3">

          {/* ---------- LEFT SECTION ---------- */}
          <div className="flex items-center gap-10">

            {/* Logo */}
            <Link href="/">
              <div className="w-[100px] h-[50px] flex justify-center items-center overflow-hidden">
               <Image
                               src="/images/footerLogo.png"
                               width={100}
                               height={100}
                               alt="Logo"
                               className=" object-cover justify-start"
                             />
              </div>
            </Link>

            {/* DESKTOP MENU (Visible on lg and larger) */}
            <ul className="hidden lg:flex items-center gap-8 text-[#333] font-poppins text-base relative">
              <li>
                <Link href="/client/dashboard">Dashboard</Link>
              </li>

              {/* My Business Dropdown */}
              <li className="relative">
                <div ref={dropdownRef}>
                  <button
                    onClick={() => setOpen(!open)}
                    className="flex items-center gap-1 cursor-pointer select-none"
                  >
                    Job
                    <span className={`transition-transform ${open ? "rotate-180" : ""}`}>
                      <MdKeyboardArrowDown />
                    </span>
                  </button>

                  {open && (
                    <div className="absolute left-0 mt-3 w-48 bg-white shadow-lg rounded-lg py-3 z-50">
                      <Link href="/client/manage-job" className="block px-4 py-2 hover:bg-gray-100">My Job</Link>
                      <Link href="/client/find-editor" className="block px-4 py-2 hover:bg-gray-100">My Proposals</Link>
                      <Link href="/client/job-proposal" className="block px-4 py-2 hover:bg-gray-100">Find Job</Link>
                      <Link href="/client/payment-history" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                      <Link href="/client/profile" className="block px-4 py-2 hover:bg-gray-100">Earning</Link>
                    </div>
                  )}
                </div>
              </li>

              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
            </ul>
          </div>

          {/* ---------- RIGHT SECTION (DESKTOP) ---------- */}
          <div className="hidden lg:flex gap-8 items-center">
            <button onClick={handleBecomeEditorClick} className="cursor-pointer">
              Become an Editor
            </button>
            <IoMdNotificationsOutline className="w-7 h-7 cursor-pointer" />
            <MdMailOutline className="w-7 h-7 cursor-pointer" />
            <Link href="/client/profile" className="flex">
              <Image src="/images/profile.png" alt="profile" width={32} height={32} className="rounded-full" />
            </Link>
          </div>

          {/* ---------- MOBILE HAMBURGER ---------- */}
          <button
            className="lg:hidden text-3xl"
            onClick={() => setMobileMenu(true)}
          >
            <HiOutlineMenu />
          </button>

        </div>
      </nav>

      {/* ========== MOBILE MENU OVERLAY ========== */}
      {mobileMenu && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setMobileMenu(false)} />
      )}

      {/* ========== MOBILE MENU SLIDE ========== */}
    <div
  className={`fixed top-0 left-0 w-full h-full bg-white shadow-lg z-50 p-5 transform transition-transform duration-300 ${
    mobileMenu ? "translate-x-0" : "translate-x-[-100%]"
  }`}
>

        {/* Close Button */}
        <button className="text-3xl mb-5" onClick={() => setMobileMenu(false)}>
          <HiX />
        </button>

        {/* Mobile Items */}
        <ul className="space-y-4 text-lg">

          <li>
            <Link href="/client/dashboard" onClick={() => setMobileMenu(false)}>
              Dashboard
            </Link>
          </li>

          {/* Mobile dropdown */}
          <li>
            <button
              className="flex items-center justify-between w-full"
              onClick={() => setMobileDropdown(!mobileDropdown)}
            >
             Job
              <MdKeyboardArrowDown
                className={`transition-transform ${mobileDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {mobileDropdown && (
              <ul className="mt-2 ml-3 space-y-3 text-base">
                <li><Link href="/client/my-job" onClick={() => setMobileMenu(false)}>My Job</Link></li>
                <li><Link href="/client/my-proposal" onClick={() => setMobileMenu(false)}>My Proposals</Link></li>
                <li><Link href="/client/find-job" onClick={() => setMobileMenu(false)}>Find Job</Link></li>
                <li><Link href="#" onClick={() => setMobileMenu(false)}>Profile</Link></li>
                <li><Link href="#" onClick={() => setMobileMenu(false)}>Earning</Link></li>
              </ul>
            )}
          </li>

          <li>
            <Link href="/pricing" onClick={() => setMobileMenu(false)}>
              Pricing
            </Link>
          </li>

          <li >
            <button onClick={handleBecomeEditorClick} className="cursor-pointer">
              Become an Editor
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
