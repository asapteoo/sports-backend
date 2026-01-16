require("dotenv").config();
const mysql = require("mysql2");

// If using Railway MYSQL_URL
// Example: mysql://user:password@host:port/dbname
const DATABASE_URL = process.env.MYSQL_URL;

if (!DATABASE_URL) {
  console.error("❌ MYSQL_URL not found in environment variables!");
  process.exit(1);
}

// Parse the URL
const url = new URL(DATABASE_URL);

const db = mysql.createConnection({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.replace("/", ""),
  port: url.port || 3306,
});

// Connect
db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = db;
