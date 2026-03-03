'use client'

import Link from "next/link";
import React, { useEffect } from "react";
import { CookieHelper } from "@/helper/cookie.helper";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";

export default function Banner() {

  const router = useRouter();
  const [userType, setUserType] = React.useState<string>("");
  const { setUser } = useUser();

  const handlePostJobClick = () => {
    try {
      const token = JSON.parse(CookieHelper.get({ key: 'user' }))
      if (token.status === 'logged_in') {
        if (token.user_type === 'client') {
          router.push("/client/post-job");
        } else {
          toast.error('Switch to client account to post a job');
          router.push("/editor");
        }
      } else {
        toast.error('Please signup as client to post a job');
        router.push('/singup?redirect=/&type=client');
      }
    } catch {
      toast.error('Please signup as client to post a job');
      router.push('/singup?redirect=/&type=client');
    }
  }

  const handleBecomeEditorClick = () => {
    try {
      const token = JSON.parse(CookieHelper.get({ key: 'user' }))
      if (token.status === 'logged_in') {
        if (token.user_type === 'editor') {
          toast.success('You’re already an Editor. To post jobs, log out and log in as a Client.');
          router.push("/editor");
        } else {
          toast.error('Only Editor accounts can access the Editor Dashboard. Please log out and create a new Editor account to continue.');
        }
      } else {
        toast.error(`Please login first to become ${userType === 'editor' ? 'a client' : 'an editor'}`);
        router.push('/login');
      }
    } catch {
      toast.error(`Please login first to become ${userType === 'editor' ? 'a client' : 'an editor'}`);
      router.push('/login');
    }
  }

  useEffect(()=>{
    try {
      const token = JSON.parse(CookieHelper.get({ key: 'user' }))
      if (token.status === 'logged_in') {
        setUserType(token.user_type);
      } else {
        setUserType('');
      }
    } catch {
      setUserType('');
    }
  },[])

  return (
    <div className="">
      {/* Banner Wrapper */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="
        bg-cover bg-center bg-no-repeat 
        h-[500px] md:h-[700px] w-full relative
      "
          style={{ backgroundImage: "url('/banner.png')" }}
        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>

          {/* Banner Content */}
          <div className="absolute inset-0 flex items-center  containers">
            {/* Left aligned content */}
            <div className="relative z-10 ">
              <h3
                className="
              text-white font-[Poppins]
              lg:text-[72px] md:text-[50px] text-[32px]
              font-medium leading-[120%]
            "
              >
                Find the Right Editor <br className="hidden md:block" /> or the
                Right Client
              </h3>

              <p
                className="
              text-white font-[Poppins] text-[16px]
              font-normal leading-[150%] mt-6 max-w-2xl
            "
              >
                Editor Marketplace connects clients and editors across YouTube,
                Tiktok, Instagram, X (Twitter), Snapchat, Facebook, podcasts,
                ads, and more, with clear fees, secure payments, and fast
                results.
              </p>

              <div className="flex items-center gap-5 md:gap-[42px] mt-8">
                <button
                  type="button"
                  onClick={handlePostJobClick}
                  className="bg-[#FF4D4F] text-white px-3 md:px-6.5 py-4 md:py-4.5 rounded-xl font-poppins text-base sm:text-lg cursor-pointer"
                >
                  Post a Job Free
                </button>
                <button
                  type="button"
                  onClick={handleBecomeEditorClick}
                  className="text-white px-3 md:px-6.5 py-4.5 md:py-4 rounded-xl font-poppins text-base sm:text-lg border border-[#FF4D4F] cursor-pointer"
                >
                  Become an Editor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
