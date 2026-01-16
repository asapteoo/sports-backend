require("dotenv").config();
const mysql = require("mysql2");

let db;

if (process.env.MYSQL_URL) {
  console.log("Using MYSQL_URL (Railway)");
  db = mysql.createConnection(process.env.MYSQL_URL);
} else {
  console.log("Using local MySQL config");
  db = mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "sports",
    port: process.env.DB_PORT || 3306
  });
}

db.connect(err => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

module.exports = db;
