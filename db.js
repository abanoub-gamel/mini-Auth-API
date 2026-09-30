const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
module.exports = pool;

pool.query("SELECT NOW()", (err, result) => {
  if (err) {
    console.log("Database connection failed");
  } else {
    console.log("Database connected");
  }
});
