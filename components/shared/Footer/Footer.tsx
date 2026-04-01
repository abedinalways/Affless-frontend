'use client'

import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FaRedditAlien,  } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";
import { useUser } from "@/context/UserContext";
import { XIcon, RedditIcon } from "@/public/svgIcons/svgIcons";

export default function Footer() {
  const { user } = useUser();
  return (
    <footer className="bg-[#0F1623] text-white pt-16 pb-10 mt-10">
      <div className="containers overflow-hidden ">
        <div className="
          grid grid-cols-2 
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-4
          lg:gap-
        ">

          {/* LEFT COLUMN */}
          <div className="">
            <div className="">
              <Link href="/">
                <div className="w-full flex justify-start items-center overflow-hidden">
                  <Image
                    src="/images/logoUpdate.png"
                    width={128}
                    height={42}
                    alt="Logo"
                    className="object-cover"
                  />
                </div>
              </Link>

            </div>

            <p className="text-[#D2D2D5] font-poppins text-sm mt-4 max-w-xs leading-[150%]">
              The most trusted platform connecting clients and video editors
              worldwide. Secure payments, verified talent, transparent pricing.
            </p>

            {/* Social Icons */}
            <div className="hidden md:block">
              <div className="flex items-center flex-wrap gap-2 mt-6 ">
                <Link href="#" className="border-2 border-white p-3 rounded-full cursor-pointer">
                  <BsDiscord width={23} height={23} className="" />
                </Link>
                <Link href="#" className="border-2 border-white p-2 rounded-full cursor-pointer">
                  <Facebook width={23} height={23} />
                </Link>
                <Link target="_blank" href="https://www.instagram.com/editor_marketplace?igsh=cDhjOTRzbmJsMHF5&utm_source=qr" className="border-2 border-white p-2 rounded-full cursor-pointer">
                  <Instagram width={23} height={23} />
                </Link>

                <Link href="#" className="border-2 border-white p-2 rounded-full cursor-pointer">
                  <Linkedin width={23} height={23} />
                </Link>
                <Link href="#" className="border-2 border-white p-2 rounded-full cursor-pointer">
                  <RedditIcon className="w-[23px] h-[23px]" />
                </Link>
                <Link href="#" className="border-2 border-white p-2 rounded-full cursor-pointer">
                  <XIcon className="w-[23px] h-[23px]" />
                </Link>
              </div>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">Platform</h3>
            <ul className="space-y-3 text-[#D2D2D5] font-poppins text-[16px]">
              <li><Link href="/howwork?redirect=home">How It Works</Link></li>
              <li><Link href="/getting-started?redirect=home">Getting Started</Link></li>
              <li><Link href="/pricing?redirect=home">Pricing</Link></li>
              <li><Link href="/trustseftey">Trust & Safety</Link></li>
              <li><Link href="/success-story">Success Stories</Link></li>
              <li><Link href="/frequently-question">FAQs</Link></li>
            </ul>
          </div>

          {/* CLIENTS */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">For Clients</h3>
            <ul className="space-y-3 text-[#D2D2D5] font-poppins text-[16px]">
              <li><Link href="/client/post-job?msg=to post a job&redirect=home">Post a Job</Link></li>
              <li><Link href="/client/find-editor?msg=to find editors&redirect=home">Find Editors</Link></li>
              <li><Link href="/payment-protection?redirect=home">Payment Protection</Link></li>
              <li><Link href="/client-guide?redirect=home">Client Guide</Link></li>
              <li><Link href="/payment-rules?redirect=home">Payment Rules</Link></li>

            </ul>
          </div>

          {/* EDITORS */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">For Editors</h3>
            <ul className="space-y-3 text-[#D2D2D5] font-poppins text-[16px]">
              <li><Link href={`/editor/editor-profile?msg=${user ? "to create profile" : "as editor to create profile"}&redirect=home`}>Create Profile</Link></li>
              <li><Link href="/editor/browse-job?msg=to browse jobs&redirect=home">Browse Jobs</Link></li>
              <li><Link href="/editor-resource?redirect=home">Editor Resources</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">Support</h3>
            <ul className="space-y-3 text-[#D2D2D5] font-poppins text-[16px]">
              <li><Link href="/help-center?redirect=home">Help Center</Link></li>
              <li><Link href="/contactus?redirect=home">Contact Us</Link></li>
              {/* <li><Link href="/stats-page">Status Page</Link></li> */}
              <li><Link href="/dispute-resoulation?redirect=home">Dispute Resolution</Link></li>
              <li><Link href="/status-page?redirect=home">Status Page</Link></li>
              <li><Link href="/terms-condition?redirect=home">Terms & Conditions Page</Link></li>
              <li><Link href="/platform-safety?redirect=home">Platform Safety Rules</Link></li>
            </ul>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex items-center gap-2 mt-6 ">
            <Link href="#" className="border-2 border-white p-3 rounded-full">  <BsDiscord width={40} height={35} className="" /></Link>
            <Link href="#" className="border-2 border-white p-2 rounded-full">
              <Facebook width={23} height={23} />
            </Link>
            <Link target="_blank" href="https://www.instagram.com/editor_marketplace?igsh=cDhjOTRzbmJsMHF5&utm_source=qr" className="border-2 border-white p-2 rounded-full">
              <Instagram width={23} height={23} />
            </Link>
            <Link href="#" className="border-2 border-white p-2 rounded-full">
              <Linkedin width={23} height={23} />
            </Link>
            <Link href="#" className="border-2 border-white p-2 rounded-full cursor-pointer">
              <RedditIcon className="w-[23px] h-[23px]" />
            </Link>
            <Link href="#" className="border-2 border-white p-2 rounded-full cursor-pointer">
              <XIcon className="w-[23px] h-[23px]" />
            </Link>
          </div>
        </div>
        {/* COPYRIGHT */}
        <div className="border-t border-[#253045] mt-14 pt-6 text-center text-[#D2D2D5] font-poppins text-sm "></div>
        <div className=" flex items-center justify-center mx-auto ">
          <div className="flex gap-1">
            <p className=""> © 2026 Editor Marketplace. All rights reserved. </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
