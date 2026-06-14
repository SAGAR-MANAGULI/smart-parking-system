import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all the fields");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
            console.log(response.data);

            if (response.data.token) {
                localStorage.setItem("token", response.data.token);          // store token in localStorage
                navigate("/dashboard");                                    // navigate to dashboard
            }
        } catch (error) {
            console.error(error);
            setError("Invalid Admin ID or Password");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950">

            <div className="w-full max-w-md bg-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-800">

                <h1 className="text-3xl font-bold text-white text-center mb-2">
                    Admin Login
                </h1>

                <p className="text-slate-400 text-center mb-8">
                    Smart Parking System
                </p>

                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="block text-slate-300 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter Email"
                            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-slate-300 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter Password"
                            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-700 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-lg font-semibold transition"
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AdminLogin;