import Tracking from "./Tracking.js";

class DietTracking extends Tracking {
  constructor(
    type,
    userId,
    title,
    goal,
    unit = "calories",
    frequency = "daily",
    repeat_interval
  ) {
    super(type, userId, title, goal, unit, frequency, repeat_interval);
  }

  async getCaloricIntake() {
    const query = `
            SELECT SUM(quantity) AS total_calories
            FROM tracking_logs
            WHERE tracking_id = (SELECT id FROM trackings WHERE title = $1 AND user_id = $2);
        `;
    const result = await pool.query(query, [this.title, this.userId]);
    return result.rows[0].total_calories;
  }
}

export default DietTracking;
