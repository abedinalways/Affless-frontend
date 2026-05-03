import { Star } from "lucide-react";
import Image from "next/image";
import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import DeliveryPage from "@/app/(website)/(dashboard)/(client-dashboard)/client/delivery/page";
import Review from "./Review";
interface Item {
  id: number;
  img: string;
  title: string;
  price: number;
  total: number;
}

// ✅ Internal data, no props needed
const data: Item[] = [
  {
    id: 1,
    img: "/images/job1.png",
    title: "I will professionally record Bajoquinto for your Mexican regional song",
    price: 400,
    total: 5.0,
  },
  {
    id: 1,
    img: "/images/job2.png",
    title: "I will professionally record Bajoquinto for your Mexican regional song",
    price: 300,
    total: 3.5,
  },
  {
    id: 1,
    img: "/images/job3.png",
    title: "I will professionally record Bajoquinto for your Mexican regional song",
    price: 500,
    total: 4.0,
  },
];


const portfolioData = [
  {
    id: 1,
    img: "/images/protfolio.png",
    date: "December 9, 2023",
    title: "Antec Biogas – Empowering renewable energy",
    description1:
      "I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.",
    description2:
      "One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec’s capabilities and successful jobs.",
    price: 400,
    duration: "10 days",
    industry: "Énergie issue de la biomasse",
  },
  {
    id: 2,
    img: "/images/protfolio.png",
    date: "December 9, 2023",
    title: "Antec Biogas – Empowering renewable energy",
    description1:
      "I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.",
    description2:
      "One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec’s capabilities and successful jobs.",
    price: 600,
    duration: "7 days",
    industry: "Énergie issue de la biomasse",
  },
];

export default function EditorDetails() {
  const usFormatWithDecimals = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const usFormats = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const usFormatWithSingleDigits = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  return (
    <div>
      <div className="space-y-6">
        {/* ABOUT */}
        <div className="bg-white p-4 md:p-6 rounded-xl shadow">
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
        <div className="bg-white p-4 md:p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold mb-4">Jobs Completed</h3>

          <div className="space-y-4">
            {data.map((item) => (
              <div key={item.id} className="md:p-4">
                <div className="flex flex-col md:flex-row md:justify-between border p-3 rounded-xl gap-4 md:gap-5">
                  <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <Image src={item.img} alt="img" height={60} width={80} className="rounded-lg object-cover" />
                    <p className="flex justify-center items-center md:text-center sm:text-left text-sm md:text-base">{item.title}</p>
                  </div>
                  <div className="flex flex-row md:flex-row gap-6 md:gap-20 justify-between md:justify-center items-center mt-4 md:mt-0 w-full md:w-auto">
                    <div className="flex flex-row md:flex-col items-center md:items-start gap-0.5 md:gap-0">
                      <h2 className="text-xs md:text-base">Price<span className="md:hidden">:</span></h2>
                      <p className="font-semibold">${usFormatWithDecimals.format(item.price)}</p>
                    </div>
                    <div className="flex flex-row md:flex-col items-center md:items-start gap-0.5 md:gap-0">
                      <h2 className="text-xs md:text-base">Rating</h2>
                      <p className="flex gap-1 items-center font-semibold"><TiStarFullOutline className="text-yellow-400" />{usFormatWithSingleDigits.format(item.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        <div className="bg-white p-4 md:p-6 rounded-2xl shadow space-y-4">
          <h3 className="text-lg font-semibold">My Portfolio</h3>

          <Carousel className="w-full hello" opts={{ loop: true }}>
            <CarouselContent>
              {portfolioData.map((item) => (
                <CarouselItem key={item.id}>
                  <div className="grid min-[1600px]:grid-cols-[auto_1fr] gap-10 items-start bg-white md:p-6 rounded-xl ">

                    {/* Left Image */}
                    <div className="w-full min-[1600px]:max-w-[490px] h-full">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={1000}
                        height={1000}
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>

                    {/* Right Content */}
                    <div className="w-full h-full grid justify-between">
                      <div>
                        <p className="text-sm text-gray-500 mb-2">From: {item.date}</p>

                        <h2 className="text-lg md:text-2xl font-bold text-[#2E3135] mb-3">{item.title}</h2>

                        <p className="text-xs sm:text-sm md:text-[#65686C] leading-[160%] mb-3">{item.description1}</p>

                        <p className="text-xs sm:text-sm md:text-[#65686C] leading-[160%] mb-6">{item.description2}</p>
                      </div>

                      {/*  Bottom Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6 border-t pt-4">

                        <div className="flex items-center sm:flex-col sm:items-start gap-2">
                          <p className="text-sm text-gray-600">Price</p>
                          <p className="font-semibold sm:text-sm md:text-base">${usFormatWithDecimals.format(item.price)}</p>
                        </div>

                        <div className="flex items-center sm:flex-col sm:items-start gap-2">
                          <p className="text-sm text-gray-600">Job Duration</p>
                          <p className="font-semibold sm:text-sm md:text-base">{item.duration}</p>
                        </div>

                        <div className="flex items-center sm:flex-col sm:items-start gap-2">
                          <p className="text-sm text-gray-600">Job Type</p>
                          <p className="font-semibold sm:text-sm md:text-base"> Long-Form YouTube</p>
                        </div>

                      </div>
                    </div>

                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel Buttons */}
            <CarouselPrevious className="left-0 cursor-pointer" />
            <CarouselNext className="right-0 cursor-pointer" />
          </Carousel>
        </div>
        <div className="">
          <Review />
        </div>
      </div>
    </div>
  );
}
