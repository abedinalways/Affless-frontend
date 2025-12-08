import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import DeliveryPage from './../../../app/(editor-dashboard)/editor/delivery/page';
import Review from "./Review";
interface Item {
  id: number;
  img: string;
  title: string;
  price: number | string;
  total: number;
}

// ✅ Internal data, no props needed
const data: Item[] = [
  {
    id: 1,
    img: "/images/job1.png",
    title: "I will professionally record Bajoquinto for your Mexican regional song",
    price: "$400",
    total: 5,
  },
   {
    id: 1,
    img: "/images/job2.png",
    title: "I will professionally record Bajoquinto for your Mexican regional song",
    price: "$300",
    total: 3,
  },
    {
    id: 1,
    img: "/images/job3.png",
    title: "I will professionally record Bajoquinto for your Mexican regional song",
    price: "$500",
    total: 4,
  },
];


  const portfolioData = [
    {
      id: 1,
      img: "/images/protfolio.png",
      date: "December 2023",
      title: "Antec Biogas – Empowering renewable energy",
      description1:
        "I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.",
      description2:
        "One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec’s capabilities and successful projects.",
      price: "$400–$600",
      duration: "7–30 days",
      industry: "Énergie issue de la biomasse",
    },
      {
      id: 2,
      img: "/images/protfolio.png",
      date: "December 2023",
      title: "Antec Biogas – Empowering renewable energy",
      description1:
        "I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.",
      description2:
        "One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec’s capabilities and successful projects.",
      price: "$400–$600",
      duration: "7–30 days",
      industry: "Énergie issue de la biomasse",
    },
  ];

export default function EditorDetails() {
  return (
    <div>
      <>
        {/* ABOUT */}
        <div className="bg-white mt-6 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold text-[#2E3135]">About</h3>
          <hr className="w-full h-1 mt-4 mb-6" />
          <p className="text-[#65686C] leading-160% text-[16px] font-medium">
            Looking for authentic, high-quality guitar tracks to enhance your
            music? I’ll record professional guitar parts tailored to your song’s
            needs—whether it's a soulful requinto, energetic electric lead, or
            rhythmic harmony for Regional Mexican music.
          </p>
          <p className="text-[#65686C] leading-160% text-[16px] font-medium pt-2">
            With years of session experience, I deliver studio-quality recordings
            in the style and tone you request. Just send me your reference track,
            backing track, and any details like BPM, key, or mood and I’ll take
            care of the rest!
          </p>
        </div>

        {/* PORTFOLIO */}
        <div className="bg-white mt-6 p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Job Completed</h3>

          <div className="space-y-4">
            {data.map((item) => (
            <div key={item.id} className="p-4">
             <div className="flex justify-between border p-3 rounded-xl">
                <div className="flex gap-3">
                    <Image src={item.img} alt="img" height={60} width={80}/>
                    <p className="flex justify-center items-center">{item.title}</p>
                </div>
                <div className="flex gap-20 justify-center items-center">
                    <p>{item.price}</p>
                    <p className="flex gap-3"><TiStarFullOutline className="text-yellow-400 mt-1"/>{item.total}</p>
                </div>
             </div>
            </div>
          ))}
          </div>
        </div>

          

             <div className="bg-white p-6 rounded-2xl shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">My Portfolio</h3>

      <Carousel className="w-full">
        <CarouselContent>
          {portfolioData.map((item) => (
            <CarouselItem key={item.id}>
              <div className="flex-col flex xl:flex-row gap-10 items-start bg-white p-6 rounded-xl ">

                {/* Left Image */}
                <div className="w-1/2 lg:w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="rounded-xl w-full object-cover"
                  />
                </div>

                {/* Right Content */}
                <div className="w-2/2">
                  <p className="text-sm text-gray-500 mb-2">From: {item.date}</p>

                  <h2 className="text-2xl font-bold text-[#2E3135] mb-3">{item.title}</h2>

                  <p className="text-[#65686C] leading-7 mb-3">{item.description1}</p>

                  <p className="text-[#65686C] leading-7 mb-6">{item.description2}</p>

                  {/*  Bottom Info */}
                  <div className="grid grid-cols-3 gap-6 border-t pt-4">

                    <div>
                      <p className="text-sm text-gray-600">Price range</p>
                      <p className="font-semibold">{item.price}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Project duration</p>
                      <p className="font-semibold">{item.duration}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-600">Industry</p>
                      <p className="font-semibold">{item.industry}</p>
                    </div>

                  </div>
                </div>

              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Carousel Buttons */}
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
         <div className="">
            <Review/>
         </div>
        
      </>
    </div>
  );
}
