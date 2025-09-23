// routes/artisanRoutes.js
const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/artisanController");
const { requireAuth } = require("../middleware/authMiddleware");

// Public
router.get("/", ctrl.getAll);
router.get("/:id", ctrl.getById);

// Protected (you can switch some endpoints to admin-only by using requireAdmin)
router.post("/", requireAuth, ctrl.create);
router.put("/:id", requireAuth, ctrl.update);
router.delete("/:id", requireAuth, ctrl.remove);

module.exports = router;
