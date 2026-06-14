import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home";
import Dashboard from "../pages/admin/Dashboard";
import LiveStatus from "../pages/public/LiveStatus";
import Pricing from "../pages/public/Pricing";
import Contact from "../pages/public/Contact";
import Features from "../pages/public/Features";
import AdminLogin from "../pages/admin/AdminLogin";
import Vehicles from "../pages/admin/Vehicles";
import Payments from "../pages/admin/Payments";
import ParkingHistory from "../pages/admin/ParkingHistory";
import Reports from "../pages/admin/Reports";
import Settings from "../pages/admin/Settings";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/livestatus" element={<LiveStatus />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/features" element={<Features />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/dashboard/vehicles" element={<Vehicles />} />
            <Route path="/dashboard/payments" element={<Payments />} />
            <Route path="/dashboard/history" element={<ParkingHistory />} />
            <Route path="/dashboard/reports" element={<Reports />} />
            <Route path="/dashboard/settings" element={<Settings />} />
        </Routes>
    );
}

export default AppRoutes;