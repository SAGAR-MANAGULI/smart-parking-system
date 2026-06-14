const ParkingSlot = require("../models/ParkingSlot");
const Vehicle = require("../models/Vehicle");
const Payment = require("../models/Payment");
const ParkingHistory = require("../models/ParkingHistory");

const asyncHandler = require("../utils/asyncHandler");

const getDashboardSummary = asyncHandler(async (req, res) => {

    const totalSlots = await ParkingSlot.countDocuments();

    const occupiedSlots = await ParkingSlot.countDocuments({
        isOccupied: true,
    });

    const freeSlots = await ParkingSlot.countDocuments({
        isOccupied: false,
    });

    const totalVehicles = await Vehicle.countDocuments();

    res.status(200).json({
        success: true,

        data: {
            totalSlots,
            occupiedSlots,
            freeSlots,
            totalVehicles,
        },
    });
});

const getTotalRevenue = asyncHandler(async (req, res) => {

    const history = await ParkingHistory.find();

    let totalRevenue = 0;

    history.forEach((item) => {
        totalRevenue += item.amount || 0;
    });

    res.status(200).json({
        success: true,
        totalRevenue,
    });
});

const getTodayRevenue = asyncHandler(async (req, res) => {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const history = await ParkingHistory.find({
        exitTime: {
            $gte: today,
        },
    });

    let todayRevenue = 0;

    history.forEach((item) => {
        todayRevenue += item.amount || 0;
    });

    res.status(200).json({
        success: true,
        todayRevenue,
    });
});

const getDashboardStats = asyncHandler(async (req, res) => {

    const totalVehicles =
        await Vehicle.countDocuments();

    const parkedVehicles =
        await Vehicle.countDocuments({
            vehicleStatus: "Parked",
        });

    const exitedVehicles =
        await Vehicle.countDocuments({
            vehicleStatus: "Exited",
        });

    const availableSlots =
        await ParkingSlot.countDocuments({
            isOccupied: false,
        });

    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
        (acc, item) => acc + item.amount,
        0
    );

    res.status(200).json({
        success: true,

        data: {
            totalVehicles,
            parkedVehicles,
            exitedVehicles,
            availableSlots,
            totalRevenue,
        },
    });
});

const getMonthlyRevenue = asyncHandler(async (req, res) => {

    const monthlyRevenue = await ParkingHistory.aggregate([
        {
            $group: {
                _id: {
                    month: {
                        $month: "$exitTime",
                    },
                },

                totalRevenue: {
                    $sum: "$amount",
                },
            },
        },

        {
            $sort: {
                "_id.month": 1,
            },
        },
    ]);

    res.status(200).json({
        success: true,
        data: monthlyRevenue,
    });
});

const getDailyRevenue = asyncHandler(async (req, res) => {

    const dailyRevenue = await ParkingHistory.aggregate([
        {
            $group: {
                _id: {
                    day: {
                        $dayOfMonth: "$exitTime",
                    },

                    month: {
                        $month: "$exitTime",
                    },

                    year: {
                        $year: "$exitTime",
                    },
                },

                totalRevenue: {
                    $sum: "$amount",
                },
            },
        },

        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
                "_id.day": 1,
            },
        },
    ]);

    res.status(200).json({
        success: true,
        data: dailyRevenue,
    });
});

const getVehicleEntryAnalytics = asyncHandler(async (req, res) => {

    const vehicleEntries = await Vehicle.aggregate([
        {
            $group: {
                _id: {
                    day: {
                        $dayOfMonth: "$entryTime",
                    },

                    month: {
                        $month: "$entryTime",
                    },

                    year: {
                        $year: "$entryTime",
                    },
                },

                totalVehicles: {
                    $sum: 1,
                },
            },
        },

        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
                "_id.day": 1,
            },
        },
    ]);

    res.status(200).json({
        success: true,
        data: vehicleEntries,
    });
});

const getOccupancyAnalytics = asyncHandler(async (req, res) => {

    const totalSlots =
        await ParkingSlot.countDocuments();

    const occupiedSlots =
        await ParkingSlot.countDocuments({
            isOccupied: true,
        });

    const occupancyPercentage =
        totalSlots === 0
            ? 0
            : ((occupiedSlots / totalSlots) * 100)
                .toFixed(2);

    res.status(200).json({
        success: true,

        data: {
            totalSlots,
            occupiedSlots,
            occupancyPercentage,
        },
    });
});

const getPaymentMethodAnalytics =
    asyncHandler(async (req, res) => {

        const paymentAnalytics =
            await Payment.aggregate([
                {
                    $group: {
                        _id: "$paymentMethod",

                        totalTransactions: {
                            $sum: 1,
                        },

                        totalAmount: {
                            $sum: "$amount",
                        },
                    },
                },
            ]);

        res.status(200).json({
            success: true,
            data: paymentAnalytics,
        });
    });

const getVehicleTypeAnalytics =
    asyncHandler(async (req, res) => {

        const vehicleAnalytics =
            await Vehicle.aggregate([
                {
                    $group: {
                        _id: "$vehicleType",

                        totalVehicles: {
                            $sum: 1,
                        },
                    },
                },
            ]);

        res.status(200).json({
            success: true,
            data: vehicleAnalytics,
        });
    });

const getPeakHoursAnalytics =
    asyncHandler(async (req, res) => {

        const peakHours =
            await Vehicle.aggregate([
                {
                    $group: {
                        _id: {
                            hour: {
                                $hour: "$entryTime",
                            },
                        },

                        totalVehicles: {
                            $sum: 1,
                        },
                    },
                },

                {
                    $sort: {
                        totalVehicles: -1,
                    },
                },
            ]);

        res.status(200).json({
            success: true,
            data: peakHours,
        });
    });

module.exports = {
    getDashboardSummary,
    getTotalRevenue,
    getTodayRevenue,
    getDashboardStats,
    getMonthlyRevenue,
    getDailyRevenue,
    getVehicleEntryAnalytics,
    getOccupancyAnalytics,
    getPaymentMethodAnalytics,
    getVehicleTypeAnalytics,
    getPeakHoursAnalytics,
};