const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        minlength: 8,
        match: [
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
            "Password must contain uppercase, number and special character",
        ],
    },

    role: {
        type: String,
        default: "admin",
    },
});

module.exports = mongoose.model("Admin", adminSchema);