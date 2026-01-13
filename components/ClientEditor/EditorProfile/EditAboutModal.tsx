"use client";

import Modal from "@/components/reusable/ProfileEditModal";
import React, { useEffect, useState } from "react";

export default function EditAboutModal({
  open,
  onClose,
  value,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  value: string;
  onSave: (next: string) => void;
}) {
  const [temp, setTemp] = useState(value);

  useEffect(() => setTemp(value), [value]);

  const save = () => {
    onSave(temp);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Edit About Me">
      <div className="space-y-4">
        <textarea
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className="w-full min-h-[180px] border rounded-lg p-4 outline-none resize-none"
          placeholder="Write about you..."
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={()=>{
              onClose();
              setTemp(value);
            }}
            className="w-full rounded-lg border border-gray-200 py-3 font-semibold text-gray-700 hover:bg-gray-50 cursor-pointer "
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
