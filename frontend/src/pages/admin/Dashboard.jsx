import AdminLayout from "../../layouts/AdminLayout";
import DashboardCards from "../../components/DashboardCards";

function Dashboard() {
    return (
        <AdminLayout>
            <div className="
bg-gradient-to-r
from-slate-800
via-slate-700
to-slate-800
rounded-2xl
p-8
border
border-slate-700
shadow-lg
">
                <h1 className="text-4xl font-bold text-white">
                    Smart Parking Dashboard
                </h1>

                <p className="text-blue-100 mt-2">
                    Monitor parking slots, vehicles and occupancy in real time
                </p>
            </div>
            <div className="p-8">
                <DashboardCards />
            </div>
        </AdminLayout>
    );
}

export default Dashboard;