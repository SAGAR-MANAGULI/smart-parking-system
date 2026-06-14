const ParkingHistory = require("../models/ParkingHistory");

const getParkingHistory = async (req, res) => {
    try {
        const history = await ParkingHistory.find();

        res.status(200).json(history);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getParkingHistory,
};