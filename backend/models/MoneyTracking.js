import Tracking from "./Tracking.js";

class MoneyTracking extends Tracking {
  constructor(
    type,
    userId,
    title,
    goal,
    unit = "currency",
    frequency = "monthly",
    repeat_interval
  ) {
    super(type, userId, title, goal, unit, frequency, repeat_interval);
  }

  async getTotalSpent() {
    const query = `
            SELECT SUM(quantity) AS total_spent
            FROM tracking_logs
            WHERE tracking_id = (SELECT id FROM tracking WHERE title = $1 AND user_id = $2);
        `;
    const result = await pool.query(query, [this.title, this.userId]);
    return result.rows[0].total_spent;
  }
}

export default MoneyTracking;
