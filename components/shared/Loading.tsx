export default function Loading(){
    return(
        <div className="h-screen w-full bg-white flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-[#ff4b4b] rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gray-600 text-sm font-medium">Loading...</p>
            </div>
        </div>
    )
}