import PdfIcon from "@/components/Icons/PdfIcon";
import Link from "next/link";

type Props = {
  textFile: string | null;
  pdfFile: string | null;
};

export default function JobDescription({ textFile, pdfFile }: Props) {
  return (
    <div className="space-y-5">
      {/* Title */}
      <h1 className="text-[28px] font-medium text-[#333] lg:text-[32px]">
        The Ultimate Guide To Start
      </h1>

      {/* Description */}
      <p className="leading-relaxed text-gray-700">
        Etiam gravida euismod sodales. Vestibulum sed egestas sapien, sit amet
        iaculis eros. Suspendisse pulvinar, erat sed interdum auctor, eros
        ligula tempus quam, in congue est nunc et turpis. Nam non nisl sed sem
        placerat semper. Proin egestas, odio eu semper mattis, enim odio
        pulvinar leo, ac vestibulum sapien nulla non arcu.
      </p>

      <p className="leading-relaxed text-gray-700">
        Mauris sed venenatis libero. Pellentesque elementum ante massa, ac
        ornare augue molestie ut. Suspendisse lacinia tortor sem, at condimentum
        nulla auctor in. Sed vulputate euismod risus, eget auctor nulla aliquet
        sed.
      </p>

      {/* Subtitle */}
      <h2 className="tex-lg font-medium text-[#333] lg:text-[32px]">
        Pellentesque elementum ante massa
      </h2>

      <ul className="list-disc space-y-2 pl-6 text-gray-700">
        <li>Suspendisse gravida risus in sapien sollicitudin.</li>
        <li>Quisque mollis enim nec lacus elementum vulputate.</li>
        <li>Nullam fermentum turpis a nisl tristique.</li>
        <li>Donec placerat orci id lobortis suscipit.</li>
        <li>Accumsan nibh vitae, hendrerit turpis.</li>
        <li>Etiam dignissim mauris at orci finibus.</li>
      </ul>

      {/* Skills */}
      <div>
        <h2 className="tex-lg py-6 font-medium text-[#333] lg:text-[32px]">
          Skills Required
        </h2>

        <div className="flex flex-wrap gap-3">
          <span className="rounded-full border bg-[#F3F5F6] px-4 py-2">
            Retention Editing
          </span>
          <span className="rounded-full border bg-[#F3F5F6] px-4 py-2">
            Storytelling
          </span>
          <span className="rounded-full border bg-[#F3F5F6] px-4 py-2">
            Color Correction
          </span>
        </div>
      </div>

      {/* Attachments */}
      <div>
        <h2 className="tex-lg mb-4 font-medium text-[#333] lg:text-[32px]">
          Attachments
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* PDF Upload */}
          {pdfFile && (
            <Link
              href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0"
              target="_blank"
              className="flex cursor-pointer items-center gap-4 rounded-xl border px-6 py-4"
            >
              <PdfIcon className="h-10 w-10" />
              <div>
                <p className="pb-1.5 text-[18px] font-semibold text-[#333]">
                  {pdfFile}
                </p>
              </div>
            </Link>
          )}

          {/* TEXT Upload */}
          {textFile && (
            <Link
              href="https://docs.google.com/document/d/1LiV0kTvIOAnxnB4lBC6D-JNR5XZuv_5qaOCyx9Jtxvs/edit?tab=t.0"
              target="_blank"
              className="flex cursor-pointer items-center gap-4 rounded-xl border px-6 py-4"
            >
              <PdfIcon className="h-10 w-10" />
            <div>
              <p className="pb-1.5 text-[18px] font-semibold text-[#333]">
                {textFile}
              </p>
            </div>
          </Link>
          )}
        </div>
      </div>
    </div>
  );
}
