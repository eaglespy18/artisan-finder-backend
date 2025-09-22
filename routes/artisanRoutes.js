// routes/artisanRoutes.js
const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisanController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

// PUBLIC: list and get
router.get("/", artisanController.getAll);
router.get("/:id", artisanController.getById);

// PROTECTED (create/update/delete) - adjust to your policy
router.post("/", requireAuth, artisanController.create);
router.put("/:id", requireAuth, artisanController.update);
router.delete("/:id", requireAuth, artisanController.remove);

module.exports = router;
