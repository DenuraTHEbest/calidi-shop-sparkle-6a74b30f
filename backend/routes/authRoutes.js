const express = require("express");
const router = express.Router();
const { signup, login, verifyEmail, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/auth");

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.get("/me", protect, getMe);

module.exports = router;
