const express = require("express");
const router = require("./src/routes/api.js");
const authRoutes = require("./src/routes/auth.route.js");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const dotenv = require("dotenv");
const dbConnection = require("./database/dbConnection.js");
const BlogModel = require("./src/models/BlogModel.js");
dotenv.config({ path: "./.env" });

const app = express();

// Security Middleware Implement
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }, { limit: "50mb" }));

// Request Rate Limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);

app.use("/api/v1", router);
app.use("/api/auth", authRoutes);
// Routing Implement

dbConnection();

app.get("/api/v1/blogs", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const skip = (page - 1) * limit; // Calculate how many entries to skip
    const blogs = await BlogModel.find().skip(skip).limit(parseInt(limit));
    const totalCount = await BlogModel.countDocuments(); // Total count of documents
    res.json({ success: true, blogs, totalCount });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ success: false, message: "Error fetching blogs" });
  }
});
// app.use(express.static(path.join(__dirname, "/frontend/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "/frontend/build/index.html"));
// });
module.exports = app;
