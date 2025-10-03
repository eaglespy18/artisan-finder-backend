// controllers/reviewController.js
const db = require("../config/db");

exports.getByArtisan = async (req, res, next) => {
  try {
    const { artisanId } = req.params;

    // Fetch artisan reviews
    const reviews = await db.query(
      `SELECT id, artisan_id, user_id, rating, comment, created_at
       FROM reviews
       WHERE artisan_id=$1
       ORDER BY created_at DESC`,
      [artisanId]
    );

    // Fetch average + count
    const stats = await db.query(
      `SELECT 
         COALESCE(ROUND(AVG(rating), 2), 0) AS average_rating,
         COUNT(*)::int AS total_reviews
       FROM reviews
       WHERE artisan_id=$1`,
      [artisanId]
    );

    res.json({
      artisanId,
      average_rating: stats.rows[0].average_rating,
      total_reviews: stats.rows[0].total_reviews,
      reviews: reviews.rows,
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const { artisanId, rating, comment } = req.body;
    const userId = req.user?.id || null;

    const result = await db.query(
      `INSERT INTO reviews (artisan_id, user_id, rating, comment) 
       VALUES ($1,$2,$3,$4) 
       RETURNING id`,
      [artisanId, userId, rating, comment]
    );

    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user?.id;

    // Ensure review belongs to user
    const check = await db.query(
      `SELECT * FROM reviews WHERE id=$1 AND user_id=$2`,
      [id, userId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ error: "Not allowed to update this review" });
    }

    await db.query(
      `UPDATE reviews 
       SET rating = COALESCE($1, rating),
           comment = COALESCE($2, comment)
       WHERE id=$3`,
      [rating, comment, id]
    );

    res.json({ message: "Review updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    // Ensure review belongs to user 
    const check = await db.query(
      `SELECT * FROM reviews WHERE id=$1 AND user_id=$2`,
      [id, userId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ error: "Not allowed to delete this review" });
    }

    await db.query(`DELETE FROM reviews WHERE id=$1`, [id]);

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
};
