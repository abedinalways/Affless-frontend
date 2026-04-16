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
import toast from "react-hot-toast";
import { routes } from "@/helper/routes"

type FormValues = {
  name: string;
  email: string;
  password: string;
  terms: boolean;
  accountType: string;
};

export default function SingUpForm() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const signUpType = searchParams.get('type') || 'client';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { accountType: signUpType } });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsSubmitting(true);
    console.log("Form Submitted:", data);
    // Simulate an async operation like form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Registration successful!");
      reset();
      // Reset form or show success message here
    }, 2000);
  };

  // console.log("Redirect : ", routes[redirect.split("_").slice(0, -1).join("_")]);

  // Compute safe back link
  let backHref;
  if (redirect) {
    const key = redirect.split("_").pop() || "";
    backHref = routes[key] || "/";
    console.log("Computed backHref:", backHref);
  }

  return (
    <div
      className=" sm:px-[50px] 
      md:px-[50px] 
      lg:px-[100px] 
      xl:px-[150px]
      2xl:px-[300px]"
    >
      <div className="pb-3 px-2">
        <Link href={backHref?.href + `?redirect=${redirect?.split("_").slice(0, -1).join("_") || "home"}` || "/" + `?redirect=${redirect || "home"}`} className="pb-9 ">
          {" "}
          <button className="bg-red-500 p-2 text-white cursor-pointer w-fit rounded-lg flex gap-2 text-nowrap">
            <FaArrowLeft className="mt-1" />
            Back to {backHref?.label.toString() || "Home"}
          </button>
        </Link>
      </div>
      <div
        className="
        grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 
        lg:gap-[100px] space-y-8
      "
      >
        {/* Left Image */}
        <div className="flex w-full">
          <Image
            src="/svgIcons/singUpImage.svg"
            alt="signup"
            height={457}
            width={545}
            className="w-full "
          />
        </div>

        {/* Right Form */}
        <div className="w-full  bg-[#FFDBDC] rounded-3xl shadow-md p-8 sm:p-10 mx-auto ">
          <h2 className="text-[#333] text-center font-poppins text-[24px] lg:text-[40px] font-medium leading-[150%] pb-6 ">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <p className="text-[18px] font-normal text-[#1D1F2C] mb-3">
              Select Account Type:
            </p>

            <div className="flex items-center gap-6">
              {/* Client */}
              <label
                htmlFor="client"
                className="flex items-center gap-2 bg-white w-full px-3 py-2.5 rounded-lg cursor-pointer"
              >
                <input
                  type="radio"
                  value="client"
                  {...register("accountType", {
                    required: "Account type is required",
                  })}
                  className="h-5 w-5 accent-red-500 cursor-pointer"
                  id="client"
                />
                <p className="text-[#333] font-poppins text-base select-none">
                  Client
                </p>
              </label>

              {/* Editor */}
              <label
                htmlFor="editor"
                className="flex items-center gap-2 bg-white w-full px-3 py-2.5 rounded-lg cursor-pointer"
              >
                <input
                  type="radio"
                  value="editor"
                  id="editor"
                  {...register("accountType", {
                    required: "Account type is required",
                  })}
                  className="h-5 w-5 accent-red-500 cursor-pointer"
                />
                <p className="text-[#333] font-poppins text-base select-none">
                  Editor
                </p>
              </label>
            </div>

            {errors.accountType && (
              <p className="text-red-500 text-sm mt-2">
                {errors.accountType.message}
              </p>
            )}

            {/* Name */}
            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
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
                    value: /^(?=[A-Za-z0-9._]{3,30}$)(?=.*[A-Za-z])[A-Za-z0-9._]*$/,
                    message:
                      "Username can only contain letters, numbers, underscores, and dots; it must include at least one letter; no spaces or special characters are allowed.",
                  },
                })}
                type="text"
                placeholder="Enter Username"
                className="w-full px-6 py-4 pl-12 bg-white rounded-xl focus:outline-none text-[#333] font-poppins text-base"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm font-poppins">
                {errors.name.message}
              </p>
            )}

            {/* Email */}
            <div className="relative">
              <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/,
                    message: "Enter a valid email (TLD must be at least 2 characters)",
                  },
                })}
                type="email"
                placeholder="Enter Your Email"
                className="w-full px-6 py-4 pl-12 bg-white rounded-xl focus:outline-none text-[#333] font-poppins text-base"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm font-poppins">
                {errors.email.message}
              </p>
            )}

            {/* Password */}
            <div className="relative">
              <KeyIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

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
                className="w-full px-6 py-4 pl-12 pr-12 bg-white rounded-xl focus:outline-none text-[#333] font-poppins text-base"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="w-6 h-6 text-gray-600" />
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

            {/* Terms Text */}
            <div className="bg-[#FFECEC] p-4 rounded-xl text-[#333] text-sm font-poppins">
              By signing up, you agree to our Terms of Service and Privacy Policy.  You’ll join a community of video editors and clients, and gain access to collaboration tools, job features, secure payments, and marketplace opportunities.
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-start gap-3 text-[#333] font-poppins text-base cursor-pointer">
              <input
                type="checkbox"
                {...register("terms", {
                  required: "You must accept the terms",
                })}
                className="mt-1 cursor-pointer "
              />
              I agree to the Terms of Service and Privacy Policy
            </label>
            {errors.terms && (
              <p className="text-red-500 text-sm font-poppins">
                {errors.terms.message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#FF4D4F] hover:bg-red-500 hover:delay-50 text-[#FDFDFD] font-poppins text-[16px] lg:text-[24px] font-medium rounded-xl cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
            </button>

            {/* Sign In link */}
            <p className="text-center text-sm text-[#333] font-poppins">
              Already have an account?{" "}
              <Link href="/login">
                <span className="text-red-500 cursor-pointer font-medium">
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
