"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ConfirmationModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: ({ reason }: { reason?: string }) => void;
  onCancel: () => void;
  confirmClassName?: string;
  cancelClassName?: string;
  loading?: boolean;
  reason?: boolean;
}

export default function BanModal({
  isOpen,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmationModalProps) {
  const [reasonInput, setReasonInput] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [selectedWarningType, setSelectedWarningType] = useState("other");

  const handleConfirm = () => {
    if (!reasonInput) {
      setReasonError("Please provide a reason for the ban.");
      return;
    }

    onConfirm({ reason: reasonInput });
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-999 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[#0003] backdrop-blur-xs"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-sm space-y-2 rounded-xl bg-white p-5 shadow-xl">
        <h3 className="text-base font-semibold text-gray-900">Ban User</h3>
        <p className="text-sm text-gray-600">
          Are you sure you want to ban this user? This action cannot be undone.
        </p>
        <div className="">
          <textarea
            name="reason"
            id="reason"
            placeholder="Enter reason of the ban..."
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
            className={
              `bg-[#ff4d4f] hover:bg-[#fd4447] text-white px-4 py-1 rounded-lg cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#ff4d4f]`
            }
            disabled={loading}
          >
            {loading ? "Loading..." : "Ban User"}
          </button>
        </div>
      </div>
    </div>
  );
}
