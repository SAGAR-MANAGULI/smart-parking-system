import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

import {
    Car,
    CreditCard,
    IndianRupee,
    ParkingSquare,
} from "lucide-react";

export default function Reports() {
    /* -------------------- State -------------------- */
    const [totalVehicles, setTotalVehicles] = useState(0);
    const [totalPayments, setTotalPayments] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [availableSlots, setAvailableSlots] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(true);

    /* -------------------- Helper: fetch all data -------------------- */
    const fetchReports = async () => {
        try {
            // Guard for SSR / environments where window is undefined
            const token =
                typeof window !== "undefined"
                    ? localStorage.getItem("token")
                    : null;

            if (!token) {
                setErrorMsg("No auth token – please log in.");
                return;
            }

            const headers = { Authorization: `Bearer ${token}` };

            // ---- Vehicles ----
            const vehicleRes = await axios.get(
                "https://smart-parking-system-f269.onrender.com/api/vehicles",
                { headers }
            );
            const vehiclesArray = Array.isArray(vehicleRes.data)
                ? vehicleRes.data
                : vehicleRes.data?.data || [];
            setTotalVehicles(vehiclesArray.length);

            // ---- Payments ----
            const paymentRes = await axios.get(
                "https://smart-parking-system-f269.onrender.com/api/payments",
                { headers }
            );
            const paymentsArray = Array.isArray(paymentRes.data)
                ? paymentRes.data
                : paymentRes.data?.data || [];
            setTotalPayments(paymentsArray.length);

            // ---- Revenue ----

            const revenue = paymentsArray.reduce(
                (sum, p) => sum + (p.amount || 0),
                0
            );
            setTotalRevenue(revenue);

            // ---- Slots ----
            const slotRes = await axios.get(
                "https://smart-parking-system-f269.onrender.com/api/slots",
                { headers }
            );
            const available = (slotRes.data?.filter?.(
                (slot) => !slot.isOccupied
            ) || []).length;
            setAvailableSlots(available);
        } catch (error) {
            console.error("Failed to fetch reports:", error);
            setErrorMsg(
                error?.response?.data?.message ||
                "An unexpected error occurred while loading reports."
            );
        } finally {
            setLoading(false);
        }
    };

    /* -------------------- Lifecycle -------------------- */
    useEffect(() => {
        fetchReports();
    }, []);

    /* -------------------- UI -------------------- */
    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <p className="text-xl">Loading reports…</p>
                </div>
            </AdminLayout>
        );
    }

    if (errorMsg) {
        return (
            <AdminLayout>
                <div className="p-8">
                    <p className="text-red-600 text-lg">{errorMsg}</p>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold">
                    Reports &amp; Analytics
                </h2>
                <p className="text-slate-400 mt-1">
                    Parking system overview and statistics
                </p>
            </div>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Total Vehicles */}
                <div
                    className="
                        bg-gradient-to-r
                        from-blue-600
                        to-blue-800
                        p-6
                        rounded-xl
                        text-white
                        hover:scale-105
                        transition-all
                        duration-300
                        shadow-lg
                    "
                >
                    <Car size={30} className="mb-4" />
                    <h3 className="text-blue-100">Total Vehicles</h3>
                    <p className="text-4xl font-bold mt-3">{totalVehicles}</p>
                </div>

                {/* Total Payments */}
                <div
                    className="
                        bg-gradient-to-r
                        from-green-600
                        to-green-800
                        p-6
                        rounded-xl
                        text-white
                        hover:scale-105
                        transition-all
                        duration-300
                        shadow-lg
                    "
                >
                    <CreditCard size={30} className="mb-4" />
                    <h3 className="text-green-100">Total Payments</h3>
                    <p className="text-4xl font-bold mt-3">{totalPayments}</p>
                </div>

                {/* Revenue */}
                <div
                    className="
                        bg-gradient-to-r
                        from-purple-600
                        to-purple-800
                        p-6
                        rounded-xl
                        text-white
                        hover:scale-105
                        transition-all
                        duration-300
                        shadow-lg
                    "
                >
                    <IndianRupee size={30} className="mb-4" />
                    <h3 className="text-purple-100">Total Revenue</h3>
                    <p className="text-4xl font-bold mt-3">
                        ₹{totalRevenue}
                    </p>
                </div>

                {/* Available Slots */}

            </div>
        </AdminLayout>
    );
}
