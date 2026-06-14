import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

import { LayoutGrid, Car, DollarSign, BarChart3, Settings, LogOut } from "lucide-react";

function Sidebar() {

    const navigate = useNavigate();

    const navItems = [
        { path: "/dashboard", label: "Dashboard", icon: LayoutGrid },

        { path: "/dashboard/vehicles", label: "Vehicles", icon: Car },


        { path: "/dashboard/payments", label: "Payments", icon: DollarSign },

        { path: "/dashboard/history", label: "Parking History", icon: BarChart3 },

        { path: "/dashboard/reports", label: "Reports & Analytics", icon: BarChart3 },

        { path: "/dashboard/settings", label: "Settings", icon: Settings },


    ];

    const currentPath = window.location.pathname;

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("admin");

        window.location.href = "/";

    };


    return (
        <aside className="w-64 bg-slate-950 h-full border-r border-slate-800">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800">
                <Link to="/dashboard" className="flex items-center gap-2 group">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl group-hover:scale-110 transition-transform duration-200">
                        <Car className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight">
                        Smart<span className="text-blue-400">Parking</span>
                    </span>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPath === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                                ? "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-sm"
                                : "text-slate-400 hover:text-white hover:bg-slate-800"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Logout */}
            <div className="absolute bottom-4 left-4">
                <button
                    onClick={handleLogout}
                    className="
            flex
            items-center
            gap-3
            px-4
            py-3
            w-56
            rounded-xl
            bg-slate-800
            border
            border-slate-700
            text-slate-300
            hover:bg-slate-700
            hover:text-red-400
            transition-all
            duration-300
        "
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;