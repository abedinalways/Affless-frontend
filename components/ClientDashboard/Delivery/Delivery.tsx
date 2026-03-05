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
import { useEffect, useState } from "react";
import RequestRevisionModal from "./RequestModal";
import toast from "react-hot-toast";
import { ALL_JOBS } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
import { JobRow } from "@/components/ClientDashboard/ManageJob/manage-job-demo-data";
import Loading from "@/components/shared/Loading";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import DeliveredFileCard from "./DeliveredFileCard";
import ConfirmationPopup from "@/components/shared/ConfirmationPopup";
import { GoAlert } from "react-icons/go";

export default function DeliveryClient() {
  const [openRevision, setOpenRevision] = useState(false);
  const [job, setJob] = useState<JobRow | null>(null);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);

  const handleConfirmAccept = () => {
    setIsAccepting(true);
    // Simulate accept delay
    setTimeout(() => {
      setIsAccepting(false);
      setIsConfirmationOpen(false);
      toast.success("Delivery accepted successfully!");
      router.push("/client/review");
    }, 2000);
  }

  useEffect(() => {
    // Scroll to top immediately
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    const selected = ALL_JOBS.find((item) => item.id === id);
    setJob(selected || null);
  }, [id]);

  // Additional scroll to top after render
  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, 0);
    return () => clearTimeout(timer);
  }, [job]);

  if (!job) return <div className="containers py-20">
    <Loading />
  </div>;


  return (
    <div className="">
      <div>
        <PageBanner
          title="Job Delivery"
          bgImage="/findEditor.jpg"
          links={[
            { label: job?.service || "", href: `/client/manage-job/${job?.id}` },
            { label: "Job Delivery" },
          ]}
        />
      </div>

      <div className="w-full bg-white rounded-2xl containers pt-10 lg:pt-20 space-y-10">
        {/* Files */}
        <button type="button" onClick={() => router.back()} className="border px-4 py-1 rounded-md cursor-pointer bg-[#ff4b4b] text-white">Back</button>
        <div className="space-y-5">
          <h4 className="text-lg font-semibold text-gray-900">Delivered Files</h4>
          {/* Item 1 */}
          <DeliveredFileCard
            ImageIcon={Video}
            title="Final project edit v3.mp4"
            size="2.4 GB"
            fileType="video"
          />

          {/* Item 2 */}
          <DeliveredFileCard
            ImageIcon={Music}
            title="Audio mix Final.wav"
            size="156 MB"
            fileType="audio"
          />

          {/* Item 3 */}
          <DeliveredFileCard
            ImageIcon={ImageIcon}
            title="Video thumbnail.jpg"
            size="5 MB"
            fileType="image"
          />

          {/* Item 4 */}
          <DeliveredFileCard
            ImageIcon={FileArchive}
            title="Elements and assets.zip"
            size="89 MB"
            fileType="elements/assets"
          />
        </div>

        {/* Message */}
        <div className="">
          <h4 className="text-[18px] font-semibold text-gray-900">Editor’s Delivery Message</h4>
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
            {/* <Link href="/client/review"> */}
              <button
                type="button"
                className="w-full py-4 rounded-xl bg-[#FFEDED] border border-[#FF4B4B] text-[#FF4B4B] hover:bg-[#FF4D4F] hover:text-white font-semibold transition cursor-pointer"
                onClick={() => setIsConfirmationOpen(true)}
              >
                Accept
              </button>
            {/* </Link> */}
          </div>
          <button
            type="button"
            onClick={() => setOpenRevision(true)}
            className="h-14 rounded-xl border border-[#ff4b4b] bg-[#ff4b4b]/10 text-[#ff4b4b] hover:bg-[#FF4D4F] hover:text-white font-semibold text-[16px] cursor-pointer transition"
          >
            Request Revision
          </button>
        </div>

        <RequestRevisionModal open={openRevision} setOpen={setOpenRevision} handleSubmit={() => {
          setOpenRevision(false);
        }} />

        <ConfirmationPopup
          isOpen={isConfirmationOpen}
          title="Are you sure?"
          description="Do you really want to accept the delivery? This process cannot be undone."
          confirmText="Accept"
          onCancel={() => { setIsConfirmationOpen(false); }}
          onConfirm={handleConfirmAccept}
          loading={isAccepting}
        />
      </div>
    </div>
  );
}
