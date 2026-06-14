import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Car, Menu, X } from "lucide-react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Features", path: "/features" },
        { name: "Live Status", path: "/livestatus" },
        { name: "Pricing", path: "/pricing" },
        { name: "Contact", path: "/contact" },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="sticky top-0 z-50 text-white border-0 bg-transparent transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-500/10 p-2 rounded-lg border border-blue-500/20">
                            <Car className="w-7 h-7 text-cyan-400" />                        </div>
                        <Link to="/" className="
text-3xl
font-extrabold
bg-gradient-to-r
from-white
via-blue-300
to-cyan-400
bg-clip-text
text-transparent
tracking-tight
">
                            Smart<span className="text-blue-400">Parking</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <ul className="flex gap-8 text-base font-semibold tracking-wide">                            {navLinks.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`
relative
py-2
text-base
font-semibold
tracking-wide
transition-all
duration-300
hover:text-cyan-400
hover:scale-105
${isActive(link.path) ? "text-cyan-400" : "text-slate-300"}
`}
                                >
                                    {link.name}
                                    {isActive(link.path) && (
                                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                                    )}
                                </Link>
                            </li>
                        ))}
                        </ul>


                        <Link to="/admin/login">
                            <button className="
w-full sm:w-auto
flex items-center justify-center
gap-2
px-5 py-2
rounded-xl
bg-slate-900/60
border border-slate-700
text-slate-300
font-semibold
backdrop-blur-md
hover:border-blue-500
hover:text-white
hover:bg-slate-800/80
transition-all duration-300
">
                                Admin Login
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-400 hover:text-white focus:outline-none p-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}

            {/* Mobile Menu – instant show/hide, no slide animation */}
            {isOpen && (
                <div className="md:hidden w-full bg-slate-950/95 backdrop-blur-lg py-4 border-0">
                    <div className="px-4 space-y-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}

                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Admin login button */}
                        <div className="pt-2 border-t border-slate-800">
                            <Link to="/admin/login" onClick={() => setIsOpen(false)} className="block">
                                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold shadow-md shadow-blue-500/20">
                                    Admin Login
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            )}

        </nav >
    );
}

export default Navbar;