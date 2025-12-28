"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Modal from "@/components/reusable/ProfileEditModal";
import { ProfileState } from "./ProfileHeader";

export default function EditProfileModal({
  open,
  onClose,
  value,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  value: ProfileState;
  onSave: (next: ProfileState) => void;
}) {
  const [temp, setTemp] = useState<ProfileState>(value);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => setTemp(value), [value]);

  const avatarPreview = useMemo(() => {
    if (!avatarFile) return "";
    return URL.createObjectURL(avatarFile);
  }, [avatarFile]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const save = () => {
    onSave({ ...temp, avatar: avatarPreview || temp.avatar });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit Profile">
      <div className="space-y-4">
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
        </div>

        <Field
          label="Name"
          value={temp.name}
          onChange={(v) => setTemp((p) => ({ ...p, name: v }))}
        />

        <Field
          label="Tagline"
          value={temp.tagline}
          onChange={(v) => setTemp((p) => ({ ...p, tagline: v }))}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field
            label="Country"
            value={temp.country}
            onChange={(v) => setTemp((p) => ({ ...p, country: v }))}
          />
          <Field
            label="Languages"
            value={temp.languages}
            onChange={(v) => setTemp((p) => ({ ...p, languages: v }))}
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg border border-gray-200 py-3 font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            className="w-full rounded-lg bg-[#ED4C4C] py-3 font-semibold text-white hover:bg-[#d43f3f] cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-sm font-semibold mb-2">{label}</p>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border rounded-lg p-3 outline-none"
        placeholder={`Type ${label.toLowerCase()}...`}
      />
    </div>
  );
}
