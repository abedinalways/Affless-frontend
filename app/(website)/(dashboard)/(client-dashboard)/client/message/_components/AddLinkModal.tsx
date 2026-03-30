export default function AddLinkModal() {
    return(
        <div className="fixed inset-0 bg-[#0003] backdrop-blur-xs flex items-center justify-center p-4 z-999">
            <div className="w-full max-w-sm bg-white rounded-lg p-4">
                <h2 className="text-lg font-semibold mb-4">Paste Your Link(s) Here</h2>
                <div>
                    <textarea
                        placeholder="https://example.com"
                        className="w-full h-[190px] border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
                    />
                    <button
                        type="button"
                        className="w-full bg-[#e74c4c] text-white px-4 py-2 rounded-md hover:bg-[#c23b3b] transition-colors"
                    >
                        Add Link
                    </button>
                </div>
            </div>
        </div>
    )
}