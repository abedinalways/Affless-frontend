"use client";

import ProposalForm from "../../browse-job/_components/ProposalForm";
import { IoClose } from "react-icons/io5";

type PropType = {
    onClose: () => void;
    onSubmit: (data: { bidAmount: string; deliveryTime: string; coverLetter: string }) => void;
}

export default function EditJobProposal({ onClose, onSubmit }: PropType) {
    return(
        <div className="fixed inset-0 bg-[#0003] backdrop-blur-xs z-999 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white p-4 rounded-xl relative" onClick={(e)=>e.stopPropagation()}>
                <button type="button" className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 transition-colors duration-300 cursor-pointer" onClick={onClose}>
                    <IoClose className="text-xl"/>
                </button>
                <ProposalForm 
                    bidAmount={"$280.00"}
                    deliveryTime={"5 days"}
                    coverLetter={"I am excited to submit my proposal for your project. With my expertise in crafting quality backlinks, I am confident that I can help improve your website's search engine rankings and drive more organic traffic. I have a proven track record of delivering high-quality backlinks that adhere to SEO best practices. I look forward to the opportunity to work with you and contribute to the success of your project."}
                    title={"Edit Job Proposal"}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    )
}