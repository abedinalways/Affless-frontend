/** @format */

"use client";
import DebitCardIcon from "@/components/Icons/DebitCard";
import PaypalSvg from "@/components/Icons/PaypalIcon";
import PageBanner from "@/components/reusable/Bgbanner";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ConfirmDepositPage() {
  const [method, setMethod] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    // Submit logic here
    setTimeout(() => {
      toast.success("Deposit confirmed successfully!");
    }, 200);
    setTimeout(() => {
      router.push("/client/manage-job");
      setLoading(false);
    }, 500);
  };

  return (
    <div className=''>
      <Toaster />
      <div>
        <PageBanner
          title='Confirm Deposit'
          bgImage='/findEditor.jpg'
          links={[{ label: "Home", href: "/" }, { label: "Confirm Deposit" }]}
        />
      </div>
      <div className='containers pt-10 lg:pt-20'>
        <div className='w-full '>
          {/* <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow">
          <p className="text-gray-700 leading-relaxed mb-6">
            A secure deposit is required for your project. The deposit will be safely 
            held in escrow until the work is completed. If the editor fails to deliver 
            or cancels the project, your deposit will be fully refunded. This ensures 
            protection for both parties and maintains a reliable payment system.
          </p>

     
          <div className=" flex flex-col gap-5">
       
            <label className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-3">
                <PaypalSvg/>
                <div>
                  <p className="font-medium "> PayPal</p>
                  <p className="text-sm text-gray-500">
                    For quick and secure online payments.
                  </p>
                </div>
              </div>

              <input
                type="radio"
                name="payment"
                value="paypal"
                checked={method === "paypal"}
                onChange={() => setMethod("paypal")}
                className="w-5 h-5"
              />
            </label>

           
            <label className="flex justify-between items-center cursor-pointer">
              <div className="flex items-center gap-3">
                <DebitCardIcon/>
                <div>
                  <p className="font-medium">Add Credit/Debit Card</p>
                  <p className="text-sm text-gray-500">
                    Use Visa, Mastercard, or American Express.
                  </p>
                </div>
              </div>

              <input
                type="radio"
                name="payment"
                value="card"
                checked={method === "card"}
                onChange={() => setMethod("card")}
                className="w-5 h-5"
              />
            </label>
          </div>

        
          <button
            className="w-full bg-red-500 text-white py-3 rounded-lg mt-8 hover:bg-red-600 transition"
          >
            Confirm Deposit
          </button>
        </div> */}

          {/* RIGHT CARD (PRICE SUMMARY) */}
          <div className='w-full  bg-white p-6 rounded-xl shadow h-fit'>
            <h3 className='text-[20px] font-medium leading-150% pb-6'>
              Budget & Payment
            </h3>
            <div className='space-y-2'>
              <div className='flex justify-between text-gray-700'>
                <span>Project Budget</span>
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
                <span>$30</span>
              </div>
            </div>
          </div>

          <div className='w-full bg-white p-6 rounded-xl shadow h-fit mt-6'>
            <div className='flex justify-between text-gray-700'>
              <span>Project Duration</span>
              <span>5 Days</span>
            </div>
          </div>
          <div className='bg-white mt-8 px-6 py-8 rounded-2xl'>
            <p className='text-lg leading-150% font-normal text-[#333] pb-8'>
              A secure deposit is required for your project. The deposit will be
              safely held in escrow (a secure third-party holding system that
              releases funds only after the job is completed) until the work is
              completed.. If the editor fails to deliver or cancels the project,
              your deposit will be fully refunded. This ensures protection for
              both parties and maintains a reliable payment system.
            </p>
            <div className='space-y-6'>
              <div className='flex gap-3'>
                <input
                  type='radio'
                  id='payment_card'
                  name='payment_method'
                  value='card'
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                  className='w-5 aspect-square cursor-pointer'
                />
                <label
                  htmlFor='payment_card'
                  className='font-medium text-lg leading-150% text-[#333] cursor-pointer'>
                  <p className='text-[16px] font-medium leading-150%'>
                    Add Credit/Debit Card
                  </p>
                  <p className='text-sm text-gray-600'>
                    Use Visa, Mastercard, or American Express.
                  </p>
                </label>
              </div>

              <div className='flex gap-3'>
                <input
                  type='radio'
                  id='payment_bank'
                  name='payment_method'
                  value='bank'
                  checked={method === "bank"}
                  onChange={() => setMethod("bank")}
                  className='w-5 aspect-square cursor-pointer'
                />
                <label
                  htmlFor='payment_bank'
                  className='font-medium text-lg leading-150% text-[#333] cursor-pointer'>
                  <p className='text-[16px] font-medium leading-150%'>
                    Bank Transfer
                  </p>
                  <p className='text-sm text-gray-600'>
                    Direct transfer from your bank account.
                  </p>
                </label>
              </div>
            </div>

            <button
              type='button'
              disabled={loading || !method}
              onClick={handleSubmit}
              className='w-full bg-red-500 text-white py-3 rounded-lg mt-8 hover:bg-red-600 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'>
              Confirm Deposit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
