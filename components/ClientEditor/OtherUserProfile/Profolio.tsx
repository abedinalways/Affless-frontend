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
    images: ["/images/protfolio.png"],
    title: "Antec Biogas - Empowering renewable energy",
    role: "Video Editor",
    desc: `I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec's capabilities and successful projects.The result is a professional, informative, and visually appealing website that helps Antec showcase their expertise and attract potential clients interested in sustainable energy solutions.`,
  },
  {
    images: ["/images/protfolio.png"],
    title: "Antec Biogas - Empowering renewable energy",
    role: "Video Editor",
    desc: `I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec's capabilities and successful projects.The result is a professional, informative, and visually appealing website that helps Antec showcase their expertise and attract potential clients interested in sustainable energy solutions.`,
  },
  {
    images: ["/images/protfolio.png"],
    title: "Antec Biogas - Empowering renewable energy",
    role: "Video Editor",
    desc: `I had the pleasure of working with Antec, a company that provides turnkey solutions for biomass owners to convert waste into energy. Their primary goal was to create a website that effectively communicates their expertise in building and operating high-performing biogas plants, as well as producing biogas, biomethane, and biofertilizer.One challenge was to present their extensive experience and complex processes in a clear and engaging manner. To address this, I focused on creating a user-friendly layout with informative content and visual elements that highlight Antec's capabilities and successful projects.The result is a professional, informative, and visually appealing website that helps Antec showcase their expertise and attract potential clients interested in sustainable energy solutions.`,
  },
];

export default function Portfolio() {
  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-medium text-[#333] leading-150% pt-8">Portfolio</h3>

      {/* ✅ Carousel wraps full card */}
      <Carousel className="relative w-full" opts={{ loop: true }}>
        <CarouselContent>
          {portfolioItems.map((item, index) => (
            <CarouselItem key={index}>
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                  {/* ✅ LEFT IMAGE */}
                  <div className="relative w-full h-[367px] rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={item.images[0]}
                      alt="portfolio"
                      fill
                      className="object-full h-[367px]"
                    />
                  </div>

                  {/* ✅ RIGHT CONTENT */}
                  <div className="space-y-3 py-10">
                    <h3 className="text-2xl font-medium text-[#333] leading-150%">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 font-medium">
                      {item.role}
                    </p>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* ✅ Buttons */}
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
    </div>
  );
}
