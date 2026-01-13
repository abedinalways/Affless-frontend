/** @format */

"use client";

import LikeIcon from "@/components/Icons/LikeIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import {
  FileText,
  Search,
  MessageSquare,
  Lock,
  RefreshCw,
  DollarSign,
  CheckCircle,
} from "lucide-react";
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
          title='Client Guide'
          bgImage='/findEditor.jpg'
          links={[{ label: "Home", href: "/" }, { label: "Client Guide" }]}
        />
      </div>
      <div className=' w-full justify-center bg-gray-100 min-h-screen py-10 px-4 containers gap-4'>
        {/* ---------- LEFT SIDEBAR ---------- */}
        {/* <div className="w-full lg:w-64 bg-white shadow p-6 rounded-xl h-fit lg:sticky top-26 mr-8 ">
          <h2 className="font-semibold text-[#333] mb-4">Quick links</h2>
          <ul className="space-y-3 text-[#333] text-sm">
            <li className="hover:text-orange-500 cursor-pointer"><a href="#getting">Getting Started</a></li>
            <li className="hover:text-orange-500 cursor-pointer"><a href="#howWork">How it Works</a></li>
            <li className="hover:text-orange-500 cursor-pointer"><a href="#post" >Post Your Project</a></li>
            <li className="hover:text-orange-500 cursor-pointer"><a href="#proposal">Review Proposals</a></li>
            <li className="hover:text-orange-500 cursor-pointer"><a href="#comunication">Communicate & Award</a></li>
            <li className="hover:text-orange-500 cursor-pointer"><a href="#found">Fund the Project</a></li>
            <li className="hover:text-orange-500 cursor-pointer"><a href="#reviewWork">Review Work & Revisions</a></li>
            <li className="hover:text-orange-500 cursor-pointer">Approve & Release Payment</li>
          </ul>
        </div> */}

        {/* ---------- MAIN CONTENT ---------- */}
        <div className=' w-full bg-white p-4 lg:p-8 rounded-xl shadow space-y-8'>
          {/* PAGE TITLE */}
          <div>
            <h1 className='text-[20px] md:text-2xl text-[#333] font-medium'>
              Client Guide
            </h1>
            <p className='text-[#333] mt-3.5 font-normal leading-150% '>
              Everything you need to know about hiring and working with
              professional video editors.
            </p>
          </div>

          {/* GETTING STARTED */}
          <div>
            <h2
              id='getting'
              className='text-[20px] md:text-2xl text-[#333] font-medium mb-3'>
              Getting Started
            </h2>
            <p className='text-[#333] mt-3.5 font-normal leading-150% mb-4'>
              This guide will walk you through the entire process of hiring a
              video editor.
            </p>

            <div className='p-5 border rounded-xl bg-orange-50 space-y-3'>
              <div className='flex items-center gap-2'>
                <FiCheckCircle className='text-red-500' />
                <h3 className='text-[16px] md:text-[18px] text-[#333] font-medium leading-150%'>
                  What You'll Learn
                </h3>
              </div>

              <ul className='list-disc pl-5 text-[#333] space-y-3.5'>
                <li>How to create an effective project brief</li>
                <li>Finding and evaluating the right editor</li>
                <li>Managing your project and communication</li>
                <li>Understanding payment protection</li>
              </ul>
            </div>
          </div>

          {/* HOW IT WORKS */}
          <div>
            <div className='space-y-8'>
              <h2
                id='howWork'
                className='text-[20px] md:text-2xl text-[#333] font-medium '>
                How It Works
              </h2>
              <p className='text-[#333] mb-4'>
                Our platform makes it simple to hire talented video editors.
              </p>

              {/* STEP 1 */}
              <div className='  bg-white  space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='bg-[#FFEEEE] text-red-500 w-14 h-14 flex items-center justify-center rounded-full text-sm font-bold'>
                    <IoDocumentTextOutline className='w-9 h-9' />
                  </span>
                  <h3
                    id='post'
                    className='text-[20px] md:text-2xl text-[#333] font-medium '>
                    1. Post Your Project
                  </h3>
                </div>
                <p className='text-[18px] text-[#4A4C56] font-normal pt-3 pb-5'>
                  Start by creating a detailed project brief. Include clear
                  information about your project type (YouTube Long-form,
                  Shorts/Reels/TikToks, Thumbnails, Ads/UGC, Podcasts,
                  Weddings/Events, Captions/Subtitles, or Color & Audio), along
                  with your desired editing style, budget range, and deadline.
                  The more clearly you describe your needs, the more relevant
                  and accurate the proposals you will receive.
                </p>
                <div className='pl-5 bg-[#F7F6F6] rounded-lg p-4 '>
                  <p className='text-[#333] text-sm text-[18px]'>
                    What to Include:
                  </p>

                  <div className='list-disc  text-[#333] text-sm space-y-3.5 pt-3.5'>
                    <div className='flex gap-2'>
                      {" "}
                      <FiCheckCircle className='text-red-500' /> Your project
                      type (YouTube Long-form, Shorts/Reels/TikToks, Thumbnails,
                      Ads/UGC, Podcasts, Weddings/Events, Captions/Subtitles, or
                      Color & Audio)
                    </div>
                    <div className='flex gap-2'>
                      {" "}
                      <FiCheckCircle className='text-red-500' /> Brief
                      Information about your project
                    </div>
                    <div className='flex gap-2'>
                      {" "}
                      <FiCheckCircle className='text-red-500' /> Your desired
                      editing style, budget range, and deadline
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 2 */}
              <div className=' bg-white  space-y-2 mt-5'>
                <div className='flex items-center gap-2'>
                  <span className='bg-[#FFEDD4] text-white w-12 h-12 flex items-center justify-center rounded-full text-sm font-bold'>
                    <CiSearch className='text-yellow-600 w-6 h-6' />
                  </span>
                  <h3
                    id='proposal'
                    className='text-[20px] md:text-2xl text-[#333] font-medium '>
                    2. Review Proposals
                  </h3>
                </div>

                <p className='text-[#4A4C56] text-[18px] leading-150% pt-3 pb-5'>
                  After posting your project, you’ll begin receiving proposals
                  from interested editors. Each proposal includes the editor’s
                  rate, estimated delivery timeline, relevant portfolio samples,
                  and a personalized message addressing your project.
                </p>

                <div className='bg-[#F7F6F6] rounded-lg p-4 space-y-3.5'>
                  <div className='flex items-center gap-2 mt-2'>
                    <h4 className='font-medium text-[18px] text-[#333]'>
                      Evaluation Checklist:
                    </h4>
                  </div>

                  <ul className='list-disc pl-5 text-[#333] text-sm space-y-3.5'>
                    <li>Review relevant portfolio work </li>
                    <li>Check editor ratings and completed jobs</li>
                    <li>Compare delivery timelines</li>
                    <li>Evaluate proposal clarity and professionalism</li>
                  </ul>
                </div>
              </div>

              {/* STEP 3 */}
              <div className=' bg-white  space-y-2 mt-5'>
                <div className='flex items-center gap-2'>
                  <span className=' text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold'>
                    <MessageSquare className='text-blue-500' />
                  </span>

                  <h3
                    id='comunication'
                    className='text-[20px] md:text-2xl text-[#333] font-medium '>
                    3. Communicate & Award
                  </h3>
                </div>
                <h3 className='pt-3 pb-6 text-[#4A4C56]'>
                  Before awarding the project, message your editor proposals to
                  confirm details and ensure alignment. Once you’ve selected the
                  right editor, award the project and finalize expectations.
                </h3>
                <div className='bg-[#F7F6F6] p-4 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <h4 className='text-[18px] pb-3.5'>Discussion Topics:</h4>
                  </div>

                  <ul className='list-disc pl-5 text-[#333] text-sm space-y-3.5'>
                    <li>Confirm deliverables and format</li>
                    <li>Agree on number of revisions</li>
                    <li>Set clear deadlines </li>
                    <li>Confirm communication preferences</li>
                  </ul>
                </div>
              </div>

              {/* STEP 4 */}
              <div className=' bg-white  space-y-2 mt-5'>
                <div className='flex items-center gap-2'>
                  <span className='bg-[#DBFCE7] text-white w-12 h-12 flex items-center justify-center rounded-full text-sm font-bold'>
                    <LuShieldCheck className='text-green-500 h-8 w-7' />
                  </span>
                  <h3
                    id='found'
                    className='text-[20px] md:text-2xl text-[#333] font-medium '>
                    4. Fund the Project using Escrow
                  </h3>
                </div>
                <h3 className='pt-3 pb-6 text-[#4A4C56]'>
                  After awarding the project, deposit the payment into our
                  secure escrow system. Your funds are protected and will not be
                  released to the editor until you approve the completed work.
                  This ensures security for both clients and editors.
                </h3>

                <div className='bg-[#F0FDF4] p-4 rounded-lg border border-green-300'>
                  <div className='flex items-center gap-2'>
                    <h4 className='text-[18px] pb-3.5'>
                      Payment Protection Benefits:
                    </h4>
                  </div>

                  <ul className='list-disc pl-5 text-[#333] text-sm space-y-3.5'>
                    <li>Funds are held securely until approval</li>
                    <li> Dispute resolution support </li>
                    <li>Full refund if work is not delivered</li>
                  </ul>
                </div>
              </div>

              {/* STEP 5 */}
              <div className='l bg-white  space-y-2 mt-5'>
                <div className='flex items-center gap-2'>
                  <span className='bg-[#F3E8FF] text-white w-12 h-12 flex items-center justify-center rounded-full text-sm font-bold'>
                    <LikeIcon />
                  </span>
                  <h3
                    id='reviewWork'
                    className='text-[20px] md:text-2xl text-[#333] font-medium '>
                    Review Work & Request Revisions
                  </h3>
                </div>
                <h3 className='pt-3 pb-6 text-[#4A4C56]'>
                  Once the editor delivers the first draft, review it carefully.
                  If changes are needed, provide clear and specific feedback
                  through the platform’s messaging system. Most projects include
                  revision rounds, so don’t hesitate to request adjustments.
                </h3>

                <div className='bg-[#F7F6F6] rounded-lg p-4'>
                  <div className='flex items-center gap-2'>
                    <h4 className='text-[18px] pb-3.5'>
                      Effective Feedback Tips:
                    </h4>
                  </div>

                  <ul className=' text-sm text-[#333] space-y-3.5'>
                    <li className='flex gap-2'>
                      {" "}
                      <FiCheckCircle className='text-[#9810FA]' />
                      Be specific about requested changes
                    </li>
                    <li className='flex gap-2'>
                      {" "}
                      <FiCheckCircle className='text-[#9810FA]' /> Explain the
                      reasoning clearly
                    </li>
                    <li className='flex gap-2'>
                      {" "}
                      <FiCheckCircle className='text-[#9810FA]' /> Reference
                      timestamps or examples
                    </li>
                    <li className='flex gap-2'>
                      {" "}
                      <FiCheckCircle className='text-[#9810FA]' /> Keep feedback
                      professional and constructive
                    </li>
                  </ul>
                </div>
              </div>

              {/* STEP 6 */}
              <div className=' bg-white space-y-2 mt-5'>
                <div className='flex items-center gap-2'>
                  <span className='bg-[#FEF9C2] text-white w-12 h-12   flex items-center justify-center rounded-full text-sm font-bold'>
                    <CiStar className='w-7 h-7 text-[#D08700]' />
                  </span>
                  <h3 className='text-[20px] md:text-2xl text-[#333] font-medium '>
                    Approve & Release Payment
                  </h3>
                </div>
                <h3 className='pt-3 pb-6 text-[#4A4C56]'>
                  When you are fully satisfied with the final deliverable,
                  approve the project and release the payment from escrow. The
                  editor will receive their funds, and you will leave a review
                  to help future clients.
                </h3>
                <div className='bg-[#FEFCE8] rounded-lg p-4'>
                  <div className='flex items-center gap-2'>
                    <h4 className='text-[18px] pb-3.5'>
                      After Project Completion:
                    </h4>
                  </div>

                  <ul className=' text-sm text-[#333] space-y-3.5'>
                    <li className='flex gap-[7px]'>
                      <CiStar className='w-5 h-5 text-[#D08700]' /> Leave an
                      honest review
                    </li>
                    <li className='flex gap-[7px]'>
                      {" "}
                      <CiStar className='w-5 h-5 text-[#D08700]' />
                      Save the editor for future projects
                    </li>
                    <li className='flex gap-[7px]'>
                      {" "}
                      <CiStar className='w-5 h-5 text-[#D08700]' />
                      Download final deliverables
                    </li>
                    <li className='flex gap-[7px]'>
                      {" "}
                      <CiStar className='w-5 h-5 text-[#D08700]' /> Maintain
                      professional communication
                    </li>
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
