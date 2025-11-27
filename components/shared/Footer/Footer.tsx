
import { Facebook, Instagram, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { BsDiscord } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-[#0F1623] text-white pt-16 pb-10 mt-10">
      <div className="containers  mx-auto ">
        <div className="
          grid grid-cols-1 
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
                src="/logo (2).png"
                width={100}
                height={50}
                alt="Logo"
                className="w-40 h-12 object-cover justify-start"
              />
        
            </div>

            <p className="text-[#D7D7D7] font-poppins text-sm mt-4 max-w-xs leading-[150%]">
              The most trusted platform connecting clients and video editors 
              worldwide. Secure payments, verified talent, transparent pricing.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2 mt-6">
            <div className="border-2 border-white p-3 rounded-full">  <BsDiscord width={40} height={35} className=""/></div>
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

          {/* PLATFORM */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">Platform</h3>
            <ul className="space-y-3 text-[#D7D7D7] font-poppins text-sm">
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
            <ul className="space-y-3 text-[#D7D7D7] font-poppins text-sm">
              <li><Link href="#">Post a Job</Link></li>
              <li><Link href="/find-editors">Find Editors</Link></li>
              <li><Link href="/payment-protection">Payment Protection</Link></li>
              <li><Link href="#">Client Guide</Link></li>
            </ul>
          </div>

          {/* EDITORS */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">For Editors</h3>
            <ul className="space-y-3 text-[#D7D7D7] font-poppins text-sm">
              <li><Link href="#">Create Profile</Link></li>
              <li><Link href="#">Browse Jobs</Link></li>
              <li><Link href="/editor-resource">Editor Resources</Link></li>
              <li><Link href="#">Getting Started</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">Support</h3>
            <ul className="space-y-3 text-[#D7D7D7] font-poppins text-sm">
              <li><Link href="/help-center">Help Center</Link></li>
              <li><Link href="/contactUs">Contact Us</Link></li>
              <li><Link href="/dispute-resoulation">Dispute Resolution</Link></li>
              <li><Link href="#">Status Page</Link></li>
               <li><Link href="/terms-condition">Terms & Conditions Page</Link></li>
              <li><Link href="/platfrom-sefety">Platform Safety Rules</Link></li>
            </ul>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-[#253045] mt-14 pt-6 text-center text-[#D7D7D7] font-poppins text-sm">
          © Copyright — All rights reserved. 2024
        </div>
      </div>
    </footer>
  );
}
