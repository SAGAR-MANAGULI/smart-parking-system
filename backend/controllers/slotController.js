const ParkingSlot = require("../models/ParkingSlot");
const Vehicle = require("../models/Vehicle");
const ParkingHistory = require("../models/ParkingHistory");
const calculateAmount = require("../utils/calculateAmount");
const sendEmail = require("../services/emailService");
const emitEvent = require("../utils/socketEmit");

const createSlot = async (req, res) => {
    try {
        const slot = await ParkingSlot.create(req.body);

        res.status(201).json(slot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSlots = async (req, res) => {
    try {
        const slots = await ParkingSlot.find().populate("vehicleId");

        res.status(200).json(slots);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAvailableSlots = async (req, res) => {
    try {

        const slots = await ParkingSlot.find({
            isOccupied: false,
        });

        res.status(200).json(slots);

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const assignSlot = async (req, res) => {
    try {
        const { vehicleId } = req.body;
        const alreadyAssigned = await ParkingSlot.findOne({
            vehicleId,
        });

        if (alreadyAssigned) {
            return res.status(400).json({
                message: "Vehicle Already Assigned To Slot",
            });
        }

        const availableSlot = await ParkingSlot.findOne({
            isOccupied: false,
        });

        if (!availableSlot) {
            return res.status(404).json({
                message: "No Parking Slots Available",
            });
        }

        availableSlot.isOccupied = true;
        availableSlot.vehicleId = vehicleId;
        const vehicle = await Vehicle.findById(vehicleId);

        if (vehicle) {
            vehicle.slotNumber = availableSlot.slotNumber;
            vehicle.vehicleStatus = "Parked";
            await vehicle.save();
        }

        await availableSlot.save();

        emitEvent(req, "slotAssigned", {
            slotNumber: availableSlot.slotNumber,
            vehicleId,
        });

        emitEvent(req, "dashboardStatsUpdated");

        res.status(200).json(availableSlot);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const releaseSlot = async (req, res) => {
    try {
        const { slotId } = req.body;

        const slot = await ParkingSlot.findById(slotId);

        if (!slot) {
            return res.status(404).json({
                message: "Slot Not Found",
            });
        }

        const vehicle = await Vehicle.findById(slot.vehicleId);

        slot.isOccupied = false;
        slot.vehicleId = null;
        if (vehicle) {

            if (vehicle.paymentStatus !== "Paid") {
                return res.status(400).json({
                    message: "Payment Pending. Complete Payment First",
                });
            }

            vehicle.slotNumber = "";
            vehicle.vehicleStatus = "Exited";
            vehicle.exitTime = new Date();
            await ParkingHistory.create({
                ownerName: vehicle.ownerName,
                vehicleNumber: vehicle.vehicleNumber,
                vehicleType: vehicle.vehicleType,
                slotNumber: slot.slotNumber,
                entryTime: vehicle.entryTime,
                exitTime: vehicle.exitTime,
                paymentStatus: vehicle.paymentStatus,
                emailStatus: "Sent",
                amount: calculateAmount(
                    vehicle.vehicleType,
                    vehicle.durationType,
                    vehicle.duration
                ),
            });

            try {

                await sendEmail(
                    vehicle.email,
                    `
========= SMART PARKING BILL =========

Owner Name: ${vehicle.ownerName}

Vehicle Number: ${vehicle.vehicleNumber}

Vehicle Type: ${vehicle.vehicleType}

Slot Number: ${slot.slotNumber}

Entry Time: ${vehicle.entryTime}

Exit Time: ${vehicle.exitTime}

Parking Duration: ${vehicle.duration} ${vehicle.durationType}

Total Amount: ₹${calculateAmount(
                        vehicle.vehicleType,
                        vehicle.durationType,
                        vehicle.duration
                    )}

Payment Status: ${vehicle.paymentStatus}

=====================================

Thank You For Using Smart Parking System
`
                );

            } catch (emailError) {

                console.log("Email Sending Failed");

            };


            await vehicle.save();
        }

        await slot.save();

        emitEvent(req, "slotReleased", {
            slotNumber: slot.slotNumber,
        });

        emitEvent(req, "dashboardStatsUpdated");

        res.status(200).json({
            message: "Slot Released Successfully",
            slot,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteSlot = async (req, res) => {
    try {
        const { slotId } = req.params;

        await ParkingSlot.findByIdAndDelete(slotId);

        res.status(200).json({
            message: "Slot Deleted Successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};


module.exports = {
    createSlot,
    getSlots,
    assignSlot,
    releaseSlot,
    getAvailableSlots,
    deleteSlot,
};