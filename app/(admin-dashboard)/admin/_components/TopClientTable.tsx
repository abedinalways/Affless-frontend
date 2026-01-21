import DynamicTable from "@/helper/DynamicTable"
import { Roboto } from "next/font/google"


const data = [
    {
        user_name: "John Doe",
        email: "john.doe@example.com",
        phone_number: "+1 234 567 8901",
    },
    {
        user_name: "Jane Smith",
        email: "jane.smith@example.com",
        phone_number: "+1 987 654 3210",
    },
    {
        user_name: "Michael Johnson",
        email: "michael.johnson@example.com",
        phone_number: "+1 555 123 4567"
    },
    {
        user_name: "Emily Davis",
        email: "emily.davis@example.com",
        phone_number: "+1 444 987 6543"
    },
    {
        user_name: "David Wilson",
        email: "david.wilson@example.com",
        phone_number: "+1 333 222 1111"
    }
]


export default function TopClientTable() {
    const columns = [
        {
            label: "User Name",
            accessor: "user_name",
            width: "100px",
            formatter: (accessor: string, row: any) => (
                <div className="text-[#4A4C56] text-xs leading-[19.2px] font-['Roboto'] p-3">
                    {row.user_name}
                </div>
            ),
        },
        {
            label: "Email",
            accessor: "email",
            width: "150px",
            formatter: (accessor: string, row: any) => (
                <div className="text-[#4A4C56] text-xs leading-[19.2px] font-['Roboto'] p-3">
                    {row.email}
                </div>
            ),
        },
        {
            label: "Phone Number",
            accessor: "phone_number",
            width: "120px",
            formatter: (accessor: string, row: any) => (
                <div className="text-[#4A4C56] text-xs leading-[19.2px] font-['Roboto'] p-3">
                    {row.phone_number}
                </div>
            ),
        },
        {
            label: "Action",
            accessor: "action",
            width: "20px",
            formatter: (accessor: string, row: any) => (
                <div className="text-[#4A4C56] text-xs leading-[19.2px] font-['Roboto'] p-3">
                    <button className="text-[#FF4D4F] underline whitespace-nowrap cursor-pointer">View profile</button>
                </div>
            ),
        }
    ]
    return (
        <div>
            <DynamicTable
                columns={columns}
                data={data}
                header={{
                    bg: "#FAFBFC",
                    padding: "12px 12px",
                    text: "#444950",
                    fontSize: "14px",
                    fontWeight: "500",
                }}
            />
        </div>
    )
}