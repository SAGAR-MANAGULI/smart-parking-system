import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function ParkingHistory() {

    const [vehicles, setVehicles] = useState([]);

    const fetchHistory = async () => {
        try {

            const response = await axios.get(
                "http://localhost:5000/api/vehicles"
            );

            setVehicles(response.data.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);


    const handleExport = () => {
        // convert array to CSV
        const csv = vehicles.map(v => [
            `"${v.vehicleNumber}"`,
            `"${v.ownerName}"`,
            `"${v.vehicleType}"`,
            `"${new Date(v.entryTime).toLocaleString()}"`,
            `"${v.exitTime ? new Date(v.exitTime).toLocaleString() : "-"}"`,
            `"₹${v.amount}"`,
            `"${v.paymentMethod}"`,
            `"${v.paymentStatus}"`
        ]).join("\n");

        const blob = new Blob(["Vehicle Number,Owner,Type,Entry Time,Exit Time,Amount,Payment Method,Status\n" + csv], {
            type: "text/csv"
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "parking_history.csv";
        a.click();
    };


    return (
        <AdminLayout>

            <>
                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-2xl font-bold">
                        Parking History
                    </h2>

                    <button
                        onClick={handleExport}
                        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
                    >
                        Export CSV
                    </button>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 rounded-xl">
                        <h3 className="text-blue-100">
                            Total Records
                        </h3>

                        <p className="text-4xl font-bold mt-2">
                            {vehicles.length}
                        </p>
                    </div>



                    <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-5 rounded-xl">
                        <h3 className="text-purple-100">
                            2-Wheelers
                        </h3>

                        <p className="text-4xl font-bold mt-2">
                            {
                                vehicles.filter(
                                    v => v.vehicleType === "2-Wheeler"
                                ).length
                            }
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-5 rounded-xl">
                        <h3 className="text-orange-100">
                            4-Wheelers
                        </h3>

                        <p className="text-4xl font-bold mt-2">
                            {
                                vehicles.filter(
                                    v => v.vehicleType === "4-Wheeler"
                                ).length
                            }
                        </p>
                    </div>

                </div>

                <div className="bg-slate-800 rounded-lg overflow-hidden border border-slate-700 shadow-lg">

                    <table className="w-full border-collapse">

                        <thead className="bg-slate-700">

                            <tr>

                                <th className="p-4 text-left border border-slate-600">Vehicle Number</th>

                                <th className="p-4 text-left border border-slate-600">Owner Name</th>

                                <th className="p-4 text-left border border-slate-600">Email</th>

                                <th className="p-4 text-left border border-slate-600">Vehicle Type</th>

                                <th className="p-4 text-left border border-slate-600">Slot Number</th>

                                <th className="p-4 text-left border border-slate-600">Entry Time</th>

                                <th className="p-4 text-left border border-slate-600">Exit Time</th>

                                <th className="p-4 text-left border border-slate-600">Amount</th>

                                <th className="p-4 text-left border border-slate-600">Payment Method</th>

                                <th className="p-4 text-left border border-slate-600">Payment Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {vehicles.map(vehicle => (

                                <tr
                                    key={vehicle._id}
                                    className="hover:bg-slate-700/30 transition-all duration-200"
                                >

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.vehicleNumber}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.ownerName}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.email || "-"}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.vehicleType}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.slotNumber || "-"}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {
                                            vehicle.entryTime
                                                ? new Date(vehicle.entryTime).toLocaleString()
                                                : "-"
                                        }
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {
                                            vehicle.exitTime
                                                ? new Date(vehicle.exitTime).toLocaleString()
                                                : "-"
                                        }
                                    </td>

                                    <td className="p-4 border border-slate-700 text-green-400 font-semibold">
                                        ₹{vehicle.amount || 0}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.paymentMethod || "-"}
                                    </td>

                                    <td className="p-4 border border-slate-700">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${vehicle.paymentStatus === "Paid"
                                                    ? "bg-green-500/20 text-green-400"
                                                    : "bg-yellow-500/20 text-yellow-400"
                                                }`}
                                        >
                                            {vehicle.paymentStatus}
                                        </span>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>
            </>



        </AdminLayout>
    );
}