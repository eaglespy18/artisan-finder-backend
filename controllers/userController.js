// controllers/userController.js
const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET || "dev_secret";

exports.register = async (req, res, next) => {
  try {
    const { email, password, name, role = "user" } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password required" });

    // check if user exists
    const exists = await db.query(`SELECT id FROM users WHERE email=$1`, [email]);
    if (exists.rows.length) return res.status(409).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (email, password, name, role) VALUES ($1,$2,$3,$4) RETURNING id, email, name, role`,
      [email, hashed, name, role]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await db.query(`SELECT id, email, password, role, name FROM users WHERE email = $1`, [email]);
    if (result.rows.length === 0) return res.status(401).json({ message: "Invalid credentials" });
    const user = result.rows[0];

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, jwtSecret, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });
    res.json({ token });
  } catch (err) {
    next(err);
  }
};
