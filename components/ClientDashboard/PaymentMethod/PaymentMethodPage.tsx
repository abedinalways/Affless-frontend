"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import PaymentModal from "@/components/reusable/Modal";
import PaypalIcon from "@/components/Icons/PaypalIcon";
import { ArrowRight, CreditCard } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = {
  paymentMethod: "card" | "paypal";
  cardName?: string;
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  saveCard?: boolean;
  agree?: boolean;
};

export default function PaymentMethodPage() {
  const { register, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { paymentMethod: "card" },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedMethod = watch("paymentMethod");
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Payment submitted:", data);
    setIsModalOpen(true);
    setTimeout(() => {
      toast.success("Payment Successful!");
      setIsModalOpen(false);
    }, 1000);
    setTimeout(() => {
      router.push("/client/manage-job");
    }, 1200);
  };

  return (
    <>
      {/* <Toaster position="top-right"/> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="containers mx-auto py-10 px-6 bg-[#f6f6f6]"
      >
        <h1 className="text-3xl font-semibold mb-3">
          Choose Your Payment Method
        </h1>

        <div className="p-8 bg-[#E5F1E0] border border-green-300 rounded-xl text-[#52C41A] mb-8 text-xl leading-150% font-normal">
          Your hire request has been created. Complete your payment to send it
          to the editor.
          <p className="pt-4.5 opacity-80 text-[#4A4C56] text-sm">
            Your payment will only be released once the editor accepts the
            project.
          </p>
        </div>

        {/* Choose payment method */}
        <div className="bg-white p-4 lg:p-8 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-4">Choose Your Payment Method</h2>

          {/* Card */}
          <label
            className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer mb-3 transition ${selectedMethod === "card"
                ? "border-[#FF4D4F] bg-red-50"
                : "border-gray-300"
              }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard className="text-red-500 text-2xl" />
              <div>
                <p className="font-medium text-[#FF4D4F] text-[18px] leading-150%">
                  Credit / Debit Card
                </p>
                <p className="text-xs text-[#FF4D4F] mt-3">Visa, Mastercard, Amex</p>
              </div>
            </div>
            <input
              type="radio"
              value="card"
              {...register("paymentMethod")}
              className="w-4 h-4"
            />
          </label>

          {/* Paypal */}
          <label
            className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${selectedMethod === "paypal"
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300"
              }`}
          >
            <div className="flex items-center gap-3">
              <PaypalIcon />
              <div>
                <p className="font-medium">PayPal</p>
                <p className="text-xs text-gray-500 mt-3.5">
                  Divide your project into stages with milestone payments.
                </p>
              </div>
            </div>

            <input
              type="radio"
              value="paypal"
              {...register("paymentMethod")}
              className="w-4 h-4"
            />
          </label>
        </div>

        {/* Card details */}
        {selectedMethod === "card" && (
          <div className="bg-white p-8 rounded-xl shadow-sm mb-6">
            <h2 className="text-xl font-medium mb-6 leading-150%">Card Details</h2>

            <div className="mb-5">
              <label className="block mb-1 font-medium text-[16px] leading-150% pb-3">
                Card holder Name*
              </label>
              <input
                {...register("cardName")}
                type="text"
                defaultValue="Cameron Williamson"
                className="w-full border px-4 py-3.5 rounded-lg bg-gray-100"
              />
            </div>

            <div className="mb-5">
              <label className="block mb-1 font-medium text-[16px] leading-150% pb-3">
                Card Number*
              </label>
              <input
                {...register("cardNumber")}
                type="text"
                defaultValue="1234 5678 9012 3456"
                className="w-full border px-4 py-3.5 rounded-lg bg-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-[16px] leading-150% pb-3">
                  Expiry Date (MM/YY)*
                </label>
                <input
                  {...register("expiry")}
                  type="text"
                  defaultValue="12/25"
                  className="w-full border px-4 py-3.5 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-[16px] leading-150% pb-3">
                  CVV*
                </label>
                <input
                  {...register("cvv")}
                  type="text"
                  defaultValue="123"
                  className="w-full border px-4 py-3.5 rounded-lg bg-gray-100"
                />
              </div>
            </div>

            <label className="flex items-center gap-2 mt-4 text-sm">
              <input type="checkbox" {...register("saveCard")} />
              Save this card for future payments
            </label>
          </div>
        )}

        {/* Warning */}
        <div className="bg-[#FEF2F2] border border-red-300 text-[#AB0712] p-4 rounded-xl text-[16px] font-normal mb-8">
          ⚠ All payments must be processed through Editor Marketplace
          <p className="mt-2 text-xs leading-relaxed">
            <strong> DO NOT</strong> request or accept payment via PayPal, Venmo, CashApp, Zelle,
            bank transfer, crypto, or any external method.
          </p>

          <div className="text-[14px]">
            <p className="py-3.5">
              <strong className="text-[16px]">Consequences:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                1st violation: <strong>$25 penalty + 21-day warning</strong>
              </li>
              <li>
                2nd violation: <strong>Permanent account ban + funds withheld</strong>
              </li>
            </ul>
          </div>

          <Link href="#" className="text-[#AB0712] underline text-xs mt-2 inline-block">
            <strong className="flex">Read full Off-Platform Policy <ArrowRight /></strong>
          </Link>
          <div>
            <Link href="#" className="text-[#AB0712] underline text-xs mt-2 inline-block">
              <p className="flex text-[16px]">Payment Rules <ArrowRight /></p>
            </Link>
          </div>
        </div>

        {/* Agree */}
        <label className=" items-center flex gap-2 mb-8 text-sm">
          <div>
            <input type="checkbox" {...register("agree")} />
            I agree to the{" "}
          </div>
          <span className="text-red-500">Terms of Service</span>,{" "}
          <span className="text-red-500">Privacy Policy</span> and{" "}
          <span className="text-red-500">Off-Platform Payment Policy</span>.
        </label>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-6">
          <div className="bg-gray-300 w-full rounded-lg">
            <Link href="/review-confirm">
              <div className="px-8 py-3 rounded-xl flex justify-center items-center mx-auto">
                Back
              </div>
            </Link>
          </div>

          <div className="w-full bg-[#FF4D4F] rounded-lg cursor-pointer">
            <button
              type="submit"
              className="px-10 py-3 rounded-xl flex justify-center items-center mx-auto text-white font-medium cursor-pointer"
            >
              Pay $105.00
            </button>
          </div>
        </div>
      </form>

      {/* Modal */}
      <PaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
