const Vehicle = require("../models/Vehicle");
const Setting = require("../models/Setting");

const asyncHandler = require("../utils/asyncHandler");

const addVehicle = asyncHandler(async (req, res) => {


    // 1️⃣ Input validation
    const {
        ownerName,
        vehicleNumber,
        vehicleType,
        phoneNumber,
        email,
    } = req.body;

    if (!ownerName || !vehicleNumber || !vehicleType || !phoneNumber) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const plateRegex = /^[A-Z0-9-]+$/;
    if (!plateRegex.test(vehicleNumber)) {
        return res.status(400).json({ message: "Invalid vehicle number format" });
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
        return res.status(400).json({ message: "Phone must be 10 digits" });
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        return res.status(400).json({ message: "Invalid email address" });
    }

    // 2️⃣ Check if vehicle already parked
    const existingVehicle = await Vehicle.findOne({
        vehicleNumber,
        vehicleStatus: "Parked",
    });

    if (existingVehicle) {
        return res.status(400).json({
            message: "This Vehicle Is Already Registered In Parking",
        });
    }



    try {

        const settings = await Setting.findOne();

        const totalSlots = settings?.totalSlots || 100;

        const parkedVehicles = await Vehicle.find({
            vehicleStatus: "Parked",
        });

        const occupiedSlots = parkedVehicles
            .map(vehicle =>
                parseInt(
                    vehicle.slotNumber?.replace("S", "")
                )
            )
            .filter(Boolean);

        let slotNumber = null;

        for (let i = 1; i <= totalSlots; i++) {

            if (!occupiedSlots.includes(i)) {
                slotNumber = `S${i}`;
                break;
            }

        }

        if (!slotNumber) {

            return res.status(400).json({
                message: "Parking Full",
            });

        }

        req.body.slotNumber = slotNumber;

        const vehicle = await Vehicle.create(req.body);

        res.status(201).json(vehicle);

    } catch (error) {

        console.log("FULL ERROR =>", error);

        res.status(500).json({
            message: error.message,
        });

    }

});

const getVehicles = asyncHandler(async (req, res) => {


    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const filter = {};

    if (req.query.status) {
        filter.vehicleStatus = req.query.status;
    }

    if (req.query.vehicleNumber) {
        filter.vehicleNumber = {
            $regex: req.query.vehicleNumber,
            $options: "i",
        };
    }

    const totalVehicles =
        await Vehicle.countDocuments(filter);

    const vehicles = await Vehicle.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

    res.status(200).json({
        success: true,
        page,
        limit,
        count: vehicles.length,
        totalVehicles,
        totalPages: Math.ceil(totalVehicles / limit),
        data: vehicles,
    });


});

const searchVehicle = asyncHandler(async (req, res) => {


    const { vehicleNumber } = req.query;

    const vehicle = await Vehicle.findOne({
        vehicleNumber,
    });

    if (!vehicle) {
        return res.status(404).json({
            message: "Vehicle Not Found",
        });
    }

    res.status(200).json({
        success: true,
        data: vehicle,
    });


});

const deleteVehicle = asyncHandler(async (req, res) => {


    const deletedVehicle = await Vehicle.findByIdAndDelete(req.params.id);

    if (!deletedVehicle) {
        res.status(404);
        throw new Error("Vehicle Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Vehicle Deleted Successfully",
    });


});

const updateVehicle = asyncHandler(async (req, res) => {


    const updatedVehicle = await Vehicle.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    if (!updatedVehicle) {
        res.status(404);
        throw new Error("Vehicle Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Vehicle Updated Successfully",
        data: updatedVehicle,
    });


});

module.exports = {
    addVehicle,
    getVehicles,
    deleteVehicle,
    updateVehicle,
    searchVehicle,
};
