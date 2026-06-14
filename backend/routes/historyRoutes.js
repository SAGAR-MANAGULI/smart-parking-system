const express = require("express");

const router = express.Router();

const {
    getParkingHistory,
} = require("../controllers/historyController");

router.get("/", getParkingHistory);

module.exports = router;