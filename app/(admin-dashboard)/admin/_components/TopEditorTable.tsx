import DynamicTable from "@/helper/DynamicTable";

const data = [
    {
        user_name: 'john_doe',
        email: 'john.doe@example.com',
        phone_number: '+1-202-555-0143'
    },
    {
        user_name: 'jane_smith',
        email: 'jane.smith@example.com',
        phone_number: '+1-202-555-0178'
    },
    {
        user_name: 'alice_jones',
        email: 'alice.jones@example.com',
        phone_number: '+1-202-555-0199'
    },
    {
        user_name: 'bob_brown',
        email: 'bob.brown@example.com',
        phone_number: '+1-202-555-0123'
    }
]

export default function TopEditorTable() {
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
        <div className="">
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
    );
}