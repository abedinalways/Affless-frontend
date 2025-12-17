'use client'

import { useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

type propType = {
    Icon: React.ElementType;
    title: string;
    message: string;
    button: string;
    color?: string;
    OnCancel: () => void;
    OnConfirm: () => void;
}


export default function ConfirmationPopup({Icon,title,message,button,color,OnCancel,OnConfirm}:propType) {
    
    const [loading,setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        setTimeout(() => {
            OnConfirm();
            setLoading(false);
        }, 1000);
    }
    return (
        <div className="fixed inset-0 bg-[#0003] bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-xs" onClick={OnCancel}>
            <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-sm" onClick={(e)=>e.stopPropagation()}>
                <div className="flex flex-col items-center">
                    <div className="bg-red-100 rounded-full p-4 mb-4">
                        <Icon className={`w-8 h-8 ${color ? color : "text-red-600"}`} />
                    </div>
                    <h2 className="text-xl font-semibold mb-2">{title}</h2>
                    <p className="text-gray-600 text-center mb-6">{message}</p>
                    <div className="flex justify-between space-x-4 w-full">
                        <button className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 cursor-pointer" onClick={OnCancel}>Cancel</button>
                        <button disabled={loading} className="bg-red-600 text-white px-4 py-2 rounded hover:opacity-80 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" onClick={handleLogout}>{loading?"Loading...":button}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}