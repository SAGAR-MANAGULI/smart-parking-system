import { useEffect, useState } from "react";
import axios from "axios";
import { Bike, Car, CheckCircle } from "lucide-react";

function Pricing() {

    const [settings, setSettings] = useState({
        bikeHourlyRate: 0,
        bikeDailyRate: 0,
        carHourlyRate: 0,
        carDailyRate: 0,
    });

    useEffect(() => {
        fetchPricing();
    }, []);

    const fetchPricing = async () => {
        try {

            const response = await axios.get(
                "https://smart-parking-system-f269.onrender.com/api/settings"
            );

            setSettings(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white">

            {/* Hero Section */}
            <div className="text-center py-20 px-6">

                <h1
                    className="
                    text-6xl
                    font-black
                    bg-gradient-to-r
                    from-blue-400
                    via-cyan-400
                    to-green-400
                    bg-clip-text
                    text-transparent
                "
                >
                    Parking Pricing
                </h1>

                <p className="text-slate-400 mt-5 text-lg">
                    Affordable and transparent parking plans
                </p>

            </div>

            {/* Pricing Cards */}
            <div className="max-w-6xl mx-auto px-6 pb-20">

                <div className="grid md:grid-cols-2 gap-10">

                    {/* Bike Card */}
                    <div
                        className="
                        bg-white/5
                        backdrop-blur-xl
                        border
                        border-blue-500/20
                        rounded-3xl
                        p-10
                        hover:-translate-y-3
                        hover:shadow-blue-500/20
                        hover:shadow-2xl
                        transition-all
                        duration-500
                    "
                    >

                        <Bike
                            size={60}
                            className="text-blue-400 mb-6"
                        />

                        <h2 className="text-3xl font-bold mb-6">
                            2 Wheeler
                        </h2>

                        <div className="space-y-4">

                            <div
                                className="
                                bg-slate-900
                                p-4
                                rounded-xl
                            "
                            >
                                <p className="text-slate-400">
                                    Hourly Rate
                                </p>

                                <h3 className="text-4xl font-black text-green-400">
                                    ₹{settings.bikeHourlyRate}
                                </h3>
                            </div>

                            <div
                                className="
                                bg-slate-900
                                p-4
                                rounded-xl
                            "
                            >
                                <p className="text-slate-400">
                                    Daily Rate
                                </p>

                                <h3 className="text-4xl font-black text-green-400">
                                    ₹{settings.bikeDailyRate}
                                </h3>
                            </div>

                        </div>

                        <div className="mt-8 space-y-3">

                            <p className="flex items-center gap-2">
                                <CheckCircle size={18} />
                                Real-Time Tracking
                            </p>

                            <p className="flex items-center gap-2">
                                <CheckCircle size={18} />
                                Secure Parking
                            </p>

                            <p className="flex items-center gap-2">
                                <CheckCircle size={18} />
                                Automated Billing
                            </p>

                        </div>

                    </div>

                    {/* Car Card */}
                    <div
                        className="
                        relative
                        bg-white/5
                        backdrop-blur-xl
                        border
                        border-purple-500/20
                        rounded-3xl
                        p-10
                        hover:-translate-y-3
                        hover:shadow-purple-500/20
                        hover:shadow-2xl
                        transition-all
                        duration-500
                    "
                    >

                        {/* Popular Badge */}
                        <div
                            className="
                            absolute
                            top-5
                            right-5
                            bg-gradient-to-r
                            from-orange-500
                            to-red-500
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-bold
                        "
                        >
                            MOST POPULAR
                        </div>

                        <Car
                            size={60}
                            className="text-purple-400 mb-6"
                        />

                        <h2 className="text-3xl font-bold mb-6">
                            4 Wheeler
                        </h2>

                        <div className="space-y-4">

                            <div
                                className="
                                bg-slate-900
                                p-4
                                rounded-xl
                            "
                            >
                                <p className="text-slate-400">
                                    Hourly Rate
                                </p>

                                <h3 className="text-4xl font-black text-green-400">
                                    ₹{settings.carHourlyRate}
                                </h3>
                            </div>

                            <div
                                className="
                                bg-slate-900
                                p-4
                                rounded-xl
                            "
                            >
                                <p className="text-slate-400">
                                    Daily Rate
                                </p>

                                <h3 className="text-4xl font-black text-green-400">
                                    ₹{settings.carDailyRate}
                                </h3>
                            </div>

                        </div>

                        <div className="mt-8 space-y-3">

                            <p className="flex items-center gap-2">
                                <CheckCircle size={18} />
                                Real-Time Tracking
                            </p>

                            <p className="flex items-center gap-2">
                                <CheckCircle size={18} />
                                Secure Parking
                            </p>

                            <p className="flex items-center gap-2">
                                <CheckCircle size={18} />
                                Automated Billing
                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Pricing;