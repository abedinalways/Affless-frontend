
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0F1623] text-white pt-16 pb-10 mt-20">
      <div className="container  mx-auto ">
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
            <div className="flex items-center gap-2">
              <Image
                src="/logo (2).png"
                width={100}
                height={50}
                alt="Logo"
                className="w-20 h-10"
              />
        
            </div>

            <p className="text-[#D7D7D7] font-poppins text-sm mt-4 max-w-xs leading-[150%]">
              The most trusted platform connecting clients and video editors 
              worldwide. Secure payments, verified talent, transparent pricing.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-6">
              <Image src="/discord.svg" width={35} height={35} alt="Discord" />
              <Image src="/facebook.svg" width={35} height={35} alt="Facebook" />
              <Image src="/instagram.svg" width={35} height={35} alt="Instagram" />
              <Image src="/linkedin.svg" width={35} height={35} alt="LinkedIn" />
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">Platform</h3>
            <ul className="space-y-3 text-[#D7D7D7] font-poppins text-sm">
              <li><Link href="#">How It Works</Link></li>
              <li><Link href="#">Pricing</Link></li>
              <li><Link href="#">Trust & Safety</Link></li>
              <li><Link href="#">Success Stories</Link></li>
              <li><Link href="#">FAQs</Link></li>
            </ul>
          </div>

          {/* CLIENTS */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">For Clients</h3>
            <ul className="space-y-3 text-[#D7D7D7] font-poppins text-sm">
              <li><Link href="#">Post a Job</Link></li>
              <li><Link href="#">Find Editors</Link></li>
              <li><Link href="#">Payment Protection</Link></li>
              <li><Link href="#">Client Guide</Link></li>
            </ul>
          </div>

          {/* EDITORS */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">For Editors</h3>
            <ul className="space-y-3 text-[#D7D7D7] font-poppins text-sm">
              <li><Link href="#">Create Profile</Link></li>
              <li><Link href="#">Browse Jobs</Link></li>
              <li><Link href="#">Editor Resources</Link></li>
              <li><Link href="#">Getting Started</Link></li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-lg font-poppins font-medium mb-4">Support</h3>
            <ul className="space-y-3 text-[#D7D7D7] font-poppins text-sm">
              <li><Link href="#">Help Center</Link></li>
              <li><Link href="#">Contact Us</Link></li>
              <li><Link href="#">Dispute Resolution</Link></li>
              <li><Link href="#">Status Page</Link></li>
              <li><Link href="#">Platform Safety Rules</Link></li>
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
