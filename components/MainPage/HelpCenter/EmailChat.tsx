"use client";

import { useMemo, useState } from "react";

type Payload = {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  message: string;
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;

  className?: string;
  onSend?: (payload: Payload) => void | Promise<void>;
};

export default function EmailChat({ open, setOpen, className = "", onSend }: Props) {
  const [to, setTo] = useState("");
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [showCc, setShowCc] = useState(false);
  const [showBcc, setShowBcc] = useState(false);
  const [sending, setSending] = useState(false);

  const [minimized, setMinimized] = useState(false);

  const disabled = useMemo(() => {
    return sending || !to.trim() || !subject.trim() || !message.trim();
  }, [to, subject, message, sending]);

  const handleSend = async () => {
    if (disabled) return;

    try {
      setSending(true);
      await onSend?.({
        to: to.trim(),
        cc: showCc ? cc.trim() : "",
        bcc: showBcc ? bcc.trim() : "",
        subject: subject.trim(),
        message: message.trim(),
      });

      // clear
      setTo("");
      setCc("");
      setBcc("");
      setSubject("");
      setMessage("");
      setShowCc(false);
      setShowBcc(false);
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setMinimized(false);
  };

  if (!open) return null;

  return (
    <div
      className={[
        "w-full rounded-xl border border-[#E8E9E9] bg-white shadow-2xl overflow-hidden",
        className,
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#E8E9E9]">
        <p className="text-[14px] font-semibold text-[#111827]">New Message</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMinimized((v) => !v)}
            className="h-8 w-8 rounded-md hover:bg-black/5 grid place-items-center cursor-pointer"
            aria-label={minimized ? "Expand" : "Minimize"}
            title={minimized ? "Expand" : "Minimize"}
          >
            {minimized ? "▢" : "—"}
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="h-8 w-8 rounded-md hover:bg-black/5 grid place-items-center cursor-pointer"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>
      </div>

      {!minimized && (
        <>
          {/* To row */}
          <div className="px-4 py-2 border-b border-[#E8E9E9]">
            <div className="flex items-center gap-3">
              <span className="text-[13px] text-[#6B7280]">To</span>

              <input
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="flex-1 text-[13px] outline-none"
                placeholder=""
              />

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowCc((v) => !v)}
                  className="text-[12px] text-[#6B7280] hover:text-[#111827] cursor-pointer"
                >
                  Cc
                </button>
                <button
                  type="button"
                  onClick={() => setShowBcc((v) => !v)}
                  className="text-[12px] text-[#6B7280] hover:text-[#111827] cursor-pointer"
                >
                  Bcc
                </button>
              </div>
            </div>

            {(showCc || showBcc) && (
              <div className="mt-2 space-y-2">
                {showCc && (
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-[#6B7280]">Cc</span>
                    <input
                      required
                      value={cc}
                      onChange={(e) => setCc(e.target.value)}
                      className="flex-1 text-[13px] outline-none"
                      placeholder=""
                    />
                  </div>
                )}

                {showBcc && (
                  <div className="flex items-center gap-3">
                    <span className="text-[13px] text-[#6B7280]">Bcc</span>
                    <input
                      required
                      value={bcc}
                      onChange={(e) => setBcc(e.target.value)}
                      className="flex-1 text-[13px] outline-none"
                      placeholder=""
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Subject */}
          <div className="px-4 py-2 border-b border-[#E8E9E9]">
            <input
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full text-[13px] outline-none"
              placeholder="Subject"
            />
          </div>

          {/* Body */}
          <div className="px-4 py-3">
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full min-h-[260px] resize-none text-[13px] outline-none"
              placeholder=""
            />
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-[#E8E9E9] flex items-center justify-start">
            <button
              type="button"
              disabled={disabled}
              onClick={handleSend}
              className={`px-5 h-9 rounded-full text-[13px] font-medium text-white
                ${disabled ? "bg-[#1A73E8]/50 cursor-not-allowed" : "bg-[#1A73E8] cursor-pointer"}`}
            >
              {sending ? "Sending..." : "Send"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
