import pool from "../utils/db.js";

export const Log = {
  create: async ({ tracking_id, status, timestamp }) => {
    const query = `
      INSERT INTO tracking_logs (tracking_id, status, timestamp)
      VALUES ($1, $2, $3) RETURNING *;
    `;
    const values = [tracking_id, status, timestamp];
    const { rows } = await pool.query(query, values);
    return rows[0];
  },

  getByTrackingId: async (tracking_id) => {
    const { rows } = await pool.query(
      "SELECT * FROM tracking_logs WHERE tracking_id = $1",
      [tracking_id]
    );
    return rows;
  },
};
