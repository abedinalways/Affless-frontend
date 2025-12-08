"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import KeyIcon from "@/components/Icons/KeyIcon";

type FormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Reset password data:", data);
  };

  return (
    <div className=" sm:px-[50px] 
      md:px-[50px] 
      lg:px-[100px] 
      xl:px-[150px]
      2xl:px-[300px]">
      <div
      className="
        grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 
        lg:gap-[100px] space-y-8
      "
    >

        {/* Left Image */}
        <div className="flex justify-center items-center mb-10 lg:mb-0">
          <Image
            src="/images/adminreset.png"
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
        <div className="flex items-center justify-center bg-[#FAF3E0] rounded-2xl">
          <div className="w-full max-w-lg text-center py-10 px-4 sm:px-8">

            {/* Back + Title */}
            <div className="flex items-center gap-3 justify-center pb-3">
              <Link href="/otp">
                <span className="text-[#333] text-2xl cursor-pointer">&#8592;</span>
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
                  type="password"
                  placeholder="Enter Password"
                  className="w-full px-6 py-3 pl-12 rounded-xl bg-white focus:outline-none text-[#333] font-poppins text-base"
                />
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
                  type="password"
                  placeholder="Re-enter Password"
                  className="w-full px-6 py-3 pl-12 rounded-xl bg-white focus:outline-none text-[#333] font-poppins text-base"
                />
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm font-poppins text-left">
                  {errors.confirmPassword.message}
                </p>
              )}

              {/* Confirm Button */}
              <button
                type="submit"
                className="w-full py-3 bg-[#FF4D4F] text-[#FDFDFD] font-poppins text-[16px] lg:text-[24px] font-medium rounded-xl mt-2"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
