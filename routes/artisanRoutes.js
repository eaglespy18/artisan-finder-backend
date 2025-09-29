// routes/artisanRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/artisanController");

// ✅ Public-facing routes (no auth needed)
router.get("/", ctrl.getAll);       // list all artisans
router.get("/:id", ctrl.getById);   // get artisan by id

// ❌ No create/update/delete here (adminRoutes.js handles those)

module.exports = router;
