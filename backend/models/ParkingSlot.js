const mongoose = require("mongoose");

const parkingSlotSchema = new mongoose.Schema({
    slotNumber: {
        type: String,
        required: true,
        unique: true,
    },
    // New fields for richer slot management
    slotType: {
        type: String,
        enum: ["Compact", "Standard", "Handicapped", "EV"],
        required: true,
        default: "Standard",
    },
    zone: {
        type: String,
        required: true,
        default: "A",
    },
    // Indicates if a slot is temporarily reserved (e.g., for a pre‑booking)
    isReserved: {
        type: Boolean,
        default: false,
    },
    // Operational status (e.g., out of service for maintenance)
    status: {
        type: String,
        enum: ["Active", "Maintenance"],
        default: "Active",
    },
    isOccupied: {
        type: Boolean,
        default: false,
    },

    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        default: null,
    },
});

module.exports = mongoose.model("ParkingSlot", parkingSlotSchema);