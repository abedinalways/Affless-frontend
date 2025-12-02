"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { RiBankCardLine } from "react-icons/ri";
import ReviewConfirm from "@/app/(client-dashboard)/client/review-confirm/page";
import Link from "next/link";
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
    defaultValues: {
      paymentMethod: "card",
    },
  });

  const selectedMethod = watch("paymentMethod");

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Payment submitted:", data);
    alert("Payment Successful!");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="containers mx-auto py-10 px-6 bg-[#f6f6f6]"
    >
      <h1 className="text-3xl font-semibold mb-3">Choose Your Payment Method</h1>

      <div className="p-4 bg-green-100 border border-green-300 rounded-xl text-green-800 mb-8 text-sm">
        <strong>Your hire request has been created.</strong> Complete your payment
        to send it to the editor.
        <p className="mt-1 text-xs opacity-80">
          Your payment will only be released once the editor accepts the project.
        </p>
      </div>

      {/* Choose Payment Method */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
        <h2 className="text-lg font-semibold mb-4">Choose Your Payment Method</h2>

        {/* Credit Card Selection */}
        <label
          className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer mb-3 transition ${
            selectedMethod === "card"
              ? "border-[#FF4D4F] bg-red-50"
              : "border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <RiBankCardLine className="text-red-500 text-2xl" />
            <div>
              <p className="font-medium">Credit / Debit Card</p>
              <p className="text-xs text-gray-500">Visa, Mastercard, Amex</p>
            </div>
          </div>
          <input
            type="radio"
            value="card"
            {...register("paymentMethod")}
            className="w-4 h-4"
          />
        </label>

        {/* PayPal */}
        <label
          className={`border rounded-xl p-4 flex items-center justify-between cursor-pointer transition ${
            selectedMethod === "paypal"
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <img src="/paypal.png" width={35} alt="paypal" />
            <div>
              <p className="font-medium">PayPal</p>
              <p className="text-xs text-gray-500">
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

      {/* Card Details (Show Only If Card Selected) */}
      {selectedMethod === "card" && (
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
          <h2 className="text-lg font-semibold mb-5">Card Details</h2>

          <div className="mb-5">
            <label className="block mb-1 font-medium text-sm">
              Card holder Name*
            </label>
            <input
              {...register("cardName")}
              type="text"
              defaultValue="Cameron Williamson"
              className="w-full border px-4 py-3 rounded-lg bg-gray-100"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-1 font-medium text-sm">Card Number*</label>
            <input
              {...register("cardNumber")}
              type="text"
              defaultValue="1234 5678 9012 3456"
              className="w-full border px-4 py-3 rounded-lg bg-gray-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium text-sm">
                Expiry Date (MM/YY)*
              </label>
              <input
                {...register("expiry")}
                type="text"
                defaultValue="12/25"
                className="w-full border px-4 py-3 rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-sm">CVV*</label>
              <input
                {...register("cvv")}
                type="text"
                defaultValue="123"
                className="w-full border px-4 py-3 rounded-lg bg-gray-100"
              />
            </div>
          </div>

          <label className="flex items-center gap-2 mt-4 text-sm">
            <input type="checkbox" {...register("saveCard")} />
            Save this card for future payments
          </label>
        </div>
      )}

      {/* Warning Box */}
      <div className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-xl text-sm mb-8">
        <strong>⚠ All payments must be processed through Editor Marketplace</strong>
        <p className="mt-2 text-xs leading-relaxed">
          DO NOT request or accept payment via PayPal, Venmo, CashApp, Zelle,
          bank transfer, crypto, or any external method.
        </p>

        <div className="mt-3 text-xs">
          <p>1st violation: $25 penalty + 21-day warning</p>
          <p>2nd violation: Permanent account ban + funds withheld</p>
        </div>

        <a href="#" className="text-red-600 underline text-xs mt-2 inline-block">
          Read full Off-Platform Policy →
        </a>
      </div>

      {/* Terms Checkbox */}
      <label className="flex items-center gap-2 mb-8 text-sm">
        <input type="checkbox" {...register("agree")} />
        I agree to the{" "}
        <span className="underline text-blue-600">Terms of Service</span>,{" "}
        <span className="underline text-blue-600">Privacy Policy</span> and{" "}
        <span className="underline text-blue-600">Off-Platform Payment Policy</span>.
      </label>

      {/* Bottom Buttons */}
      <div className="flex justify-between items-center mt-6">
         <Link href="/review-confirm"> 
        <div
        
      
          className="px-8 py-3 border rounded-xl bg-gray-200"
        >
          Back
        </div></Link>

     <button
          type="submit"
          className="px-10 py-3 rounded-xl bg-[#FF4D4F] text-white font-medium"
        >
          Pay $105.00
        </button>
      </div>

    </form>
  );
}
