"use client";
import DebitCardIcon from "@/components/Icons/DebitCard";
import PaypalSvg from "@/components/Icons/PaypalIcon";
import { useState } from "react";

export default function ConfirmDepositPage() {
  const [method, setMethod] = useState<string>("");

  return (
    <div className="containers  p-6">
      <div className="flex flex-col md:flex-row gap-8 w-full ">

        {/* LEFT CARD */}
        <div className="w-full lg:w-2/3 bg-white p-6 rounded-xl shadow">
          <p className="text-gray-700 leading-relaxed mb-6">
            A secure deposit is required for your project. The deposit will be safely 
            held in escrow until the work is completed. If the editor fails to deliver 
            or cancels the project, your deposit will be fully refunded. This ensures 
            protection for both parties and maintains a reliable payment system.
          </p>

          {/* Payment Methods */}
          <div className=" flex flex-col gap-5">
            {/* PayPal */}
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

            {/* Credit / Debit */}
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

          {/* Button */}
          <button
            className="w-full bg-red-500 text-white py-3 rounded-lg mt-8 hover:bg-red-600 transition"
          >
            Confirm Deposit
          </button>
        </div>

        {/* RIGHT CARD (PRICE SUMMARY) */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow h-fit">
          <div className="flex justify-between text-gray-700 mb-4">
            <span>Initial Budget</span>
            <span>$350.00</span>
          </div>

          <div className="flex justify-between text-gray-700 mb-4">
            <span>Platform Fee (20%)</span>
            <span>$70.00</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-gray-900">
            <span>Total Payment</span>
            <span>$654.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
