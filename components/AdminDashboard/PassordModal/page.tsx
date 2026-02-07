"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";

/* ===========================================================
   MAIN PASSWORD MODAL
=========================================================== */
export default function PasswordModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: (v: boolean) => void;
}) {
  const [step, setStep] = useState<"change" | "forgot" | "verify" | "reset">(
    "change"
  );

  // All form states here 🔥 (API Ready)
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const next = (s: typeof step) => setStep(s);

  const back = () => {
    if (step === "forgot") setStep("change");
    else if (step === "verify") setStep("forgot");
    else if (step === "reset") setStep("verify");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-2xl p-6">

        {step === "change" && (
          <ChangePasswordStep
            oldPass={oldPass}
            newPass={newPass}
            confirmPass={confirmPass}
            setOldPass={setOldPass}
            setNewPass={setNewPass}
            setConfirmPass={setConfirmPass}
            onForgot={() => next("forgot")}
            onUpdate={() => console.log({ oldPass, newPass, confirmPass })}
            onClose={() => onClose(false)}
          />
        )}

        {step === "forgot" && (
          <ForgotPasswordStep
            email={email}
            setEmail={setEmail}
            onNext={() => next("verify")}
            onBack={back}
          />
        )}

        {step === "verify" && (
          <VerifyOtpStep
            otp={otp}
            setOtp={setOtp}
            onNext={() => next("reset")}
            onBack={back}
          />
        )}

        {step === "reset" && (
          <ResetPasswordStep
            onBack={back}
            onDone={() => {
              console.log({
                newPassword: newPass,
                confirmPassword: confirmPass,
                email,
                otp: otp.join(""),
              });
              onClose(false);
            }}
            newPass={newPass}
            confirmPass={confirmPass}
            setNewPass={setNewPass}
            setConfirmPass={setConfirmPass}
          />
        )}

      </DialogContent>
    </Dialog>
  );
}

/* ===========================================================
   STEP 1: CHANGE PASSWORD
=========================================================== */
function ChangePasswordStep({
  oldPass,
  newPass,
  confirmPass,
  setOldPass,
  setNewPass,
  setConfirmPass,
  onForgot,
  onUpdate,
}: any) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold">Change Password</h2>
      <p className="text-gray-600 mb-6">Your password must be 8–10 characters long.</p>

      <PasswordField
        label="Enter old password"
        value={oldPass}
       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOldPass(e.target.value)}

        show={show1}
        toggle={() => setShow1(!show1)}
      />

      <PasswordField
        label="Set new password"
        value={newPass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPass(e.target.value)}

        show={show2}
        toggle={() => setShow2(!show2)}
      />

      <PasswordField
        label="Re-enter new password"
        value={confirmPass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value)}

        show={show3}
        toggle={() => setShow3(!show3)}
      />

      <p className="text-red-500 text-sm cursor-pointer mt-1" onClick={onForgot}>
        Forget password?
      </p>

      <Button
        className="w-full bg-[#FF4D4F] text-white mt-4 cursor-pointer"
        onClick={onUpdate}
      >
        Update Password
      </Button>
    </div>
  );
}

/* ===========================================================
   STEP 2: FORGOT PASSWORD
=========================================================== */
function ForgotPasswordStep({ email, setEmail, onNext, onBack }: any) {
  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <button onClick={onBack} className="cursor-pointer">←</button> Forgot Password
      </h2>

      <p className="text-gray-600 mb-6">
        Please enter your email to reset your password.
      </p>

      <div className="flex items-center border border-red-300 rounded-lg px-3 mb-6">
        <Mail size={18} className="mr-2" />
        <input
          placeholder="Enter your email"
          className="flex-1 outline-none py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <Button
        className="w-full bg-[#FF4D4F] text-white cursor-pointer"
        onClick={() => {
          console.log("Send OTP to:", email);
          onNext();
        }}
      >
        Send Reset Code
      </Button>
    </div>
  );
}

/* ===========================================================
   STEP 3: VERIFY OTP
=========================================================== */
function VerifyOtpStep({ otp, setOtp, onNext, onBack }: any) {
  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <button onClick={onBack} className="cursor-pointer">←</button> Verify Email
      </h2>

      <p className="text-gray-600 mb-6">
        Enter the OTP we have sent to your email.
      </p>

      <div className="flex justify-between mb-6">
        {otp.map((v: any, i: number) => (
          <input
            key={i}
            maxLength={1}
            className="w-12 h-12 text-center border border-red-300 rounded-lg"
            value={v}
            onChange={(e) => {
              const newOtp = [...otp];
              newOtp[i] = e.target.value.slice(-1);
              setOtp(newOtp);
            }}
          />
        ))}
      </div>

      <p className="text-center text-sm mb-3">
        Didn’t receive the code?
        <span className="text-red-500 cursor-pointer"> Resend</span>
      </p>

      <Button
        className="w-full bg-[#FF4D4F] text-white cursor-pointer"
        onClick={() => {
          console.log("OTP Submitted:", otp.join(""));
          onNext();
        }}
      >
        Verify
      </Button>
    </div>
  );
}

/* ===========================================================
   STEP 4: RESET PASSWORD
=========================================================== */
function ResetPasswordStep({
  onBack,
  onDone,
  newPass,
  confirmPass,
  setNewPass,
  setConfirmPass,
}: any) {
  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold flex items-center gap-2">
        <button onClick={onBack} className="cursor-pointer">←</button> Reset Password
      </h2>

      <p className="text-gray-600 mb-6">
        Your password must be 8–10 characters long.
      </p>

      <PasswordField
        label="Set your password"
        value={newPass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPass(e.target.value)}

        show={s1}
        toggle={() => setS1(!s1)}
      />

      <PasswordField
        label="Re-enter password"
        value={confirmPass}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value)}

        show={s2}
        toggle={() => setS2(!s2)}
      />

      <Button className="w-full bg-[#FF4D4F] text-white mt-4 cursor-pointer" onClick={onDone}>
        Reset Password
      </Button>
    </div>
  );
}

/* ===========================================================
   REUSABLE PASSWORD FIELD
=========================================================== */
function PasswordField({ label, value, onChange, show, toggle }: any) {
  return (
    <div className="mb-4">
      <label className="text-sm block mb-1">{label}</label>

      <div className="flex items-center border border-red-300 rounded-lg px-3">
        <Lock size={18} className="mr-2" />
        <input
          type={show ? "text" : "password"}
          placeholder={label}
          className="flex-1 outline-none py-2"
          value={value}
          onChange={onChange}
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
