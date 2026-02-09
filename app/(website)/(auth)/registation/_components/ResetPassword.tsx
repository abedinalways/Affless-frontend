"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
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
  } = useForm<FormValues>();

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
    <div
      className=" sm:px-[50px] 
      md:px-[50px] 
      lg:px-[100px] 
      xl:px-[150px]
      2xl:px-[300px] grid items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-[100px] gap-8">
        {/* Left Image */}
        <div className="flex justify-center items-center ">
          <Image
            src="/svgIcons/resetImage.svg"
            alt="reset password illustration"
            width={600}
            height={450}
            className="
              w-[260px]
              sm:w-[360px]
              md:w-[460px]
              lg:w-[520px]
              xl:w-[560px]
              h-auto
            "
          />
        </div>

        {/* Right Panel */}
        <div className="flex items-center justify-center bg-[#FFDBDC] rounded-2xl mb-8">
          <div className="w-full max-w-lg py-10 px-4 sm:px-8">
            {/* Back + Title */}
            <div className="flex items-center gap-3 pb-3">
              <Link href="/otp">
                <div className="text-[#333] text-2xl cursor-pointer">
                  <GoArrowLeft />
                </div>
              </Link>
              <h2 className="text-[#333] font-poppins text-[24px] lg:text-[40px] font-medium leading-[150%]">
                Reset Password
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-[#333] font-poppins text-base leading-[150%] pb-6">
              Your password must be 8-64 characters long.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* New Password */}
              <div className="relative">
                <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF4D4F]" />
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
                  className="w-full px-6 py-3 pl-12 pr-12 rounded-xl bg-white focus:outline-none text-[#333] font-poppins text-base"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333] cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5 text-gray-600" />
                  ) : (
                    <EyeOff className="w-6 h-6 text-gray-600" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="text-red-500 text-sm font-poppins">
                  {errors.password.message}
                </p>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF4D4F]" />
                <input
                  {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter Password"
                  className="w-full px-6 py-3 pl-12 pr-12 rounded-xl bg-white focus:outline-none text-[#333] font-poppins text-base"
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333] cursor-pointer"
                  onClick={() =>
                    setShowConfirmPassword((prev) => !prev)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="w-6 h-6 text-gray-600" />
                  ) : (
                    <EyeOff className="w-6 h-6 text-gray-600" />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500 text-sm font-poppins">
                  {errors.confirmPassword.message}
                </p>
              )}

              <div className="text-sm text-[#333] space-y-1">
                <p>Password Must Contain:</p>
                <ul className="list-disc ml-5">
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
                className="w-full py-3 bg-[#FF4D4F] text-[#FDFDFD] font-poppins text-[16px] lg:text-[24px] font-medium rounded-xl mt-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#e04345] transition-colors"
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
