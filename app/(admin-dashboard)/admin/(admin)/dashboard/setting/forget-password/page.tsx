"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgotPasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
          <Link href={"setting/change-password"}>
          <ArrowLeft/></Link> Forgot Password
          </DialogTitle>
        </DialogHeader>

        <p className="text-gray-600 mb-6">
          Please enter your email address to reset your password.
        </p>

        <div className="space-y-4">
          <label className="text-sm">Enter Your Email</label>

          <div className="flex items-center border border-red-300 rounded-lg px-3">
            <Mail className="text-gray-500 mr-2" size={18} />
            <input
              type="email"
              placeholder="Enter your Email"
              className="flex-1 outline-none py-2"
            />
          </div>

          <Button className="w-full bg-[#FF4D4F] hover:bg-red-500 text-white rounded-xl py-3">
            Send OTP
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
