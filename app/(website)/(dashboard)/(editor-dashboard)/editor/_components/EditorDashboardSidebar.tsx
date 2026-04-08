import LocationIcon from "@/components/Icons/LocationIcon";
import LockIcon from "@/components/Icons/LockIcon";
import Link from "next/link";
import { FaRegUser, FaStar } from "react-icons/fa6";
import { IoArrowForwardSharp } from "react-icons/io5";
import Image from "next/image";
import { ExposureTier } from "@/app/type";


type PropType = {
    averageResponseHours: number;
    averageResponseMinutes: number;
    exposure: string;
    quickMatch: string;
    exposureTiers: ExposureTier[];
}

export default function EditorDashboardSidebar({ averageResponseHours, averageResponseMinutes, exposure, quickMatch, exposureTiers }: PropType) {
    return (
        <div className="w-full min-w-[260px] lg:max-w-[348px] space-y-6">
            {/* Profile Card */}
            <div className="rounded-2xl bg-white px-6 pt-6 pb-8 shadow-sm">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-20 w-20 rounded-full overflow-hidden">
                        <Link href="/editor/editor-profile">
                            <Image
                                src="/images/photographer.jpg"
                                alt="Zeeshan"
                                width={1000}
                                height={1000}
                                className="h-20 w-20 object-cover"
                            />
                        </Link>
                    </div>
                    <div className="text-center">
                        <Link href="/editor/editor-profile" className="text-lg font-semibold underline">Jane Cooper</Link>
                        <div className="pt-3 text-sm text-gray-500 flex">
                            <p className="flex gap-2">
                                <LocationIcon /> Pakistan <FaRegUser className="text-[#333333]" /> Editor
                            </p>
                        </div>
                    </div>

                    <Link href="/editor/quick-match-result?redirect=dashboardeditor" className="w-full">
                        <button className="mt-6 w-full cursor-pointer rounded-lg bg-[#ff4b4b] py-2.5 px-4 text-[16px] font-medium text-white">
                            Match Me with a Client Quickly
                        </button>
                    </Link>

                    <Link href="/platform-safety?redirect=dashboardeditor" className="w-full bg-[#FFEEEE] rounded-lg mt-5">
                        <button className="flex gap-2 text-[#FF4D4F] text-center justify-center items-center mx-auto py-2.5 px-4 text-[14px] cursor-pointer">
                            <LockIcon /> Platform Safety Rules{" "}
                            <IoArrowForwardSharp className="mt-1 text-red-500" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Level Overview */}
            <div className="bg-white p-6 border rounded-lg shadow-md mx-auto space-y-5">
                <h3 className="text-[18px] font-medium text-[#333]">
                    Your Performance Stats
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between">
                        <span className="text-[#777980] text-[14px]" title="Average time to first reply">Average Response Time</span>
                        <span className="text-[#777980] text-[14px]">1 hour</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#777980] text-[14px]" title="User’s average rating">Rating</span>
                        <p className="text-gray-500 flex items-center gap-1"><span className="text-yellow-600 text-sm"><FaStar /> </span> 4.9</p>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#777980] text-[14px]">Jobs Completed</span>
                        <span className="text-gray-500">40</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-[#777980] text-[14px]">
                            Clients Worked With
                        </span>
                        <span className="text-gray-500">12</span>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <Link href="/editor/editor-profile" className="w-[178px]  py-2 rounded-lg border border-[#D9D9D9] hover:border-[#ff4b4b] hover:bg-[#ff4b4b] hover:text-white cursor-pointer duration-300 px-4 text-center">
                        View progress
                    </Link>
                </div>
            </div>

            {/* Response Speed & Visibility */}
            <div className="bg-white p-6 border rounded-lg shadow-md mx-auto space-y-5">
                <div>
                    <h3 className="text-[18px] font-medium text-[#333]">
                        Response Speed & Visibility
                    </h3>
                    <p className="text-[14px] text-[#777980] mt-1">
                        Responding faster boosts your visibility
                    </p>
                </div>

                <div className="rounded-lg border bg-[#f9f9f9] p-4 text-[14px] text-[#4A4C56]">
                    This system rewards fast replies with higher exposure in search
                    results and stronger priority in Quick Match. Slower replies
                    reduce both.
                </div>

                <div className="grid grid-cols-1 gap-3">
                    <div className="space-y-2">
                        <p className="text-[16px] text-[#4A4C56]">Your profile gets 6.5x more views in Search Results and a 300% increase in Quick Match priority when responding in under 1 hour.</p>
                        <p className="text-[13px] text-[#4A4C56]">Editors who respond quickly are prioritized across the platform. Faster replies increase exposure, ranking, and client match success.</p>
                    </div>
                    <div className="space-y-1">
                        <div className="flex items-center justify-between rounded-lg border px-4 py-3 gap-4">
                            <span className="text-[14px] text-[#777980]">Your Average Response Time</span>
                            <span className="text-[14px] font-medium text-[#333]">
                                {averageResponseHours} hour and {averageResponseMinutes} minutes
                            </span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-[13px] text-[#4A4C56]">Next Tier Unlocks at: Under 1 hour.</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <div className="grid grid-cols-2 gap-3">
                            <div className="rounded-lg border px-4 py-3">
                                <p className="text-[12px] text-[#777980]">Search Exposure</p>
                                <p className="text-[16px] font-semibold text-[#333]">
                                    {exposure}
                                </p>
                            </div>
                            <div className="rounded-lg border px-4 py-3">
                                <p className="text-[12px] text-[#777980]">Quick Match Priority</p>
                                <p className="text-[16px] font-semibold text-[#333]">
                                    {quickMatch}
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-[#777980]">Your profile gets 6.5× more views in Search Results and a 300% increase in Quick Match priority when responding in under 1 hour.</p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border">
                    <div className="grid grid-cols-[1.2fr_1fr_1fr] bg-[#f3f4f6] px-3 py-2 text-[10px] font-medium text-[#4A4C56]">
                        <div className="overflow-hidden pr-1.5">Average Response Time</div>
                        <div className="pr-1 overflow-hidden">Search Exposure</div>
                        <div className=" overflow-hidden">Quick Match Priority</div>
                    </div>
                    <div className="divide-y">
                        {exposureTiers.map((tier) => (
                            <div
                                key={tier.label}
                                className={`grid grid-cols-[1.2fr_1fr_1fr] px-6 py-2 text-[10px] ${tier.zone === "benefit"
                                    ? "bg-[#F3FBF1]"
                                    : tier.zone === "neutral"
                                        ? "bg-[#FFF9E6]"
                                        : "bg-[#FFF0F0]"
                                    }`}
                            >
                                <span className="text-[#333]">{tier.label}</span>
                                <span className="text-[#333]">{tier.exposure}</span>
                                <span className="text-[#333]">{tier.quickMatch}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <p className="text-[12px] text-[#777980]">
                    An average response time slower than 48 hours will not further reduce your search exposure or Quick Match priority.
                </p>
            </div>

            {/* Payment Overview */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-[18px] font-medium text-[#333]">Earnings</h3>
                <p className="text-2xl font-medium text-center py-8">$0.00</p>
                <Link
                    href="/editor/withdrow-balance"
                    className="w-[178px] text-center mx-auto block border rounded-lg py-2.5 hover:border-[#ff4b4b] hover:bg-[#ff4b4b] hover:text-white cursor-pointer duration-300"
                >
                    Withdraw Balance
                </Link>
            </div>
        </div>
    )
}