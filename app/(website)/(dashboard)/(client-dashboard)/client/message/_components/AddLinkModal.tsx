"use client"

import { useState } from "react"

type PropTypes = {
    onAddLinks: (links: string[]) => void;
}

export default function AddLinkModal({ onAddLinks }: PropTypes) {
    const [link, setLink] = useState('');

    const handleAddLink = () => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
            const links = (link.match(urlRegex) || []).filter(Boolean);
            if (links.length > 0) {
                onAddLinks(links);
                setLink('');
            }
    }
    return (
        <div className="fixed inset-0 bg-[#0003] backdrop-blur-xs flex items-center justify-center p-4 z-999">
            <div className="w-full max-w-sm bg-white rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Paste Your Link(s) Here</h2>
                <div>
                    <textarea
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full h-[190px] border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    />
                    <button
                        type="button"
                        onClick={handleAddLink}
                        disabled={!link.trim()}
                        className="w-full bg-[#e74c4c] text-white px-4 py-2 rounded-md hover:bg-[#c23b3b] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Add Link
                    </button>
                </div>
            </div>
        </div>
    )
}