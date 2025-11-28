"use client";

import KeyIcon from "@/components/Icons/KeyIcon";
import MailIcon from "@/components/Icons/MailIcon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
   <div className="containers">
     <div
      className="
        grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 
        lg:gap-[100px] space-y-8
      "
    >
      {/* Left Image */}
      <div className="">
        <Image
          src="/svgIcons/loginImage.svg"
          alt="login"
          height={434}
          width={432}
          className=" w-full"
        />
      </div>

      {/* Right Form */}
      <div className="w-full  mb-9 bg-[#FFDBDC] rounded-3xl shadow-md  p-8 sm:p-14 mx-auto">
        <h2 className="text-[#333] text-center font-poppins text-2xl font-medium leading-[150%] pb-[42px]">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-6 py-4 pl-12 rounded-xl focus:outline-none bg-white text-[#333] font-poppins text-base leading-[150%]"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm font-poppins">{errors.email.message}</p>
          )}

          {/* Password */}
          <div className="relative">
            <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full px-6 py-4 pl-12 pr-12 rounded-xl focus:outline-none bg-white text-[#333] font-poppins text-base leading-[150%]"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              <Image
                src="/svgIcons/eyeImage.svg"
                alt="eye"
                width={19}
                height={18}
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
          )}

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2 text-[#333] font-poppins text-base leading-[150%]">
              <input type="checkbox" {...register("remember")} />
              Remember me
            </label>

            <Link href="/forgetpassword">
              <button
                type="button"
                className="text-[#333] text-right font-poppins text-sm leading-[150%]"
              >
                Forgot password?
              </button>
            </Link>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full py-3 bg-[#FF4D4F] text-[#FDFDFD] font-poppins text-2xl font-medium leading-[150%] rounded-xl"
          >
            Sign In
          </button>

          {/* Sign Up */}
          <p className="text-center text-sm text-[#333] font-poppins leading-[150%]">
            Don’t have an account?{" "}
            <Link href="/singup">
              <span className="text-red-500 cursor-pointer">Sign Up</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
   </div>
  );
}
