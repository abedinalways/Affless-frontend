"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  handleSubmit?: (data: any) => void;
};

export default function RequestRevisionModal({ open, setOpen, handleSubmit }: Props) {
  const [note, setNote] = useState("");
  const { register, handleSubmit: formSubmit, reset, formState: { errors } } = useForm();
  const isDisabled = note.trim().length < 10 || note.trim().length > 2000;
  let noteError = "";
  if (note.trim().length > 0 && note.trim().length < 10) {
    noteError = "Your revision request must be at least 10 characters.";
  } else if (note.trim().length > 2000) {
    noteError = "Maximum character limit is 2000.";
  }

  const onSubmit = (data: any) => {
    if (isDisabled) {
      if (note.trim().length < 10) {
        toast.error("Your revision request must be at least 10 characters.");
      } else if (note.trim().length > 2000) {
        toast.error("Maximum character limit is 2000.");
      } else {
        toast.error("Please enter a note for the revision request.");
      }
      return;
    }
    if (handleSubmit) {
      handleSubmit(data);
    }
    setOpen(false);
    toast.success("Revision request submitted successfully!");
    reset();
    setNote("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
      <DialogContent className="sm:max-w-[760px] rounded-2xl p-0 overflow-hidden bg-white z-999">
        <form onSubmit={formSubmit(onSubmit)} className="p-8">
          <DialogTitle className="text-xl font-semibold mb-4">Request Your Revision — You Have 3 Revisions Left</DialogTitle>
          <textarea
            value={note}
            {...register("note", { required: true, minLength: 10, maxLength: 600 })}
            onChange={(event) => {
              if (event.target.value.length <= 2000) {
                setNote(event.target.value);
              }
            }}
            placeholder="Describe the changes you’d like (e.g., timing, text, cuts, effects)"
            className={`w-full min-h-[220px] rounded-lg border ${noteError ? "border-red-400" : "border-gray-200"} bg-[#F8F8F8] p-4 text-[15px] text-gray-700 outline-none focus:border-gray-300 resize-none`}
            maxLength={600}
            required
          />
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <span className={note.length >= 600 ? "text-red-500 text-xs font-normal" : note.length >= 500 ? "text-gray-900 text-xs" : "text-gray-500 text-xs"}>
                {note.length}/600
              </span>
              {note.length >= 500 && note.length < 600 && (
                <span className={`${note.length >= 500 ? "text-gray-900 text-xs" : "text-gray-500 text-xs"}`}></span>
              )}
              {note.length === 600 && (
                <span className="text-red-500 text-xs">Maximum character limit reached.</span>
              )}
            </div>
            {noteError && (
              <p className=" text-[13px] text-red-500">{noteError}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={`mt-6 w-full h-14 rounded-xl bg-[#FF4B4B] text-white font-semibold text-[16px] transition ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[#FF3333]"
              }`}>
            Request Revision
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
