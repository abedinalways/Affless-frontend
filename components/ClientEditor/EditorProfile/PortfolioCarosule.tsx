"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const portfolioItems = [
  {
    image: "/images/protfolio.png",
    title: "Antec Biogas - Empowering renewable energy",
    role: "Video Editor",
    desc: `I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec's capabilities and successful projects.The result is a professional, informative, and visually appealing website that helps Antec showcase their expertise and attract potential clients interested in sustainable energy solutions.`,
  },
   {
    image: "/images/protfolio.png",
    title: "Antec Biogas - Empowering renewable energy",
    role: "Video Editor",
    desc: `I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec's capabilities and successful projects.The result is a professional, informative, and visually appealing website that helps Antec showcase their expertise and attract potential clients interested in sustainable energy solutions.`,
  },
];

export default function PortfolioCarousel() {
  return (
    <Carousel className="relative w-full" opts={{ loop: true }}>
      <CarouselContent>
        {portfolioItems.map((item, index) => (
          <CarouselItem key={index}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              {/* ✅ Left Image */}
              <div className="relative w-full h-[360px] rounded-xl overflow-hidden ">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* ✅ Right Content */}
              <div className="space-y-4">
                <h3 className="text-[24px] font-medium text-[#333] leading-150%">
                  {item.title}
                </h3>

                <p className="text-[16px] font-medium text-[#333] leading-150%">
                  {item.role}
                </p>

                <p className="text-sm leading-relaxed text-gray-600 whitespace-pre-line">
                  {item.desc}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* ✅ Left arrow (inside image like screenshot) */}
       <CarouselPrevious
          className="absolute -left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md 
          hover:bg-red-500 hover:text-white active:bg-red-600 active:text-white transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </CarouselPrevious>

        <CarouselNext
          className="absolute -right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md 
          hover:bg-red-500 hover:text-white active:bg-red-600 active:text-white transition"
        >
          <ChevronRight className="w-5 h-5" />
        </CarouselNext>
    </Carousel>
  );
}
