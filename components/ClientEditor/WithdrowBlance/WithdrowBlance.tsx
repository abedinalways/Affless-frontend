"use client";

import Image from "next/image";

export default function WithdrawBalance() {
  const transferTo = "Payoneer Account";
  const amount = 150;

  const handleCancel = () => {

    console.log("Cancel clicked");
  };

  const handleConfirm = () => {
    console.log("Confirm withdraw", { transferTo, amount });
    alert("Withdraw confirmed! (check console)");
  };

  return (
  <div className="containers">
      <div className=" flex items-center justify-center bg-white px-4 rounded-2xl">
      <div className="w-full max-w-4xl rounded-2xl  bg-white p-8 sm:p-12">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center">
          Withdraw balance
        </h1>
        <p className="text-center text-gray-500 mt-2">
          Review Your withdrawal details.
        </p>

        {/* Details Box */}
        <div className="mt-10 space-y-4">
          {/* Transfer To */}
          <div className="flex items-center justify-between rounded-xl border px-6 py-4">
            <p className="font-medium text-gray-700">Transfer to</p>

            <div className="flex items-center gap-3">
           
              <div className="h-6 w-6 relative">
                <Image
                  src="/images/payoneer.png" 
                  alt="payoneer"
                  fill
                  className="object-contain"
                />
              </div>

              <p className="font-medium text-gray-800">{transferTo}</p>
            </div>
          </div>

          {/* Amount */}
          <div className="flex items-center justify-between rounded-xl border px-6 py-4">
            <p className="font-medium text-gray-700">Amount</p>
            <p className="font-semibold text-gray-900">${amount}</p>
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-6">
          Your payment processor may apply extra fees. Transfers may take up to
          10 business days.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-10 py-3 rounded-xl bg-red-100 text-red-500 font-semibold cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            className="px-10 py-3 rounded-xl bg-red-500 text-white font-semibold cursor-pointer"
          >
            Confirm and withdraw
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}
