"use client";

import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function WithdrawBalance() {
  const transferTo = "Payoneer Account";
  const router = useRouter();
  const amount = 150;

  const handleCancel = () => {
    router.back();
    console.log("Cancel clicked");
  };

  const handleConfirm = () => {
    console.log("Confirm withdraw", { transferTo, amount });
    toast.success("Withdrawal request submitted.");
    setTimeout(() => {
      router.push('/editor');
    }, 1000);
  };

  return (
    <div className="containers">
      {/* <Toaster position="top-right" /> */}
      <div className=" flex items-center justify-center bg-white  rounded-2xl">
        <div className="w-full max-w-4xl rounded-2xl  bg-white p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center">
            Withdraw Balance
          </h1>
          <p className="text-center text-gray-500 mt-2">
            Review your withdrawal details.
          </p>

          {/* Details Box */}
          <div className="mt-10 space-y-4">
            {/* Transfer To */}
            <div className="space-y-1">
              <label className="block font-medium text-gray-700">Transfer to</label>
              <Select
                value={transferTo}
              >
                <SelectTrigger className="w-full rounded-xl border px-6 py-7">
                  <SelectValue placeholder="Select a transfer method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={transferTo}>{transferTo}</SelectItem>
                  <SelectItem value="More methods coming soon" >More methods coming soon...</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <label htmlFor="amount" className="block font-medium text-gray-700">Amount</label>
              <input type="text" id="amount" className="w-full font-semibold text-gray-900 rounded-xl border px-6 py-4" value={`$${amount}`} readOnly />
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Your payment processor may apply extra fees. Transfers may take up to
            10 business days.
          </p>

          {/* Buttons */}
          <div className="mt-12 flex flex-col  lg:flex-row items-center justify-center gap-4 space-y-3">
            <button
              onClick={handleCancel}
              className="px-10 py-3 rounded-xl bg-red-100 text-red-500 font-semibold cursor-pointer w-full"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              className="px-10 py-3 rounded-xl bg-red-500 text-white font-semibold cursor-pointer w-full"
            >
              Confirm and Withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
