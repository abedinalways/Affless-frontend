// "use client";

// import Image from "next/image";
// import { MdStar } from "react-icons/md";
// import { FiPlus, FiExternalLink } from "react-icons/fi";
// import { HiOutlineLocationMarker } from "react-icons/hi";
// import { BiWorld } from "react-icons/bi";

// function Section({
//   title,
//   desc,
//   btnText,
//   onClick,
//   rightIcon,
// }: {
//   title: string;
//   desc: string;
//   btnText: string;
//   onClick?: () => void;
//   rightIcon?: React.ReactNode;
// }) {
//   return (
//     <div className="w-full rounded-2xl border border-white/10  p-6">
//       <div className="flex items-center justify-between gap-6">
//         <div className="flex-1">
//           <h3 className="text-[20px] font-semibold text-white/90">{title}</h3>
//           <p className="mt-2 text-[14px] leading-relaxed text-white/50">{desc}</p>

//           <button
//             type="button"
//             onClick={onClick}
//             className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[14px] font-medium text-white/70 hover:bg-white/10 transition cursor-pointer"
//           >
//             <FiExternalLink className="text-[16px]" />
//             {btnText}
//           </button>
//         </div>

//         {rightIcon && (
//           <div className="h-[64px] w-[64px] rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
//             {rightIcon}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function EditorProfile() {
//   return (
//     <div className="min-h-screen">
//       <div className="containers py-10 space-y-6">
//         {/* TOP CARD */}
//         <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-6">
//           <div className="flex items-start gap-6">
//             <div className="h-[110px] w-[110px] rounded-full overflow-hidden border border-white/10">
//               <Image
//                 src="/images/avatar1.jpg" // change
//                 alt="profile"
//                 width={110}
//                 height={110}
//                 className="h-full w-full object-cover"
//               />
//             </div>

//             <div className="flex-1">
//               <p className="text-[20px] font-semibold ">Zeeshan</p>

//               <div className="mt-1 flex items-center gap-2 text-white/50 text-[14px]">
//                 <MdStar className="text-yellow-500" />
//                 <span className="text-white/70 font-medium">4.9</span>
//                 <span>(538 reviews)</span>
//               </div>

//               <p className="mt-2 text-[14px] text-white/45">
//                 Transforming your vision into reality!
//               </p>

//               <div className="mt-3 flex flex-wrap items-center gap-4 text-[13px] text-white/45">
//                 <span className="inline-flex items-center gap-2">
//                   <HiOutlineLocationMarker />
//                   Pakistan
//                 </span>

//                 <span className="inline-flex items-center gap-2">
//                   <BiWorld />
//                   English, German, Spanish, French
//                 </span>
//               </div>

//               <button
//                 type="button"
//                 className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[14px] font-medium text-white/70 hover:bg-white/10 transition cursor-pointer"
//               >
//                 <FiPlus />
//                 Edit
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ABOUT ME */}
//         <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-6">
//           <h3 className="text-[20px] font-semibold text-white/90">About Me</h3>

//           <p className="mt-3 text-[14px] leading-relaxed text-white/50">
//             We are PixelStudio, A full-service design and developing web agency.
//             From designing logos to developing websites to satisfying our
//             customer&apos;s every digital need is what we thrive for. We&apos;ve
//             worked not only with brilliant individuals but also with top
//             companies all around the world. Our mission is to become an
//             indispensable partner to our clients by offering the best ideas,
//             skills and services they could possibly get.
//           </p>

//           <button
//             type="button"
//             className="mt-6 inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-[14px] font-medium text-white/70 hover:bg-white/10 transition cursor-pointer"
//           >
//             <FiPlus />
//             Edit details
//           </button>
//         </div>

//         {/* OTHER SECTIONS */}
//         <Section
//           title="Portfolio of past projects"
//           desc="Attract and impress potential clients by displaying your best work."
//           btnText="Start portfolio"
//           rightIcon={<span className="text-white/60">🧩</span>}
//         />

