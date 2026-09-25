"use client";

import KeyIcon from "@/components/Icons/KeyIcon";
import MailIcon from "@/components/Icons/MailIcon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOff } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";

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
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      await login({ email: data.email, password: data.password });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="sm:px-[50px] md:px-[50px] lg:px-[100px] xl:px-[150px] 2xl:px-[300px]">
      <div className="ml-2">
        <button onClick={handleBack} className="w-full cursor-pointer">
          <div className="flex w-fit gap-2 rounded-lg bg-red-500 p-2 text-white">
            <FaArrowLeft className="mt-1" />
            Back to Home
          </div>
        </button>
      </div>
      <div className="grid grid-cols-1 space-y-8 md:grid-cols-1 lg:grid-cols-2 lg:gap-[100px]">
        {/* Left Image */}
        <div className="">
          <Image
            src="/svgIcons/loginImage.svg"
            alt="login"
            height={434}
            width={432}
            className="h-[470px] w-full"
          />
        </div>

        {/* Right Form */}
        <div className="">
          <div className="mx-auto w-full bg-[#FFDBDC] p-8 shadow-md sm:rounded-3xl sm:p-14">
            <h2 className="font-poppins pb-[42px] text-center text-[24px] leading-[150%] font-medium text-[#333] lg:text-[40px]">
              Log In
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="relative">
                <MailIcon className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-500" />
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
                  className="font-poppins w-full rounded-xl bg-white px-6 py-4 pl-12 text-base leading-[150%] text-[#333] focus:outline-none"
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
                        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?`~]).{8,64}$/,
                      message:
                        "Password must include at least 1 uppercase letter, 1 number, and 1 symbol",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="font-poppins w-full rounded-xl bg-white px-6 py-4 pr-12 pl-12 text-base leading-[150%] text-[#333] focus:outline-none"
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
              {/* Remember + Forgot */}
              <div className="flex items-center justify-between text-sm">
                <div className="flex cursor-pointer items-center gap-2">
                  <input
                    id="rememberme"
                    type="checkbox"
                    {...register("remember")}
                    className="cursor-pointer"
                  />
                  <label
                    htmlFor="rememberme"
                    className="font-poppins flex cursor-pointer items-center gap-2 text-base leading-[150%] text-[#333]"
                  >
                    Remember Me
                  </label>
                </div>

                <Link href="/forgetpassword">
                  <button
                    type="button"
                    className="font-poppins cursor-pointer text-right text-sm leading-[150%] text-[#333]"
                  >
                    Forgot password?
                  </button>
                </Link>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className={`w-full bg-[#FF4D4F] py-3 hover:bg-red-500 ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} font-poppins bg rounded-xl text-2xl leading-[150%] font-medium text-[#FDFDFD]`}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Log In"}
              </button>

              {/* Sign Up */}
              <p className="font-poppins text-center text-sm leading-[150%] text-[#333]">
                Don't have an account?{" "}
                <Link href="/singup?redirect=home">
                  <span className="cursor-pointer text-red-500">Sign Up</span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
