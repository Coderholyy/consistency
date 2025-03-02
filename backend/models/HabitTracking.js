import Tracking from "./Tracking.js";

class HabitTracking extends Tracking {
  constructor(
    type,
    userId,
    title,
    goal,
    unit = "times",
    frequency = "daily",
    repeat_interval
  ) {
    super(type, userId, title, goal, unit, frequency, repeat_interval);
  }

  async updateStreak() {
    const query = `
            WITH last_log AS (
                SELECT MAX(timestamp) as last_date
                FROM tracking_logs
                WHERE tracking_id = (SELECT id FROM trackings WHERE title = $1 AND user_id = $2)
            )
            UPDATE streaks
            SET current_streak = 
                CASE 
                    WHEN last_logged_date IS NULL OR DATE_PART('day', NOW() - last_logged_date) <= 1 THEN current_streak + 1
                    ELSE 1
                END,
                max_streak = GREATEST(max_streak, current_streak),
                last_logged_date = (SELECT last_date FROM last_log)
            WHERE tracking_id = (SELECT id FROM trackings WHERE title = $1 AND user_id = $2);
        `;
    await pool.query(query, [this.title, this.userId]);
  }
}

export default HabitTracking;
