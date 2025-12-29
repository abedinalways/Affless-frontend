"use client";

import React, { useState } from "react";
import ProfileHeaderCard, { ProfileState } from "./ProfileHeader";
import SectionCard from "./SectionCard";
import AboutCard from "./AboutCard";

import EditProfileModal from "./EditProfileModal";
import EditAboutModal from "./EditAboutModal";

import AddPortfolioModal from "./AddPortfolioModal";
import AddEducationModal from "./AddEducaton";
import AddSkillsModal from "./AddSkill";

import Image from "next/image";
import PortfolioSection from "./PortfolioSection";

export default function ProfilePage() {
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
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openEditAbout, setOpenEditAbout] = useState(false);

  const [openPortfolio, setOpenPortfolio] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openSkills, setOpenSkills] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F7F7]">
      <div className="containers py-10 space-y-6">
        <ProfileHeaderCard
          profile={profile}
          onEdit={() => setOpenEditProfile(true)}
        />

        <AboutCard about={about} onEdit={() => setOpenEditAbout(true)} />

        {/* ✅ Portfolio */}
      <PortfolioSection />

        {/* ✅ Education */}
        <SectionCard
          desc="Other - CSE"
          title="Education"
          institute="Dhaka Polytechnic Institute"
          country="Bangladesh, 2023"
          btnText="Add education"
          onClick={() => setOpenEducation(true)}
        />

        {/* ✅ Skills */}
        <SectionCard
          title="Skills and expertise"
          btnText="Add Skills and expertise"
          onClick={() => setOpenSkills(true)}
          buttonAlign="default"
        >
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ✅ Modals */}
      <EditProfileModal
        open={openEditProfile}
        onClose={() => setOpenEditProfile(false)}
        value={profile}
        onSave={(next) => setProfile(next)}
      />

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
    </div>
  );
}
