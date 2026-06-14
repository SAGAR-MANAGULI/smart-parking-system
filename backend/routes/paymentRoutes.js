const express = require("express");

const router = express.Router();

const {
    createPayment,
    getPayments,
    deletePayment,
    stopParking,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");

router.post("/create", createPayment);

router.get("/", protect, getPayments);

router.delete("/:id", protect, deletePayment);

router.post("/stop", stopParking);

module.exports = router;