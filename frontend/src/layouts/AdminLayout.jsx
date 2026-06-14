import Sidebar from "../components/Sidebar";

function AdminLayout({ children }) {
    return (
        <div className="flex h-screen bg-slate-950 text-white">
            <Sidebar />

            <div className="flex-1 overflow-y-auto">
                <div className="p-6">


                    {children}
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;