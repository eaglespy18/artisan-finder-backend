// config/db.js
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

pool.connect()
  .then(() => console.log("✅ Connected to artisan_finder DB"))
  .catch(err => console.error("❌ DB connection error:", err));

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool
};
