require("dotenv").config();
const mysql = require("mysql2");

let db;

if (process.env.MYSQL_URL) {
  console.log("Using Railway MySQL");

  db = mysql.createConnection(process.env.MYSQL_URL);
} else {
  console.log("⚠️ No MYSQL_URL found. DB disabled locally.");

  // Dummy DB so app doesn't crash locally
  db = {
    query: (sql, params, cb) => {
      cb(new Error("Database not connected"), null);
    }
  };
}

module.exports = db;

