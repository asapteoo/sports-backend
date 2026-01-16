require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// MIDDLEWARE (NO origin restriction while debugging)
app.use(cors());
app.use(express.json());

// ROUTES
const authRoutes = require("./Routes/authRoutes");

app.use("/api/auth", authRoutes);

// ROOT TEST
app.get("/", (req, res) => {
  res.send("SPORTS BACKEND API is running");
});

// START SERVER
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
