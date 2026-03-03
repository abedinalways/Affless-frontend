"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ReportUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userId: string;
  onReportSubmit: (reportData: ReportData) => Promise<void>;
}

export interface ReportData {
  reportedUserId: string;
  reason: string;
  description: string;
  timestamp: Date;
}

const REPORT_REASONS = [
  { value: "harassment", label: "Harassment or abuse" },
  { value: "violation_platform_safety_rules", label: "Violation of Platform Safety Rules (off-platform payments and communications)" },
  { value: "fraud", label: "Fraud or scam" },
  { value: "inappropriate", label: "Inappropriate content" },
  { value: "payment_issue", label: "Payment related issue" },
  { value: "quality_issue", label: "Quality of work issue" },
  { value: "unprofessional", label: "Unprofessional behavior" },
  { value: "other", label: "Other" },
];

export default function ReportUserModal({
  isOpen,
  onClose,
  userName,
  userId,
  onReportSubmit,
}: ReportUserModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!selectedReason.trim()) {
      setError("Please select a reason for reporting");
      return;
    }

    if (!description.trim()) {
      setError("Please provide details about the report");
      return;
    }

    if (description.trim().length < 10) {
      setError("Please provide at least 10 characters for the report details");
      return;
    }

    if(description.trim().length > 500) {
      setError("The description cannot exceed 500 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const reportData: ReportData = {
        reportedUserId: userId,
        reason: selectedReason,
        description: description.trim(),
        timestamp: new Date(),
      };

      await onReportSubmit(reportData);
      setSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Failed to submit report. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setDescription("");
    setError("");
    setSuccess(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md bg-white" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Report User
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Report <span className="font-medium">{userName}</span> for
            inappropriate behavior or activity.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="py-8 text-center">
            <div className="mb-4 flex justify-center">
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Report Submitted
            </h3>
            <p className="text-gray-600">
              Thank you for reporting this user. Our team will review your
              report and take appropriate action.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Reason Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Report <span className="text-red-500">*</span>
              </label>
              <Select
                value={selectedReason}
                onValueChange={(value) => {
                  setSelectedReason(value);
                  setError("");
                }}
              >
                <SelectTrigger className="w-full max-w-[90vw] sm:max-w-[464px] overflow-hidden px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all">
                  <SelectValue placeholder="Select a reason..." className="truncate" />
                </SelectTrigger>
                <SelectContent className="max-w-[90vw] sm:max-w-[464px]">
                  {REPORT_REASONS.map((reason) => (
                  <SelectItem className="max-w-[90vw] sm:max-w-[464px] h-auto py-2 flex-wrap" key={reason.value} value={reason.value}>
                    <span className="whitespace-normal wrap-break-word leading-snug">{reason.label}</span>
                  </SelectItem>
                ))}
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tell us more <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setError("");
                }}
                placeholder="Please provide detailed information about the issue..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {description.length}/500 characters
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <DialogClose asChild>
                <button
                  type="button"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </DialogClose>
              <button
                type="submit"
                disabled={isSubmitting || !selectedReason || !description}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Report"
                )}
              </button>
            </div>

            {/* Safety Notice */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
              <p className="text-xs text-blue-700">
                <strong>Note:</strong> All reports are reviewed by our safety
                team. False reports may result in account suspension.
              </p>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
