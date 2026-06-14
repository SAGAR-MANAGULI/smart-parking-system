import React, { useState } from "react";
import axios from "axios";
import "./VehicleEntryForm.css"; // you can style it later

/**
 * VehicleEntryForm – collects entry data, posts to /api/vehicles/add,
 * shows server validation errors, and displays the allocated slot.
 */
const VehicleEntryForm = () => {
    const [form, setForm] = useState({
        ownerName: "",
        vehicleNumber: "",
        vehicleType: "2-Wheeler",
        phoneNumber: "",
        email: "",
        duration: 1,
        durationType: "Hour",
    });

    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [slotInfo, setSlotInfo] = useState(null); // allocated slot after success

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");
        setSlotInfo(null);
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/vehicles/add`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // if auth required
                    },
                }
            );

            // API returns { vehicle, slot }
            const { slot } = response.data;
            setSlotInfo(slot);
        } catch (err) {
            const msg =
                err.response?.data?.message ||
                err.message ||
                "Unexpected error while adding vehicle.";
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="vehicle-entry-form">
            <h2>Enter Vehicle</h2>

            {errorMsg && <div className="error-box">{errorMsg}</div>}

            {slotInfo ? (
                <div className="slot-success">
                    <h3>✅ Slot Assigned</h3>
                    <p>
                        <strong>Slot Number:</strong> {slotInfo.number}
                    </p>
                    <p>
                        <strong>Type:</strong> {slotInfo.type}
                    </p>
                    <p>
                        <strong>Zone:</strong> {slotInfo.zone}
                    </p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label>Owner Name *</label>
                        <input
                            name="ownerName"
                            value={form.ownerName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Vehicle Number *</label>
                        <input
                            name="vehicleNumber"
                            value={form.vehicleNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Vehicle Type *</label>
                        <select
                            name="vehicleType"
                            value={form.vehicleType}
                            onChange={handleChange}
                            required
                        >
                            <option value="2-Wheeler">2‑Wheeler</option>
                            <option value="4-Wheeler">4‑Wheeler</option>
                        </select>
                    </div>

                    <div className="field">
                        <label>Phone Number *</label>
                        <input
                            name="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Email (optional)</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="field">
                        <label>Duration *</label>
                        <input
                            name="duration"
                            type="number"
                            min="1"
                            value={form.duration}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="field">
                        <label>Duration Type *</label>
                        <select
                            name="durationType"
                            value={form.durationType}
                            onChange={handleChange}
                            required
                        >
                            <option value="Hour">Hour</option>
                            <option value="Day">Day</option>
                        </select>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Submitting…" : "Park Vehicle"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default VehicleEntryForm;
