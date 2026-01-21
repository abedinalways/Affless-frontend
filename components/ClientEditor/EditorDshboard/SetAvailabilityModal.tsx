"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
import { EditorAvailabilityService } from "@/usersService/editor-availability.service";

interface SetAvailabilityModalProps {
  open: boolean;
  onClose: () => void;
  onSave?: (availability: AvailabilityData) => void;
}

export interface AvailabilityData {
  isAvailable: boolean;
  availableFrom?: string;
  availableUntil?: string;
  reason?: string;
}

export default function SetAvailabilityModal({
  open,
  onClose,
  onSave,
}: SetAvailabilityModalProps) {
  const [isAvailable, setIsAvailable] = useState(true);
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      // Fetch current availability status if needed
      setIsAvailable(true);
      setAvailableFrom("");
      setAvailableUntil("");
      setReason("");
    }
  }, [open]);

  const handleSave = async () => {
    try {
      setLoading(true);

      // Validation
      if (!isAvailable && !availableFrom) {
        toast.error("Please select a date from when you'll be unavailable");
        return;
      }

      if (!isAvailable && !availableUntil) {
        toast.error("Please select a date until when you'll be unavailable");
        return;
      }

      // Prepare data
      const availabilityData: AvailabilityData = {
        isAvailable,
        availableFrom: !isAvailable ? availableFrom : undefined,
        availableUntil: !isAvailable ? availableUntil : undefined,
        reason: !isAvailable ? reason : undefined,
      };

      // Call the service to update availability
    //   const response = await EditorAvailabilityService.setAvailability(
    //     availabilityData
    //   );

      // Call parent callback
      if (onSave) {
        onSave(availabilityData);
      }

      toast.success("Availability updated successfully!");

    //   toast.success(response.message || "Availability updated successfully!");

      onClose();
    } catch (error) {
      console.error("Error updating availability:", error);
      toast.error("Failed to update availability. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md rounded-2xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-[#333]">
              Set Your Availability
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600">
              Let clients know when you're available to work on orders
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Availability Toggle */}
            <div className="flex items-center gap-4 p-4 bg-[#F5F5F5] rounded-lg">
              <input
                type="radio"
                id="available"
                name="availability"
                checked={isAvailable}
                onChange={() => setIsAvailable(true)}
                className="w-5 h-5 cursor-pointer"
              />
              <label
                htmlFor="available"
                className="flex-1 cursor-pointer font-medium text-[#333]"
              >
                Available
              </label>
            </div>

            <div className="flex items-center gap-4 p-4 bg-[#FFF5F5] rounded-lg border border-[#FFE8E8]">
              <input
                type="radio"
                id="unavailable"
                name="availability"
                checked={!isAvailable}
                onChange={() => setIsAvailable(false)}
                className="w-5 h-5 cursor-pointer"
              />
              <label
                htmlFor="unavailable"
                className="flex-1 cursor-pointer font-medium text-[#FF4D4F]"
              >
                Temporarily Unavailable
              </label>
            </div>

            {/* Show date fields only when unavailable */}
            {!isAvailable && (
              <div className="space-y-4 mt-6 pt-4 border-t border-[#E5E5E5]">
                <div>
                  <label className="block text-sm font-semibold text-[#333] mb-2">
                    Unavailable From
                  </label>
                  <input
                    type="date"
                    value={availableFrom}
                    onChange={(e) => setAvailableFrom(e.target.value)}
                    className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg outline-none focus:border-[#ff4b4b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333] mb-2">
                    Unavailable Until
                  </label>
                  <input
                    type="date"
                    value={availableUntil}
                    onChange={(e) => setAvailableUntil(e.target.value)}
                    className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg outline-none focus:border-[#ff4b4b]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#333] mb-2">
                    Reason (Optional)
                  </label>
                  <textarea
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Tell clients why you're unavailable..."
                    className="w-full px-4 py-3 border border-[#D9D9D9] rounded-lg outline-none focus:border-[#ff4b4b] resize-none"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {isAvailable && (
              <div className="p-4 bg-[#F0F9FF] border border-[#E0F2FE] rounded-lg">
                <p className="text-sm text-[#0369A1]">
                  ✓ Your gigs will be visible to clients and you can receive new orders
                </p>
              </div>
            )}

            {!isAvailable && (
              <div className="p-4 bg-[#FEF2F2] border border-[#FEE2E2] rounded-lg">
                <p className="text-sm text-[#991B1B]">
                  ⚠ Your gigs will be hidden and you won't receive new orders during this period
                </p>
              </div>
            )}
          </div>

          {/* Footer Buttons */}
          <div className="flex gap-3 pt-4 border-t border-[#E5E5E5]">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-[#D9D9D9] font-semibold text-[#333] cursor-pointer hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 px-4 py-3 rounded-lg bg-[#ff4b4b] font-semibold text-white cursor-pointer hover:bg-[#ff3333] disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
