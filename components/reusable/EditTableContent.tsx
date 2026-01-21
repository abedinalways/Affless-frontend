"use client";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";

// Dynamic import
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] border rounded-md p-4">
      Loading editor...
    </div>
  ),
});

interface EditableContentProps {
  title: string;
  initialContent: string;
  subtitle?: string;
  updateButtonText?: string;
}

const EditableContent: React.FC<EditableContentProps> = ({
  title,
  initialContent,
  subtitle,
  updateButtonText = "Update",
}) => {
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(false);

  const config = useMemo(
    () => ({
      readonly: false,
      height: 500,
      enableDragAndDropFileToEditor: true,
      showXPathInStatusbar: false,
      showBrowserColorPicker: false,
      showCharsCounter: false,
      showWordsCounter: false,
      statusbar: false,
      enter: "p" as const,
      cleanHTML: {
        fillEmptyParagraph: true,
      },
      list: {
        indent: 20,
      },
      uploader: {
        insertImageAsBase64URI: true,
        imagesExtensions: ["jpg", "png", "jpeg", "gif"],
        maximumImageFileSize: 1000000,
      },
      buttons: [
        "source", "|",
        "bold", "italic", "underline", "strikethrough", "|",
        "ul", "ol", "|",
        "paragraph", "fontsize", "brush", "|",
        "image", "link", "|",
        "align", "|",
        "undo", "redo",
      ],
    }),
    []
  );

  return (
    <div className="flex justify-center py-10">
      <div className="w-full bg-[#F5F0DC] border border-[#D6CEA9] rounded-[20px] shadow-md p-8">

        {/* Title */}
        <h2 className="text-[#FF4D4F] text-[24px] font-normal border-b pb-4 mb-6">
          {isEditing ? `${title} Edit` : title}
        </h2>

        {/* Content */}
        {!isEditing ? (
          <div
            className="text-[#4A4A4A] leading-7 space-y-4"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <div>
            {subtitle && (
              <Label className="text-base font-semibold text-headerColor mb-2 block">
                {subtitle}
              </Label>
            )}

            <JoditEditor
              value={content}
              config={config}
              onChange={(newContent) => setContent(newContent)}
            />
          </div>
        )}

        {/* Button */}
        <div className="flex justify-end mt-6">
          <button
            className="bg-[#EE4D47] hover:bg-[#d63d37] w-[300px] text-white px-8 py-3 rounded-full transition-all"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? updateButtonText : "Edit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableContent;
