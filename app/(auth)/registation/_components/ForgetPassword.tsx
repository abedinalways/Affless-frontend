"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import MailIcon from "@/components/Icons/MailIcon";
import Link from "next/link";
import Image from "next/image";
import ArrowLeftIcon from "@/components/Icons/arrowleftIcon";

type FormValues = {
  email: string;
};

export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("OTP Sent To:", data.email);
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
        <div className="flex items-center justify-center rounded-2xl bg-[#FFDBDC] mb-8 p-3">
          <div className="w-full max-w-lg text-center">

            {/* Back + Title */}
            <div className="flex items-center gap-3 justify-center pb-4">
              <Link href="/signin">
                <span className="text-[#333] text-2xl cursor-pointer"><ArrowLeftIcon color="black" /></span>
              </Link>
              <h2 className="text-[#333] text-center font-poppins text-[24px]  lg:text-[40px] font-medium leading-[130%]">
                Forgot Password
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-[#333] text-center font-poppins text-[16px] font-normal leading-[150%] pb-4"
>
              Please enter your email address to reset
              <br /> your password.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

              {/* Email */}
              <div className="relative w-full">
                <MailIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  type="email"
                  placeholder="E mail"
                  className="w-full px-6 py-[18px] pl-12 rounded-xl bg-white focus:outline-none text-[#333] font-poppins text-base"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm font-poppins">{errors.email.message}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="text-white font-poppins text text-[16px] lg:text-[24px] font-medium leading-[150%] bg-[#FF4D4F] w-full py-3 px-4 rounded-lg"

              >
                Send OTP
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
}
