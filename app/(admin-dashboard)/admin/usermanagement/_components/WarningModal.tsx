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
  const [otherCategoryInput, setOtherCategoryInput] = useState("");
  const [otherCategoryError, setOtherCategoryError] = useState("");

  const handleConfirm = () => {
    if (selectedWarningType === "other" && !otherCategoryInput) {
      setOtherCategoryError("Please specify the category for the warning.");
      return;
    }
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
        {selectedWarningType === "other" && (
          <div>
            <label htmlFor="duration" className="text-sm text-gray-800">
              Other Warning Category
            </label>
            <input
              type="text"
              id="duration"
              placeholder="Enter other warning category..."
              onChange={(e) => {
                setOtherCategoryInput(e.target.value);
              }}
              className="focus-ring-2 focus-ring-gray-300 w-full resize-none rounded-lg border px-2 py-2 text-sm"
            />
            {otherCategoryError && (
              <p className="text-xs text-red-500">{otherCategoryError}</p>
            )}
          </div>
        )}
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
            className={`cursor-pointer rounded-lg bg-amber-600 px-4 py-1 text-white duration-300 hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-amber-600`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Issue Warning"}
          </button>
        </div>
      </div>
    </div>
  );
}
