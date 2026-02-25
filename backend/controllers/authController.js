const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendVerificationEmail } = require("../utils/email");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/signup
exports.signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ error: "Email already registered" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await User.create({
      email,
      password,
      verificationToken,
      verificationTokenExpires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
    });

    // Send verification email (non-blocking – don't fail signup if email fails)
    sendVerificationEmail(email, verificationToken).catch((err) =>
      console.error("Email send error:", err.message)
    );

    res.status(201).json({
      message: "Account created. Please check your email to verify your account.",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    if (!user.isVerified) {
      return res.status(403).json({ error: "Please verify your email before signing in" });
    }

    const token = generateToken(user._id);

    res.json({
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/auth/verify-email?token=xxx
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).json({ error: "Token is required" });

    const user = await User.findOne({
      verificationToken: token,
      verificationTokenExpires: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid or expired verification token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now sign in." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/auth/me  (protected)
exports.getMe = async (req, res) => {
  res.json({ user: { id: req.user._id, email: req.user.email } });
};
