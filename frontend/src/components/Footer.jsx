import { Link } from "react-router-dom";
import {
    Car,
    Mail,
    Phone,
    MapPin
} from "lucide-react";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-transparent text-slate-400 pt-16 pb-8 z-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* Brand Section */}
                    <div>

                        <div className="flex items-center gap-3 mb-4">

                            <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                                <Car className="w-6 h-6 text-blue-400" />
                            </div>

                            <h2 className="text-2xl font-bold text-white">
                                Smart
                                <span className="text-blue-400">
                                    Parking
                                </span>
                            </h2>

                        </div>

                        <p className="leading-relaxed">
                            Smart Parking System for real-time vehicle
                            management, parking monitoring and automated
                            billing.
                        </p>

                        <div className="flex items-center gap-2 mt-5">

                            <span className="flex h-3 w-3 relative">

                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>

                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>

                            </span>

                            <span className="text-green-400 font-medium">
                                System Online
                            </span>

                        </div>

                    </div>

                    {/* Quick Links */}
                    <div>

                        <h3 className="text-white text-lg font-semibold mb-5">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">

                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-blue-400 transition"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/features"
                                    className="hover:text-blue-400 transition"
                                >
                                    Features
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/livestatus"
                                    className="hover:text-blue-400 transition"
                                >
                                    Live Status
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/pricing"
                                    className="hover:text-blue-400 transition"
                                >
                                    Pricing
                                </Link>
                            </li>

                            <li>
                                <Link
                                    to="/contact"
                                    className="hover:text-blue-400 transition"
                                >
                                    Contact
                                </Link>
                            </li>

                        </ul>

                    </div>

                    {/* Contact Info */}
                    <div>

                        <h3 className="text-white text-lg font-semibold mb-5">
                            Contact Information
                        </h3>

                        <div className="space-y-4">

                            <div className="flex items-center gap-3">
                                <MapPin className="w-5 h-5 text-blue-400" />
                                <span>
                                    Vijayapura, Karnataka
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-blue-400" />
                                <span>
                                    smartparking@gmail.com
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-blue-400" />
                                <span>
                                    24 × 7 Parking Monitoring
                                </span>
                            </div>

                            <div className="pt-3">

                                <Link
                                    to="/admin/login"
                                    className="
                                    inline-block
                                    px-5
                                    py-2
                                    rounded-lg
                                    bg-slate-900
                                    border
                                    border-slate-700
                                    hover:border-blue-500
                                    hover:text-white
                                    transition-all
                                    duration-300
                                    "
                                >
                                    Admin Login
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Bottom Section */}

                <div className="border-t border-slate-800 pt-6 text-center">

                    <p className="text-sm">
                        © {currentYear} Smart Parking System.
                        All Rights Reserved.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;