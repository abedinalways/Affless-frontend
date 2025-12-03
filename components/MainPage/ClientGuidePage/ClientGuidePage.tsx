"use client";

import LikeIcon from "@/components/Icons/LikeIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import { FileText, Search, MessageSquare, Lock, RefreshCw, DollarSign, CheckCircle } from "lucide-react";
import { CiSearch, CiStar } from "react-icons/ci";
import { FaSquareCheck } from "react-icons/fa6";
import { FiCheckCircle } from "react-icons/fi";
import { IoDocumentTextOutline } from "react-icons/io5";
import { LuShieldCheck } from "react-icons/lu";
export default function ClientGuidePage() {
  return (
<div>

          <div>
        <PageBanner
  title="Pricing"
  bgImage="/findEditor.jpg"
  links={[
    { label: "Home", href: "/" },
    { label: "Pricing" }
  ]}
/>

      </div>
        <div className="flex flex-col lg:flex-row w-full justify-center bg-gray-100 min-h-screen py-10 px-4 containers gap-4">

      {/* ---------- LEFT SIDEBAR ---------- */}
      <div className="w-full lg:w-64 bg-white shadow p-6 rounded-xl h-fit lg:sticky top-10 mr-8 ">
        <h2 className="font-semibold text-[#333] mb-4">Quick links</h2>
        <ul className="space-y-3 text-[#333] text-sm">
          <li className="hover:text-orange-500 cursor-pointer">Getting Started</li>
          <li className="hover:text-orange-500 cursor-pointer">How it Works</li>
          <li className="hover:text-orange-500 cursor-pointer">Post Your Project</li>
          <li className="hover:text-orange-500 cursor-pointer">Review Proposals</li>
          <li className="hover:text-orange-500 cursor-pointer">Communicate & Award</li>
          <li className="hover:text-orange-500 cursor-pointer">Fund the Project</li>
          <li className="hover:text-orange-500 cursor-pointer">Review Work & Revisions</li>
          <li className="hover:text-orange-500 cursor-pointer">Approve & Release Payment</li>
        </ul>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className=" w-full bg-white p-4 lg:p-8 rounded-xl shadow space-y-8">

        {/* PAGE TITLE */}
        <div>
          <h1 className="text-[20px] md:text-2xl text-[#333] font-medium">Client Guide</h1>
          <p className="text-[#333] mt-3.5 font-normal leading-150% ">
            Everything you need to know about hiring and working with professional video editors.
          </p>
        </div>

        {/* GETTING STARTED */}
        <div>
          <h2 className="text-[20px] md:text-2xl text-[#333] font-medium mb-3">Getting Started</h2>
          <p className="text-[#333] mt-3.5 font-normal leading-150% mb-4">
            This guide will walk you through the entire process of hiring a video editor.
          </p>

          <div className="p-5 border rounded-xl bg-orange-50 space-y-3">
            <div className="flex items-center gap-2">
              <FiCheckCircle  className="text-red-500" />
              <h3 className="text-[16px] md:text-[18px] text-[#333] font-medium leading-150%">What You'll Learn</h3>
            </div>

            <ul className="list-disc pl-5 text-[#333] space-y-3.5">
              <li>How to create an effective project brief</li>
              <li>Finding and evaluating the right editor</li>
              <li>Managing your project and communication</li>
              <li>Understanding payment protection</li>
            </ul>
          </div>
        </div>

        {/* HOW IT WORKS */}
    <div>
    <div  className="space-y-8">
          <h2 className="text-[20px] md:text-2xl text-[#333] font-medium ">How It Works</h2>
          <p className="text-[#333] mb-4">
            Our platform makes it simple to hire talented video editors.
          </p>

          {/* STEP 1 */}
          <div className="  bg-white  space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-[#FFEEEE] text-red-500 w-14 h-14 flex items-center justify-center rounded-full text-sm font-bold">
                <IoDocumentTextOutline className="w-9 h-9"/>
              </span>
              <h3 className="text-[20px] md:text-2xl text-[#333] font-medium ">1 .Post Your Project</h3>
            </div>
            <p className="text-[18px] text-[#4A4C56] font-normal pt-3 pb-5">Start by creating a detailed project brief. Include information about your video type (YouTube, corporate, social media, etc.), desired editing style, budget range, and deadline. The more details you provide, the better proposals you'll receive.</p>
          <div className="pl-5 bg-[#F7F6F6] rounded-lg p-4 ">
              <p className="text-[#333] text-sm text-[18px]">
              What to Include:
            </p>

            <div className="list-disc  text-[#333] text-sm space-y-3.5 pt-3.5">
               
              <div className="flex gap-2"> <FiCheckCircle  className="text-red-500"/> Project title and description</div>
              <div className="flex gap-2"> <FiCheckCircle  className="text-red-500"/> Video length and format requirements</div>
              <div className="flex gap-2"> <FiCheckCircle  className="text-red-500"/> Budget and timeline expectations</div>
              <div className="flex gap-2"> <FiCheckCircle  className="text-red-500"/> Reference videos or style examples</div>
            </div>
          </div>
          </div>

          {/* STEP 2 */}
          <div className=" bg-white  space-y-2 mt-5">
            <div className="flex items-center gap-2">
              <span className="bg-[#FFEDD4] text-white w-12 h-12 flex items-center justify-center rounded-full text-sm font-bold">
              <CiSearch className="text-yellow-600 w-6 h-6" />
              </span>
              <h3 className="text-[20px] md:text-2xl text-[#333] font-medium ">2. Review Proposals</h3>
            </div>

            <p className="text-[#4A4C56] text-[18px] leading-150% pt-3 pb-5">
              Within hours of posting, you'll start receiving proposals from interested editors. Each proposal includes their rate, estimated timeline, relevant portfolio samples, and a personalized message about your project.
            </p>

          <div className="bg-[#F7F6F6] rounded-lg p-4 space-y-3.5">
              <div className="flex items-center gap-2 mt-2">
         
              <h4 className="font-medium text-[18px] text-[#333]">Evaluation Checklist</h4>
            </div>

            <ul className="list-disc pl-5 text-[#333] text-sm space-y-3.5">
              <li>Review their portfolio</li>
              <li>Check client reviews</li>
              <li>Look at completion rate</li>
              <li>Consider proposal quality</li>
            </ul>
          </div>
          </div>

          {/* STEP 3 */}
          <div className=" bg-white  space-y-2 mt-5">
            <div className="flex items-center gap-2">
              <span className=" text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold">
               <MessageSquare className="text-blue-500" />
              </span>
        
              <h3 className="text-[20px] md:text-2xl text-[#333] font-medium ">3. Communicate & Award</h3>
            </div>
      <h3 className="pt-3 pb-6 text-[#4A4C56]">Before awarding the project, message your top candidates to clarify details and ensure they understand your requirements. Once you've chosen the right editor, award them the project and finalize the terms.</h3>
           <div className="bg-[#F7F6F6] p-4 rounded-lg">
             <div className="flex items-center gap-2">
              
              <h4 className="text-[18px] pb-3.5">Discussion Topics :</h4>
            </div>

            <ul className="list-disc pl-5 text-[#333] text-sm space-y-3.5">
              <li>Confirm deliverables and format</li>
              <li>Agree on number of revisions</li>
              <li>Set milestone deadlines</li>
              <li>Confirm communication preferences</li>
            </ul>
           </div>
          </div>

          {/* STEP 4 */}
          <div className=" bg-white  space-y-2 mt-5">
            <div className="flex items-center gap-2">
              <span className="bg-[#DBFCE7] text-white w-12 h-12 flex items-center justify-center rounded-full text-sm font-bold">
                <LuShieldCheck className="text-green-500 h-8 w-7"/>
              </span>
              <h3 className="text-[20px] md:text-2xl text-[#333] font-medium ">4. Fund the Project (Escrow)</h3>
            </div>
            <h3 className="pt-3 pb-6 text-[#4A4C56]">After awarding the project, deposit the payment into our secure escrow system. Your funds are protected and won't be released to the editor until you approve the completed work. This protects both you and the freelancer.</h3>

          <div className="bg-[#F0FDF4] p-4 rounded-lg border-1 border-green-300">
              <div className="flex items-center gap-2">
            
              <h4 className="text-[18px] pb-3.5">Payment Protection Benefits</h4>
            </div>

            <ul className="list-disc pl-5 text-[#333] text-sm space-y-3.5">
              <li>Your money stays safe until approval</li>
              <li>Dispute resolution support</li>
              <li>Full refund if not delivered</li>
            </ul>
          </div>
          </div>

          {/* STEP 5 */}
          <div className="l bg-white  space-y-2 mt-5">
            <div className="flex items-center gap-2">
              <span className="bg-[#F3E8FF] text-white w-12 h-12 flex items-center justify-center rounded-full text-sm font-bold">
            <LikeIcon/>
              </span>
              <h3 className="text-[20px] md:text-2xl text-[#333] font-medium ">Review Work & Request Revisions</h3>
            </div>
            <h3 className="pt-3 pb-6 text-[#4A4C56]">Once the editor delivers the first draft, review it carefully. If changes are needed, provide clear, specific feedback through our messaging system. Most projects include 2-3 revision rounds, so don't hesitate to ask for adjustments.</h3>

         <div className="bg-[#F7F6F6] rounded-lg p-4">
             <div className="flex items-center gap-2">
             
              <h4 className="text-[18px] pb-3.5">Effective Feedback Tips</h4>
            </div>

            <ul className=" text-sm text-[#333] space-y-3.5">
              <li className="flex gap-2"> <FiCheckCircle  className="text-[#9810FA]"/>Be specific about changes needed</li>
              <li className="flex gap-2"> <FiCheckCircle  className="text-[#9810FA]"/> Explain the reasoning</li>
              <li className="flex gap-2"> <FiCheckCircle  className="text-[#9810FA]"/> Use visual references</li>
              <li className="flex gap-2"> <FiCheckCircle  className="text-[#9810FA]"/> Be constructive</li>
            </ul>
         </div>
          </div>

          {/* STEP 6 */}
          <div className=" bg-white space-y-2 mt-5">
            <div className="flex items-center gap-2">
              <span className="bg-[#FEF9C2] text-white w-12 h-12   flex items-center justify-center rounded-full text-sm font-bold">
               <CiStar className="w-7 h-7 text-[#D08700]"/>
              </span>
              <h3 className="text-[20px] md:text-2xl text-[#333] font-medium ">Approve & Release Payment</h3>
            </div>
<h3 className="pt-3 pb-6 text-[#4A4C56]">When you're completely satisfied with the final video, approve the deliverable and release the payment from escrow. The editor will receive their funds, and you can leave a review to help future clients.</h3>
           <div className="bg-[#FEFCE8] rounded-lg p-4">
             <div className="flex items-center gap-2">
              <h4 className="text-[18px] pb-3.5">After Project Completion</h4>
            </div>

            <ul className=" text-sm text-[#333] space-y-3.5">
              <li className="flex gap-[7px]"><CiStar className="w-5 h-5 text-[#D08700]"/> Leave a detailed review</li>
              <li className="flex gap-[7px]"> <CiStar className="w-5 h-5 text-[#D08700]"/>Save the editor for future projects</li>
              <li className="flex gap-[7px]"> <CiStar className="w-5 h-5 text-[#D08700]"/> Download all final files</li>
              <li className="flex gap-[7px]"> <CiStar className="w-5 h-5 text-[#D08700]"/> Be professional and constructive</li>
            </ul>
           </div>
          </div>
        </div>
    </div>

      </div>
    </div>
</div>
  );
}
