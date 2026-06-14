const Setting = require("../models/Setting");

const calculateAmount = async (
    vehicleType,
    durationType,
    duration
) => {

    const settings = await Setting.findOne();

    let rate = 0;

    if (vehicleType === "2-Wheeler") {

        rate =
            durationType === "Hour"
                ? settings.bikeHourlyRate
                : settings.bikeDailyRate;
    }

    else if (vehicleType === "4-Wheeler") {

        rate =
            durationType === "Hour"
                ? settings.carHourlyRate
                : settings.carDailyRate;
    }

    return rate * duration;
};

module.exports = calculateAmount;