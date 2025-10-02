// controllers/adminController.js
const db = require("../config/db");

// Create artisan (Admin only)
exports.createArtisan = async (req, res, next) => {
  try {
    const { name, skill, location, phone, experience, description, rating, completed_jobs, avatar } = req.body;

    const result = await db.query(
      `INSERT INTO artisans (name, skill, location, phone, experience, description, rating, completed_jobs, avatar)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
       RETURNING *`,
      [name, skill, location, phone, experience, description, rating || null, completed_jobs || 0, avatar || null]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Update artisan (Admin only)
exports.updateArtisan = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, skill, location, phone, experience, description, rating, completed_jobs, avatar } = req.body;

    const result = await db.query(
      `UPDATE artisans
       SET name = COALESCE($1, name),
           skill = COALESCE($2, skill),
           location = COALESCE($3, location),
           phone = COALESCE($4, phone),
           experience = COALESCE($5, experience),
           description = COALESCE($6, description),
           rating = COALESCE($7, rating),
           completed_jobs = COALESCE($8, completed_jobs),
           avatar = COALESCE($9, avatar)
       WHERE id = $10
       RETURNING *`,
      [name, skill, location, phone, experience, description, rating, completed_jobs, avatar, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Artisan not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};

// Delete artisan (Admin only)
exports.deleteArtisan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await db.query(`DELETE FROM artisans WHERE id=$1 RETURNING id`, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Artisan not found" });
    }

    res.json({ message: "Artisan deleted successfully" });
  } catch (err) {
    next(err);
  }
};
