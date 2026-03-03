'use client';

import React from 'react';

interface ConfirmationModalProps {
    isOpen: boolean;
    title?: string;
    description?: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmClassName?: string;
    cancelClassName?: string;
    loading?: boolean;
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
}: ConfirmationModalProps) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-999 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#0003] backdrop-blur-xs" onClick={onCancel} />
            <div className="relative w-full max-w-sm rounded-xl bg-white p-5 shadow-xl">
                <h3 className="text-base font-semibold text-gray-900">{title}</h3>
                {description && (
                    <p className="mt-2 text-sm text-gray-600">{description}</p>
                )}
                <div className="mt-4 flex items-center justify-end gap-2">
                    <button
                        type="button"
                        onClick={onCancel}
                        className={`${cancelClassName || 'px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'}`}
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        className={
                            confirmClassName ||
                            `px-3 py-1.5 rounded-lg text-sm font-medium bg-[#1570EF] text-white hover:bg-[#1266DD] ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`
                        }
                        disabled={loading}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
