'use client';

import React, { useEffect, useState } from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: ({ reason }: { reason?: string }) => void;
    onCancel: () => void;
    confirmClassName?: string;
    cancelClassName?: string;
    loading?: boolean;
    reason?: boolean;
}

export default function ConfirmationPopup({
    isOpen,
    title = 'Are you sure?',
    description = 'Please confirm this action.',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel,
    confirmClassName,
    cancelClassName,
    loading = false,
    reason
}: ConfirmationModalProps) {

    const [reasonInput, setReasonInput] = useState("");
    const [error, setError] = useState("");

    const handleConfirm = () => {
        if (reason && !reasonInput) {
            setError("Please provide a reason for this action.");
            return;
        }

        onConfirm({ reason: reasonInput });
    }

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0003] backdrop-blur-xs" onClick={onCancel} />
            <div className="relative w-full max-w-sm rounded-xl bg-white p-5 shadow-xl space-y-2">
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                {description && (
                    <p className="text-sm text-gray-600">{description}</p>
                )}
                <div className=''>
                    {reason && <textarea
                        name="reason"
                        id="reason"
                        placeholder="Enter reason for this action..."
                        className="w-full h-20 border rounded-lg resize-none focus-ring-2 focus-ring-gray-300 px-2 py-1 text-sm"
                        value={reasonInput}
                        onChange={(e) => {
                            setReasonInput(e.target.value);
                            if (e.target.value) {
                                setError("");
                            }
                        }}
                    ></textarea>}
                    {error && <p className="text-xs text-red-500">{error}</p>}
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                        className={`${cancelClassName || 'px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-100'}`}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={handleConfirm}
                        className={
                            confirmClassName ||
                            `px-3 py-1.5 rounded-lg text-sm font-medium bg-[#1570EF] text-white hover:bg-[#1266DD] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#1570EF]`
                        }
                        disabled={loading}
                    >
                        {loading ? "Loading..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
