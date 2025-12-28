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

        <SectionCard
          title="Portfolio of past projects"
          desc="Attract and impress potential clients by displaying your best work."
          btnText="Start portfolio"
          onClick={() => setOpenPortfolio(true)}
        />

        <SectionCard
          title="Education"
          desc="Back up your skills by adding any educational degrees or programs."
          btnText="Add education"
          onClick={() => setOpenEducation(true)}
        />

        <SectionCard
          title="Skills and expertise"
          desc="Let your buyers know your skills..."
          btnText="Add Skills and expertise"
          onClick={() => setOpenSkills(true)}
        />
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

      <AddSkillsModal open={openSkills} onClose={() => setOpenSkills(false)} />
    </div>
  );
}
