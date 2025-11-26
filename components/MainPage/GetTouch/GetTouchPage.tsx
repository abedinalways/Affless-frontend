"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { MapPin, Phone, Mail, User, ChevronDown } from "lucide-react";
import PageBanner from "@/components/reusable/Bgbanner";

type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export default function GetTouchPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>();

  const onSubmit: SubmitHandler<ContactFormValues> = (data) => {
    console.log("Form Submitted:", data);
  };

  return (
    <div>
      <div>
        <PageBanner
          title="Contact us
        "
          bgImage="/findEditor.jpg"
          links={[{ label: "Home", href: "/" }, { label: "Contact us" }]}
        />
      </div>
    <div className="containers">
        <div className="mx-auto -mt-[44px] bg-[#F7F7F7] rounded-3xl p-10 lg:p-16 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-[#333] font-poppins text-[56px] font-medium leading-[120%]">
              Get in touch
            </h2>

            <p className="text-[#4A4C56] font-poppins text-[24px] leading-[150%] mt-4">
              Expert support, fast responses, and personalized guidance for all
              your editing needs.
            </p>

            <div className="mt-10 space-y-10">
              {/* Address */}
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <MapPin className="text-white" />
                </div>

                <div>
                  <h4 className="font-poppins text-[20px] font-medium text-[#333]">
                    Address
                  </h4>
                  <p className="text-[#4A4C56] leading-[150%]">
                    Jalan Cempaka Wangi No 22 <br />
                    Jakarta • Indonesia
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Phone className="text-white" />
                </div>

                <div>
                  <h4 className="font-poppins text-[20px] font-medium text-[#333]">
                    Call us
                  </h4>
                  <p className="text-[#4A4C56] leading-[150%]">
                    Phone : •6221.2002.2012 <br />
                    Fax : +6221.2002.2013
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-5">
                <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                  <Mail className="text-white" />
                </div>

                <div>
                  <h4 className="font-poppins text-[20px] font-medium text-[#333]">
                    E-mail us
                  </h4>
                  <p className="text-[#4A4C56] leading-[150%]">
                    support@yourdomain.tld <br />
                    hello@yourdomain.tld
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block mb-1 text-[#333] font-poppins font-medium">
                First name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  {...register("name", { required: "Enter your name" })}
                  placeholder="Enter name"
                  className="w-full pl-12 p-3 rounded-xl border border-gray-300 focus:outline-red-500"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 text-[#333] font-poppins font-medium">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="email"
                  {...register("email", { required: "Enter a valid email" })}
                  placeholder="Enter email"
                  className="w-full pl-12 p-3 rounded-xl border border-gray-300 focus:outline-red-500"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 text-[#333] font-poppins font-medium">
                Your Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  {...register("phone", { required: "Enter phone number" })}
                  placeholder="Phone number"
                  className="w-full pl-12 p-3 rounded-xl border border-gray-300 focus:outline-red-500"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
            </div>

            {/* Service */}
            <div>
              <label className="block mb-1 text-[#333] font-poppins font-medium">
                Your Service
              </label>
              <div className="relative">
                <select
                  {...register("service", { required: "Select a service" })}
                  className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:outline-red-500"
                >
                  <option value="">Select Service</option>
                  <option value="editing">Video Editing</option>
                  <option value="thumbnail">Thumbnail Design</option>
                  <option value="podcast">Podcast Editing</option>
                </select>

                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
              </div>
              {errors.service && (
                <p className="text-red-500 text-sm">{errors.service.message}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block mb-1 text-[#333] font-poppins font-medium">
                Your Message
              </label>
              <textarea
                {...register("message", { required: "Write your message" })}
                placeholder="Write here..."
                className="w-full p-3 h-32 rounded-xl border border-gray-300 focus:outline-red-500"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white p-3 rounded-xl font-medium text-lg hover:bg-red-600 transition"
            >
              Submit Now
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}
