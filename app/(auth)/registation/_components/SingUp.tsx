"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

import MailIcon from "@/components/Icons/MailIcon";
import KeyIcon from "@/components/Icons/KeyIcon";
import UserIcon from "@/components/Icons/userIcon";
import Link from "next/link";

type FormValues = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
};

export default function SingUpForm() {
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
    <div className="     container mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

        {/* Left Image */}
        <div className="flex justify-center">
          <Image
            src="/svgIcons/singUpImage.svg"
            alt="signup"
            height={457}
            width={545}
            className="w-full max-w-md"
          />
        </div>

        {/* Right Form */}
        <div className="w-full max-w-lg bg-[#FFE2E3] rounded-3xl shadow-md p-8 sm:p-10 mx-auto">
          <h2 className="text-[#333] text-center font-poppins text-2xl font-medium leading-[150%] pb-6">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Name */}
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="Enter Your Name"
                className="w-full px-6 py-3 pl-12 bg-white rounded-xl focus:outline-none text-[#333] font-poppins text-base"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm font-poppins">{errors.name.message}</p>
            )}

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
                className="w-full px-6 py-3 pl-12 bg-white rounded-xl focus:outline-none text-[#333] font-poppins text-base"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm font-poppins">{errors.email.message}</p>
            )}

            {/* Password */}
            <div className="relative">
              <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

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
                className="w-full px-6 py-3 pl-12 pr-12 bg-white rounded-xl focus:outline-none text-[#333] font-poppins text-base"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2"
              >
                <Image
                  src="/svgIcons/eyeImage.svg"
                  alt="Toggle Password"
                  width={20}
                  height={20}
                />
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
            )}

            {/* Terms Text */}
            <div className="bg-[#FFECEC] p-4 rounded-xl text-[#333] text-sm font-poppins">
              By signing up, you agree to our Terms of Service and Privacy Policy.
              You'll join a community of professional writers and editors, and gain
              access to collaboration tools, project management features, and
              marketplace opportunities.
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 text-[#333] font-poppins text-base">
              <input
                type="checkbox"
                {...register("terms", { required: "You must accept the terms" })}
                className="mt-1"
              />
              I agree to the Terms of Service and Privacy Policy
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm font-poppins">{errors.terms.message}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-[#FF4D4F] text-[#FDFDFD] font-poppins text-2xl font-medium rounded-xl"
            >
              Sign Up
            </button>

            {/* Sign In link */}
            <p className="text-center text-sm text-[#333] font-poppins">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-red-500 cursor-pointer font-medium">Sign In</span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
