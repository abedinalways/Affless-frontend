import LocationIcon from '@/components/Icons/LocationIcon';
import UsaFlag from '@/components/Icons/UsaFlag';
import WorldIcon from '@/components/Icons/WorldIcon';
import ReviewList, { ReviewType } from '@/components/reusable/Review';
import ReviewBreakdown from '@/components/reusable/reviews'
import Image from 'next/image';
import React from 'react'
import { FiCalendar } from 'react-icons/fi';
import { PiToolboxDuotone } from 'react-icons/pi';

export default function JobPostingEditor() {
    const jobs = [
    {
      id: 1,
      user: "sarahncl",
      country: "United Kingdom",
      title: "I will do SEO backlinks with blogger outreach for high quality link building",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ",
      tags: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve"],
      priceRange: "$400–$600",
      software: "Adobe Premiere Pro",
      duration: "7–30 days",
      thumbnail: "/images/vedio.png.jpg",
    },
    {
      id: 2,
      user: "sarahncl",
      country: "United Kingdom",
      title: "I will do SEO backlinks with blogger outreach for high quality link building",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      tags: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve"],
      priceRange: "$400–$600",
      software: "Adobe Premiere Pro",
      duration: "7–30 days",
      thumbnail: "/images/vedio.png.jpg",
    },
  ];
      const reviewe = [
    { stars: 5, count: 120 },
    { stars: 4, count: 55 },
    { stars: 3, count: 18 },
    { stars: 2, count: 7 },
    { stars: 1, count: 4 },
  ];

    const reviews: ReviewType[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      img: "/images/devon.png",
      rating: 5,
      totalReviews: 347,
      comment: "Great work! Very professional and delivered on time.",
      timeAgo: "4 weeks ago",
    },
    {
      id: 2,
      name: "Jane Cooper",
      img: "/images/jerome.png",
      rating: 4,
      totalReviews: 120,
      comment: "Good communication and quality output. Recommended.",
      timeAgo: "2 weeks ago",
    },
     {
      id: 3,
      name: "Floyd Miles",
      img: "/images/floyd.png",
      rating: 4,
      totalReviews: 120,
      comment: "Good communication and quality output. Recommended.",
      timeAgo: "2 weeks ago",
    },
  ];
  return (
    <div className='containers'>
       <div className="py-8">
          <div className="flex flex-col md:flex-row items-center gap-5 bg-white rounded-xl px-5 py-8 ">
          <Image
            src="/images/sarah.png"
            alt="User"
            width={100}
            height={100}
            className="rounded-full object-cover"
          />

          <div className="space-y-6">
            <h2 className="text-lg lg:text-2xl  font-medium  text-[#333]">Sarah Johnson</h2>
            <p className="text-gray-600 flex gap-2.5"><PiToolboxDuotone /> Creative Studios Inc.</p>
            <p className="text-gray-600 flex gap-2.5"><LocationIcon /> Pakistan</p>
            <p className="text-gray-600 flex gap-2.5"><WorldIcon /> PST (UTC-8)</p>
            <p className="text-gray-600 flex gap-2.5"><FiCalendar /> Member since Jan 2023</p>

           
          </div>
        </div>
       </div>
        <div className="">
            
                  <div className="space-y-6">
                    {jobs.map((job) => (
                      <div
                        key={job.id}
                        className="bg-white rounded-xl shadow-sm p-6 flex flex-col lg:flex-row justify-between gap-6"
                      >
                        {/* LEFT SIDE */}
                        <div className="flex-1">
            
                          {/* USER INFO ROW */}
                          <div className="flex justify-between">
                            <div className="flex items-center gap-3 mb-2">
                              <Image
                                src="/images/saramc.png"
                                width={40}
                                height={40}
                                alt={job.user}
                                className="rounded-full"
                              />
            
                              <div>
                                <p className="font-medium text-[18px] text-[#333]">{job.user}</p>
                                <p className="text-sm text-[#4A4C56] flex items-center gap-1 pt-1.5">
                                  <UsaFlag /> {job.country}
                                </p>
                              </div>
                            </div>
                            {/* <div>
                              <p className=" top-2 right-2 text-red-500 text-sm cursor-pointer">
                                View Job
                              </p>
                            </div> */}
                          </div>
            
                          {/* TITLE */}
                          <div className="flex flex-col lg:flex-row gap-6">
                            <div className="w-full lg:w-3/4">
                              <h2 className="text-lg font-medium mb-2 leading-120% py-6">{job.title}</h2>
            
                              {/* DESCRIPTION */}
                              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                {job.description}
                              </p>
            
                              {/* TAGS */}
                              <div className="flex flex-wrap gap-2 py-6 bg-[]">
                                {job.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="bg-[#FFEEEE] text-red-500 px-3 py-1.5 rounded-full text-sm font-normal leading-150%"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                              <div className=" grid grid-cols-2 md:grid-cols-3 justify-between text-sm text-gray-700">
                                <div className="p-6 flex gap-6">
                                  <div>
                                    <p className="text-[#4A4C56] text-[14px]">Price range</p>
                                    <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.priceRange}</p>
                                  </div>
                                  <div className="border hidden md:block border-r-gray-300 mx-6">
            
                                  </div>
                                </div>
            
                                <div className="p-6 flex  gap-6">
                                  <div>
                                    <p className="text-[#4A4C56] text-[14px]">Software</p>
                                    <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.software}</p>
                                  </div>
                                  <div className="border hidden md:block border-r-gray-300 mx-6">
            
                                  </div>
                                </div>
            
                                <div className="p-6 flex gap-6">
                                  <div>
                                    <p className="text-[#4A4C56] text-[14px]">Project duration</p>
                                    <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.duration}</p>
                                  </div>
                                  <div className="border hidden md:block border-r-gray-300 mx-6">
            
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex justify-center items-center">
                              <Image
                                src={job.thumbnail}
            
                                alt="Job Thumbnail" width={200} height={200} className="rounded-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
        </div>
        <div className="">
             <div className="py-10">
      <ReviewBreakdown reviewe={reviewe} title="Reviews" />
    </div>
    <div className="">
        <ReviewList reviews={reviews} />
    </div>
        </div>
    </div>
  )
}
