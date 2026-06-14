import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";

export default function Payments() {

    const [vehicles, setVehicles] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState("Cash");

    const fetchVehicles = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/vehicles",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const pendingVehicles =
                response.data.data.filter(
                    vehicle => vehicle.paymentStatus === "Pending"
                );

            setVehicles(pendingVehicles);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);


    const filtered = vehicles.filter(v => v.paymentStatus === "Pending");

    const handlePayment = async (vehicleId) => {
        try {
            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/payments/create",
                {
                    vehicleId,
                    paymentMethod
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Payment Success");

            fetchVehicles();

        } catch (error) {
            console.log(error);
            alert("Payment Failed");
        }
    };

    const handleStopParking = async (vehicleId) => {

        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/payments/stop",
                {
                    vehicleId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Parking Stopped Successfully");

            fetchVehicles();

        } catch (error) {

            console.log(error);

            alert("Failed To Stop Parking");

        }

    };



    const handleExport = () => {
        let csv = "Vehicle Number,Owner Name,Amount,Payment Method,Date\n";

        vehicles.forEach(v => {
            csv += `"${v.vehicleNumber}","${v.ownerName}","0","${paymentMethod}","${new Date().toISOString()}"\n`;
        });


        const blob = new Blob([csv], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "payments.csv";
        a.click();
    };

    return (
        <AdminLayout>

            <h2 className="text-2xl font-bold mb-6">
                Payments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 rounded-xl">
                    <h3 className="text-blue-100">
                        Pending Payments
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

            <div className="
bg-slate-800
rounded-lg
overflow-hidden
border
border-slate-700
shadow-lg
">
                <table className="w-full border-collapse">

                    <thead className="bg-slate-700">

                        <tr>
                            <th className="p-4 text-left border border-slate-600">Vehicle Number</th>
                            <th className="p-4 text-left border border-slate-600">Owner Name</th>
                            <th className="p-4 text-left border border-slate-600">Email</th>
                            <th className="p-4 text-left border border-slate-600">Type</th>
                            <th className="p-4 text-left border border-slate-600">Entry Time</th>
                            <th className="p-4 text-left border border-slate-600">Exit Time</th>
                            <th className="p-4 text-left border border-slate-600">Amount</th>
                            <th className="p-4 text-left border border-slate-600">Payment Mode</th>
                            <th className="p-4 text-center border border-slate-600">Action</th>
                        </tr>

                    </thead>

                    <tbody>

                        {vehicles.map((vehicle) => (

                            <tr
                                key={vehicle._id}
                                className="hover:bg-slate-700/30 transition-all"
                            >

                                <td className="p-4 border border-slate-700">
                                    {vehicle.vehicleNumber}
                                </td>

                                <td className="p-4 border border-slate-700">
                                    {vehicle.ownerName}
                                </td>

                                <td className="p-4 border border-slate-700">
                                    {vehicle.email}
                                </td>

                                <td className="p-4 border border-slate-700">
                                    {vehicle.vehicleType}
                                </td>

                                <td className="p-4 border border-slate-700">
                                    {new Date(vehicle.entryTime).toLocaleString()}
                                </td>

                                <td className="p-4 border border-slate-700">
                                    {vehicle.exitTime
                                        ? new Date(vehicle.exitTime).toLocaleString()
                                        : "Still Parked"}
                                </td>

                                <td className="p-4 border border-slate-700 font-semibold text-green-400">
                                    {vehicle.amount || "In Parking"}
                                </td>

                                <td className="p-4 border border-slate-700">

                                    <select
                                        className="bg-slate-700 p-2 rounded w-full"
                                        value={paymentMethod}
                                        onChange={(e) =>
                                            setPaymentMethod(e.target.value)
                                        }
                                    >
                                        <option value="Cash">Cash</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Card">Card</option>
                                    </select>

                                </td>

                                <td className="p-4 border border-slate-700">

                                    <div className="flex justify-center gap-2">

                                        <button
                                            onClick={() =>
                                                handleStopParking(vehicle._id)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-500 px-4 py-2 rounded"
                                        >
                                            Stop
                                        </button>

                                        <button
                                            onClick={() =>
                                                handlePayment(vehicle._id)
                                            }
                                            className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded"
                                        >
                                            Pay
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
}       