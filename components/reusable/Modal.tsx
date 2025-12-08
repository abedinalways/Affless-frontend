"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm text-center bg-white">

        {/* Animated Loading Spinner */}
        <div className="border-t-8 border-t-red-500 border-gray-200  rounded-full w-16 h-16 mx-auto animate-spin"></div>

        <DialogHeader>
          <DialogTitle className="mt-4 text-xl font-semibold">
            Processing your payment securely...
          </DialogTitle>

          <DialogDescription className="text-gray-600">
            Please wait while we confirm your transaction.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
