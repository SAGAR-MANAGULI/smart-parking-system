import { Navigation, Cpu, CreditCard, BarChart3 } from "lucide-react";
import "../styles/components/features.css";

function FeaturesSection() {
    const features = [
        {
            title: "Smart Parking",
            description: "Automated real-time slot allocation and seamless route navigation to your reserved parking space.",
            icon: Navigation,
            color: "from-blue-500 to-indigo-500",
            shadowColor: "hover:shadow-blue-500/10",
            borderColor: "hover:border-blue-500/50"
        },
        {
            title: "Live Monitoring",
            description: "Monitor slot occupancy in real time via high-precision IoT sensor networks and live camera feeds.",
            icon: Cpu,
            color: "from-emerald-500 to-teal-500",
            shadowColor: "hover:shadow-emerald-500/10",
            borderColor: "hover:border-emerald-500/50"
        },
        {
            title: "Digital Payments",
            description: "Contactless, cashless payments with instant invoice generation. Supports card, UPI, and digital wallets.",
            icon: CreditCard,
            color: "from-violet-500 to-purple-500",
            shadowColor: "hover:shadow-violet-500/10",
            borderColor: "hover:border-violet-500/50"
        },
        {
            title: "Analytics",
            description: "Gain descriptive insights into occupancy trends, peak hour statistics, and revenue projections.",
            icon: BarChart3,
            color: "from-amber-500 to-orange-500",
            shadowColor: "hover:shadow-amber-500/10",
            borderColor: "hover:border-amber-500/50"
        }
    ];

    return (
        <section className="bg-transparent text-white py-10 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-semibold text-blue-400 tracking-wider uppercase bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                        Core Capabilities
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-4 tracking-tight">
                        Designed for Modern Mobility
                    </h2>
                    <p className="text-slate-400 mt-4 text-base sm:text-lg">
                        Our smart parking solutions leverage state-of-the-art IoT technology and analytics to deliver an efficient, ticketless experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feat, index) => {
                        const IconComponent = feat.icon;
                        return (
                            <div
                                key={index}
                                className={`feature-card group relative p-8 rounded-2xl bg-slate-900/40 backdrop-blur border border-slate-800/80 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-900/60 ${feat.borderColor} ${feat.shadowColor} hover:shadow-xl`}
                            >
                                {/* Glow element inside card */}
                                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feat.color} opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none`} />

                                {/* Icon container */}
                                <div className={`inline-flex p-3.5 rounded-xl bg-gradient-to-br ${feat.color} bg-opacity-10 text-white mb-6 border border-slate-800/50 group-hover:border-transparent group-hover:scale-110 transition-all duration-300`}>
                                    <IconComponent className="w-6 h-6 text-slate-200 group-hover:text-white" />
                                </div>

                                <h3 className="text-xl font-bold mb-3 tracking-tight text-white group-hover:text-blue-400 transition-colors duration-200">
                                    {feat.title}
                                </h3>

                                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-200">
                                    {feat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;