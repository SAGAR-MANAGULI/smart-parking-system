import { useState, useEffect } from "react";
import axios from "axios";
import { LayoutGrid, CheckCircle2, Ban, RefreshCw, Layers } from "lucide-react";

function DashboardCards() {
    const [totalSlots, setTotalSlots] = useState(0);
    const [availableSlots, setAvailableSlots] = useState(0);
    const [occupiedSlots, setOccupiedSlots] = useState(0);
    const [availablePercentage, setAvailablePercentage] = useState(0);
    const [occupiedPercentage, setOccupiedPercentage] = useState(0);
    const [parkedVehicles, setParkedVehicles] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchTotalSlots();
    }, []);

    const fetchTotalSlots = async () => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: { Authorization: `Bearer ${token}` },
            };

            const response = await axios.get("http://localhost:5000/api/settings", config);
            setTotalSlots(response.data.totalSlots);

            const vehicleResponse = await axios.get("http://localhost:5000/api/vehicles", config);

            const occupied = vehicleResponse.data.data.filter(
                vehicle => vehicle.vehicleStatus === "Parked"
            ).length;

            setOccupiedSlots(occupied);
            setParkedVehicles(
                vehicleResponse.data.data
                    .filter(v => v.vehicleStatus === "Parked")
                    .map(v => v.slotNumber)
            );

            const available = response.data.totalSlots - occupied;
            setAvailableSlots(available);

            if (response.data.totalSlots > 0) {
                setAvailablePercentage(((available / response.data.totalSlots) * 100).toFixed(0));
                setOccupiedPercentage(((occupied / response.data.totalSlots) * 100).toFixed(0));
            }

            setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="p-6 bg-slate-950 min-h-screen text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white">

            {/* Header / Command Center Panel */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 bg-slate-900 border-t border-slate-800 border-b-2 border-b-slate-950/50 p-5 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.5),_inset_0_1px_2px_rgba(255,255,255,0.05)]">
                <div>
                    <h1 className="text-3xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent uppercase">
                        Real-Time Slot Tracking
                    </h1>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-2 font-mono tracking-wide">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        SYSTEM ACTIVE // LIVE REFRESH • LAST CHECK: {lastUpdated}
                    </p>
                </div>
                <button
                    onClick={fetchTotalSlots}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-5 py-3 bg-slate-800 border-t border-slate-700 border-b-2 border-b-slate-950 rounded-xl hover:bg-slate-700 text-xs font-bold uppercase tracking-wider transition-all duration-200 active:translate-y-0.5 active:border-b-0 disabled:opacity-50 shadow-md text-slate-200 hover:text-white"
                >
                    <RefreshCw className={`w-4 h-4 text-indigo-400 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh Metrics
                </button>
            </div>

            {/* 3D Summary Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Total Capacity Card */}
                <div className="relative overflow-hidden group bg-gradient-to-b from-blue-950/60 to-blue-900/40 border-t-2 border-blue-500/40 border-x border-x-blue-900/30 border-b-4 border-b-blue-950 p-6 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.4),_0_0_15px_rgba(59,130,246,0.1)] hover:shadow-[0_20px_40px_rgba(59,130,246,0.25),_inset_0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <LayoutGrid className="w-28 h-28 text-blue-400" />
                    </div>
                    <div className="flex items-center gap-2.5 text-blue-400 font-black tracking-widest text-xs uppercase">
                        <LayoutGrid className="w-4 h-4 stroke-[3]" />
                        Total Capacity
                    </div>
                    <p className="text-6xl font-black mt-4 text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {totalSlots}
                    </p>
                    <div className="mt-4 text-[11px] font-mono tracking-wider text-blue-300/60 uppercase">Configured Base Units</div>
                </div>

                {/* Available Slots Card */}
                <div className="relative overflow-hidden group bg-gradient-to-b from-emerald-950/60 to-emerald-900/40 border-t-2 border-emerald-500/40 border-x border-x-emerald-900/30 border-b-4 border-b-emerald-950 p-6 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.4),_0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_20px_40px_rgba(16,185,129,0.25),_inset_0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <CheckCircle2 className="w-28 h-28 text-emerald-400" />
                    </div>
                    <div className="flex items-center gap-2.5 text-emerald-400 font-black tracking-widest text-xs uppercase">
                        <CheckCircle2 className="w-4 h-4 stroke-[3]" />
                        Available Slots
                    </div>
                    <p className="text-6xl font-black mt-4 text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {availableSlots}
                    </p>
                    <div className="mt-4 text-[11px] font-mono tracking-wider text-emerald-300/60 uppercase">Ready Access Spaces</div>
                </div>

                {/* Occupied Slots Card */}
                <div className="relative overflow-hidden group bg-gradient-to-b from-rose-950/60 to-rose-900/40 border-t-2 border-rose-500/40 border-x border-x-rose-900/30 border-b-4 border-b-rose-950 p-6 rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.4),_0_0_15px_rgba(244,63,94,0.1)] hover:shadow-[0_20px_40px_rgba(244,63,94,0.25),_inset_0_0_20px_rgba(244,63,94,0.15)] transition-all duration-300 transform hover:-translate-y-1">
                    <div className="absolute -top-4 -right-4 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Ban className="w-28 h-28 text-rose-400" />
                    </div>
                    <div className="flex items-center gap-2.5 text-rose-400 font-black tracking-widest text-xs uppercase">
                        <Ban className="w-4 h-4 stroke-[3]" />
                        Occupied Slots
                    </div>
                    <p className="text-6xl font-black mt-4 text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                        {occupiedSlots}
                    </p>
                    <div className="mt-4 text-[11px] font-mono tracking-wider text-rose-300/60 uppercase">Engaged Secure Nodes</div>
                </div>

            </div>

            {/* Glowing Analytical Trackers */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 mt-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <h2 className="text-sm font-black tracking-widest text-slate-300 uppercase mb-6 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    Parking Occupancy Overview                </h2>

                <div className="space-y-6">
                    {/* Available Bar Container */}
                    <div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                            <span className="text-slate-400">Available Ratio</span>
                            <span className="text-emerald-400 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-md text-xs font-mono">{availablePercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-lg h-5 p-1 border border-slate-800 shadow-inner">
                            <div
                                className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-md transition-all duration-500 ease-out shadow-[0_0_15px_rgba(16,185,129,0.6)] relative overflow-hidden"
                                style={{ width: `${availablePercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* Occupied Bar Container */}
                    <div>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-wider mb-2">
                            <span className="text-slate-400">Occupied Ratio</span>
                            <span className="text-rose-400 bg-rose-950/80 border border-rose-500/30 px-2 py-0.5 rounded-md text-xs font-mono">{occupiedPercentage}%</span>
                        </div>
                        <div className="w-full bg-slate-950 rounded-lg h-5 p-1 border border-slate-800 shadow-inner">
                            <div
                                className="bg-gradient-to-r from-rose-600 to-red-500 h-full rounded-md transition-all duration-500 ease-out shadow-[0_0_15px_rgba(244,63,94,0.6)] relative overflow-hidden"
                                style={{ width: `${occupiedPercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Deep Contrast 3D Interactive Structural Grid Map */}
            <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 mt-8 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h2 className="text-sm font-black tracking-widest text-slate-300 uppercase">
                        Live Parking Slot Map                    </h2>

                    {/* Industrial Legend Keys */}
                    <div className="flex gap-4 text-[11px] font-black uppercase tracking-wider">
                        <div className="flex items-center gap-2 bg-slate-950 border border-emerald-500/30 px-3 py-1.5 rounded-xl text-emerald-400 shadow-sm">
                            <span className="h-2.5 w-2.5 rounded-sm bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]"></span>
                            Available Node
                        </div>
                        <div className="flex items-center gap-2 bg-slate-950 border border-rose-500/30 px-3 py-1.5 rounded-xl text-rose-400 shadow-sm">
                            <span className="h-2.5 w-2.5 rounded-sm bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,1)] animate-pulse"></span>
                            Occupied Node
                        </div>
                    </div>
                </div>

                {/* Solid 3D Box Blocks Layout */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {[...Array(totalSlots)].map((_, index) => {
                        const slot = `S${index + 1}`;
                        const occupied = parkedVehicles.includes(slot);

                        return (
                            <div
                                key={slot}
                                title={occupied ? `${slot} - Occupied` : `${slot} - Available`}
                                className={`
                                    h-14 w-full flex flex-col items-center justify-center rounded-xl text-xs font-black tracking-widest
                                    cursor-pointer border-x border-t transition-all duration-200 select-none 
                                    active:translate-y-1 active:border-b-2 transform hover:-translate-y-1
                                    ${occupied
                                        ? "bg-gradient-to-b from-rose-600 to-rose-700 border-t-rose-400 border-x-rose-700 border-b-4 border-b-rose-900 text-white shadow-[0_6px_15px_rgba(225,29,72,0.4),_inset_0_1px_0_rgba(255,255,255,0.2)] animate-pulse"
                                        : "bg-gradient-to-b from-emerald-600 to-emerald-700 border-t-emerald-400 border-x-emerald-700 border-b-4 border-b-emerald-900 text-white shadow-[0_6px_15px_rgba(5,150,105,0.4),_inset_0_1px_0_rgba(255,255,255,0.2)]"
                                    }
                                `}
                            >
                                <span>{slot}</span>
                                <span className="text-[9px] opacity-60 font-medium mt-0.5">
                                    {occupied ? "BUSY" : "OPEN"}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default DashboardCards;