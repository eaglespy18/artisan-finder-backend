// controllers/reviewController.js
const db = require("../config/db");

exports.getByArtisan = async (req, res, next) => {
  try {
    const { artisanId } = req.params;
    const result = await db.query(`SELECT id, artisan_id, user_id, rating, comment, created_at FROM reviews WHERE artisan_id=$1 ORDER BY created_at DESC`, [artisanId]);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { artisanId, rating, comment } = req.body;
    const userId = req.user?.id || null;
    const result = await db.query(
      `INSERT INTO reviews (artisan_id, user_id, rating, comment) VALUES ($1,$2,$3,$4) RETURNING id`,
      [artisanId, userId, rating, comment]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    next(err);
  }
};
