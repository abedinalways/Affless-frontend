"use client";

import React, { useState } from "react";
import Modal from "@/components/reusable/ProfileEditModal";

export default function AddSkillsModal({
  open,
  onClose,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  onSave: (skills: string[]) => void; // ✅ NEW
}) {
  const [input, setInput] = useState("");

  const save = () => {
    const newSkills = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    onSave(newSkills);
    setInput("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Skills and Expertise">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold mb-2">Add Skills</p>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Adobe Premiere Pro:..."
            className="w-full border rounded-lg p-3 outline-none"
          />
          <p className="text-xs text-gray-500 mt-2">
            Separate skills using comma ( , )
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
