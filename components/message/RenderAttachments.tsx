import Image from "next/image";
import VideoPlayer from "./VideoPlayer";
import { AttachmentItem } from "@/app/type";

export default function RenderAttachments({
  attachments,
}: {
  attachments: AttachmentItem[];
}) {
  return (
    <>
      {attachments.map((attachment) => (
        <div
          key={attachment.id}
          className={`relative w-full rounded-lg text-white ${attachment.type === "link" || attachment.type === "file" ? "cursor-pointer hover:text-blue-200" : ""} flex items-center overflow-hidden`}
        >
          {attachment.type === "link" ? (
            <a
              href={attachment.url}
              target="_blank"
              rel="noreferrer"
              className="truncate px-1 text-center text-[10px] text-blue-200 underline"
            >
              {attachment.url}
            </a>
          ) : attachment?.name?.match(/\.(png|jpe?g|gif|webp|bmp|svg)$/i) ? (
            <a
              href={attachment.url}
              download={`${new Date().getTime()}_${attachment.name}`}
              className="text-xs hover:underline"
              title={`Download ${attachment.name}`}
            >
              <Image
                src={attachment.url}
                alt={attachment.name}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
            </a>
          ) : attachment?.name?.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? (
            <VideoPlayer url={attachment.url} />
          ) : (
            <div className="flex items-center">
              <a
                href={attachment.url}
                download={`${new Date().getTime()}_${attachment.name}`}
                className="text-xs hover:underline"
                title={`Download ${attachment.name}`}
              >
                {attachment.name}
              </a>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
