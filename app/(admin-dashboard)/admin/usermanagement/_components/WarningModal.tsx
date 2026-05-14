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

export default function WarningModal({
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
      setReasonError("Please provide a reason for the warning.");
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
        <h3 className="text-base font-semibold text-gray-900">Issue Warning</h3>
        <p className="text-sm text-gray-600">
          Are you sure you want to issue a warning to this user? This will be
          recorded on their profile.
        </p>
        <div>
            <label htmlFor=""></label>
          <Select
            value={selectedWarningType}
            onValueChange={setSelectedWarningType}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a reason..." />
            </SelectTrigger>
            <SelectContent className="z-999">
              <SelectGroup>
                <SelectItem value="violation_platform_safety_rules">
                  Violation of Platform Safety Rules (off-platform payments and
                  communications)
                </SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="">
          <textarea
            name="reason"
            id="reason"
            placeholder="Enter reason of the warning..."
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
              `bg-amber-600 hover:bg-amber-700 text-white px-4 py-1 rounded-lg cursor-pointer duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-amber-600`
            }
            disabled={loading}
          >
            {loading ? "Loading..." : "Issue Warning"}
          </button>
        </div>
      </div>
    </div>
  );
}
