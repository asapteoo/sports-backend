require("dotenv").config();
const mysql = require("mysql2/promise");

async function fixTable() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  });

  console.log("Connected to database");

  const sql = `
    ALTER TABLE users
    ADD COLUMN username VARCHAR(100) UNIQUE AFTER id;
  `;

  await connection.execute(sql);
  console.log("Username column added");

  await connection.end();
}

fixTable().catch(err => {
  console.error("Error:", err);
});
