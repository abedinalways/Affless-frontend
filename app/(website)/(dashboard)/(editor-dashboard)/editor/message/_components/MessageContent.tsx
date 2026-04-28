import { Message } from "@/app/type";
import Image from "next/image";
import { IoIosEye } from "react-icons/io";
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";

type PropTypes = {
    messages: Message[];
    activeConversationMeta: {
        muted?: boolean | undefined;
        blocked?: boolean | undefined;
        reported?: boolean | undefined;
        deleted?: boolean | undefined;
    }
}

export default function MessageContent({ messages, activeConversationMeta }: PropTypes) {

    const isSameDay = (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate();


    const getDayLabel = (date: Date) => {
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        if (isSameDay(date, today)) return 'Today';
        if (isSameDay(date, yesterday)) return 'Yesterday';
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    const formatTime = (date: Date) =>
        date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });

    const getStatusIcon = (message: Message) => {
        if (!message.deliveredAt) {
            return <IoCheckmarkOutline />;
        }
        if (!message.readAt) {
            return <IoCheckmarkDoneOutline />;
        }
        return <IoIosEye />;
    };

    return (
        <div className="w-full h-full p-4 space-y-4 bg-gray-50 relative">
            {activeConversationMeta?.blocked && (
                <div className="text-center py-6 text-gray-500 text-sm">
                    You blocked this conversation.
                </div>
            )}
            {messages.map((message, index) => {
                const messageDate = new Date(message.createdAt);
                const prevMessage = messages[index - 1];
                const shouldShowDayDivider =
                    !prevMessage ||
                    !isSameDay(messageDate, new Date(prevMessage.createdAt));

                return (
                    <div key={message.id}>
                        {shouldShowDayDivider && (
                            <div className="flex items-center justify-center my-4">
                                <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                                    {getDayLabel(messageDate)}
                                </span>
                            </div>
                        )}
                        <div
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                }`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-2 rounded-lg ${message.sender === 'user'
                                    ? 'rounded-br-none text-white'
                                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none'
                                    }`}
                                style={message.sender === 'user' ? { backgroundColor: '#e74c4c' } : {}}
                            >
                                {message.content.trim() !== '' && (
                                    <p className="text-sm wrap-break-word">{message.content}</p>
                                )}
                                {message.attachments && message.attachments.length > 0 && (
                                    <div className={`mt-2 flex flex-col gap-1 p-2 rounded ${message?.sender === "user" ? "bg-[#e77272]" : ""}`}>
                                        {message.attachments.map((attachment) => (
                                            <div
                                                key={attachment.id}
                                                className={`relative w-full rounded-lg text-white ${attachment.type === "link" || attachment.type === "file" ? "hover:text-blue-200 cursor-pointer" : ""} flex items-center overflow-hidden`}
                                            >
                                                {attachment.type === 'link' ? (
                                                    <a
                                                        href={attachment.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-[10px] text-blue-200 px-1 text-center underline truncate"
                                                    >
                                                        {attachment.url}
                                                    </a>
                                                ) : attachment?.name?.match(/\.(png|jpe?g|gif|webp|bmp|svg)$/i) ? (
                                                    <a
                                                        href={attachment.url}
                                                        download={`${new Date().getTime()}_${attachment.name}`}
                                                        className="hover:underline text-xs"
                                                        title={`Download ${attachment.name}`}
                                                    >
                                                        <Image src={attachment.url} alt={attachment.name} width={100} height={100} className="h-full w-full object-cover" />
                                                    </a>
                                                ) : attachment?.name?.match(/\.(mp4|webm|ogg|mov|avi)$/i) ? (
                                                    <video controls width={200} className="h-full w-full object-cover">
                                                        <source src={attachment.url} type={`video/${attachment.name.split('.').pop()?.toLowerCase()}`} />
                                                        Your browser does not support the video tag.
                                                    </video>
                                                ) : (
                                                    <div className="flex items-center">
                                                        <a
                                                            href={attachment.url}
                                                            download={`${new Date().getTime()}_${attachment.name}`}
                                                            className="hover:underline text-xs"
                                                            title={`Download ${attachment.name}`}
                                                        >
                                                            {attachment.name}
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className='w-full flex items-center justify-between gap-4'>
                                    <p
                                        className={`text-xs mt-1 ${message.sender === 'user'
                                            ? 'text-blue-100'
                                            : 'text-gray-500 text-end'
                                            }`}
                                    >
                                        {formatTime(messageDate)}
                                    </p>
                                    {message.sender === 'user' && (
                                        <p
                                            className={`text-sm font-semibold mt-1 ${message.readAt ? 'text-blue-100' : 'text-gray-300'} cursor-default select-none`}
                                            title={message.readAt ? `Read ${formatTime(new Date(message.readAt))}` : message.deliveredAt ? `Delivered ${formatTime(new Date(message.deliveredAt))}` : `Sent ${formatTime(new Date(message.createdAt))}`}
                                        >
                                            {getStatusIcon(message)}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}