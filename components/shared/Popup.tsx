'use client';

import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    description?: string;
    timeout?: number;
    onClose?: () => void;
}

export default function Popup({
    isOpen,
    title,
    description = 'Please confirm this action.',
    timeout,
    onClose,
}: ConfirmationModalProps) {
    if (!isOpen) return null;
    
    React.useEffect(() => {
        if (timeout) {
            const timer = setTimeout(() => {
                onClose && onClose();
            }, timeout);
            return () => clearTimeout(timer);
        }
    }, [timeout]);

    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0003] backdrop-blur-xs" />
            <div className="relative w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                {description && (
                    <p className="mt-2 text-sm text-gray-600 text-center">{description}</p>
                )}
            </div>
        </div>
    );
}
