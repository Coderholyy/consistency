import pool from "../utils/db.js";

export const Milestone = {
  create: async ({ user_id, goal_id, progress }) => {
    const query = `
      INSERT INTO milestones (user_id, goal_id, progress)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [user_id, goal_id, progress];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getByUser: async (user_id) => {
    const { rows } = await pool.query(
      "SELECT * FROM milestones WHERE user_id = $1",
      [user_id]
    );
    return rows;
  },
};
