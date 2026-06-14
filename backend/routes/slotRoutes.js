const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createSlot,
    getSlots,
    assignSlot,
    releaseSlot,
    getAvailableSlots,
    deleteSlot,
} = require("../controllers/slotController");

router.post("/create", protect, createSlot);

router.get("/", protect, getSlots);

router.put("/assign", protect, assignSlot);

router.put("/release", protect, releaseSlot);
router.get("/available", getAvailableSlots);

router.delete("/:slotId", protect, deleteSlot);

module.exports = router;