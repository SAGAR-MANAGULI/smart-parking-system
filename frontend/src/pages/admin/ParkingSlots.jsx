import axios from "axios";
import AdminLayout from "../../layouts/AdminLayout";
import { useState, useEffect } from "react";

function ParkingSlots() {
    const [showForm, setShowForm] = useState(false);
    const [slotNumber, setSlotNumber] = useState("");
    const [status, setStatus] = useState("Available");
    const [slots, setSlots] = useState([]);

    const handleSaveSlot = async () => {
        const fetchSlots = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    "https://smart-parking-system-f269.onrender.com/api/slots",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setSlots(response.data);

            } catch (error) {
                console.log(error);
            }
        };
        try {

            const token = localStorage.getItem("token");

            await axios.post(
                "https://smart-parking-system-f269.onrender.com/api/slots/create",
                {
                    slotNumber: slotNumber,
                    isOccupied: status === "Occupied",
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Slot Created Successfully");

        } catch (error) {
            console.log(error);
            alert("Failed To Create Slot");
        }
    };

    const fetchSlots = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await axios.get(
                "https://smart-parking-system-f269.onrender.com/api/slots",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSlots(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSlots();
    }, []);

    const handleDelete = async (id) => {
        try {

            const token = localStorage.getItem("token");

            await axios.delete(
                `https://smart-parking-system-f269.onrender.com/api/slots/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            fetchSlots();

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AdminLayout>
            <h2 className="text-2xl font-bold mb-6">
                Parking Slots
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

                <div className="
        bg-gradient-to-r
        from-blue-600
        to-blue-800
        p-5
        rounded-xl
        hover:scale-105
        transition-all
        duration-300
    ">
                    <h3 className="text-blue-100">
                        Total Slots
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {slots.length}
                    </p>
                </div>

                <div className="
        bg-gradient-to-r
        from-green-600
        to-green-800
        p-5
        rounded-xl
        hover:scale-105
        transition-all
        duration-300
    ">
                    <h3 className="text-green-100">
                        Available
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {
                            slots.filter(
                                slot => !slot.isOccupied
                            ).length
                        }
                    </p>
                </div>

                <div className="
        bg-gradient-to-r
        from-red-600
        to-red-800
        p-5
        rounded-xl
        hover:scale-105
        transition-all
        duration-300
    ">
                    <h3 className="text-red-100">
                        Occupied
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {
                            slots.filter(
                                slot => slot.isOccupied
                            ).length
                        }
                    </p>
                </div>

            </div>

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg font-medium"
                >
                    + Add Slot
                </button>
                {showForm && (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <input
                                type="text"
                                placeholder="Slot Number"
                                className="bg-slate-800 p-3 rounded-lg"
                                value={slotNumber}
                                onChange={(e) => setSlotNumber(e.target.value)}
                            />



                            <select
                                className="bg-slate-800 p-3 rounded-lg"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                            >                                   <option>Available</option>
                                <option>Occupied</option>
                            </select>

                        </div>

                        <button
                            onClick={handleSaveSlot}
                            className="mt-4 bg-green-600 hover:bg-green-500 px-4 py-2 rounded-lg"
                        >
                            Save Slot
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">

                <table className="w-full">
                    <thead className="bg-slate-800">
                        <tr>
                            <th className="p-4 text-left">Slot Number</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {slots.map((slot) => (
                            <tr
                                key={slot._id}
                                className="
                                    border-t
                                    border-slate-800
                                    hover:bg-slate-800/40
                                    transition-all
                                    duration-200
                                "
                            >
                                <td className="p-4">

                                    <span className="
        bg-blue-500/20
        text-blue-300
        px-3
        py-1
        rounded-lg
        font-medium
    ">
                                        {slot.slotNumber}
                                    </span>

                                </td>

                                <td className="p-4">

                                    <span className={`
        px-3
        py-1
        rounded-full
        text-sm
        font-medium

        ${slot.isOccupied
                                            ? "bg-red-500/20 text-red-400"
                                            : "bg-green-500/20 text-green-400"
                                        }
    `}>
                                        {slot.isOccupied
                                            ? "Occupied"
                                            : "Available"}
                                    </span>
                                </td>

                                <td className="p-4">
                                    <button
                                        onClick={() => handleDelete(slot._id)}
                                        className="bg-red-600 hover:bg-red-500 px-3 py-1 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </AdminLayout>
    );
}

export default ParkingSlots;