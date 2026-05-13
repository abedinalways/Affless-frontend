import { AttachmentItem } from "@/app/type";

type Props = {
    attachments: AttachmentItem[];
    handleRemoveAttachment: (id: string) => void;
}

export default function RenderFilePreview({ attachments, handleRemoveAttachment }: Props) {
  return (
    <>
      {attachments.length > 0 && (
        <div className="mb-3 flex gap-2 overflow-x-auto">
          {attachments.map((item) => (
            <div className="relative pt-4" key={item.id}>
              <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
                {item.type === "link" ? (
                  <span className="px-1 text-center text-[10px] text-gray-600">
                    Link
                  </span>
                ) : item.file?.type.startsWith("image/") ? (
                  <img
                    src={item.url}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : item?.name?.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? (
                  <video width={64} className="h-full w-full object-cover">
                    <source
                      src={item.url}
                      type={`video/${item.name.split(".").pop()?.toLowerCase()}`}
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <span className="px-1 text-center text-[10px] text-gray-600">
                    {item.name}
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleRemoveAttachment(item.id)}
                className="absolute top-2 -right-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-xs text-white"
                aria-label="Remove attachment"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
