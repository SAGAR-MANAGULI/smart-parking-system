const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addVehicle,
    getVehicles,
    deleteVehicle,
    updateVehicle,
    searchVehicle,
} = require("../controllers/vehicleController");

router.post("/add", protect, addVehicle);

router.get("/", getVehicles);
router.get("/search", protect, searchVehicle);

router.delete("/:id", protect, deleteVehicle);

router.put("/:id", protect, updateVehicle);

module.exports = router;