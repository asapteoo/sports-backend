const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "sports_user",
  password: "sports_pass",
  database: "sports",
  port: 8080
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("DB connected!");
  }
  db.end();
});
