"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import toast from "react-hot-toast";
import {useForm} from "react-hook-form";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  handleSubmit?: (data: any) => void;
};

export default function RequestRevisionModal({ open, setOpen, handleSubmit }: Props) {
  const [note, setNote] = useState("");
  const { register, handleSubmit: formSubmit, reset ,formState: { errors } } = useForm();
  const isDisabled = note.trim().length === 0;
  const noteError = note.trim().length > 0 && note.trim().length < 10
    ? "Note must be at least 10 characters."
    : "";

    const onSubmit = (data: any) => {
      if (isDisabled) {
        toast.error("Please enter a note for the revision request.");
        return;
      }
      if (note.trim().length < 10) {
        toast.error("Note must be at least 10 characters.");
        return;
      }
      if (handleSubmit) {
        handleSubmit(data);
      }
      setOpen(false);
      toast.success("Revision request submitted successfully!");
      reset();
      setNote("")
    };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[760px] rounded-2xl p-0 overflow-hidden bg-white">
        <form onSubmit={formSubmit(onSubmit)} className="p-8">
          <DialogTitle className="text-xl font-semibold mb-4">Request Your Revision — You Have 3 Revisions Left</DialogTitle>
          <textarea
            value={note}
            {...register("note", { required: true, minLength: 10 })}
            onChange={(event) => setNote(event.target.value)}
            placeholder="Briefly describe your experience (minimum of 10 characters)"
            className="w-full min-h-[220px] rounded-lg border border-gray-200 bg-[#F8F8F8] p-4 text-[15px] text-gray-700 outline-none focus:border-gray-300 resize-none"
          />
          {noteError && (
            <p className="mt-2 text-[13px] text-red-500">{noteError}</p>
          )}
          
          <button
            type="submit"
            disabled={isDisabled}
            className={`mt-6 w-full h-14 rounded-xl bg-[#FF4B4B] text-white font-semibold text-[16px] transition ${
              isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-[#FF3333]"
            }`}>
            Request Revision
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
