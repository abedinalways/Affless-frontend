import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import Portfolio from "./Profolio";
import ReviewBreakdown from "@/components/reusable/reviews";
import UsaFlag from "@/components/Icons/UsaFlag";
import WorldIcon from "@/components/Icons/WorldIcon";
import LocationIcon from "@/components/Icons/LocationIcon";
import { CiStar } from "react-icons/ci";
import { TiStarFullOutline } from "react-icons/ti";

export default function OtherUserProfile() {
    const skills = [
        "Adobe Premiere Pro",
        "Adobe After Effects",
        "Avid Media Composer",
        "Avid Media Composer",
    ];

    const reviewData = [
        { stars: 5, count: 638 },
        { stars: 4, count: 243 },
        { stars: 3, count: 121 },
        { stars: 2, count: 43 },
        { stars: 1, count: 12 },
    ];
    const jobs = [
        {
            id: 1,
            user: "sarahncl",
            country: "United Kingdom",
            review: "4.9(338 reviews) 1 month ago",
            // title: "I will do SEO backlinks with blogger outreach for high quality link building",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ",
            // tags: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve"],
            // priceRange: "$400–$600",
            // software: "Adobe Premiere Pro",
            // duration: "7–30 days",
            thumbnail: "/images/vedio.png.jpg",
        },
        {
            id: 2,
            user: "sarahncl",
            country: "United Kingdom",
            review: "4.9(338 reviews) 1 month ago",
            // title: "I will do SEO backlinks with blogger outreach for high quality link building",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            // tags: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve"],
            // priceRange: "$400–$600",
            // software: "Adobe Premiere Pro",
            // duration: "7–30 days",
            thumbnail: "/images/vedio.png.jpg",
        },
    ];
    return (
        <div className="containers py-10 lg:py-10">
            <div className="space-y-10">
                {/* PROFILE HEADER */}
                <div className=" p-6 rounded-2xl border border-gray-200 flex items-center gap-5">
                    <Image
                        src="/images/sarah.png"
                        alt="avatar"
                        width={70}
                        height={70}
                        className="rounded-full object-cover"
                    />

                    <div className="space-y-2">
                        <h2 className="text-[24px] font-medium text-[#333]">Zeeshan</h2>

                        <div className="flex items-center gap-2 text-[12px] text-gray-600">
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            <span>4.9</span>
                            <span>(338 reviews)</span>
                        </div>

                        <p className="text-sm text-gray-700">
                            Transforming your vision into reality!
                        </p>

                        <div className="flex gap-3 text-sm text-gray-500">
                            <span className="flex gap-2"><LocationIcon /> Pakistan</span>
                            <span className="flex gap-2"><WorldIcon /> English, German, Spanish, French</span>
                        </div>
                    </div>
                </div>

                {/* ABOUT */}
                <div className="space-y-3">
                    <h3 className="text-2xl font-medium text-[#333] leading-150%">About Me</h3>
                    <p className="text-sm leading-relaxed text-gray-600">
                       We are PixxelStudio, A full-service design and developing web agency. From designing logos to developing websites to satisfying our customer’s every digital need is what we thrive for. We’ve worked not only with brilliant individuals but also with top companies all around the world. Our mission is to become an indispensable partner to our clients by offering the best ideas, skills and services they could possibly get.
                    </p>
                </div>

                {/* SKILLS */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-medium text-[#333] leading-150%">Skills Required</h3>

                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 bg-gray-100 text-sm text-gray-700 rounded-full"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* OFFER PROJECT RATE */}
                <div className="space-y-2">
                    <h3 className="text-2xl font-medium text-[#333] leading-150%">
                        Offer Job Rate
                    </h3>

                    <p className="text-sm text-gray-600">
                        Join Editor Marketplace Pro to hire Bilal Gilani on an hourly basis{" "}
                        <Link href="#" className="text-red-500 underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
            <div>
                <Portfolio />
            </div>
            <div className="py-10">
                <ReviewBreakdown reviewe={reviewData} title="Reviews" />
            </div>
            <div className="">

                <div className="space-y-6">
                    {jobs.map((job) => (
                        <div
                            key={job.id}
                            className="bg-white rounded-xl shadow-sm p-6 flex flex-col lg:flex-row justify-between gap-6"
                        >
                            {/* LEFT SIDE */}
                            <div className="flex-1 justify-between">

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
                             
                                </div>

                                {/* TITLE */}
                                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                                    <div className="w-full lg:w-3/4">
                                        {/* <h2 className="text-lg font-medium mb-2 leading-120% py-6">{job.title}</h2> */}

                                        {/* DESCRIPTION */}
                                        <div className="flex gap-2.5 pt-6 pb-2.5 "> <div className="flex"><TiStarFullOutline className="text-amber-300" /><TiStarFullOutline className="text-amber-300" /><TiStarFullOutline className="text-amber-300" /><TiStarFullOutline className="text-amber-300" /> <TiStarFullOutline className="text-[#777980]" /></div>  <p className=" text-[#333]">{job.review}</p> </div>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                            {job.description}
                                        </p>

                                     
                                        <div className=" grid grid-cols-2 md:grid-cols-3 justify-between text-sm text-gray-700">
                                            
                                        </div>
                                    </div>
                                    <div className=" ">
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
        </div>
    );
}
