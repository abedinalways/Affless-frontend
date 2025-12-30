import Image from "next/image";
import { notFound } from "next/navigation";
import { stories } from "../data";
import Link from "next/link";
import LocationIcon from "@/components/Icons/LocationIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import StarIcon from "@/components/Icons/StarIcon";
import JounneyIcon from "@/components/Icons/JourneyIcon";
import AdminIcon from "@/components/Icons/AdminIcon";
import JourneyIcon from "@/components/Icons/JourneyIcon";
import ClangeIcon from "@/components/Icons/ChlangeIcon";
import ActionTokenIcon from "@/components/Icons/ActonTokenIcon";
import ResultIcon from "@/components/Icons/ResultIcon";
import ClockIcon from "@/components/Icons/ClockIcon";
import { FaArrowLeft } from "react-icons/fa6";

export default async function StoryDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const storyId = parseInt(id);

  const story = stories.find((s) => s.id === storyId);

  if (!story) return notFound();

  return (
    <div className="containers mx-auto pt-8 lg:pt-16 space-y-6">

      {/* PROFILE CARD */}
      <div className="bg-[#FFFFFF] shadow-md p-5 rounded-2xl ">
        <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="">
            <Image
            src={story.image}
            alt={story.name}
            width={150}
            height={150}
            className="rounded-full object-cover w-[150px] h-[150]"
          />
        </div>

          <div className="space-y-2.5">
            <h2 className="text-[#333]  text-[18px] font-medium leading-[120%]">
              {story.name}
            </h2>
            <p className="text-[#333]  text-[14px] font-medium leading-[120%] flex gap-2">
             <LocationIcon/> {story.country} <WorldIcon/> English, German, Spanish, French
            </p>

            <p className="text-[#777] text-[12px] mt-1 flex gap-1"><StarIcon/> 4.8 (238 reviews)</p>

            <p className="text-[#555] text-[13px] mt-2">
              Transforming your vision into reality.
            </p>
          </div>
        </div>
      </div>
      {/* ALL SECTIONS */}
      <div className="space-y-6">

        {/* The Journey */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h3 className="text-[#333] text-[24px] font-medium leading-[150%] flex gap-3.5">
            
            <JourneyIcon className="text-[#333] bg-red-500 h-11 w-11 rounded-full p-2 text-center  font-medium leading-[150%]  "/>
            The Journey
          </h3>

          <p className="text-[#333] text-[16px] font-normal leading-[150%]">
            After joining the Editor Marketplace, Sarah created a professional
            profile showcasing her best work. She started with small projects to
            build her portfolio and reputation on the platform.
          </p>
        </div>

        {/* The Challenge */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h3 className="text-[#333]  text-[24px] font-medium leading-[150%] flex gap-3.5 pb-6">
              <ClangeIcon className="text-[#333] bg-red-500 h-11 w-11 rounded-full p-2 text-center  font-medium leading-[150%] "/>
            The Challenge
          </h3>

          <p className="text-[#333] text-[16px] font-normal leading-[150%]">
            Sarah was working a 9–5 office job but dreamed of becoming a
            freelance video editor. She had the skills but no clients and didn’t
            know where to start building her freelance career.
          </p>
        </div>

        {/* Actions Taken */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h3 className="text-[#333]  text-[24px] font-medium leading-[150%] flex gap-2 pb-6">
              <ActionTokenIcon className="text-[#333] bg-red-500 h-11 w-11 rounded-full p-2 text-center  font-medium leading-[150%] "/>
            Actions Taken
          </h3>

          <ul className="text-[#333] text-[16px] font-normal leading-[150%]">
            <li>Created a compelling portfolio with 5 best editing samples</li>
            <li>Set competitive rates and offered quick turnaround times</li>
            <li>Responded to client inquiries within 30 minutes</li>
            <li>Delivered exceptional quality and exceeded expectations</li>
            <li>Asked satisfied clients for reviews and testimonials</li>
            <li>Specialized in YouTube content editing to stand out</li>
          </ul>
        </div>

        {/* The Results */}
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h3 className="text-[#333]  text-[24px] font-medium leading-[150%] flex gap-2 pb-6">
             <ResultIcon className="text-[#333] bg-red-500 h-11 w-11 rounded-full p-2 text-center  font-medium leading-[150%] "/>
            The Results
          </h3>

          <p className="text-[#333] text-[16px] font-normal leading-[150%]">
            After joining the Editor Marketplace, Sarah created a professional
            profile showcasing her best work. She started with small projects to
            build her portfolio and reputation on the platform.
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-[#FFEDED] p-5 rounded-2xl">
          <h3 className="text-[#333]  text-[24px] font-medium leading-[150%] flex gap-2 pb-6">
              <ClockIcon className="text-[#333]rounded-full  text-center  font-medium leading-[150%] mt-2 "/> Timeline to Success
            
          </h3>
          <p className="text-[#333] text-[16px] font-normal leading-[150%]">6 months</p>
        </div>

        {/* Testimonial */}
        <div className="bg-[#FF4D4F] text-white text-center text-[24px] font-medium leading-[160%] rounded-lg">
         <div className="py-[63px]">
           <p className="text-[20px] leading-[150%] mb-4 font-medium">
            “This platform changed my life. I went from dreaming about
            freelancing to actually living it. The support system and steady
            flow of clients made all the difference.”
          </p>

          <p className="text-white/80 text-[14px] pt-[38px]">
            — Sarah Mitchell, Video Editor
          </p>
         </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="mt-10">
        <Link href="/success-story">
          <button className="px-4 py-2 border rounded-md bg-[#EBECEC] hover:bg-gray-100 text-[#333] text-center text-[18px] font-normal leading-[150%] cursor-pointer duration-300 flex items-center gap-2">
            <FaArrowLeft />
            Back to Success Stories
          </button>
        </Link>
      </div>
    </div>
  );
}
