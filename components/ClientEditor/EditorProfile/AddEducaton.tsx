"use client";

import React, { useState } from "react";
import Modal from "@/components/reusable/ProfileEditModal";

export default function AddEducationModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [school, setSchool] = useState("");
  const [subject, setSubject] = useState("");
  const [year, setYear] = useState("");

  const save = () => {
    console.log({ school, subject, year });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Education">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold mb-2">Course name</p>
          <input
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="B.Sc"
            className="w-full border rounded-lg p-3 outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Subject</p>
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="CSE"
            className="w-full border rounded-lg p-3 outline-none"
          />
        </div>

        <div>
          <p className="text-sm font-semibold mb-2">Passing Year</p>
          <input
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="2020"
            className="w-full border rounded-lg p-3 outline-none"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={()=>{
              onClose();
              setSchool("");
              setSubject("");
              setYear("");
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
