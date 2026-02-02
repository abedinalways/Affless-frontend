"use client";

import KeyIcon from "@/components/Icons/KeyIcon";
import MailIcon from "@/components/Icons/MailIcon";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RxRotateCounterClockwise } from "react-icons/rx";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";
import { EyeIcon, EyeOff } from "lucide-react";
import { FaArrowLeft } from "react-icons/fa6";
import { CookieHelper } from "@/helper/cookie.helper";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    // console.log("Form Submitted:", data);
    setLoading(true);
    // Simulate an async operation like form submission
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("isLogin", "true");
      if (data?.email === "client@gmail.com" && data?.password === "Pa$$w0rd!") {
        router.push("/client");
        CookieHelper.set({key : "user",value: JSON.stringify({
          status: 'logged_in',
          user_type: 'client'
        })})
        setUser("client");
      } else if (data?.email === "editor@gmail.com" && data?.password === "Pa$$w0rd!") {
        router.push("/editor");
        CookieHelper.set({key : "user",value: JSON.stringify({
          status: 'logged_in',
          user_type: 'editor'
        })})
        setUser("editor");
      } else if (data?.email === "admin@gmail.com" && data?.password === "Pa$$w0rd!") {
        router.push("/admin");
        CookieHelper.set({key : "user",value: JSON.stringify({
          status: 'logged_in',
          user_type: 'admin'
        })})
        setUser("admin");
      } else {
        toast.error("Invalid email or password");
        CookieHelper.destroy({key : "user"});
      }
    }, 2000);
  };

  const handleBack =()=>{
    if(redirect){
      router.push(redirect);
    }else[
      router.push('/')
    ]
  }

  return (
    <div className="sm:px-[50px] md:px-[50px] lg:px-[100px] xl:px-[150px] 2xl:px-[300px]">
      <div className="ml-2">
        <button onClick={handleBack} className="bg-red-500 p-2 text-white cursor-pointer w-[100px] rounded-lg flex gap-2">
          <FaArrowLeft className="mt-1" />
          Back
        </button>
      </div>
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
            className=" w-full h-[470px]"
          />
        </div>


        {/* Right Form */}
        <div className="">
          <div className="w-full  bg-[#FFDBDC] sm:rounded-3xl shadow-md p-8 sm:p-14 mx-auto ">
            <h2 className="text-[#333] text-center font-poppins text-2xl font-medium leading-[150%] pb-[42px]">
              Log In
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
                  className="w-full px-6 py-4 pl-12 pr-12 rounded-xl focus:outline-none bg-white text-[#333] font-poppins text-base leading-[150%]"
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
                <p className="text-red-500 text-sm font-poppins">{errors.password.message}</p>
              )}
              {/* <div className=" bg-[#FFEAEA] rounded-2xl p-4">
              <p className="text-[14px] font-normal leading-150% text-[#4A4C56]">By signing up, you agree to our Terms of Service and Privacy Policy. You’ll join a community of video editors and clients, and gain access to collaboration tools, project features, secure payments, and marketplace opportunities.</p>
            </div> */}
              {/* Remember + Forgot */}
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 cursor-pointer">
                  <input id="rememberme" type="checkbox" {...register("remember")} className="cursor-pointer" />
                  <label htmlFor="rememberme" className="flex items-center gap-2 text-[#333] font-poppins text-base leading-[150%] cursor-pointer">
                    Remember me
                  </label>
                </div>

                <Link href="/forgetpassword">
                  <button
                    type="button"
                    className="text-[#333] text-right font-poppins text-sm leading-[150%] cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </Link>
              </div>


              {/* Sign In Button */}
              <button
                type="submit"
                className={`w-full py-3 bg-[#FF4D4F] hover:bg-red-500 ${loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} text-[#FDFDFD] font-poppins text-2xl font-medium bg leading-[150%] rounded-xl`}
                disabled={loading}
              >
                {loading ? "Signing in..." : "Log In"}
              </button>

              {/* Sign Up */}
              <p className="text-center text-sm text-[#333] font-poppins leading-[150%]">
                Don’t have an account?{" "}
                <Link href="/singup">
                  <span className="text-red-500 cursor-pointer ">Sign Up</span>
                </Link>

              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}