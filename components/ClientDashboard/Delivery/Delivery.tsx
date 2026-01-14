"use client";

import PageBanner from "@/components/reusable/Bgbanner";
import {
  Download,
  Eye,
  Video,
  Music,
  Image as ImageIcon,
  FileArchive,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import RequestRevisionModal from "./RequestModal";
import toast, { Toaster } from "react-hot-toast";

export default function DeliveryClient() {
  const [openRevision, setOpenRevision] = useState(false);

  return (
    <div className="">
      {/* <Toaster position="top-right"/> */}
      <div>
        <PageBanner
          title="Delivery Page"
          bgImage="/findEditor.jpg"
          links={[
            { label: "Home", href: "/client" },
            { label: "Delivery Page" },
          ]}
        />
      </div>

      <div className="w-full bg-white rounded-2xl containers pt-10 lg:pt-20">
        {/* Files */}
        <div className="space-y-5">
          {/* Item 1 */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl border border-purple-400 bg-purple-50 flex items-center justify-center">
                <Video className="text-purple-600" size={22} />
              </div>

              <div>
                <p className="text-[18px] font-semibold text-gray-900">
                  Final project edit v3.mp4
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[13px] text-gray-500">2.4 GB</span>
                  <span className="rounded-lg bg-red-50 px-3 py-1 text-[13px] font-medium text-[#ff4b4b]">
                    Video
                  </span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-[#ff4b4b] font-medium hover:opacity-80 transition cursor-pointer">
              <Download size={18} />
              <span className="text-[14px]">Download</span>
            </button>
          </div>

          {/* Item 2 */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl border border-green-400 bg-green-50 flex items-center justify-center">
                <Music className="text-green-600" size={22} />
              </div>

              <div>
                <p className="text-[18px] font-semibold text-gray-900">
                  Audio mix Final.wav
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[13px] text-gray-500">156 MB</span>
                  <span className="rounded-lg bg-red-50 px-3 py-1 text-[13px] font-medium text-[#ff4b4b]">
                    Audio
                  </span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-[#ff4b4b] font-medium hover:opacity-80 transition cursor-pointer">
              <Download size={18} />
              <span className="text-[14px]">Download</span>
            </button>
          </div>

          {/* Item 3 */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl border border-amber-300 bg-amber-50 flex items-center justify-center">
                <ImageIcon className="text-amber-600" size={22} />
              </div>

              <div>
                <p className="text-[18px] font-semibold text-gray-900">
                  Video thumbnail.jpg
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[13px] text-gray-500">156 MB</span>
                  <span className="rounded-lg bg-red-50 px-3 py-1 text-[13px] font-medium text-[#ff4b4b]">
                    Audio
                  </span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 text-[#ff4b4b] font-medium hover:opacity-80 transition cursor-pointer">
              <Download size={18} />
              <span className="text-[14px]">Download</span>
            </button>
          </div>

          {/* Item 4 */}
          <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl border border-blue-400 bg-blue-50 flex items-center justify-center">
                <FileArchive className="text-blue-600" size={22} />
              </div>

              <div>
                <p className="text-[18px] font-semibold text-gray-900">
                  Assets and elements.zip
                </p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="text-[13px] text-gray-500">89 MB</span>
                  <span className="rounded-lg bg-red-50 px-3 py-1 text-[13px] font-medium text-[#ff4b4b]">
                    Elements/Assets
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 text-[#ff4b4b] font-medium hover:opacity-80 transition cursor-pointer">
              <Download size={18} />
              <span className="text-[14px]">Download</span>
            </button>
          </div>
        </div>

        {/* Message */}
        <div className="mt-10">
          <h4 className="text-[18px] font-semibold text-gray-900">Message</h4>
          <p className="mt-3 text-[15px] leading-6 text-gray-500">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
          </p>
        </div>

        {/* Note */}
        {/* <div className="mt-6">
          <textarea
            placeholder="Note..."
            className="w-full min-h-[140px] rounded-2xl border border-gray-200 bg-white p-4 text-[15px] text-gray-700 outline-none focus:border-gray-300 resize-none"
          />
        </div> */}

        {/* Actions */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 pb-10">
          <div>
            <Link href="/client/review">
              <button
                className="w-full py-4 rounded-xl bg-[#FFEDED] border border-[#FF4B4B] text-[#FF4B4B] hover:bg-[#FF4D4F] hover:text-white font-semibold transition cursor-pointer"
                type="button"
              >
                Accept
              </button>
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setOpenRevision(true)}
            className="h-14 rounded-xl border border-[#ff4b4b] bg-[#ff4b4b]/10 text-[#ff4b4b] hover:bg-[#FF4D4F] hover:text-white font-semibold text-[16px] cursor-pointer transition"
          >
            Request Revision
          </button>
        </div>

        <RequestRevisionModal open={openRevision} setOpen={setOpenRevision} handleSubmit={()=>{
          toast.success("Revision requested successfully!")
          setOpenRevision(false);
        }}/>
      </div>
    </div>
  );
}
