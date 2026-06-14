const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    bikeRate: {
        type: Number,
        default: 20,
    },

    carRate: {
        type: Number,
        default: 40,
    },
});

module.exports = mongoose.model(
    "Setting",
    settingSchema
);