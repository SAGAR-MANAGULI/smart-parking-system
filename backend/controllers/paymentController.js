const Payment = require("../models/Payment");
const Vehicle = require("../models/Vehicle");
const ParkingSlot = require("../models/ParkingSlot");
const ParkingHistory = require("../models/ParkingHistory");
const emitEvent = require("../utils/socketEmit");
const Setting = require("../models/Setting");


const createPayment = async (req, res) => {
    try {
        const { vehicleId, paymentMethod } = req.body;

        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle Not Found",
            });
        }

        const settings = await Setting.findOne();

        const exitTime = new Date();

        const durationMs =
            exitTime - new Date(vehicle.entryTime);

        const totalHours =
            Math.ceil(durationMs / (1000 * 60 * 60));

        let amount = 0;

        if (vehicle.vehicleType === "2-Wheeler") {

            if (totalHours >= 24) {

                const totalDays =
                    Math.ceil(totalHours / 24);

                amount =
                    totalDays *
                    settings.bikeDailyRate;

            } else {

                amount =
                    totalHours *
                    settings.bikeHourlyRate;

            }

        } else {

            if (totalHours >= 24) {

                const totalDays =
                    Math.ceil(totalHours / 24);

                amount =
                    totalDays *
                    settings.carDailyRate;

            } else {

                amount =
                    totalHours *
                    settings.carHourlyRate;

            }

        }


        const payment = await Payment.create({
            vehicleId,
            amount,
            paymentMethod,
            paymentStatus: "Paid",
        });

        vehicle.paymentStatus = "Paid";
        await vehicle.save();

        emitEvent(req, "paymentCompleted", {
            vehicleId,
            amount,
            paymentMethod,
        });

        emitEvent(req, "dashboardStatsUpdated");

        vehicle.vehicleStatus = "Exited";
        vehicle.paymentStatus = "Paid";
        vehicle.paymentMethod = paymentMethod;
        vehicle.amount = amount;
        vehicle.exitTime = exitTime;

        await vehicle.save();

        const slot = await ParkingSlot.findOne({
            slotNumber: vehicle.slotNumber,
        });

        if (slot) {

            slot.isOccupied = false;

            slot.vehicleId = null;

            await slot.save();
            await ParkingHistory.create({
                ownerName: vehicle.ownerName,
                vehicleNumber: vehicle.vehicleNumber,
                vehicleType: vehicle.vehicleType,
                slotNumber: vehicle.slotNumber,
                entryTime: vehicle.entryTime,
                exitTime: vehicle.exitTime,
                amount,
                paymentStatus: "Paid",
                paymentMethod,
            });
        }
        res.status(201).json(payment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getPayments = async (req, res) => {
    try {

        const payments = await Payment.find()
            .populate("vehicleId");

        res.status(200).json(payments);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const deletePayment = async (req, res) => {
    try {

        await Payment.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Payment Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const stopParking = async (req, res) => {
    try {

        const { vehicleId } = req.body;

        const vehicle = await Vehicle.findById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({
                message: "Vehicle Not Found",
            });
        }

        const settings = await Setting.findOne();

        const exitTime = new Date();

        const durationMs =
            exitTime - new Date(vehicle.entryTime);

        const totalHours =
            Math.ceil(durationMs / (1000 * 60 * 60));

        let amount = 0;

        if (vehicle.vehicleType === "2-Wheeler") {

            if (totalHours >= 24) {

                const totalDays =
                    Math.ceil(totalHours / 24);

                amount =
                    totalDays *
                    settings.bikeDailyRate;

            } else {

                amount =
                    totalHours *
                    settings.bikeHourlyRate;

            }

        } else {

            if (totalHours >= 24) {

                const totalDays =
                    Math.ceil(totalHours / 24);

                amount =
                    totalDays *
                    settings.carDailyRate;

            } else {

                amount =
                    totalHours *
                    settings.carHourlyRate;

            }

        }

        vehicle.exitTime = exitTime;
        vehicle.amount = amount;

        await vehicle.save();

        res.status(200).json({
            amount,
            exitTime,
        });

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });

    }
};

module.exports = {
    createPayment,
    getPayments,
    deletePayment,
    stopParking,
};