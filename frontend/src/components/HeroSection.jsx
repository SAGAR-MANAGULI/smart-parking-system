import { Link } from "react-router-dom";
import { ArrowRight, Lock, CheckCircle, Sparkles } from "lucide-react";
import "../../src/styles/components/hero.css";


function HeroSection() {
    return (
        <section className="relative overflow-hidden bg-transparent text-white min-h-[50vh] flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8 py-20 z-20">            {/* Ambient Background Glows */}
            {/* Floating Glow 1 */}
            <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2" />
            {/* Glowing Accent Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold mb-6 animate-pulse">
                <Sparkles className="w-4 h-4" />
                <span>Real-Time Smart Parking Solution</span>
            </div>

            {/* Main Title */}
            <h1 className="hero-title text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight">
                Smart Parking System
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
                Smart <span className="text-slate-600">•</span> Secure <span className="text-slate-600">•</span> Real-Time Parking Management
            </p>

            {/* Call To Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md sm:max-w-none">
                <Link to="/livestatus" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-8 py-3.5 rounded-xl text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                        <span>View Live Status</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </Link>

                <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block">
                    <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-200 font-semibold backdrop-blur-md hover:border-blue-500 hover:text-white transition-all duration-300">
                        <Lock className="w-4.5 h-4.5 text-slate-400" />
                        <span>Admin Login</span>
                    </button>
                </Link>
            </div>

            {/* Bullet points for credibility/interest */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-slate-400 max-w-3xl pt-8 w-full">                <div className="flex items-center justify-center gap-2">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                <span>Live Parking Availability</span>
            </div>
                <div className="flex items-center justify-center gap-2">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                    <span>Track and Manage Vehicles</span>
                </div>
                <div className="flex items-center justify-center gap-2 col-span-2 md:col-span-1">
                    <CheckCircle className="w-4.5 h-4.5 text-emerald-500" />
                    <span>Smart Reports & Analytics</span>
                </div>
            </div>


        </section >
    );
}

export default HeroSection;