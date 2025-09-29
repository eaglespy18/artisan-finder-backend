// routes/adminRoutes.js
const express = require("express");
const { body, param } = require("express-validator");
const { handleValidation } = require("../middleware/handleValidation");
const artisanController = require("../controllers/artisanController");
const { requireAuth, requireAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * Admin-only: Create new artisan
 */
router.post(
  "/artisans",
  requireAuth,
  requireAdmin,
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("skill").notEmpty().withMessage("Skill is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("phone").isMobilePhone().withMessage("Invalid phone number"),
  ],
  handleValidation,
  artisanController.createArtisan
);

/**
 * Admin-only: Update artisan
 */
router.put(
  "/artisans/:id",
  requireAuth,
  requireAdmin,
  [
    param("id").isInt().withMessage("Invalid artisan ID"),
    body("name").optional().notEmpty().withMessage("Name cannot be empty"),
    body("skill").optional().notEmpty().withMessage("Skill cannot be empty"),
    body("location").optional().notEmpty().withMessage("Location cannot be empty"),
    body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  ],
  handleValidation,
  artisanController.updateArtisan
);

/**
 * Admin-only: Delete artisan
 */
router.delete(
  "/artisans/:id",
  requireAuth,
  requireAdmin,
  [param("id").isInt().withMessage("Invalid artisan ID")],
  handleValidation,
  artisanController.deleteArtisan
);

module.exports = router;
