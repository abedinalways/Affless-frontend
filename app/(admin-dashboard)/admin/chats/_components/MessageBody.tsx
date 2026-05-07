'use client';
import MessageHeader from "./MessageHeader";
import MessageFooter from "./MessageFooter";


export default function MessageBody() {
    return (
        <div className="h-full grid grid-cols-1 grid-rows-[1fr_auto] min-h-0 bg-white rounded-lg lg:shadow-md overflow-hidden">
            <div className='grid grid-rows-[auto_1fr_auto] min-h-0 w-full h-full'>
                <MessageHeader />
            </div>
            <MessageFooter />
        </div>
    );
}