import { Pool } from "pg";

// export const pool = new Pool({
//   user: "postgres",
//   password: "postyy",
//   host: "localhost",
//   port: 5432,
//   database: "consistency_tutorial",
// });

// Use DATABASE_URL from environment variables
export const pool = new Pool({
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
