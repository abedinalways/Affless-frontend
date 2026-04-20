import { EditorJobProposalType } from "@/app/type";
import DynamicTable from "@/helper/DynamicTable"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation";
import { getJobStatusDefinition } from "@/lib/job-status";


type PropType = {
    data: EditorJobProposalType[];
}


export default function JobProposalTable({ data }: PropType) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirect = searchParams.get("redirect");

    const columns = [
        {
            label: "Jobs",
            accessor: "job",
            width: "300px",
            formatter: (accessor: { title: string, imageUrl: string }) => (
                <div className="flex items-center justify-center px-6 py-3 ">
                    <div className="w-full flex items-center gap-4" title={accessor.title}>
                        <Image
                            src={accessor.imageUrl}
                            alt={accessor.title}
                            width={80}
                            height={56}
                            className="object-cover rounded-lg bg-[#F8F8F8] border border-[#EDEDED] shadow-sm"
                        />
                        <h2 className="text-[15px] font-normal text-[#1D1F2C] leading-5 max-w-[260px] line-clamp-2 capitalize">{accessor?.title}</h2>
                    </div>
                </div>
            )
        },
        {
            label: "Amount",
            accessor: "amount",
            width: "100px",
            formatter: (accessor: number) => (
                <div className="w-full h-full text-center px-6 py-3 ">
                    <span className="text-[#1D1F2C] text-center">${accessor.toFixed(2)}</span>
                </div>
            )
        },
        {
            label: "Days Awaiting Client Acceptance",
            accessor: "timeLeft",
            width: "150px",
            formatter: (accessor: number) => (
                <div className="w-full h-full text-center px-6 py-3">
                    <span>{accessor} days</span>
                </div>
            )
        },
        {
            label: "Status",
            accessor: "status",
            width: "120px",
            formatter: (accessor: any) => (
                <div className="w-full h-full text-center px-6 py-3 ">
                    <span
                        className={` w-fit px-4 py-1 rounded-md text-[14px] font-medium whitespace-nowrap ${getJobStatusDefinition(accessor).colorClass}`}
                    >
                        {getJobStatusDefinition(accessor).label}
                    </span>
                </div>
            )
        }
    ]
    return (
        <div className="overflow-x-auto">
            <DynamicTable
                columns={columns}
                data={data}
                header={{
                    position: "justify-center",
                    padding: "16px 24px",
                    bg: "#fff",
                    text: "#1D1F2C",
                    fontWeight: "500",
                    fontSize: "14px",
                    rounded: "8px"
                }}
                rowStyle={
                    {
                       hover: true,
                       hoverbg: "hover:bg-gray-100",
                       bg: "bg-white",
                       spaceing: "border-separate border-spacing-y-2",
                       rowClickable: true,
                       rowClick: (row : EditorJobProposalType) => {
                            router.push(`/editor/hire-request/${row.id}?redirect=${redirect + "_myjobproposals" || "myjobproposals"} `);
                       }
                    }
                }
            />
        </div>
    )
}