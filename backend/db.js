import poolPkg from "pg";
const { Pool } = poolPkg;
import dotenv from "dotenv";
// import { Pool } from "pg";

dotenv.config();

// Use DATABASE_URL from environment variables
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Ensure this is set in .env
  ssl: process.env.DATABASE_URL.includes("localhost")
    ? false
    : { rejectUnauthorized: false }, // Enable SSL for production DBs
});

// Test the connection
pool
  .connect()
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err));

// const pool = new Pool({
//   user: "shanmukhasudheendra",
//   password: "N8npREcrdxFYshgB",
//   host: "localhost",
//   port: 5432,
//   database: "consistency_tutorial",
// });

export default pool;
// const { Pool } = require("pg");

// const pool = new Pool({
//   user: "shanmukhasudheendra",
//   password: "N8npREcrdxFYshgB",
//   host: "localhost",
//   port: 5432,
//   database: "consistency_tutorial",
// });
// export default pool;

// module.exports = pool;
