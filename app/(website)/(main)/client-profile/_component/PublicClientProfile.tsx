"use client";

import Image from "next/image";
import ReviewPage from "@/components/ClientDashboard/GraphicsDesigner/ReviewPage";
import LocationIcon from "@/components/Icons/LocationIcon";
import WorldIcon from "@/components/Icons/WorldIcon";
import { CalendarHeartIcon, Star } from "lucide-react";
import { FiCalendar } from "react-icons/fi";
import { PiToolboxDuotone } from "react-icons/pi";
import { FaStar } from "react-icons/fa6";
import UsaFlag from "@/components/Icons/UsaFlag";
import Link from "next/link";

export default function PublicClientProfile() {
    const editorsWorkedWith = [
        { id: 1, name: "Alex Turner", avatar: "/images/sarah.png" },
        { id: 2, name: "Jordan Smith", avatar: "/images/saramc.png" },
        { id: 3, name: "Casey Anderson", avatar: "/images/sarah.png" },
        { id: 4, name: "Morgan Lee", avatar: "/images/saramc.png" },
        { id: 5, name: "Taylor Brown", avatar: "/images/sarah.png" },
        { id: 6, name: "Riley Davis", avatar: "/images/saramc.png" },
    ];

    const jobs = [
        {
            id: 1,
            user: "sarahncl",
            country: "United Kingdom",
            title: "I will do SEO backlinks with blogger outreach for high quality link building",
            description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint ",
            tags: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve"],
            price: "$400.00",
            numberOfRevisions: "3",
            duration: "15 days",
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
            price: "$400.00",
            numberOfRevisions: "3",
            duration: "10 days",
            thumbnail: "/images/vedio.png.jpg",
        },
    ];

    const reviews = [
        { stars: 5, count: 1006 },
        { stars: 4, count: 323 },
        { stars: 3, count: 143 },
        { stars: 2, count: 42 },
        { stars: 1, count: 56 },
    ];

    return (
        <div className="bg-[#f6f6f6] min-h-screen p-6 containers">

            {/* PROFILE HEADER */}
            <div className="bg-white rounded-xl px-5 py-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">

                {/* LEFT */}
                <div className="w-full grid sm:grid-cols-[auto_1fr] md:grid-cols-[1fr_1fr] lg:grid-cols-[auto_1fr] items-center gap-5">
                    <div className="w-full max-w-[214px] aspect-square">
                        <Image
                            src="/images/photographer.jpg"
                            alt="User"
                            width={500}
                            height={500}
                            className="rounded-lg object-cover w-full h-full"
                        />
                    </div>

                    <div className="space-y-6">
                        <h2 className="text-lg lg:text-2xl  font-medium  text-[#333]">Sarah Johnson</h2>
                        <p className="text-gray-600 flex gap-2.5"><PiToolboxDuotone /> Creative Studios Inc.</p>
                        <p className="text-gray-600 flex gap-2.5"><LocationIcon /> Pakistan</p>
                        <p className="text-gray-600 flex gap-2.5"><WorldIcon /> PST (UTC-8)</p>
                        <p className="text-gray-600 flex gap-2.5"><FiCalendar /> Member since Jan 2023</p>
                    </div>
                </div>

                {/* RIGHT */}
                <div className="grid sm:grid-cols-2 gap-4 text-center w-full md:w-xl">

                    <div className="bg-[#FFC8C8] rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Jobs Posted</p>
                        <p className="text-xl text-semibold text-[#FF4D4F] pt-2.5">47</p>

                    </div>

                    <div className="bg-[#FFC8C8] rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Repeat Hire Rate</p>
                        <p className="text-xl text-semibold text-[#FF4D4F] pt-2.5">98%</p>
                    </div>

                    <div className="bg-[#FFC8C8] rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Avg Rating</p>
                        <p className="text-xl  text-semibold text-[#FF4D4F] pt-2.5 flex justify-center items-center gap-2">4.8 <span className="text-yellow-600"><FaStar /> </span></p>

                    </div>

                    <div className="bg-[#FFC8C8] rounded-lg p-4">
                        <p className="text-gray-600 text-sm">Editors Worked With</p>
                        <p className="text-xl text-semibold text-[#FF4D4F] pt-2.5">{editorsWorkedWith.length}</p>

                    </div>
                </div>

            </div>

            {/* EDITORS WORKED WITH */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-8">
                <h2 className="text-[25px] md:text-[32px] font-medium mb-6">Editors This Client Has Worked With ({editorsWorkedWith.length})</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {editorsWorkedWith.map((editor) => (
                        <div key={editor.id} className="flex flex-col items-center gap-3 text-center">
                            <Link href={`/editor-profile/${editor?.id}`} className="w-20 h-20 overflow-hidden rounded-full">
                                <Image
                                    src={editor.avatar}
                                    alt={editor.name}
                                    width={500}
                                    height={500}
                                    className="w-full h-full rounded-full object-cover border-2 border-gray-200 transition cursor-pointer hover:scale-110 duration-300"
                                />
                            </Link>
                            <Link href={`/editor-profile/${editor?.id}`} className="text-sm font-medium text-[#333] line-clamp-2">{editor.name}</Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* JOB POSTINGS */}
            <h2 className="text-[25px] md:text-[32px] font-medium py-8">Jobs </h2>

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
                                        <p className="font-medium text-[18px] text-[#333] capitalize">{job.user}</p>
                                        <p className="text-sm text-[#4A4C56] flex items-center gap-1 pt-1.5">
                                            <UsaFlag /> {job.country}
                                        </p>
                                    </div>
                                </div>
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
                                    <div className="flex flex-wrap gap-3 py-6">
                                        <div className="bg-[#F6F6F6] px-4 py-2 rounded-lg text-sm text-[#333]">
                                            <span className="text-[#777980]">Platform: </span>
                                            <span className="font-medium">YouTube</span>
                                        </div>
                                        <div className="bg-[#F6F6F6] px-4 py-2 rounded-lg text-sm text-[#333]">
                                            <span className="text-[#777980]">Project Type: </span>
                                            <span className="font-medium">YouTube Long-Form</span>
                                        </div>
                                        <div className="bg-[#F6F6F6] px-4 py-2 rounded-lg text-sm text-[#333]">
                                            <span className="text-[#777980]">Editor Experience: </span>
                                            <span className="font-medium">12 Jobs Completed</span>
                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-2 md:grid-cols-3 justify-between text-sm text-gray-700">
                                        <div className="p-6 flex gap-6 border-r border-gray-300">
                                            <div>
                                                <p className="text-[#4A4C56] text-[14px]">Price</p>
                                                <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.price}</p>
                                            </div>
                                        </div>

                                        <div className="p-6 flex  gap-6 border-r border-gray-300">
                                            <div>
                                                <p className="text-[#4A4C56] text-[14px]">Number of Revisions</p>
                                                <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.numberOfRevisions}</p>
                                            </div>
                                        </div>

                                        <div className="p-6 flex gap-6">
                                            <div>
                                                <p className="text-[#4A4C56] text-[14px]">Project Duration</p>
                                                <p className="font-medium pt-2 text-[#333] text-[18px] leading-120%">{job.duration}</p>
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

                            {/* PROPERTY LIST */}

                        </div>

                        {/* RIGHT THUMBNAIL */}


                    </div>
                ))}
            </div>

            {/* REVIEWS */}
            <div className="bg-white rounded-xl shadow-sm p-6 mt-10 mx-w-md lg:max-w-lg">
                <h2 className="text-xl font-medium text-[18px] lg:text-[24px] pb-6">1,058 Reviews</h2>

                <div className="space-y-4">
                    {reviews.map((r) => (
                        <div key={r.stars} className="flex items-center gap-4">
                            <span className="w-16">{r.stars} Stars</span>

                            <div className="flex-1 bg-gray-200 h-2 rounded-full">
                                <div
                                    className="h-full bg-red-400 rounded-full"
                                    style={{ width: `${(r.count / 1058) * 100}%` }}
                                ></div>
                            </div>

                            <span className="text-gray-600 text-sm">{r.count}</span>
                        </div>
                    ))}
                </div>
            </div>
            <ReviewPage />
        </div>
    );
}
