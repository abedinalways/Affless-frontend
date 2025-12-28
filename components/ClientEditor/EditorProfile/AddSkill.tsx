"use client";

import React, { useState } from "react";
import Modal from "@/components/reusable/ProfileEditModal";

export default function AddSkillsModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [skills, setSkills] = useState("");

  const save = () => {
    console.log("Skills:", skills);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Skills and Expertise">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold mb-2">Add Skills</p>
          <input
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="Example: React, Next.js, Photoshop..."
            className="w-full border rounded-lg p-3 outline-none"
          />
          <p className="text-xs text-gray-500 mt-1">
         
          </p>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-gray-100 py-3 font-semibold text-gray-700 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={save}
            className="w-full rounded-lg bg-[#ED4C4C] py-3 font-semibold text-white cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
