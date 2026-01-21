"use client";

import React, { useState } from "react";
import Modal from "@/components/reusable/ProfileEditModal";

export default function AddPortfolioModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");

  const save = () => {
    console.log({ title, type, desc });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add New Portfolio">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold mb-2">Project Title</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Project Title..."
            className="w-full border rounded-lg p-3 outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Project Type</p>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Logo / Thumbnail / Podcast..."
            className="w-full border rounded-lg p-3 outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Description</p>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description..."
            className="w-full border rounded-lg p-3 min-h-[150px] outline-none resize-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={()=>{
              onClose();
              setTitle("");
              setType("");
              setDesc("");
            }}
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
