"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ForgotPasswordModal from "../forget-password/page";

export default function ChangePasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (value: boolean) => void;
}) {
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Forgot modal state
  const [forgotOpen, setForgotOpen] = useState(false);

  const openForgot = () => {
    onClose(false);       // 🔥 Change password modal close
    setForgotOpen(true);  // 🔥 Forgot password modal open
  };

  return (
    <>
      {/* CHANGE PASSWORD MODAL */}
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-md rounded-2xl bg-white p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Change Password</DialogTitle>
          </DialogHeader>

          <p className="text-gray-600 mb-6">
            Your password must be 8–10 characters long.
          </p>

          <div className="space-y-5">
            <PasswordField
              label="Enter old password"
              placeholder="Enter old password"
              show={showOld}
              toggle={() => setShowOld(!showOld)}
            />

            <PasswordField
              label="Set new password"
              placeholder="Set new password"
              show={showNew}
              toggle={() => setShowNew(!showNew)}
            />

            <PasswordField
              label="Re-enter new password"
              placeholder="Re-enter new password"
              show={showConfirm}
              toggle={() => setShowConfirm(!showConfirm)}
            />

            {/* 🔥 CLICK → CLOSE THIS MODAL + OPEN FORGOT MODAL */}
            <p
              className="text-red-500 text-sm cursor-pointer hover:underline"
              onClick={openForgot}
            >
              Forget password?
            </p>

            <Button className="w-full bg-[#FF4D4F] hover:bg-red-500 text-white rounded-xl py-3">
              Update password
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* FORGOT PASSWORD MODAL */}
      <ForgotPasswordModal open={forgotOpen} onClose={setForgotOpen} />
    </>
  );
}

function PasswordField({
  label,
  placeholder,
  show,
  toggle,
}: {
  label: string;
  placeholder: string;
  show: boolean;
  toggle: () => void;
}) {
  return (
    <div className="space-y-1">
      <label className="text-sm">{label}</label>

      <div className="flex items-center border border-red-300 rounded-lg px-3">
        <Lock className="text-gray-500 mr-2" size={18} />
        <input
          type={show ? "text" : "password"}
          placeholder={placeholder}
          className="flex-1 outline-none py-2"
        />
        {show ? (
          <EyeOff className="cursor-pointer" onClick={toggle} />
        ) : (
          <Eye className="cursor-pointer" onClick={toggle} />
        )}
      </div>
    </div>
  );
}
