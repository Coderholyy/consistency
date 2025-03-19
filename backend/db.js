import poolPkg from "pg";
const { Pool } = poolPkg;
import dotenv from "dotenv";
// import { Pool } from "pg";

dotenv.config();
const pool = new Pool({
  user: "shanmukhasudheendra",
  password: "N8npREcrdxFYshgB",
  host: "localhost",
  port: 5432,
  database: "consistency_tutorial",
});

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
