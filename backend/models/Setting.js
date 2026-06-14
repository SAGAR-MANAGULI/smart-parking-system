const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({

    bikeHourlyRate: {
        type: Number,
        default: 20,
    },

    bikeDailyRate: {
        type: Number,
        default: 100,
    },

    carHourlyRate: {
        type: Number,
        default: 50,
    },

    carDailyRate: {
        type: Number,
        default: 300,
    },

    totalSlots: {
        type: Number,
        default: 50,
    },

});

module.exports = mongoose.model(
    "Setting",
    settingSchema
);