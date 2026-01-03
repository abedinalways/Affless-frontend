"use client";
import Image from "next/image";
import Link from "next/link";

interface BidCardProps {
  id: number;
  name: string;
  avatar: string;
  time: string;
  description: string;
}

export default function BidCard({
  id,
  name,
  avatar,
  time,
  description,
}: BidCardProps) {
  return (
    <div className="space-y-6 mb-6">
      <div className="flex items-start justify-between bg-white p-4 rounded-xl shadow-sm border border-[#EFEFEF] ">
        {/* LEFT SIDE */}
        <div className="flex gap-4 ">
          <Image
            src={avatar}
            alt={name}
            width={70}
            height={70}
            className="rounded-full object-cover w-[70px] h-[70px]"
          />

          <div>
            <Link href="/editor/editor-profile" className="text-[16px] font-semibold text-[#1D1F2C]">{name}</Link>
            <p className="text-[12px] text-gray-500 mb-2">{time}</p>

            <p className="text-[14px] text-gray-600 leading-6 line-clamp-2 max-w-[600px]">
              {description}
            </p>
          </div>
        </div>

        {/* RIGHT SIDE BUTTON */}
        <Link
          href="/client/bids-details"
          className="text-[14px] bg-[#FFECEC] text-[#FF4D4F] px-4 py-2 rounded-lg hover:bg-[#ffd6d6]"
        >
          View
        </Link>
      </div>
    </div>
  );
}


//usage
// import BidCard from "@/components/reusable/BidCard";

// const bids = [
//   {
//     id: 1,
//     name: "Devon Lane",
//     avatar: "/images/user1.png",
//     time: "4 days ago",
//     description:
//       "Absolutely outstanding work! The seller went above and beyond...",
//   },
//   {
//     id: 2,
//     name: "Jerome Bell",
//     avatar: "/images/user2.png",
//     time: "7 days ago",
//     description:
//       "The seller delivered exceptional quality well ahead of deadline...",
//   },
//   {
//     id: 3,
//     name: "Floyd Miles",
//     avatar: "/images/user3.png",
//     time: "9 days ago",
//     description:
//       "Professionalism, attention to detail and ability to collaborate...",
//   },
// ];

// export default function BidsPage() {
//   return (
//     <div className="containers py-6 space-y-4">
//       <h2 className="text-xl font-semibold mb-4">Bids</h2>

//       {bids.map((item) => (
//         <BidCard
//           key={item.id}
//           id={item.id}
//           name={item.name}
//           avatar={item.avatar}
//           time={item.time}
//           description={item.description}
//         />
//       ))}
//     </div>
//   );
// }
