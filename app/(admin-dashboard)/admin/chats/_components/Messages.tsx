'use client';
import MessageBody from "./MessageBody";
import { useParams } from "next/navigation";


export default function Messages() {
    const params = useParams();
    const { id } = params;
    return (
        <div className="bg-[#f9f9f9] w-full h-full grid ">
            <div className="grid grid-rows-1 lg:grid-cols-[1fr_auto] min-h-0 gap-3 xm:gap-6 w-full h-full">
                <div className={`w-full grid min-h-0 ${id as string === "" ? "hidden xl:block" : ""} h-[calc(100vh-174px)] sm:h-[calc(100vh-218px)]`}>
                    <MessageBody />
                </div>
            </div>
        </div>
    )
}