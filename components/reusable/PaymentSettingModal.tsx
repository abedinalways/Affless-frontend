"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./PaymentModal";
import toast from "react-hot-toast";
type VerifyMethod = "sms" | "email" | null;

type BankForm = {
  accountHolderName: string;
  bankName: string;
  accountNumber: string;
  sortCode: string;
};

export default function PayoutSettingsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [verifyMethod, setVerifyMethod] = useState<VerifyMethod>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BankForm>();

  const closeAll = () => {
    onClose();
    setTimeout(() => {
      setStep(1);
      setVerifyMethod(null);
      reset();
    }, 150);
  };

  const onSubmitBank = (data: BankForm) => {
    console.log("BANK FORM:", data);
    toast.success("Bank details added successfully!");
    closeAll();
  };

  return (
    <Modal open={open} onClose={closeAll}>
      {/* STEP 1 */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-semibold">Payout Settings</h2>
          <p className="text-gray-500 mt-1">
            Add, edit, or remove your payout methods securely.
          </p>

          <div className="mt-6 border rounded-xl p-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center">
                💳
              </div>
              <div>
                <p className="font-semibold">Add Credit/Debit Card</p>
                <p className="text-sm text-gray-500">
                  Use Visa, Mastercard, or American Express.
                </p>
              </div>
            </div>

            <div className="h-5 w-5 rounded-full border border-gray-400" />
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full mt-8 bg-red-500 text-white py-3 rounded-xl font-semibold cursor-pointer"
          >
            Next
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-semibold">Let’s Verify Your Identity</h2>
          <p className="text-gray-500 mt-1">
            To add or update your payout method, please verify your identity.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setVerifyMethod("sms")}
              className={`py-3 rounded-xl font-medium border cursor-pointer ${
                verifyMethod === "sms"
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              Verify by SMS
            </button>

            <button
              onClick={() => setVerifyMethod("email")}
              className={`py-3 rounded-xl font-medium border cursor-pointer ${
                verifyMethod === "email"
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-gray-100 text-gray-700 border-gray-200"
              }`}
            >
              Verify by Email
            </button>
          </div>

          <button
            disabled={!verifyMethod}
            onClick={() => setStep(3)}
            className={`w-full mt-8 py-3 rounded-xl font-semibold ${
              verifyMethod
                ? "bg-red-500 text-white cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Verify
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className="py-4">
          <h2 className="text-2xl font-semibold">Verified</h2>
          <p className="text-gray-500 mt-1">
            Thank you for verifying your identity.
          </p>

          <button
            onClick={() => setStep(4)}
            className="w-full mt-8 bg-red-500 text-white py-3 rounded-xl font-semibold cursor-pointer"
          >
            Add Payout method
          </button>
        </div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <form onSubmit={handleSubmit(onSubmitBank)}>
          <h2 className="text-2xl font-semibold">
            Add Payout Method (Bank Transfer)
          </h2>
          <p className="text-gray-500 mt-1">
            Add your bank account details to receive payments securely.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm font-semibold mb-2">Account Holder Name</p>
              <input
                {...register("accountHolderName", { required: "Required" })}
                placeholder="Type Here..."
                className="w-full border rounded-lg p-3 outline-none"
              />
              {errors.accountHolderName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountHolderName.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Bank Name</p>
              <input
                {...register("bankName", { required: "Required" })}
                placeholder="Type Here..."
                className="w-full border rounded-lg p-3 outline-none"
              />
              {errors.bankName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.bankName.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Account Number</p>
              <input
                {...register("accountNumber", { required: "Required" })}
                placeholder="Type Here..."
                className="w-full border rounded-lg p-3 outline-none"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountNumber.message}
                </p>
              )}
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Sort Code</p>
              <input
                {...register("sortCode", { required: "Required" })}
                placeholder="Type Here..."
                className="w-full border rounded-lg p-3 outline-none"
              />
              {errors.sortCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.sortCode.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold cursor-pointer"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
