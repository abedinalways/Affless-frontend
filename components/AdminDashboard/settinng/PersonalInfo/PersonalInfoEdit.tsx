"use client";

import Image from "next/image";
import { useState } from "react";

export default function PersonalInformationEdit() {
    // Local component state (default demo values)
    const [name, setName] = useState<string>("Hedset");
    const [email, setEmail] = useState<string>("alkhahlaksalkgkgalk@gmail.com");
    const [phone, setPhone] = useState<string>("3000597212");

    // Save button click handler
    const handleSave = () => {
        const updatedData = { name, email, phone };
        console.log("Updated User Info:", updatedData);
    };

    // Cancel button click handler
    const handleCancel = () => {
        console.log("Edit cancelled");
    };

    return (
        <div>
          
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#FAF3E0] p-10 rounded-xl">
  <h1 className="text-[26px] font-semibold text-[#FF4D4F] mb-6">
                Personal Information 
            </h1>

                {/* LEFT SECTION */}
                <div className="border border-[#F5C6C6] rounded-xl p-6 bg-white flex flex-col items-center">
                    
                    <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#FF4D4F]">
                        <Image
                            src="/profile.jpg"
                            alt="profile"
                            width={200}
                            height={200}
                            className="object-cover"
                        />
                    </div>

                    <p className="mt-4 text-gray-500 text-sm">Profile</p>
                    <h2 className="text-lg font-semibold">Admin</h2>
                </div>

                {/* RIGHT SECTION */}
                <div className="md:col-span-2 space-y-6">

                  
                    {/* NAME FIELD */}
                    <div>
                        <label className="font-medium">Name</label>
                        <input
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setName(e.target.value)
                            }
                            className="w-full p-3 rounded-lg border border-[#FF4D4F] bg-white"
                        />
                    </div>

                    {/* EMAIL FIELD */}
                    <div>
                        <label className="font-medium">E-mail</label>
                        <input
                            value={email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                setEmail(e.target.value)
                            }
                            className="w-full p-3 rounded-lg border border-[#FF4D4F] bg-white"
                        />
                    </div>

                    {/* PHONE FIELD */}
                    <div>
                        <label className="font-medium">Phone Number</label>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-2 px-3 rounded-lg border border-[#FF4D4F] bg-white">
                                <Image src="/usa.png" width={30} height={20} alt="flag" />
                                <span>+1242</span>
                            </div>

                            <input
                                value={phone}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setPhone(e.target.value)
                                }
                                className="w-full p-3 rounded-lg border border-[#FF4D4F] bg-white"
                            />
                        </div>
                    </div>
                      {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-[#FF4D4F] text-white px-6 py-2 rounded-full"
                        >
                            Save Changes
                        </button>
                    </div>


                </div>
            </div>
        </div>
    );
}
