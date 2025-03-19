import pool from "../utils/db.js";

export const Tracking = {
  create: async ({ user_id, title, frequency, repeat_interval, goal_id }) => {
    const query = `
      INSERT INTO trackings (user_id, title, frequency, repeat_interval, goal_id)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;
    `;
    const values = [user_id, title, frequency, repeat_interval, goal_id];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getByUser: async (user_id) => {
    const { rows } = await pool.query(
      "SELECT * FROM trackings WHERE user_id = $1",
      [user_id]
    );
    return rows;
  },
};
