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
   ALTER TABLE to_do_list ADD COLUMN due_time_temp TIME;
    UPDATE to_do_list SET due_time_temp = due_time::TIME;
    ALTER TABLE to_do_list DROP COLUMN due_time;
    ALTER TABLE to_do_list RENAME COLUMN due_time_temp TO due_time;

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
