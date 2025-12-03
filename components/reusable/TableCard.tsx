// JobProposalCard.tsx

import React from "react";
import Image from "next/image";

interface JobProposalCardProps {
  image: string;
  title: string;
  total: string;
  onAccept: () => void;
}

const JobProposalCard: React.FC<JobProposalCardProps> = ({ image, title, total, onAccept }) => {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm  justify-between">
      <div className="flex items-center gap-3">
        <Image
          src={image}
          alt="Job Proposal"
          width={100}
          height={100}
          className="rounded-lg object-cover w-[100px] h-[80px]"
        />
        <div>
          <p className="text-[16px] font-medium text-[#333]">{title}</p>
         
        </div>
      </div>

<div className="flex justify-between pt-7">
     <p className="text-sm text-gray-500">Total: {total}</p>
     <button
        onClick={onAccept}
        className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm"
      >
        Accept
      </button>
</div>
      
    </div>
  );
};

export default JobProposalCard;
