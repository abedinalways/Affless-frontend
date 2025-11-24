"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import MailIcon from "@/components/Icons/MailIcon";
import Link from "next/link";
import Image from "next/image";

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
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Left Image */}
        <div className=" mb-10 lg:mb-0">
          <Image
            src="/svgIcons/forgetImage.svg"
            alt="forget"
            width={500}
            height={450}
            className="
              w-[260px]
              sm:w-[340px]
              md:w-[420px]
              lg:w-[480px]
              xl:w-[520px]
              h-auto
            "
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center rounded-2xl bg-[#FAD2D4]">
          <div className="w-full max-w-lg text-center">

            {/* Back + Title */}
            <div className="flex items-center gap-3 justify-center pb-4">
              <Link href="/signin">
                <span className="text-[#333] text-2xl cursor-pointer">&#8592;</span>
              </Link>
              <h2 className="text-[#333] font-poppins text-2xl font-medium leading-[150%]">
                Forgot Password
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-[#333] font-poppins text-base leading-[150%] pb-6 px-4">
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
                  className="w-full px-6 py-3 pl-12 rounded-xl bg-white focus:outline-none text-[#333] font-poppins text-base"
                />
              </div>

              {errors.email && (
                <p className="text-red-500 text-sm font-poppins">{errors.email.message}</p>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 bg-[#FF4D4F] text-white font-poppins text-xl font-medium rounded-xl"
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
