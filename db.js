require("dotenv").config();
const mysql = require("mysql2");

let db;

if (process.env.MYSQL_URL) {
  console.log("Using Railway MySQL");

  const url = new URL(process.env.MYSQL_URL);

  db = mysql.createConnection({
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.replace("/", ""),
    port: url.port || 3306,
  });

} else {
  console.log("⚠️ No MYSQL_URL found. DB disabled locally.");
}

db?.connect((err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL");
  }
});

module.exports = db;
