import poolPkg from "pg";
const { Pool } = poolPkg;
// import { Pool } from "pg";

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
