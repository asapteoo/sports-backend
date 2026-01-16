// Load environment variables from .env
require("dotenv").config();
console.log("DB USER:", process.env.DB_USER);

const express = require("express");
const cors = require("cors");

// Initialize app first
const app = express();

// Middleware
// Allow all origins in production or specify your frontend origin for security
app.use(cors()); 
app.use(express.json());

// Import routes
const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");

// Test route to check POST requests
app.post("/test", (req, res) => {
  console.log("📥 /test hit with body:", req.body);
  res.json({ received: req.body });
});

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Sports API running!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
