/** @format */

"use client";
import DebitCardIcon from "@/components/Icons/DebitCard";
import PaypalSvg from "@/components/Icons/PaypalIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { buildSourceBreadcrumbs } from "@/lib/source-breadcrumb";

export default function ConfirmDepositPage() {
  const searchParams = useSearchParams();
  const assignEditor = searchParams.get("assign");
  const returnTo = searchParams.get("return");
  const redirect = searchParams.get("redirect");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    // Submit logic here
    setTimeout(() => {
      if(assignEditor){
        toast.success(`Deposit confirmed! Assigned to ${assignEditor}`);
      } else {
        toast.success("Deposit confirmed successfully!");
      }
    }, 200);
    setTimeout(() => {
      router.push("/client/manage-job");
      setLoading(false);
    }, 500);
  };

  const [bannerLinks, setBannerLinks] = useState<{ label: string; href?: string }[]>([]);
    useEffect(() => {
      setBannerLinks(buildSourceBreadcrumbs(redirect, {
        currentLabel: "Confirm Deposit",
        fallbackBase: [{ label: "Home", href: "/" }],
      }));
    }, [redirect]);

  return (
    <div className=''>
      <div>
        <PageBanner
          title='Confirm Deposit'
          bgImage='/findEditor.jpg'
          links={bannerLinks}
        />
      </div>
      <div className='containers pt-10 lg:pt-20'>
        <div className='w-full space-y-8'>
          {/* RIGHT CARD (PRICE SUMMARY) */}
          <div className='w-full  bg-white p-6 rounded-xl shadow h-fit'>
            <h3 className='text-[20px] font-medium leading-150% pb-6'>
              Budget & Payment
            </h3>
            <div className='space-y-2'>
              <div className='flex justify-between text-gray-700'>
                <span>Job Budget</span>
                <span>$20.00</span>
              </div>
              <div className='flex justify-between text-gray-700'>
                <span>Service Fee</span>
                <span> $4.00</span>
              </div>
              <div className='flex justify-between text-gray-700'>
                <span>Taxes & Other Fees</span>
                <span>$6.00</span>
              </div>
              <hr className='' />
              <div className='flex justify-between text-gray-700'>
                <span>Total Payment</span>
                <span>$30.00</span>
              </div>
            </div>
          </div>

          <div className='w-full bg-white p-6 rounded-xl shadow h-fit mt-6'>
            <div className='flex justify-between text-gray-700'>
              <span>Job Duration</span>
              <span>5 Days</span>
            </div>
          </div>
          <div className='bg-white px-6 py-8 rounded-2xl space-y-6'>
            <p>A payment is required to share your job with editors. Your payment will be safely held in escrow, a secure third-party holding system that releases funds to the editor only after the job is completed. If the editor does not deliver or the job is canceled, your payment is fully protected.</p>
            <button
              type='button'
              disabled={loading}
              onClick={handleSubmit}
              className='w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
              Confirm Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
