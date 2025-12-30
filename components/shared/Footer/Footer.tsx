
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-[#0F1623] text-white pt-16 pb-10 mt-10">
      <div className="containers overflow-hidden ">
        <div className="
          grid grid-cols-2 
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-12
          lg:gap-
        ">

          {/* LEFT COLUMN */}
          <div className="">
            <div className="">
              <Image
                src="/images/footerLogo.png"
                width={128}
                height={100}
                alt="Logo"
                className=" object-cover justify-start"
              />

            </div>

            <p className="text-[#D2D2D5] font-poppins text-sm mt-4 max-w-xs leading-[150%]">
              The most trusted platform connecting clients and video editors
              worldwide. Secure payments, verified talent, transparent pricing.
            </p>

            {/* Social Icons */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2 mt-6 ">
                <Link href="#" className="border-2 border-white p-3 rounded-full">
                  <BsDiscord width={40} height={35} className="" />
                </Link>
                <Link href="#" className="border-2 border-white p-2 rounded-full">
                  <Facebook width={23} height={25} />
                </Link>
                <Link href="#" className="border-2 border-white p-2 rounded-full">
                  <Instagram width={23} height={25} />
                </Link>

                <Link href="#" className="border-2 border-white p-2 rounded-full">
                  <Linkedin width={23} height={25} />
                </Link>
              </div>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">Platform</h3>
            <ul className="space-y-3 text-[#D2D2D5] font-poppins text-[16px]">
              <li><Link href="/howWork">How It Works</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/trustSeftey">Trust & Safety</Link></li>
              <li><Link href="/success-story">Success Stories</Link></li>
              <li><Link href="/frequently-question">FAQs</Link></li>
            </ul>
          </div>

          {/* CLIENTS */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">For Clients</h3>
            <ul className="space-y-3 text-[#D2D2D5] font-poppins text-[16px]">
              <li><Link href="/client/post-job">Post a Job</Link></li>
              <li><Link href="/find-editors">Find Editors</Link></li>
              <li><Link href="/payment-protection">Payment Protection</Link></li>
              <li><Link href="/client-guide">Client Guide</Link></li>
            </ul>
          </div>

          {/* EDITORS */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">For Editors</h3>
            <ul className="space-y-3 text-[#D2D2D5] font-poppins text-[16px]">
              <li><Link href="/editor/editor-profile">Create Profile</Link></li>
              <li><Link href="/editor/browse-job">Browse Jobs</Link></li>
              <li><Link href="/editor-resource">Editor Resources</Link></li>
              {/* <li><Link href="#">Getting Started</Link></li> */}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">Support</h3>
            <ul className="space-y-3 text-[#D2D2D5] font-poppins text-[16px]">
              <li><Link href="/help-center">Help Center</Link></li>
              <li><Link href="/contactUs">Contact Us</Link></li>
              <li><Link href="/dispute-resoulation">Dispute Resolution</Link></li>
              {/* <li><Link href="#">Status Page</Link></li> */}
              <li><Link href="/terms-condition">Terms & Conditions Page</Link></li>
              <li><Link href="/platform-safety">Platform Safety Rules</Link></li>
            </ul>
          </div>
        </div>

        <div className="block md:hidden">
          <div className="flex items-center gap-2 mt-6 ">
            <div className="border-2 border-white p-3 rounded-full">  <BsDiscord width={40} height={35} className="" /></div>
            <div className="border-2 border-white p-2 rounded-full">
              <Facebook width={23} height={25} />
            </div>
            <div className="border-2 border-white p-2 rounded-full">
              <Instagram width={23} height={25} />
            </div>

            <div className="border-2 border-white p-2 rounded-full">
              <Linkedin width={23} height={25} />
            </div>
          </div>
        </div>
        {/* COPYRIGHT */}
        <div className="border-t border-[#253045] mt-14 pt-6 text-center text-[#D2D2D5] font-poppins text-sm "></div>
        <div className="w-[696px] flex items-center mx-auto ">
          <div className="flex justify-between w-[400px]  md:w-[696px]">
            <p className="">© Copyright</p>
            <p className="">All rights reserved. 2026</p>
          </div>
        </div>

      </div>
    </footer>
  );
}
