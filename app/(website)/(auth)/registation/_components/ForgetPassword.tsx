"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import MailIcon from "@/components/Icons/MailIcon";
import Link from "next/link";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

type FormValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);
    toast.success("Reset code sent to your email address");
    setTimeout(() => {
      router?.push("/otp");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className=" 
      md:px-[50px] 
      lg:px-[100px] 
      xl:px-[150px]
      2xl:px-[300px] h-full grid items-center">
      <div
        className="
        grid grid-cols-1 md:grid-cols-2 
        lg:gap-[100px] xl:grid-cols-2 space-y-8
      "
      >

        {/* Left Image */}
        <div className=" mb-10 lg:mb-0">
          <Image
            src="/svgIcons/forgetImage.svg"
            alt="forget"
            width={500}
            height={450}
            className="
              w-full
              sm:w-full
              md:w-full 
              lg:w-[480px]
              xl:w-[520px]
              h-auto
            "
          />
        </div>

        {/* Right Section */}
        <div className="grid items-center">
          <div className="h-full flex items-center justify-center rounded-2xl bg-[#FFDBDC]  p-10">
            <div className="w-full max-w-lg text-center">

              {/* Back + Title */}
              <div className="flex items-center gap-3 pb-4">
                <Link href="/login">
                  <span className="text-[#333] text-[24px]  xl:text-4xl cursor-pointer"><GoArrowLeft color="black" /></span>
                </Link>
                <h2 className="text-[#333] text-center font-poppins text-[24px]  xl:text-4xl font-medium leading-[130%]">
                  Forgot Password
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <div className="space-y-2">
                  <label htmlFor="email" className="block text-left">Enter the email address you registered with to create your account.</label>

                  {/* Email */}
                  <div className="relative w-full">
                    <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                    <input
                      id="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                          message: "Enter a valid email",
                        },
                      })}
                      type="email"
                      placeholder="Email"
                      className="w-full px-6 py-[18px] pl-12 rounded-xl bg-white focus:outline-none text-[#333] font-poppins text-base"
                    />
                  </div>
                </div>

                {errors.email && (
                  <p className="text-red-500 text-sm font-poppins">{errors.email.message}</p>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="text-white font-poppins text text-[16px] lg:text-[24px] font-medium leading-[150%] bg-[#FF4D4F] w-full py-3 px-4 rounded-lg cursor-pointer hover:bg-[#e04345] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"

                >
                  {loading ? "Sending..." : "Send Reset Code"}
                </button>
              </form>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
