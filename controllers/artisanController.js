// controllers/artisanController.js
const db = require("../config/db");

// helper: map Database row to frontend-friendly keys
const mapRow = (r) => ({
  id: r.id,
  name: r.name,
  skill: r.skill,
  location: r.location,
  phone: r.phone,
  experience: r.experience,
  description: r.description,
  rating: r.rating,
  completedJobs: r.completed_jobs,
  avatar: r.avatar
});

exports.getAll = async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT id, name, skill, location, phone, experience, description, rating, completed_jobs, avatar FROM artisans ORDER BY id`
    );
    res.json(result.rows.map(mapRow));
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await db.query(
      `SELECT id, name, skill, location, phone, experience, description, rating, completed_jobs, avatar FROM artisans WHERE id = $1`,
      [id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: "Artisan not found" });
    res.json(mapRow(result.rows[0]));
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { name, skill, location, phone, experience, description, rating = null, completedJobs = 0, avatar = null } = req.body;
    const result = await db.query(
      `INSERT INTO artisans (name, skill, location, phone, experience, description, rating, completed_jobs, avatar)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
      [name, skill, location, phone, experience, description, rating, completedJobs, avatar]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, skill, location, phone, experience, description, rating, completedJobs, avatar } = req.body;
    await db.query(
      `UPDATE artisans SET name=$1, skill=$2, location=$3, phone=$4, experience=$5, description=$6, rating=$7, completed_jobs=$8, avatar=$9 WHERE id=$10`,
      [name, skill, location, phone, experience, description, rating, completedJobs, avatar, id]
    );
    res.json({ message: "Updated" });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM artisans WHERE id=$1`, [id]);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
};
