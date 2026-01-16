// Load environment variables from .env
require("dotenv").config();
console.log("DB USER:", process.env.DB_USER);

const express = require("express");
const cors = require("cors");

app.use(cors()); // <-- allow all origins
// or, to be stricter:
app.use(cors({
  origin: "http://127.0.0.1:5500" // your frontend origin
}));

const userRoutes = require("./Routes/userRoutes");
const authRoutes = require("./Routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route to check POST requests
app.post("/test", (req, res) => {
  console.log(req.body);
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
