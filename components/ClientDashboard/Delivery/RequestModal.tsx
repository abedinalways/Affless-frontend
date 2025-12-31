"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

export default function RequestRevisionModal({ open, setOpen }: Props) {
  const [note, setNote] = useState("");

  const isDisabled = note.trim().length === 0;

  const handleSubmit = () => {
   

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[760px] rounded-2xl p-0 overflow-hidden bg-white">
        <div className="p-8">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Note..."
            className="w-full min-h-[220px] rounded-lg border border-gray-200 bg-[#F8F8F8] p-4 text-[15px] text-gray-700 outline-none focus:border-gray-300 resize-none"
          />

   <button
  type="button"
  disabled
  onClick={handleSubmit}
  className="
    mt-6 w-full h-[56px] rounded-xl
    bg-[#FF4B4B] text-white font-semibold text-[16px]
     pointer-events-none cursor-pointer
  "
>
  Request Revision
</button>

        </div>
      </DialogContent>
    </Dialog>
  );
}
