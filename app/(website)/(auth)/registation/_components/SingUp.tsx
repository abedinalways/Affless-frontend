"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

import MailIcon from "@/components/Icons/MailIcon";
import KeyIcon from "@/components/Icons/KeyIcon";
import UserIcon from "@/components/Icons/userIcon";
import Link from "next/link";
import { EyeClosed, EyeIcon, EyeOff } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";
import { getRouteHref } from "@/helper/routes";
import { useAuth } from "@/hooks/useAuth";

type FormValues = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
  accountType: string;
};

export default function SingUpForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const signUpType = searchParams.get("type") || "client";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register: registerAccount } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { accountType: signUpType } });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      if (redirect) {
        sessionStorage.setItem("loginRedirect", redirect);
      }
      await registerAccount({
        name: data.name,
        email: data.email,
        password: data.password,
        type: data.accountType.toUpperCase() as "CLIENT" | "EDITOR",
      });
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const backHref = redirect ? getRouteHref(redirect) : "/";
  const backRedirect = redirect ? redirect : "home";

  return (
    <div className="sm:px-[50px] md:px-[50px] lg:px-[100px] xl:px-[150px] 2xl:px-[300px]">
      <div className="px-2 pb-3">
        <Link href={`${backHref}?redirect=${backRedirect}`} className="pb-9">
          <button className="flex w-fit cursor-pointer gap-2 rounded-lg bg-red-500 p-2 text-nowrap text-white">
            <FaArrowLeft className="mt-1" />
            Back to {typeof backHref === "string" ? "Home" : "Dashboard"}
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 space-y-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-[100px]">
        {/* Left Image */}
        <div className="flex w-full">
          <Image
            src="/svgIcons/singUpImage.svg"
            alt="signup"
            height={457}
            width={545}
            className="w-full"
          />
        </div>

        {/* Right Form */}
        <div className="mx-auto w-full rounded-3xl bg-[#FFDBDC] p-8 shadow-md sm:p-10">
          <h2 className="font-poppins pb-6 text-center text-[24px] leading-[150%] font-medium text-[#333] lg:text-[40px]">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="mb-3 text-[18px] font-normal text-[#1D1F2C]">
              Select Account Type:
            </p>

            <div className="flex items-center gap-6">
              {/* Client */}
              <label
                htmlFor="client"
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2.5"
              >
                <input
                  type="radio"
                  value="client"
                  {...register("accountType", {
                    required: "Account type is required",
                  })}
                  className="h-5 w-5 cursor-pointer accent-red-500"
                  id="client"
                />
                <p className="font-poppins text-base text-[#333] select-none">
                  Client
                </p>
              </label>

              {/* Editor */}
              <label
                htmlFor="editor"
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg bg-white px-3 py-2.5"
              >
                <input
                  type="radio"
                  value="editor"
                  id="editor"
                  {...register("accountType", {
                    required: "Account type is required",
                  })}
                  className="h-5 w-5 cursor-pointer accent-red-500"
                />
                <p className="font-poppins text-base text-[#333] select-none">
                  Editor
                </p>
              </label>
            </div>

            {errors.accountType && (
              <p className="mt-2 text-sm text-red-500">
                {errors.accountType.message}
              </p>
            )}

            {/* Name */}
            <div className="relative">
              <UserIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                {...register("name", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Username must not exceed 30 characters",
                  },
                  pattern: {
                    value:
                      /^(?=[A-Za-z0-9._]{3,30}$)(?=.*[A-Za-z])[A-Za-z0-9._]*$/,
                    message:
                      "Username can only contain letters, numbers, underscores, and dots; it must include at least one letter; no spaces or special characters are allowed.",
                  },
                })}
                type="text"
                placeholder="Enter Username"
                className="font-poppins w-full rounded-xl bg-white px-6 py-4 pl-12 text-base text-[#333] focus:outline-none"
              />
            </div>
            {errors.name && (
              <p className="font-poppins text-sm text-red-500">
                {errors.name.message}
              </p>
            )}

            {/* Email */}
            <div className="relative">
              <MailIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                    message:
                      "Enter a valid email (domain must be at least 2 characters)",
                  },
                })}
                type="text"
                placeholder="Enter Your Email"
                className="font-poppins w-full rounded-xl bg-white px-6 py-4 pl-12 text-base text-[#333] focus:outline-none"
              />
            </div>
            {errors.email && (
              <p className="font-poppins text-sm text-red-500">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <div className="relative">
              <KeyIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />

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
                className="font-poppins w-full rounded-xl bg-white px-6 py-4 pr-12 pl-12 text-base text-[#333] focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="h-6 w-6 text-gray-600" />
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

            {/* Terms Text */}
            <div className="font-poppins rounded-xl bg-[#FFECEC] p-4 text-sm text-[#333]">
              By signing up, you agree to our Terms of Service and Privacy
              Policy. You’ll join a community of video editors and clients, and
              gain access to collaboration tools, job features, secure payments,
              and marketplace opportunities.
            </div>

            {/* Terms Checkbox */}
            <label className="font-poppins flex cursor-pointer items-start gap-3 text-base text-[#333]">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
                className="mt-1 cursor-pointer"
              />
              I agree to the Terms of Service and Privacy Policy
            </label>
            {errors.terms && (
              <p className="font-poppins text-sm text-red-500">
                {errors.terms.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="font-poppins w-full cursor-pointer rounded-xl bg-[#FF4D4F] py-3 text-[16px] font-medium text-[#FDFDFD] hover:bg-red-500 hover:delay-50 disabled:cursor-not-allowed disabled:opacity-50 lg:text-[24px]"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Sign In link */}
            <p className="font-poppins text-center text-sm text-[#333]">
              Already have an account?{" "}
              <Link href="/login">
                <span className="cursor-pointer font-medium text-red-500">
                  Log In
                </span>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
