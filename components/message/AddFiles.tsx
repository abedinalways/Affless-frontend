import { PlusIcon } from "@/public/svgIcons/svgIcons";

const menuStyle =
  "w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50";

type Props = {
  attachmentMenuRef: React.RefObject<HTMLDivElement | null>;
  isAttachmentMenuOpen: boolean;
  setIsAttachmentMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openFilePicker: (accept: string) => void;
  handleToggleAddLinkModal: () => void;
  handleAttachmentsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  fileAccept: string;
};

export default function AddFiles({
  attachmentMenuRef,
  isAttachmentMenuOpen,
  setIsAttachmentMenuOpen,
  openFilePicker,
  handleToggleAddLinkModal,
  handleAttachmentsChange,
  fileInputRef,
  fileAccept,
}: Props) {
  return (
    <>
      <div className="relative" ref={attachmentMenuRef}>
        <button
          type="button"
          onClick={() => setIsAttachmentMenuOpen((prev) => !prev)}
          className="shrink-0 cursor-pointer rounded-lg p-1.5 transition-colors hover:bg-gray-100 sm:p-2"
        >
          <PlusIcon className="h-5 w-5 text-gray-600" />
        </button>
        {isAttachmentMenuOpen && (
          <div className="absolute bottom-12 left-0 z-10 w-44 rounded-lg border border-gray-200 bg-white shadow-lg">
            <button
              type="button"
              onClick={() => openFilePicker("image/*")}
              className={`${menuStyle} first:rounded-t-lg`}
            >
              Images
            </button>
            <button
              type="button"
              onClick={() => openFilePicker("video/*")}
              className={`${menuStyle} border-t border-gray-100`}
            >
              Video
            </button>
            <button
              type="button"
              onClick={handleToggleAddLinkModal}
              className={`${menuStyle} border-t border-gray-100`}
            >
              Links
            </button>
            <button
              type="button"
              onClick={() =>
                openFilePicker(".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt")
              }
              className={`${menuStyle} border-t border-gray-100 last:rounded-b-lg`}
            >
              Documents
            </button>
          </div>
        )}
      </div>
      <input
        type="file"
        id="attachments"
        className="hidden"
        multiple
        accept={fileAccept}
        ref={fileInputRef}
        onChange={handleAttachmentsChange}
      />
    </>
  );
}
