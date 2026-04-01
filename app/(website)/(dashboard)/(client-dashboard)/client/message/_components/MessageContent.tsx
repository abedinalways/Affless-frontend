import { Message } from "@/app/type";
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
        <div className="p-4 space-y-4 bg-gray-50 relative">
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
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {message.attachments.map((attachment) => (
                                            <div
                                                key={attachment.id}
                                                className="relative h-16 w-16 rounded-lg border border-gray-200 bg-white flex items-center justify-center overflow-hidden"
                                            >
                                                {attachment.type === 'link' ? (
                                                    <a
                                                        href={attachment.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-[10px] text-gray-600 px-1 text-center underline"
                                                    >
                                                        Link
                                                    </a>
                                                ) : attachment?.name?.match(/\.(png|jpe?g|gif|webp|bmp|svg)$/i) ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img src={attachment.url} alt={attachment.name} className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="text-[10px] text-gray-600 px-1 text-center">
                                                        {attachment.name}
                                                    </span>
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