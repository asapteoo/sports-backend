const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");

router.post("/register", async (req, res) => {
  console.log("📥 Register endpoint hit");
  console.log("Body:", req.body);

  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Missing fields" });
    }

    // TEMP TEST RESPONSE
    return res.json({ message: "Register route working" });

  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ error: "Server error" });
    router.post("/login", loginController);
  }
});



module.exports = router;
