// routes/reviewRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/reviewController");
const { requireAuth } = require("../middleware/authMiddleware");

// list reviews for an artisan
router.get("/:artisanId", ctrl.getByArtisan);

// create review (requires auth)
router.post("/", requireAuth, ctrl.create);

module.exports = router;
