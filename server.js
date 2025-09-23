// server.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
const artisanRoutes = require("./routes/artisanRoutes");
const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

app.use("/artisans", artisanRoutes);   // matches frontend GET http://localhost:5000/artisans
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);

// health
app.get("/", (req, res) => res.send("Artisan Finder Backend running"));

// error handler (catch-all)
const { errorHandler } = require("./middleware/errorHandler");
app.use(errorHandler);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
