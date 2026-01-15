const bcrypt = require("bcrypt");
const mysql = require("mysql2");

// Connect to your database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",           // your DB username
  password: "process.env.DB_PASSWORD", // your DB password
  database: "sports"      // your actual DB name
});

// 1. Fetch all users
db.query("SELECT id, password FROM users", async (err, results) => {
  if (err) throw err;

  for (let user of results) {
    const currentPassword = user.password;

    // Skip if already hashed (optional: check if it starts with $2b$)
    if (currentPassword.startsWith("$2b$")) continue;

    // Hash plain-text password
    const hashed = await bcrypt.hash(currentPassword, 10);

    // Update user with hashed password
    db.query(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashed, user.id],
      (err, result) => {
        if (err) throw err;
        console.log(`User ID ${user.id} password hashed.`);
      }
    );
  }

  console.log("All passwords processed!");
  db.end();
});
