const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    registerAdmin,
    loginAdmin,
    getAdminProfile,
} = require("../controllers/authController");

router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/profile", protect, getAdminProfile);

module.exports = router;

