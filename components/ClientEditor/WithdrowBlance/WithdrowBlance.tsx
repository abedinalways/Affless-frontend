"use client";

import Image from "next/image";
import toast,{Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function WithdrawBalance() {
  const transferTo = "Payoneer Account";
  const router = useRouter();
  const amount = 150;

  const handleCancel = () => {

    console.log("Cancel clicked");
  };

  const handleConfirm = () => {
    console.log("Confirm withdraw", { transferTo, amount });
    toast.success("Withdraw confirmed! (check console)");
    setTimeout(() => {
      router.push('/editor');
    }, 1000);
  };

  return (
    <div className="containers">
      <Toaster />
      <div className=" flex items-center justify-center bg-white  rounded-2xl">
        <div className="w-full max-w-4xl rounded-2xl  bg-white p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-semibold text-center">
            Withdraw Balance
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
                    src="/images/paynear.webp"
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
              Confirm and withdraw
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
