require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db"); // use our safe DB connection

const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");

const app = express();

// Middleware
app.use(cors({
  origin: "*" // allow all origins for testing
}));
app.use(express.json());

// Test route
app.post("/test", (req, res) => {
  console.log("Test POST body:", req.body);
  res.json({ received: req.body });
});

// API Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Sports API running!");
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
