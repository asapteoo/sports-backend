require('dotenv').config();
const mysql = require('mysql2');

let db;

if (process.env.MYSQL_URL) {
  // Railway gives a full URL like mysql://user:pass@host:port/db
  const url = new URL(process.env.MYSQL_URL);
  db = mysql.createConnection({
    host: url.hostname,
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1), // remove the leading /
    port: url.port
  });
} else {
  // Local fallback
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sports',
    port: process.env.DB_PORT || 3306
  });
}

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

module.exports = db;
