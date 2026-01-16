require("dotenv").config();
const mysql = require("mysql2");

// DATABASE_URL from Railway looks like:
// mysql://username:password@host:port/dbname
const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  console.error("❌ DATABASE_URL not found in env");
  process.exit(1);
}

// Parse the URL
const url = new URL(dbUrl);
const db = mysql.createConnection({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.replace("/", ""), // remove leading slash
  port: url.port
});

db.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

module.exports = db;
