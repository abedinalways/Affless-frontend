import { Message } from "@/app/type";
import Image from "next/image";
import { IoIosEye } from "react-icons/io";
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import RenderAttachments from "./RenderAttachments";


const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getDayLabel = (date: Date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Today";
  if (isSameDay(date, yesterday)) return "Yesterday";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (date: Date) =>
  date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });


type MessageContentProps = {
  messages: Message[];
};

export default function MessageContent({ messages }: MessageContentProps) {
  const getStatusIcon = (message: Message) => {
    if (!message.deliveredAt) {
      return <IoCheckmarkOutline />;
    }
    if (!message.readAt) {
      return <IoCheckmarkDoneOutline />;
    }
    return <IoIosEye />;
  };

  return (
    <div className="relative h-full w-full space-y-4 bg-gray-50 p-4">
      {messages?.length === 0 && (
        <div className="flex h-full w-full items-center justify-center py-6 text-center text-lg text-gray-400">
          No messages yet. Start the conversation!
        </div>
      )}
      {messages?.map((message, index) => {
        const messageDate = new Date(message.createdAt);
        const prevMessage = messages[index - 1];
        const shouldShowDayDivider =
          !prevMessage ||
          !isSameDay(messageDate, new Date(prevMessage?.createdAt));

        return (
          <div key={message.id}>

            {/* Show day divider if it's the first message or if the date is different from the previous message */}
            {shouldShowDayDivider && (
              <div className="my-4 flex items-center justify-center">
                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                  {getDayLabel(messageDate)}
                </span>
              </div>
            )}
            <div
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md xl:max-w-lg ${
                  message.sender === "user"
                    ? "rounded-br-none text-white"
                    : "rounded-bl-none border border-gray-200 bg-white text-gray-900"
                }`}
                style={
                  message.sender === "user"
                    ? { backgroundColor: "#e74c4c" }
                    : {}
                }
              >
                {/* Only render content if it's not empty after trimming whitespace */}
                {message.content.trim() !== "" && (
                  <p className="text-sm wrap-break-word">{message.content}</p>
                )}

                {/* Render attachments if they exist and there is content or if there are attachments even without content */}
                {message.attachments && message.attachments.length > 0 && (
                  <div
                    className={`mt-2 flex flex-col gap-1 rounded p-2 ${message?.sender === "user" ? "bg-[#e77272]" : ""}`}
                  >
                    <RenderAttachments attachments={message.attachments} />
                  </div>
                )}

                {/* Render timestamp and message status */}
                <div className="flex w-full items-center justify-between gap-4">
                  <p
                    className={`mt-1 text-xs ${
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-end text-gray-500"
                    }`}
                    title={messageDate.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  >
                    {formatTime(messageDate)}
                  </p>
                  {message.sender === "user" && (
                    <p
                      className={`mt-1 text-sm font-semibold ${message.readAt ? "text-blue-100" : "text-gray-300"} cursor-default select-none`}
                      title={
                        message.readAt
                          ? `Read at ${formatTime(new Date(message.readAt))}`
                          : message.deliveredAt
                            ? `Delivered at ${formatTime(new Date(message.deliveredAt))}`
                            : `Sent at ${formatTime(new Date(message.createdAt))}`
                      }
                    >
                      {getStatusIcon(message)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
