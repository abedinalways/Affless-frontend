"use client";

import { formatNumber } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: ({
    reason,
    duration,
  }: {
    reason?: string;
    duration?: string;
  }) => void;
  onCancel: () => void;
  confirmClassName?: string;
  cancelClassName?: string;
  loading?: boolean;
  reason?: boolean;
}

export default function SuspendModal({
  isOpen,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmationModalProps) {
  const [reasonInput, setReasonInput] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [durationInput, setDurationInput] = useState("");
  const [durationError, setDurationError] = useState("");

  const handleConfirm = () => {
    if (!durationInput) {
      setDurationError("Please provide a duration for the suspension.");
      return;
    }
    setDurationError("");
    if (!reasonInput) {
      setReasonError("Please provide a reason for the suspension.");
      return;
    }
    setReasonError("");
    onConfirm({ reason: reasonInput, duration: durationInput });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#0003] backdrop-blur-xs"
        onClick={onCancel}
      />
      <form className="relative w-full max-w-sm space-y-2 rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-base font-semibold text-gray-900">Suspend User</h3>
        <p className="text-sm text-gray-600">
          Are you sure you want to suspend this user? This action can be lifted
          later.
        </p>
        <div>
          <label htmlFor="duration" className="text-sm text-gray-800">
            Duration
          </label>
          <input
            type="text"
            id="duration"
            placeholder="Enter the suspension duration"
            onFocus={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
            }}
            onChange={(e) => {
              e.target.value = e.target.value.replace(/[^0-9]/g, "");
              setDurationInput(e.target.value);
            }}
            onBlur={(e) => {
              if (e.target.value) {
                e.target.value = formatNumber({ value: e.target.value }) || "";
                e.target.value =
                  Number(e.target.value) > 1
                    ? `${e.target.value} days`
                    : `${e.target.value} day`;
              }
            }}
            className="focus-ring-2 focus-ring-gray-300 w-full resize-none rounded-lg border px-2 py-2 text-sm"
          />
          {durationError && (
            <p className="text-xs text-red-500">{durationError}</p>
          )}
        </div>
        <div className="">
          <label htmlFor="reason" className="text-sm text-gray-800">
            Reason
          </label>
          <textarea
            name="reason"
            id="reason"
            placeholder="Enter reason for this action..."
            className="focus-ring-2 focus-ring-gray-300 h-20 w-full resize-none rounded-lg border px-2 py-1 text-sm"
            value={reasonInput}
            onChange={(e) => {
              setReasonInput(e.target.value);
              if (e.target.value) {
                setReasonError("");
              }
            }}
          ></textarea>
          {reasonError && <p className="text-xs text-red-500">{reasonError}</p>}
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className={`${"cursor-pointer rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-100"}`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={`cursor-pointer rounded-lg bg-slate-600 px-4 py-1 text-white duration-300 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-slate-600`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Suspend User"}
          </button>
        </div>
      </form>
    </div>
  );
}
