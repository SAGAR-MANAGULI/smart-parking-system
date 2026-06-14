const mongoose = require("mongoose");

const activityLogSchema =
    new mongoose.Schema(
        {
            activityType: {
                type: String,
                required: true,
            },

            message: {
                type: String,
                required: true,
            },

            performedBy: {
                type: String,
                default: "System",
            },

            timestamp: {
                type: Date,
                default: Date.now,
            },
        },
        {
            timestamps: true,
        }
    );

module.exports = mongoose.model(
    "ActivityLog",
    activityLogSchema
);