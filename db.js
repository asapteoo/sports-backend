require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection(process.env.MYSQL_URL);

db.connect((err) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("Connected to Railway MySQL database");
  }
});

module.exports = db;

