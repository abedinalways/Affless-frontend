/** @format */

"use client";

import { useEffect, useRef, useState } from "react";
import { Minus, Square, X, MoreVertical, Paperclip, Send } from "lucide-react";

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  className?: string;
};

type Msg = {
  id: string;
  from: "bot" | "me";
  text: string;
  time?: string;
};

export default function LiveChatModal({
  open,
  setOpen,
  className = "",
}: Props) {
  const [messages, setMessages] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [minimized, setMinimized] = useState(false);

  // ✅ pending file state
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (!open) return;

    setMessages([
      { id: "m1", from: "bot", text: "Hello 👋" },
      { id: "m2", from: "bot", text: "How can I help you today?" },
    ]);

    setText("");
    setMinimized(false);
    setPendingFile(null);
    setPreviewUrl("");
  }, [open]);

  useEffect(() => {
    if (!pendingFile) return;

    // ✅ image preview url generate
    if (pendingFile.type.startsWith("image/")) {
      const url = URL.createObjectURL(pendingFile);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl("");
    }
  }, [pendingFile]);

  const disabled = text.trim().length === 0;

  const sendMessage = () => {
    if (!disabled) {
      const myMsg: Msg = {
        id: crypto.randomUUID(),
        from: "me",
        text: text.trim(),
      };

      setMessages((p) => [...p, myMsg]);
      setText("");

      setTimeout(() => {
        setMessages((p) => [
          ...p,
          {
            id: crypto.randomUUID(),
            from: "bot",
            text: "Got it ✅ Please share more details if needed.",
          },
        ]);
      }, 500);
    }

    // ✅ send file also (if exists)
    if (pendingFile) {
      setMessages((p) => [
        ...p,
        { id: crypto.randomUUID(), from: "me", text: `📎 ${pendingFile.name}` },
      ]);
      setPendingFile(null);
      setPreviewUrl("");
    }
  };

  const onPickFile = () => fileRef.current?.click();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setPendingFile(f);
    e.target.value = "";
  };

  const removeFile = () => {
    setPendingFile(null);
    setPreviewUrl("");
  };

  const handleClose = () => {
    setOpen(false);
    setMinimized(false);
    setPendingFile(null);
    setPreviewUrl("");
  };

  if (!open) return null;

  return (
    <div className=''>
      <div
        className={[
          "fixed bottom-6 right-1 lg:right-6 w-[420px]   rounded-2xl bg-white shadow-2xl overflow-hidden z-[9999]",
          className,
        ].join(" ")}>
        {/* Header */}
        <div className='relative px-4 py-4 text-white bg-gradient-to-r  from-[#e7462a] to-[#e92727]'>
          <div className='flex items-start justify-between'>
            <div className='flex items-center gap-3'>
              <div className='h-10 w-10 rounded-full bg-white/95 grid place-items-center'>
                <span className='text-[#0E5BFF] font-bold text-sm'>LOGO</span>
              </div>

              <div className='leading-tight'>
                <div className='text-[15px] font-semibold'>Hi there! 👋</div>
                <div className='mt-1 flex items-center gap-2 text-[12px] text-white/90'>
                  <span className='h-2 w-2 rounded-full bg-[#31D27C]' />
                  <span>We&apos;re online</span>
                </div>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              {/* Minimize */}
              <button
                type='button'
                onClick={() => setMinimized((v) => !v)}
                className='h-9 w-9 rounded-lg grid place-items-center hover:bg-white/10 cursor-pointer'
                aria-label={minimized ? "Expand" : "Minimize"}
                title={minimized ? "Expand" : "Minimize"}>
                {minimized ? (
                  <Square className='h-5 w-5' />
                ) : (
                  <Minus className='h-5 w-5' />
                )}
              </button>

              {/* Options */}
              <button
                type='button'
                className='h-9 w-9 rounded-lg grid place-items-center hover:bg-white/10 cursor-pointer'>
                <MoreVertical className='h-5 w-5' />
              </button>

              {/* Close */}
              <button
                type='button'
                onClick={handleClose}
                className='h-9 w-9 rounded-lg grid place-items-center hover:bg-white/10 cursor-pointer'
                aria-label='Close'
                title='Close'>
                <X className='h-5 w-5' />
              </button>
            </div>
          </div>
        </div>

        {!minimized && (
          <>
            {/* Messages */}
            <div className='h-[360px] bg-white px-3 py-4 overflow-y-auto'>
              <div className='space-y-3'>
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${
                      m.from === "me" ? "justify-end" : "justify-start"
                    }`}>
                    <div
                      className={`max-w-[78%] rounded-2xl px-4 py-2 text-[14px] leading-5
                      ${
                        m.from === "me"
                          ? "bg-[#0E5BFF] text-white rounded-br-md"
                          : "bg-[#F1F3F6] text-[#111827] rounded-bl-md"
                      }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ✅ File Preview (ONLY X ICON + Click preview) */}
            {pendingFile && (
              <div className='border-t border-[#E8E9E9] px-3 py-3 bg-white'>
                <div className='flex items-center justify-between gap-3'>
                  {previewUrl ? (
                    <a
                      href={previewUrl}
                      target='_blank'
                      rel='noreferrer'
                      className='flex items-center gap-3 cursor-pointer'
                      title='Click to preview'>
                      <img
                        src={previewUrl}
                        alt='preview'
                        className='h-12 w-12 rounded-lg object-cover border border-[#E8E9E9]'
                      />
                      <p className='text-[13px] text-[#111827] truncate max-w-[260px]'>
                        {pendingFile.name}
                      </p>
                    </a>
                  ) : (
                    <p className='text-[13px] text-[#111827] truncate max-w-[320px]'>
                      📎 {pendingFile.name}
                    </p>
                  )}

                  <button
                    type='button'
                    onClick={removeFile}
                    className='h-8 w-8 rounded-lg grid place-items-center hover:bg-gray-100 cursor-pointer'
                    title='Remove file'>
                    <X className='h-4 w-4 text-gray-600' />
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className='border-t border-[#E8E9E9] px-3 py-3'>
              <div className='flex items-center gap-2'>
                <input
                  ref={fileRef}
                  type='file'
                  className='hidden'
                  onChange={onFileChange}
                />

                <button
                  type='button'
                  onClick={onPickFile}
                  className='h-10 w-10 rounded-xl border border-[#E8E9E9] grid place-items-center hover:bg-gray-50 cursor-pointer'>
                  <Paperclip className='h-5 w-5 text-[#4A4C56]' />
                </button>

                <div className='flex-1'>
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") sendMessage();
                    }}
                    placeholder='Enter your message...'
                    className='w-full h-10 rounded-xl border border-[#E8E9E9] px-3 text-[14px] outline-none focus:border-gray-300'
                  />
                </div>

                <button
                  type='button'
                  disabled={!text.trim() && !pendingFile}
                  onClick={sendMessage}
                  className={`h-10 w-10 rounded-xl grid place-items-center transition
                  ${
                    !text.trim() && !pendingFile
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-[#0E5BFF] hover:opacity-90 cursor-pointer"
                  }`}>
                  <Send
                    className={`h-5 w-5 ${
                      !text.trim() && !pendingFile
                        ? "text-gray-500"
                        : "text-white"
                    }`}
                  />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// "use client";

// import { useEffect, useRef, useState } from "react";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { MoreVertical, Paperclip, Send } from "lucide-react";

// type Props = {
//   open: boolean;
//   setOpen: (v: boolean) => void;
// };

// type Msg = {
//   id: string;
//   from: "bot" | "me";
//   text: string;
//   time?: string;
// };

// export default function SimpleChatModal({ open, setOpen }: Props) {
//   const [messages, setMessages] = useState<Msg[]>([]);
//   const [text, setText] = useState("");
//   const fileRef = useRef<HTMLInputElement | null>(null);

//   useEffect(() => {
//     if (!open) return;
//     setMessages([
//       { id: "m1", from: "bot", text: "Hello 👋" },
//       { id: "m2", from: "bot", text: "How can I help you today?" },
//     ]);
//     setText("");
//   }, [open]);

//   const disabled = text.trim().length === 0;

//   const sendMessage = () => {
//     if (disabled) return;

//     const myMsg: Msg = {
//       id: crypto.randomUUID(),
//       from: "me",
//       text: text.trim(),
//     };

//     setMessages((p) => [...p, myMsg]);
//     setText("");

//     setTimeout(() => {
//       setMessages((p) => [
//         ...p,
//         { id: crypto.randomUUID(), from: "bot", text: "Got it ✅ Please share more details if needed." },
//       ]);
//     }, 500);
//   };

//   const onPickFile = () => fileRef.current?.click();

//   const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const f = e.target.files?.[0];
//     if (!f) return;

//     setMessages((p) => [
//       ...p,
//       { id: crypto.randomUUID(), from: "me", text: `📎 ${f.name}` },
//     ]);

//     e.target.value = "";
//   };

//   return (
//     <Dialog open={open} onOpenChange={setOpen}>
//       <DialogContent className="sm:max-w-[420px]  p-0 overflow-hidden rounded-2xl bg-white">
//         {/* Header */}
//         <div className="relative px-4 py-4 text-white bg-gradient-to-r from-[#0E5BFF] to-[#00C2FF]">
//           <div className="flex items-start justify-between">
//             <div className="flex items-center gap-3">
//               <div className="h-10 w-10 rounded-full bg-white/95 grid place-items-center">
//                 <span className="text-[#0E5BFF] font-bold text-sm">LOGO</span>
//               </div>

//               <div className="leading-tight">
//                 <div className="text-[15px] font-semibold">Hi there! 👋</div>
//                 <div className="mt-1 flex items-center gap-2 text-[12px] text-white/90">
//                   <span className="h-2 w-2 rounded-full bg-[#31D27C]" />
//                   <span>We&apos;re online</span>
//                 </div>
//               </div>
//             </div>

//             <button
//               type="button"
//               className="h-9 w-9 rounded-lg grid place-items-center hover:bg-white/10 cursor-pointer"
//             >
//               <MoreVertical className="h-5 w-5" />
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="h-[360px] bg-white px-3 py-4 overflow-y-auto">
//           <div className="space-y-3">
//             {messages.map((m) => (
//               <div
//                 key={m.id}
//                 className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[78%] rounded-2xl px-4 py-2 text-[14px] leading-5
//                     ${m.from === "me" ? "bg-[#0E5BFF] text-white rounded-br-md" : "bg-[#F1F3F6] text-[#111827] rounded-bl-md"}`}
//                 >
//                   {m.text}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Input */}
//         <div className="border-t border-[#E8E9E9] px-3 py-3">
//           <div className="flex items-center gap-2">
//             <input
//               ref={fileRef}
//               type="file"
//               className="hidden"
//               onChange={onFileChange}
//             />

//             <button
//               type="button"
//               onClick={onPickFile}
//               className="h-10 w-10 rounded-xl border border-[#E8E9E9] grid place-items-center hover:bg-gray-50 cursor-pointer"
//             >
//               <Paperclip className="h-5 w-5 text-[#4A4C56]" />
//             </button>

//             <div className="flex-1">
//               <input
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") sendMessage();
//                 }}
//                 placeholder="Enter your message..."
//                 className="w-full h-10 rounded-xl border border-[#E8E9E9] px-3 text-[14px] outline-none focus:border-gray-300"
//               />
//             </div>

//             <button
//               type="button"
//               disabled={disabled}
//               onClick={sendMessage}
//               className={`h-10 w-10 rounded-xl grid place-items-center transition
//                 ${disabled ? "bg-gray-200 cursor-not-allowed" : "bg-[#0E5BFF] hover:opacity-90 cursor-pointer"}`}
//             >
//               <Send className={`h-5 w-5 ${disabled ? "text-gray-500" : "text-white"}`} />
//             </button>
//           </div>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
