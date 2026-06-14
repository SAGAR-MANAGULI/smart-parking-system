import { useState, useEffect } from "react";
import axios from "axios";

import AdminLayout from "../../layouts/AdminLayout";

export default function Settings() {

    const [settings, setSettings] = useState({
        bikeHourlyRate: "",
        bikeDailyRate: "",
        carHourlyRate: "",
        carDailyRate: "",
        totalSlots: "",
    });

    useEffect(() => {

        const fetchSettings = async () => {
            try {

                const response = await axios.get(
                    "https://smart-parking-system-f269.onrender.com/api/settings"
                );

                setSettings({
                    bikeHourlyRate: response.data.bikeHourlyRate,
                    bikeDailyRate: response.data.bikeDailyRate,
                    carHourlyRate: response.data.carHourlyRate,
                    carDailyRate: response.data.carDailyRate,
                    totalSlots: response.data.totalSlots,
                });
            } catch (error) {
                console.log(error);
            }
        };

        fetchSettings();

    }, []);



    const handleChange = (e) => {
        setSettings({
            ...settings,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        try {

            await axios.put(
                "https://smart-parking-system-f269.onrender.com/api/settings",
                {
                    bikeHourlyRate: settings.bikeHourlyRate,
                    bikeDailyRate: settings.bikeDailyRate,
                    carHourlyRate: settings.carHourlyRate,
                    carDailyRate: settings.carDailyRate,
                    totalSlots: settings.totalSlots,
                }
            );

            alert("Settings Saved Successfully");

        } catch (error) {
            console.log(error);
            alert("Failed To Save Settings");
        }
    };



    return (
        <AdminLayout>

            <h2 className="text-2xl font-bold mb-6">
                Settings
            </h2>

            <>
                {/* Pricing Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

                    <div className="bg-gradient-to-r from-green-600 to-green-500 p-5 rounded-xl shadow-lg">
                        <p className="text-sm text-white/80">
                            🏍 Bike Hourly
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            ₹{settings.bikeHourlyRate}
                        </h2>

                        <p className="text-sm mt-2 text-white/80">
                            Charge per hour
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-5 rounded-xl shadow-lg">
                        <p className="text-sm text-white/80">
                            🏍 Bike Daily
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            ₹{settings.bikeDailyRate}
                        </h2>

                        <p className="text-sm mt-2 text-white/80">
                            Charge per day
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-5 rounded-xl shadow-lg">
                        <p className="text-sm text-white/80">
                            🚗 Car Hourly
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            ₹{settings.carHourlyRate}
                        </h2>

                        <p className="text-sm mt-2 text-white/80">
                            Charge per hour
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500 to-green-500 p-5 rounded-xl shadow-lg">
                        <p className="text-sm text-white/80">
                            🚗 Car Daily
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            ₹{settings.carDailyRate}
                        </h2>

                        <p className="text-sm mt-2 text-white/80">
                            Charge per day
                        </p>
                    </div>


                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-5 rounded-xl shadow-lg">
                        <p className="text-sm text-white/80">
                            🅿 Total Slots
                        </p>

                        <h2 className="text-3xl font-bold mt-2">
                            {settings.totalSlots}
                        </h2>

                        <p className="text-sm mt-2 text-white/80">
                            Parking Capacity
                        </p>
                    </div>

                </div>

                {/* Configuration Panel */}
                <div className="bg-slate-800/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-700">

                    <h3 className="text-2xl font-bold text-white mb-6">
                        Update Pricing Rates
                    </h3>

                    <div className="bg-slate-900 rounded-xl p-6 mb-8">
                        <label className="block text-sm mb-2">
                            Total Slots
                        </label>

                        <input
                            type="number"
                            name="totalSlots"
                            value={settings.totalSlots}
                            onChange={handleChange}
                            className="bg-slate-700 border border-slate-600 px-4 py-3 rounded-xl w-full focus:border-green-500 outline-none"
                            placeholder="enter total parking slots"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Bike Rates */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold flex items-center gap-2 text-green-400">
                                <i className="fa-solid fa-motorcycle"></i> Bike Pricing
                            </h4>

                            <div>
                                <label className="block text-sm mb-2">
                                    Hourly Rate
                                </label>

                                <div className="relative">
                                    <input
                                        type="number"
                                        name="bikeHourlyRate"
                                        value={settings.bikeHourlyRate}
                                        onChange={handleChange}
                                        className="bg-slate-700 border border-slate-600 px-4 py-3 rounded-xl w-full focus:border-green-500 outline-none transition-colors"
                                        placeholder="e.g. 20"
                                    />

                                    <span className="absolute right-4 top-3 text-slate-400">
                                        ₹
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Daily Rate
                                </label>

                                <div className="relative">
                                    <input
                                        type="number"
                                        name="bikeDailyRate"
                                        value={settings.bikeDailyRate}
                                        onChange={handleChange}
                                        className="bg-slate-700 border border-slate-600 px-4 py-3 rounded-xl w-full focus:border-green-500 outline-none transition-colors"
                                        placeholder="e.g. 100"
                                    />

                                    <span className="absolute right-4 top-3 text-slate-400">
                                        ₹
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Car Rates */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold flex items-center gap-2 text-yellow-400">
                                <i className="fa-solid fa-car"></i> Car Pricing
                            </h4>

                            <div>
                                <label className="block text-sm mb-2">
                                    Hourly Rate
                                </label>

                                <div className="relative">
                                    <input
                                        type="number"
                                        name="carHourlyRate"
                                        value={settings.carHourlyRate}
                                        onChange={handleChange}
                                        className="bg-slate-700 border border-slate-600 px-4 py-3 rounded-xl w-full focus:border-yellow-500 outline-none transition-colors"
                                        placeholder="e.g. 50"
                                    />

                                    <span className="absolute right-4 top-3 text-slate-400">
                                        ₹
                                    </span>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm mb-2">
                                    Daily Rate
                                </label>

                                <div className="relative">
                                    <input
                                        type="number"
                                        name="carDailyRate"
                                        value={settings.carDailyRate}
                                        onChange={handleChange}
                                        className="bg-slate-700 border border-slate-600 px-4 py-3 rounded-xl w-full focus:border-yellow-500 outline-none transition-colors"
                                        placeholder="e.g. 300"
                                    />

                                    <span className="absolute right-4 top-3 text-slate-400">
                                        ₹
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Save Button */}
                    <button
                        onClick={handleSave}
                        className="mt-8 w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-indigo-500/20 transition-all transform hover:-translate-y-1 text-lg"
                    >
                        <i className="fa-solid fa-floppy-disk mr-2"></i> Save Pricing Settings
                    </button>

                </div>

            </>

        </AdminLayout>
    );
}