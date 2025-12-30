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
        <div className="mx-auto -mt-11  bg-[#F7F7F7] rounded-3xl shadow-md mb-20 p-10">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-14 pt-8">
            {/* LEFT SIDE */}
            <div>
              <div className="block md:hidden">
                <div className="font-medium text-[#333] leading-130% text-[32px] mb-3.5 text-center">Contact Us</div>
                <p className="font-normal leading-130% text-[16px] text-center">Your security is our priority</p>
              </div>
              <div className="  p-10 lg:p-16 ">
                <h2 className="text-[#333] font-poppins text-[24px] lg:text-[56px] font-medium leading-[120%] whitespace-nowrap">
                  Get in touch
                </h2>
                <p className="text-[#4A4C56] font-poppins textsm lg:text-[24px] leading-[150%] mt-4">
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

                  {/* <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" /> */}
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
                className="w-full bg-red-500 text-white p-3 rounded-xl font-medium text-lg hover:bg-red-600 transition cursor-pointer"
              >
                Submit Now
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24156.96372407761!2d-74.0111778!3d40.7127281!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a316c6c2bfd%3A0x6f978504e1479a6a!2sNew%20York%20City%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-xl shadow-lg w-full"
        ></iframe>
      </div>

    </div>
  );
}
