import { useState, useEffect } from "react";
import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
export default function Vehicles() {

    const [vehicles, setVehicles] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [vehicleTypeFilter, setVehicleTypeFilter] = useState("All");

    const [showForm, setShowForm] = useState(false);

    const [ownerName, setOwnerName] = useState("");
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("2-Wheeler");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");

    const fetchVehicles = async () => {
        try {

            const token = localStorage.getItem("token");
            const response =
                await axios.get(
                    "http://localhost:5000/api/vehicles",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

            console.log(response.data);

            setVehicles(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);


    const handleDelete = async (id) => {
        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `http://localhost:5000/api/vehicles/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchVehicles();

        } catch (error) {
            console.log(error);
        }
    };

    const handleSaveVehicle = async () => {
        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "http://localhost:5000/api/vehicles/add",
                {
                    ownerName,
                    vehicleNumber,
                    vehicleType,
                    phoneNumber,
                    email,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Vehicle Added Successfully");

            fetchVehicles();

            setOwnerName("");
            setVehicleNumber("");
            setVehicleType("2-Wheeler");
            setPhoneNumber("");
            setEmail("");

            setShowForm(false);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Something Went Wrong"
            );

        }
    };

    const filteredVehicles =
        vehicles.filter(v => {
            const matchesSearch =
                v.vehicleNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                v.ownerName.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesType =
                vehicleTypeFilter === "All" || v.vehicleType === vehicleTypeFilter;

            return matchesSearch && matchesType;
        });

    return (
        <AdminLayout>

            <h2 className="text-2xl font-bold mb-6">All Vehicles</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">

                <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 rounded-xl">
                    <h3 className="text-blue-100">
                        Total Vehicles
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {vehicles.length}
                    </p>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-800 p-5 rounded-xl">
                    <h3 className="text-green-100">
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

                <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-5 rounded-xl">
                    <h3 className="text-purple-100">
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

                <div className="bg-gradient-to-r from-orange-500 to-orange-700 p-5 rounded-xl">
                    <h3 className="text-orange-100">
                        Currently Parked
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {
                            vehicles.filter(
                                v => v.vehicleStatus === "Parked"
                            ).length
                        }
                    </p>
                </div>

            </div>

            <div className="flex justify-end mb-4">

                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg"
                >
                    + Add Vehicle
                </button>

            </div>

            {showForm && (

                <div className="bg-slate-800 p-4 rounded-lg mb-6">

                    <h3 className="text-lg font-semibold mb-3">Add New Vehicle</h3>

                    <div className="grid grid-cols-2 gap-4 mb-4">

                        <div>
                            <label className="block text-sm">Owner Name</label>
                            <input
                                type="text"
                                className="w-full bg-slate-900 p-2 rounded-lg mt-1"
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm">Vehicle Number</label>
                            <input
                                type="text"
                                className="w-full bg-slate-900 p-2 rounded-lg mt-1"
                                value={vehicleNumber}
                                onChange={(e) => setVehicleNumber(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm">Vehicle Type</label>
                            <select
                                className="w-full bg-slate-900 p-2 rounded-lg mt-1"
                                value={vehicleType}
                                onChange={(e) => setVehicleType(e.target.value)}
                            >
                                <option value="2-Wheeler">2-Wheeler</option>
                                <option value="4-Wheeler">4-Wheeler</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm">Phone Number</label>
                            <input
                                type="text"
                                className="w-full bg-slate-900 p-2 rounded-lg mt-1"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-sm">
                                Email
                            </label>

                            <input
                                type="email"
                                className="w-full bg-slate-900 p-2 rounded-lg mt-1"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>



                    </div>

                    <button
                        onClick={handleSaveVehicle}
                        className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg mr-2"
                    >
                        Save Vehicle
                    </button>

                    <button
                        onClick={() => setShowForm(false)}
                        className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg"
                    >
                        Cancel
                    </button>

                </div>

            )}

            {/* Search and Filter */}
            <div className="flex gap-4 mb-6">

                <input
                    type="text"
                    placeholder="Search by vehicle number or owner..."
                    className="flex-1 bg-slate-800 p-3 rounded-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="bg-slate-800 p-3 rounded-lg"
                    value={vehicleTypeFilter}
                    onChange={(e) => setVehicleTypeFilter(e.target.value)}
                >
                    <option value="All">All Types</option>
                    <option value="2-Wheeler">2-Wheeler</option>
                    <option value="4-Wheeler">4-Wheeler</option>
                </select>

            </div>

            {/* Vehicles Table */}
            <div className="bg-slate-800 rounded-lg shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-slate-700">
                        <tr>
                            <th className="p-4 text-left border border-slate-600">Vehicle Number</th>
                            <th className="p-4 text-left border border-slate-600">Owner Name</th>
                            <th className="p-4 text-left border border-slate-600">Owner Contact</th>
                            <th className="p-4 text-left border border-slate-600">Email</th>
                            <th className="p-4 text-left border border-slate-600">Slot Number</th>
                            <th className="p-4 text-left border border-slate-600">Vehicle Type</th>
                            <th className="p-4 text-left border border-slate-600">Entry Time</th>
                            <th className="p-4 text-left border border-slate-600">Status</th>
                            <th className="p-4 text-left border border-slate-600">Actions</th>

                        </tr>
                    </thead>
                    <tbody>

                        {filteredVehicles.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="7"
                                    className="p-4 text-center text-slate-400"
                                >
                                    No Vehicles Found
                                </td>
                            </tr>
                        ) :
                            filteredVehicles.map((vehicle) => (

                                <tr
                                    key={vehicle._id}
                                    className="
        hover:bg-slate-700/40
        transition-all
        duration-200
    "
                                >
                                    <td className="p-4 border border-slate-700">
                                        {vehicle.vehicleNumber}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.ownerName}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.phoneNumber}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.email}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.slotNumber}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {vehicle.vehicleType}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        {new Date(vehicle.entryTime).toLocaleString()}
                                    </td>

                                    <td className="p-4 border border-slate-700">
                                        <div className="flex gap-3 items-center">

                                            <span
                                                className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${vehicle.vehicleStatus === "Parked"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : "bg-slate-500/20 text-slate-300"
                                                    }
                `}
                                            >
                                                {vehicle.vehicleStatus}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-4 border border-slate-700">

                                        <div
                                            className="flex gap-4"
                                        >
                                            <button
                                                onClick={() => handleDelete(vehicle._id)}
                                                className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg"
                                            >
                                                Delete
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div >

        </AdminLayout >
    );

}