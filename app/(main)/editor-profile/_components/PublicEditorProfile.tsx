"use client";

import React, { useState } from "react";
import ProfileHeaderCard, {ProfileState} from "@/components/ClientEditor/EditorProfile/ProfileHeader";
import SectionCard from "@/components/ClientEditor/EditorProfile/SectionCard";
import AboutCard from "@/components/ClientEditor/EditorProfile/AboutCard";

import EditProfileModal from "@/components/ClientEditor/EditorProfile/EditProfileModal";
import EditAboutModal from "@/components/ClientEditor/EditorProfile/EditAboutModal";

import AddPortfolioModal from "@/components/ClientEditor/EditorProfile/AddPortfolioModal";
import AddEducationModal from "@/components/ClientEditor/EditorProfile/AddEducaton";
import AddSkillsModal from "@/components/ClientEditor/EditorProfile/AddSkill";

import Image from "next/image";
import PortfolioSection from "@/components/ClientEditor/EditorProfile/PortfolioSection";
import ReviewBreakdown from "@/components/reusable/reviews";
import ReviewProfile from "@/components/ClientEditor/EditorProfile/ReviewProfile";
import Link from "next/link";

export default function PublicEditorProfile() {
  const reviewData = [
    { stars: 5, count: 638 },
    { stars: 4, count: 243 },
    { stars: 3, count: 121 },
    { stars: 2, count: 43 },
    { stars: 1, count: 12 },
  ];

  const clientsWorkedWith = [
    { id: 1, name: "Sarah Johnson", avatar: "/images/sarah.png" },
    { id: 2, name: "Tech Startup Inc", avatar: "/images/saramc.png" },
    { id: 3, name: "Creative Agency", avatar: "/images/sarah.png" },
    { id: 4, name: "Marketing Pro", avatar: "/images/saramc.png" },
    { id: 5, name: "Digital Studios", avatar: "/images/sarah.png" },
    { id: 6, name: "Brand Solutions", avatar: "/images/saramc.png" },
  ];

  const [profile, setProfile] = useState<ProfileState>({
    name: "Zeeshan",
    rating: 4.9,
    reviews: 538,
    tagline: "Transforming your vision into reality!",
    country: "Pakistan",
    languages: "English, German, Spanish, French",
    avatar: "/images/sarah.png",
  });

  const [about, setAbout] = useState(
    `We are PixelStudio, A full-service design and developing web agency...`
  );

  // ✅ Skills state
  const [skills, setSkills] = useState<string[]>([
    "Adobe Premiere Pro",
    "Adobe After Effects",
    "Avid Media Composer",
  ]);

  // ✅ Modal States
//   const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditAbout, setOpenEditAbout] = useState(false);

  const [openPortfolio, setOpenPortfolio] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);

  return (
    <div className="min-h-screen containers  bg-[#F7F7F7]">
      <div className="py-10 space-y-6">
        <ProfileHeaderCard
          profile={profile}
        />

        <AboutCard about={about} title="About"/>

        {/* ✅ Clients Worked With */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-[22px] font-semibold text-[#333] mb-6">Clients ({clientsWorkedWith.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {clientsWorkedWith.map((client) => (
              <div key={client.id} className="flex flex-col items-center gap-3 text-center">
                <Link href={`/client-profile/${client.id}`} className="w-20 h-20 overflow-hidden rounded-full">
                  <Image
                    src={client.avatar}
                    alt={client.name}
                    width={500}
                    height={500}
                    className="w-full h-full rounded-full object-cover border-2 border-gray-200 transition cursor-pointer hover:scale-110 duration-300"
                  />
                </Link>
                <p className="text-sm font-medium text-[#333] line-clamp-2">{client.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Portfolio */}
        <PortfolioSection showAddBtn={false} />

        {/* ✅ Education */}
        <SectionCard
          desc="Other - CSE"
          title="Education"
          institute="Dhaka Polytechnic Institute"
          country="Bangladesh, 2023"
          btnText=""
        />

        {/* ✅ Skills */}
        <SectionCard
          title="Skills and expertise"
          btnText=""
          buttonAlign="default"
        >
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>

      <EditAboutModal
        open={openEditAbout}
        onClose={() => setOpenEditAbout(false)}
        value={about}
        onSave={(next) => setAbout(next)}
      />

      <AddPortfolioModal
        open={openPortfolio}
        onClose={() => setOpenPortfolio(false)}
      />

      <AddEducationModal
        open={openEducation}
        onClose={() => setOpenEducation(false)}
      />

      {/* ✅ Skills Modal - Now saves into state */}
      <AddSkillsModal
        open={openSkills}
        onClose={() => setOpenSkills(false)}
        onSave={(newSkills) =>
          setSkills((prev) => [...new Set([...prev, ...newSkills])])
        }
      />
      <div className="py-10">
        <ReviewBreakdown reviewe={reviewData} title="Reviews" />
      </div>
      <div className="">
        <ReviewProfile />
      </div>

    </div>
  );
}
