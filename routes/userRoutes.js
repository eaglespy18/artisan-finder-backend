// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/userController");

// Register new user
router.post("/register", ctrl.register);

// Login user (returns access + refresh tokens)
router.post("/login", ctrl.login);

// Refresh access token
router.post("/refresh", ctrl.refresh);  // ✅ matches userController.js

// Logout user (invalidate refresh token)
router.post("/logout", ctrl.logout);

module.exports = router;
