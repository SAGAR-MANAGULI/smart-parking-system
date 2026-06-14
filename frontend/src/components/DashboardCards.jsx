import { useState, useEffect } from "react";
import axios from "axios";

function DashboardCards() {
    const [totalSlots, setTotalSlots] = useState(0);
    const [availableSlots, setAvailableSlots] = useState(0);
    const [occupiedSlots, setOccupiedSlots] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [availablePercentage, setAvailablePercentage] = useState(0);
    const [occupiedPercentage, setOccupiedPercentage] = useState(0);
    const [parkedVehicles, setParkedVehicles] = useState([]);
    const [lastUpdated, setLastUpdated] = useState("");

    useEffect(() => {
        fetchTotalSlots();

        setLastUpdated(
            new Date().toLocaleString()
        );
    }, []);

    const fetchTotalSlots = async () => {
        try {

            const token = localStorage.getItem("token");

            const response = await axios.get(
                "http://localhost:5000/api/settings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTotalSlots(response.data.totalSlots);

            const vehicleResponse = await axios.get(
                "http://localhost:5000/api/vehicles",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const occupied =
                vehicleResponse.data.data.filter(
                    vehicle => vehicle.vehicleStatus === "Parked"
                ).length;

            setOccupiedSlots(occupied);
            setParkedVehicles(
                vehicleResponse.data.data
                    .filter(v => v.vehicleStatus === "Parked")
                    .map(v => v.slotNumber)
            );

            setAvailableSlots(
                response.data.totalSlots - occupied
            );

            const availablePercentage =
                ((response.data.totalSlots - occupied) /
                    response.data.totalSlots) * 100;

            const occupiedPercentage =
                (occupied / response.data.totalSlots) * 100;

            setAvailablePercentage(
                availablePercentage.toFixed(0)
            );

            setOccupiedPercentage(
                occupiedPercentage.toFixed(0)
            );


        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="
bg-gradient-to-br
from-blue-600
to-indigo-900
p-6
rounded-2xl
shadow-lg
shadow-blue-900/30
hover:-translate-y-2
hover:shadow-2xl
transition-all
duration-300
">                    <h3 className="text-blue-100">
                        Total Slots
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {totalSlots}
                    </p>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-900 p-6 rounded-xl hover:scale-105 transition-all duration-300">
                    <h3 className="text-green-100">
                        Available Slots
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {availableSlots}
                    </p>
                </div>

                <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 rounded-xl hover:scale-105 transition-all duration-300">
                    <h3 className="text-red-100">
                        Occupied Slots
                    </h3>

                    <p className="text-4xl font-bold mt-2">
                        {occupiedSlots}
                    </p>
                </div>



            </div>

            {/* Parking Occupancy */}
            <div className="
bg-slate-900/70
backdrop-blur-md
border
border-slate-700
rounded-2xl
p-6
mt-8
shadow-xl
">
                <h2 className="text-xl font-bold mb-6">
                    Parking Occupancy Overview
                </h2>

                <div className="mb-6">

                    <div className="flex justify-between mb-2">
                        <span>Available Slots</span>
                        <span>{availablePercentage + "%"}  </span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-4">
                        <div className="bg-green-500 h-4 rounded-full"
                            style={{ width: availablePercentage + "%" }}>
                        </div>
                    </div>

                </div>

                <div>

                    <div className="flex justify-between mb-2">
                        <span>Occupied Slots</span>
                        <span>{occupiedPercentage + "%"}</span>
                    </div>

                    <div className="w-full bg-slate-800 rounded-full h-4">
                        <div
                            className="
bg-gradient-to-r
from-red-400
to-rose-600
h-4
rounded-full
shadow-md
"
                            style={{ width: occupiedPercentage + "%" }}>
                        </div>
                    </div>

                </div>

            </div>

            {/* Multi Level Parking */}
            <div className="
bg-slate-900/70
backdrop-blur-md
border
border-slate-700
rounded-2xl
p-6
mt-8
shadow-xl
">
                <div className="flex justify-between items-center mb-4">


                    <span className="text-sm text-slate-400">
                        Last Updated: {lastUpdated}
                    </span>

                </div>

                <h2 className="text-xl font-bold mb-6">
                    Live Parking Status
                </h2>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mt-8">




                    <div className="grid grid-cols-5 gap-3">

                        {[...Array(totalSlots)].map((_, index) => {

                            const slot = `S${index + 1}`;

                            const occupied =
                                parkedVehicles.includes(slot);

                            return (
                                <div
                                    key={slot}
                                    title={
                                        occupied
                                            ? `${slot} - Occupied`
                                            : `${slot} - Available`
                                    }
                                    className={`
h-16
w-full
flex
items-center
justify-center
rounded-xl
text-base
font-bold
cursor-pointer
transition-all
duration-300
hover:scale-105
hover:-translate-y-1
shadow-lg

${occupied
                                            ? "bg-gradient-to-r from-red-500 to-red-700 border border-red-400"
                                            : "bg-gradient-to-r from-green-500 to-emerald-700 border border-green-400"}
`}
                                >
                                    {slot}
                                </div>
                            );
                        })}

                    </div>

                    <div className="flex gap-2  mt-6">

                        <p>🟢 Available</p>

                        <p>🔴 Occupied</p>

                    </div>

                </div>

            </div>


        </>
    );
}

export default DashboardCards;