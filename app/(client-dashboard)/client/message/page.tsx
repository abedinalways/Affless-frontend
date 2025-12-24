import Sidebar from "./_components/Sidebar";
import MessageBody from "./_components/MessageBody";


export default function page(){
    return(
        <div className="p-4 containers bg-[#f9f9f9] grid">
            <div className="grid grid-cols-[auto_1fr] gap-6 h-full overflow-y-auto" style={{maxHeight: 'calc(100vh - 86px)'}}>
                <div className="p-4 bg-white sticky top-0 h-full rounded-lg shadow-md overflow-y-auto" style={{height: 'calc(100vh - 100px)'}}>
                    <Sidebar />
                </div>
                <div className="h-full">
                    <MessageBody />
                </div>
            </div>
        </div>
    )
}