const mongoose = require("mongoose");

const parkingHistorySchema = new mongoose.Schema({
    ownerName: {
        type: String,
    },

    vehicleNumber: {
        type: String,
    },

    vehicleType: {
        type: String,
    },

    slotNumber: {
        type: String,
    },

    entryTime: {
        type: Date,
    },

    exitTime: {
        type: Date,
    },

    amount: {
        type: Number,
    },

    paymentStatus: {
        type: String,
    },

    paymentMethod: {
        type: String,
    },

    emailStatus: {
        type: String,
        default: "Sent",
    },
    

});

module.exports = mongoose.model("ParkingHistory", parkingHistorySchema);