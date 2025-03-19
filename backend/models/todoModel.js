import pool from "../utils/db.js";

export const Todo = {
  create: async ({ user_id, tracking_id, due_date, status }) => {
    const query = `
      INSERT INTO to_do_list (user_id, tracking_id, due_date, status)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [user_id, tracking_id, due_date, status];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getByUser: async (user_id) => {
    const { rows } = await pool.query(
      "SELECT * FROM to_do_list WHERE user_id = $1",
      [user_id]
    );
    return rows;
  },
};
