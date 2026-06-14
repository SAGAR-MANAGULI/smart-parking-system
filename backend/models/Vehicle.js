const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
    {
        ownerName: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
        },

        vehicleNumber: {
            index: true,
            type: String,
            required: true,
            unique: true,
            uppercase: true,
            trim: true,
            match: [
                /^[A-Z0-9-]+$/,
                "Invalid Vehicle Number Format",
            ],
        },

        vehicleType: {
            type: String,
            required: true,
            enum: ["2-Wheeler", "4-Wheeler"],
        },

        phoneNumber: {
            type: String,
            required: true,
            trim: true,
            match: [
                /^[0-9]{10}$/,
                "Phone number must contain exactly 10 digits",
            ],
        },

        email: {
            type: String,
            trim: true,
            lowercase: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Invalid Email Format",
            ],
        },

        slotNumber: {
            type: String,
            default: "",
        },
        duration: {
            type: Number,
            default: 0,
        },

        durationType: {
            type: String,
            default: "",
        },

        amount: {
            type: Number,
            default: 0,
        },


        paymentMethod: {
            type: String,
            default: "",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid"],
            default: "Pending",
        },

        vehicleStatus: {
            index: true,
            type: String,
            enum: ["Parked", "Exited"],
            default: "Parked",
        },

        entryTime: {
            type: Date,
            default: Date.now,
        },

        exitTime: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

vehicleSchema.index({
    vehicleNumber: 1,
    vehicleStatus: 1,
});

module.exports = mongoose.model(
    "Vehicle",
    vehicleSchema
);

