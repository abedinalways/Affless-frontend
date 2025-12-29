"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import KeyIcon from "@/components/Icons/KeyIcon";
import { GoArrowLeft } from "react-icons/go";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import toast,{Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);
    toast.success("Password reset successfully!");
    console.log("Reset password data:", data);
    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className=" sm:px-[50px] 
      md:px-[50px] 
      lg:px-[100px] 
      xl:px-[150px]
      2xl:px-[300px] grid items-center">
      <div
      className="
        grid grid-cols-1 md:grid-cols-2 
        lg:gap-[100px] gap-8
      "
    >

        {/* Left Image */}
        <div className="flex justify-center items-center mb-10 lg:mb-0">
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
              Your password must be 8–10 characters long.
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
                      value: 10,
                      message: "Password must be at most 10 characters",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full px-6 py-3 pl-12 pr-12 rounded-xl bg-white focus:outline-none text-[#333] font-poppins text-base"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333] cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {!showPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm font-poppins text-left">
                  {errors.password.message}
                </p>
              )}

              {/* Confirm Password */}
              <div className="relative">
                <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#FF4D4F]" />
                <input
                  {...register("confirmPassword", {
                    required: "Please re-enter your password",
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
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#333] cursor-pointer"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {!showConfirmPassword ? (
                    <AiOutlineEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm font-poppins text-left">
                  {errors.confirmPassword.message}
                </p>
              )}

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
