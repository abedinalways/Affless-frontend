"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  handleSubmit?: () => void;
};

export default function RequestRevisionModal({ open, setOpen, handleSubmit }: Props) {
  const [note, setNote] = useState("");

  const isDisabled = note.trim().length === 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[760px] rounded-2xl p-0 overflow-hidden bg-white">
        <div className="p-8">
          <DialogTitle className="text-xl font-semibold mb-4">Request Revision</DialogTitle>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note..."
            className="w-full min-h-[220px] rounded-lg border border-gray-200 bg-[#F8F8F8] p-4 text-[15px] text-gray-700 outline-none focus:border-gray-300 resize-none"
          />
          <button
            type="button"
            disabled={isDisabled}
            onClick={handleSubmit}
            className={`mt-6 w-full h-14 rounded-xl bg-[#FF4B4B] text-white font-semibold text-[16px] transition ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[#FF3333]"
            }`}>
            Request Revision
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
