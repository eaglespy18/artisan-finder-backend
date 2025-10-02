// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");

dotenv.config();

const app = express();

// ---------------------
// middleware
// ---------------------
app.use(helmet());

// Only allow requests from your frontend dev server (adjust for prod)
app.use(
  cors({
    origin: "http://localhost:8080", // frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

// ---------------------
// Rate limiting (login)
// ---------------------
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 login requests per windowMs
  message: {
    success: false,
    message: "Too many login attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply limiter to login only
app.use("/users/login", loginLimiter);

// ---------------------
// routes
// ---------------------
const artisanRoutes = require("./routes/artisanRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/artisans", artisanRoutes); // public browsing
app.use("/admin/artisans", adminRoutes); // admin-only management
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

// ---------------------
// health checker
// ---------------------
app.get("/", (req, res) => res.send("✅ Artisan Finder Backend running"));

// ---------------------
// error handler (catch-all errors)
// ---------------------
const { errorHandler } = require("./middleware/errorHandler");
app.use(errorHandler);

// ---------------------
// start server
// ---------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