//         <Section
//           title="Education"
//           desc="Back up your skills by adding any educational degrees or programs."
//           btnText="Add education"
//         />

//         <Section
//           title="Skills and expertise"
//           desc="Let your buyers know your skills. Skills gained through your previous jobs, hobbies or even everyday life."
//           btnText="Add Skills and expertise"
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FiPlus, FiEdit2, FiExternalLink, FiX } from "react-icons/fi";
import { MdStar } from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiWorld } from "react-icons/bi";

type ProfileState = {
  name: string;
  rating: number;
  reviews: number;
  tagline: string;
  country: string;
  languages: string;
  avatar: string; // image path
};

function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-[95%] max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-xl text-gray-500 cursor-pointer"
        >
          <FiX />
        </button>

        {title && <h2 className="text-xl font-semibold text-[#222]">{title}</h2>}

        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  desc,
  btnText,
  onClick,
  rightIcon,
}: {
  title: string;
  desc: string;
  btnText: string;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-[18px] font-semibold text-[#222]">{title}</h3>
          <p className="mt-2 text-[14px] leading-relaxed text-gray-600">{desc}</p>

          <button
            type="button"
            onClick={onClick}
            className="mt-5 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <FiExternalLink className="text-[15px]" />
            {btnText}
          </button>
        </div>

        {rightIcon && (
          <div className="h-[56px] w-[56px] rounded-xl bg-[#EEF2FF] border border-[#E6EAFD] flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileState>({
    name: "Zeeshan",
    rating: 4.9,
    reviews: 538,
    tagline: "Transforming your vision into reality!",
    country: "Pakistan",
    languages: "English, German, Spanish, French",
    avatar: "/images/avatar1.jpg", // change
  });

  const [about, setAbout] = useState(
    `We are PixelStudio, A full-service design and developing web agency. From designing logos to developing websites to satisfying our customer's every digital need is what we thrive for. We've worked not only with brilliant individuals but also with top companies all around the world. Our mission is to become an indispensable partner to our clients by offering the best ideas, skills and services they could possibly get.`
  );

  // modals
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditAbout, setOpenEditAbout] = useState(false);

  // temp form states (simple)
  const [temp, setTemp] = useState(profile);
  const [tempAbout, setTempAbout] = useState(about);

  // avatar preview (optional)
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const avatarPreview = useMemo(() => {
    if (!avatarFile) return "";
    return URL.createObjectURL(avatarFile);
  }, [avatarFile]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const openProfileModal = () => {
    setTemp(profile);
    setAvatarFile(null);
    setOpenEditProfile(true);
  };

  const openAboutModal = () => {
    setTempAbout(about);
    setOpenEditAbout(true);
  };

  const saveProfile = () => {
    // NOTE: Demo: avatar file upload backend না আছে,
    // তাই শুধু preview url ব্যবহার করছি
    const nextAvatar = avatarPreview ? avatarPreview : temp.avatar;

    setProfile({
      ...temp,
      avatar: nextAvatar,
    });

    setOpenEditProfile(false);
  };

  const saveAbout = () => {
    setAbout(tempAbout);
    setOpenEditAbout(false);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="containers py-10 space-y-6">
        {/* TOP CARD */}
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-start gap-6">
            <div className="h-[70px] w-[70px] rounded-full overflow-hidden border border-gray-200">
              <Image
                src={profile.avatar}
                alt="profile"
                width={70}
                height={70}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex-1">
              <p className="text-[18px] font-semibold text-[#222]">{profile.name}</p>

              <div className="mt-1 flex items-center gap-2 text-gray-600 text-[13px]">
                <MdStar className="text-yellow-500" />
                <span className="font-semibold text-[#222]">{profile.rating}</span>
                <span>({profile.reviews} reviews)</span>
              </div>

              <p className="mt-2 text-[13px] text-gray-600">{profile.tagline}</p>

              <div className="mt-2 flex flex-wrap items-center gap-4 text-[12px] text-gray-600">
                <span className="inline-flex items-center gap-2">
                  <HiOutlineLocationMarker />
                  {profile.country}
                </span>

                <span className="inline-flex items-center gap-2">
                  <BiWorld />
                  {profile.languages}
                </span>
              </div>

              <button
                type="button"
                onClick={openProfileModal}
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
              >
                <FiPlus />
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* ABOUT */}
        <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
          <h3 className="text-[18px] font-semibold text-[#222]">About Me</h3>

          <p className="mt-3 text-[14px] leading-relaxed text-gray-600 whitespace-pre-line">
            {about}
          </p>

          <button
            type="button"
            onClick={openAboutModal}
            className="mt-5 inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
          >
            <FiEdit2 />
            Edit details
          </button>
        </div>

        {/* OTHER SECTIONS */}
        <SectionCard
          title="Portfolio of past projects"
          desc="Attract and impress potential clients by displaying your best work."
          btnText="Start portfolio"
          rightIcon={<span className="text-[18px]">🧩</span>}
          onClick={() => alert("Start portfolio clicked")}
        />

        <SectionCard
          title="Education"
          desc="Back up your skills by adding any educational degrees or programs."
          btnText="Add education"
          onClick={() => alert("Add education clicked")}
        />

        <SectionCard
          title="Skills and expertise"
          desc="Let your buyers know your skills. Skills gained through your previous jobs, hobbies or even everyday life."
          btnText="Add Skills and expertise"
          onClick={() => alert("Add skills clicked")}
        />
      </div>

      {/* ====== EDIT PROFILE MODAL ====== */}
      <Modal
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
        title="Edit Profile"
      >
        <div className="space-y-4">
          {/* Avatar */}
          <div>
            <p className="text-sm font-semibold mb-2">Profile Photo</p>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full overflow-hidden border">
                <Image
                  src={avatarPreview || temp.avatar}
                  alt="avatar"
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              (Demo: backend না থাকলে refresh দিলে preview reset হবে)
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Name</p>
            <input
              value={temp.name}
              onChange={(e) => setTemp((p) => ({ ...p, name: e.target.value }))}
              className="w-full border rounded-lg p-3 outline-none"
              placeholder="Type name..."
            />
          </div>

          <div>
            <p className="text-sm font-semibold mb-2">Tagline</p>
            <input
              value={temp.tagline}
              onChange={(e) => setTemp((p) => ({ ...p, tagline: e.target.value }))}
              className="w-full border rounded-lg p-3 outline-none"
              placeholder="Type tagline..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold mb-2">Country</p>
              <input
                value={temp.country}
                onChange={(e) => setTemp((p) => ({ ...p, country: e.target.value }))}
                className="w-full border rounded-lg p-3 outline-none"
                placeholder="Country..."
              />
            </div>

            <div>
              <p className="text-sm font-semibold mb-2">Languages</p>
              <input
                value={temp.languages}
                onChange={(e) =>
                  setTemp((p) => ({ ...p, languages: e.target.value }))
                }
                className="w-full border rounded-lg p-3 outline-none"
                placeholder="English, Bangla..."
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => setOpenEditProfile(false)}
              className="w-full rounded-lg border border-gray-200 py-3 font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveProfile}
              className="w-full rounded-lg bg-[#ED4C4C] py-3 font-semibold text-white hover:bg-[#d43f3f] cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>

      {/* ====== EDIT ABOUT MODAL ====== */}
      <Modal
        open={openEditAbout}
        onClose={() => setOpenEditAbout(false)}
        title="Edit About Me"
      >
        <div className="space-y-4">
          <textarea
            value={tempAbout}
            onChange={(e) => setTempAbout(e.target.value)}
            className="w-full min-h-[180px] border rounded-lg p-4 outline-none"
            placeholder="Write about you..."
          />

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setOpenEditAbout(false)}
              className="w-full rounded-lg border border-gray-200 py-3 font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveAbout}
              className="w-full rounded-lg bg-[#ED4C4C] py-3 font-semibold text-white hover:bg-[#d43f3f] cursor-pointer"
            >
              Save
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
