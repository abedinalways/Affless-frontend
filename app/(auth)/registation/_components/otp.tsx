"use client";

import { useForm, SubmitHandler, set } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

type FormValues = {
  otp: string[];
};

export default function OtpForm() {
  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      otp: ["", "", "", "", "", ""],
    },
  });

  const otpValues = watch("otp");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setLoading(true);
    const code = data.otp.join("");
    if (code.length < 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      setLoading(false);
      return;
    }
    toast.success(`OTP Validation successful!`);
    setTimeout(() => {
      router.push('/resetPassword');
      setLoading(false);
    }, 1000);
  };

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return; // only allow single digit

    setValue(`otp.${index}`, value);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (otpValues[index] === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="px-4 sm:px-[50px] 
      md:px-[50px] 
      lg:px-[100px] 
      xl:px-[150px]
      2xl:px-[300px] grid items-center">
      <Toaster />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-[100px] gap-8">
        <div className="flex items-center justify-center bg-white rounded-2xl h-full">
          <Image
            src="/svgIcons/otp.svg"
            alt="verify email"
            width={500}
            height={450}
            className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] xl:w-[520px] h-auto object-contain"/>
        </div>

        {/* Right Content */}
        <div className="h-full flex flex-col justify-center bg-[#FFDBDC] rounded-2xl ">
          <div className="w-full max-w-lg mx-auto p-10  ">

            {/* Back + Title */}
            <div className="flex items-center gap-3 pb-4">
              <Link href="/forgetpassword">
                <div className="text-[#333] text-2xl cursor-pointer">
                  <GoArrowLeft />
                </div>
              </Link>
              <h2 className="text-[#333] font-poppins text-[24px] lg:text-[40px] font-medium leading-[130%]"
              >
                Verify Email
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-[#333] font-poppins text-base leading-[150%] pb-6">
              Please enter the otp we have sent you in your email.
            </p>

            {/* OTP Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex justify-center gap-2">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <Input
                    key={index}
                    maxLength={1}
                    {...register(`otp.${index}` as const)}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace") handleBackspace(index);
                    }}
                    className="w-12 h-12 text-center text-xl rounded-full border border-gray-300focus:border-[#FF4D4F] focus:ring-0 font-poppins bg-white"
                  />
                ))}
              </div>


              <div className="">
                <button disabled={loading} type="submit" className="w-full py-3  bg-[#FF4D4F] text-white text-[16px] lg:text-[24px] font-poppins rounded-xl cursor-pointer hover:bg-[#e04344] transition disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? "Verifying..." : "Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  );
}
