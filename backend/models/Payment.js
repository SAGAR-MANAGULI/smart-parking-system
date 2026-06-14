const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
    },

    amount: {
        type: Number,
        required: true,
    },

    paymentMethod: {
        type: String,
        enum: ["Cash", "UPI", "Card"],
        default: "Cash",
    },

    paymentStatus: {
        type: String,
        default: "Pending",
    },

    paidAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Payment", paymentSchema);