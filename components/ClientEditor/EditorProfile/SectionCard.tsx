import { GoPlus } from "react-icons/go";

export default function SectionCard({
  title,
  desc,
  institute,
  country,
  btnText,
  onClick,
  rightIcon,
  buttonAlign = "left",
  children, // ✅ NEW
}: {
  title: string;
  desc?: string;
  btnText?: string;
  institute?: string;
  country?: string;
  onClick?: () => void;
  rightIcon?: React.ReactNode;
  buttonAlign?: "left" | "default";
  children?: React.ReactNode; // ✅ NEW
}) {
  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between gap-6">
        <div className="flex-1 space-y-2">
          <h3 className="text-[24px] font-medium text-[#333] leading-150%">{title}</h3>

          {desc && <p className="text-[18px] font-medium text-[#1D1F2C]">{desc}</p>}
          {institute && (
            <p className="text-sm leading-relaxed text-gray-600">{institute}</p>
          )}
          {country && <p className="text-sm text-gray-500">{country}</p>}

          {/* ✅ Show children below */}
          {children && <div className="pt-3">{children}</div>}

          {/* ✅ Button Left */}
          {buttonAlign === "left" && onClick && btnText && (
            <button
              type="button"
              onClick={onClick}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            > <GoPlus />
              {btnText}
            </button>
          )}
        </div>

        <div className="shrink-0">
          {/* ✅ Button Right */}
          {buttonAlign === "default" && onClick && btnText && (
            <button
              type="button"
              onClick={onClick}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            ><GoPlus />
              {btnText}
            </button>
          )}

          {rightIcon && (
            <div className="h-14 w-14 rounded-xl bg-[#EEF2FF] border border-[#E6EAFD] flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
