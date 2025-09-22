// server.js (CommonJS)
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { errorHandler } = require("./middleware/errorHandler");

// load .env
dotenv.config();

const app = express();

// built-in middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
const artisanRoutes = require("./routes/artisanRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/artisans", artisanRoutes);   // <-- matches frontend expectation /artisans
app.use("/users", userRoutes);

// health
app.get("/", (req, res) => res.send("Artisan Finder Backend running"));

// error handler (last)
app.use(errorHandler);

// start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
