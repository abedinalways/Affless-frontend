import { Download } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type propType = {
    ImageIcon: React.ElementType;
    title: string;
    size: string;
    fileType: string;
}

export default function DeliveredFileCard({ ImageIcon, title, size, fileType }: propType) {
    const [downLoading, setDownloading] = useState(false);

    const handleDownload = () => {
        setDownloading(true);
        toast.success("Download started");
        // Simulate download delay
        setTimeout(() => {
            setDownloading(false);
            // Here you would typically trigger the actual download
        }, 2000);
    };

    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white px-5 py-4">
            <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-xl border flex items-center justify-center ${fileType === "video" ?
                    "border-purple-400 bg-purple-50" :
                    fileType === "audio" ? "border-green-400 bg-green-50" :
                        fileType === "image" ? "border-amber-300 bg-amber-50" : "border-blue-400 bg-blue-50"
                    }`}>
                    <ImageIcon className={fileType === "video" ? "text-purple-600" :
                        fileType === "audio" ? "text-green-600" :
                            fileType === "image" ? "text-amber-600" : "text-blue-600"
                    } size={22} />
                </div>

                <div>
                    <p className="text-[18px] font-semibold text-gray-900">
                        {title}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                        <span className="text-[13px] text-gray-500">{size}</span>
                        <span className="rounded-lg bg-red-50 px-3 py-1 text-[13px] font-medium text-[#ff4b4b] capitalize">
                            {fileType}
                        </span>
                    </div>
                </div>
            </div>

            <button type="button" disabled={downLoading} onClick={handleDownload} className="flex items-center gap-2 text-[#ff4b4b] font-medium hover:opacity-80 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-50">
                <Download size={18} />
                <span className="text-[14px]">Download</span>
            </button>
        </div>
    )
}