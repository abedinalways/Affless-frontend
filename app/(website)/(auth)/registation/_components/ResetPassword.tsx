"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import KeyIcon from "@/components/Icons/KeyIcon";
import { GoArrowLeft } from "react-icons/go";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOff } from "lucide-react";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    watch,
    trigger,
  } = useForm<FormValues>();

  const password = watch("password");

  useEffect(() => {
    if (getValues("confirmPassword")) {
      trigger("confirmPassword");
    }
  }, [password, trigger]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);

      // TODO: replace with real API call
      console.log("Reset password data:", data);

      toast.success("Password reset successfully!");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid items-center sm:px-[50px] md:px-[50px] lg:px-[100px] xl:px-[150px] 2xl:px-[300px]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-[100px]">
        {/* Left Image */}
        <div className="flex items-center justify-center">
          <Image
            src="/svgIcons/resetImage.svg"
            alt="reset password illustration"
            width={600}
            height={450}
            className="h-auto w-[260px] sm:w-[360px] md:w-[460px] lg:w-[520px] xl:w-[560px]"
          />
        </div>

        {/* Right Panel */}
        <div className="mb-8 flex items-center justify-center rounded-2xl bg-[#FFDBDC]">
          <div className="w-full max-w-lg px-4 py-10 sm:px-8">
            {/* Back + Title */}
            <div className="flex items-center gap-3 pb-3">
              <Link href="/otp">
                <div className="cursor-pointer text-2xl text-[#333]">
                  <GoArrowLeft />
                </div>
              </Link>
              <h2 className="font-poppins text-[24px] leading-[150%] font-medium text-[#333] lg:text-[40px]">
                Reset Password
              </h2>
            </div>

            {/* Subtitle */}
            <p className="font-poppins pb-6 text-base leading-[150%] text-[#333]">
              Your password must be 8-64 characters long.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* New Password */}
              <div className="relative">
                <KeyIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#FF4D4F]" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    maxLength: {
                      value: 64,
                      message: "Password must not exceed 64 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~]).{8,64}$/,
                      message:
                        "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 symbol",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="font-poppins w-full rounded-xl bg-white px-6 py-3 pr-12 pl-12 text-base text-[#333] focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#333]"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                    <EyeOff className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="font-poppins text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <KeyIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-[#FF4D4F]" />
                <input
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter Password"
                  className="font-poppins w-full rounded-xl bg-white px-6 py-3 pr-12 pl-12 text-base text-[#333] focus:outline-none"
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer text-[#333]"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="h-6 w-6 text-gray-600" />
                  ) : (
                    <EyeOff className="h-6 w-6 text-gray-600" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="font-poppins text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}

              <div className="space-y-1 text-sm text-[#333]">
                <p>Password Must Contain:</p>
                <ul className="ml-5 list-disc">
                  <li>8–64 characters</li>
                  <li>At least 1 uppercase letter</li>
                  <li>At least 1 lowercase letter</li>
                  <li>At least 1 number</li>
                  <li>At least 1 symbol</li>
                </ul>
              </div>

              {/* Confirm Button */}
              <button
                type="submit"
                disabled={loading}
                className="font-poppins mt-2 w-full cursor-pointer rounded-xl bg-[#FF4D4F] py-3 text-[16px] font-medium text-[#FDFDFD] transition-colors hover:bg-[#e04345] disabled:cursor-not-allowed disabled:opacity-50 lg:text-[24px]"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
