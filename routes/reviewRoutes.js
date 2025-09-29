// routes/reviewRoutes.js
const express = require("express");
const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { requireAuth } = require("../middleware/authMiddleware");
const ctrl = require("../controllers/reviewController");

const router = express.Router();

// -------------------------
// Public routes
// -------------------------
router.get(
  "/:artisanId",
  param("artisanId").isInt().withMessage("artisanId must be an integer"),
  validate,
  ctrl.getByArtisan
);

// -------------------------
// Protected routes
// -------------------------
router.post(
  "/",
  requireAuth,
  [
    body("artisanId").isInt().withMessage("artisanId must be an integer"),
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment")
      .optional()
      .isString()
      .isLength({ max: 500 })
      .withMessage("Comment must be a string with max 500 characters"),
  ],
  validate,
  ctrl.create
);

router.put(
  "/:id",
  requireAuth,
  [
    param("id").isInt().withMessage("Review ID must be an integer"),
    body("rating")
      .optional()
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating must be between 1 and 5"),
    body("comment")
      .optional()
      .isString()
      .isLength({ max: 500 })
      .withMessage("Comment must be a string with max 500 characters"),
  ],
  validate,
  ctrl.update
);

router.delete(
  "/:id",
  requireAuth,
  param("id").isInt().withMessage("Review ID must be an integer"),
  validate,
  ctrl.remove
);

module.exports = router;
