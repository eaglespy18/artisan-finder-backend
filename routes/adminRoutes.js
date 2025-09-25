// routes/artisanRoutes.js
const express = require("express");
const { body } = require("express-validator");
const { handleValidation } = require("../middleware/handleValidation");
const artisanController = require("../controllers/artisanController");

const router = express.Router();

// Create Artisan
router.post(
  "/",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("skill").notEmpty().withMessage("Skill is required"),
    body("location").notEmpty().withMessage("Location is required"),
    body("phone").isMobilePhone().withMessage("Invalid phone number")
  ],
  handleValidation, // <- custom middleware to return validation errors
  artisanController.createArtisan
);

module.exports = router;
