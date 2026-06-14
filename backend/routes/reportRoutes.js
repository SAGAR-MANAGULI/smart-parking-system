const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
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
} = require("../controllers/reportController");

router.get(
    "/summary",
    protect,
    authorizeRoles("admin"),
    getDashboardSummary
);

router.get(
    "/stats",
    protect,
    authorizeRoles("admin"),
    getDashboardStats

);

router.get(
    "/revenue",
    protect,
    authorizeRoles("admin"),
    getTotalRevenue
);

router.get(
    "/today-revenue",
    protect,
    authorizeRoles("admin"),
    getTodayRevenue
);

router.get(
    "/monthly-revenue",
    protect,
    authorizeRoles("admin"),
    getMonthlyRevenue
);

router.get(
    "/daily-revenue",
    protect,
    authorizeRoles("admin"),
    getDailyRevenue
);

router.get(
    "/vehicle-entry-analytics",
    protect,
    authorizeRoles("admin"),
    getVehicleEntryAnalytics
);

router.get(
    "/occupancy-analytics",
    protect,
    authorizeRoles("admin"),
    getOccupancyAnalytics
);

router.get(
    "/payment-method-analytics",
    protect,
    authorizeRoles("admin"),
    getPaymentMethodAnalytics
);

router.get(
    "/vehicle-type-analytics",
    protect,
    authorizeRoles("admin"),
    getVehicleTypeAnalytics
);

router.get(
    "/peak-hours-analytics",
    protect,
    authorizeRoles("admin"),
    getPeakHoursAnalytics
);

module.exports = router;