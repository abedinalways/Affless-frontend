"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function SimpleChatModal({ open, setOpen }: Props) {
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");

  const disabled = !title.trim() || !details.trim();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[560px] rounded-2xl bg-white p-8">
        <div>
          <p className="text-[16px] font-medium mb-2">Title</p>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="subscription issues"
            className="w-full h-[52px] rounded-lg border border-red-400 bg-[#F3F3F3] px-4 outline-none"
          />
        </div>

        <div className="mt-6">
          <p className="text-[16px] font-medium mb-2">Details</p>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Write details..."
            className="w-full min-h-[140px] rounded-lg border border-red-400 bg-[#F3F3F3] p-4 outline-none resize-none"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            disabled={disabled}
            onClick={() => setOpen(false)}
            className={`h-[48px] min-w-[140px] rounded-lg text-white font-medium
              ${disabled ? "bg-red-400/60 cursor-not-allowed" : "bg-red-500 cursor-pointer"}`}
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
