const express = require("express");
const { getUserProfile, updateUserProfile ,getUserProfilebyId} = require("../controllers/profileController");
const { authenticateToken } = require("../middlewares/authMiddleware");

const router = express.Router();

// Get user profile
router.get("/", authenticateToken, getUserProfile);

// Update user profile
router.put("/", authenticateToken, updateUserProfile);

// Without Bearer
router.get("/:id",authenticateToken,getUserProfilebyId);

module.exports = router;
