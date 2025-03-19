// import bcrypt from "bcrypt";
// const saltRounds = 10;

// async function hashPassword(password) {
//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     console.log("Hashed Password:", hashedPassword);
//   } catch (error) {
//     console.error("Error hashing password:", error);
//   }
// }

// // Example usage
// hashPassword("test123");
import pool from "./db.js";

const alterTables = async () => {
  const query = `
   ALTER TABLE to_do_list
   UPDATE due_time type TIME;
  `;

  try {
    await pool.query(query);
    console.log("✅ ALTER TABLE successful");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
};

// Run the function
alterTables();
