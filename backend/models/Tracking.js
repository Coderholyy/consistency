import pool from "../db.js";

class Tracking {
  constructor(type, userId, title, goal, unit, frequency, repeat_interval) {
    this.type = type;
    this.userId = userId;
    this.title = title;
    this.goal = goal || 0;
    this.unit = unit || "times";
    this.frequency = frequency || "daily";
    this.repeat_interval = repeat_interval || 0;
  }

  async saveToDatabase() {
    const query = `
            INSERT INTO trackings (user_id, title, goal, unit, frequency, type, repeat_interval)
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;
        `;
    return (
      await pool.query(query, [
        this.userId,
        this.title,
        this.goal,
        this.unit,
        this.frequency,
        this.type,
        this.repeat_interval,
      ])
    ).rows[0];
  }

  async logProgress(quantity = 1) {
    const query = `
            INSERT INTO tracking_logs (tracking_id, user_id, timestamp, quantity)
            VALUES (
                (SELECT id FROM trackings WHERE title = $1 AND user_id = $2), 
                $2, NOW(), $3
            );
        `;
    await pool.query(query, [this.title, this.userId, quantity]);
  }

  async getLogs() {
    const query = `
      SELECT * FROM tracking_logs
      WHERE tracking_id IN (
          SELECT id FROM trackings WHERE type = $1 AND user_id = $2
      )
      ORDER BY timestamp DESC;
    `;
    return (await pool.query(query, [this.type, this.userId])).rows;
  }

  async getTracking() {
    const query = `
                SELECT * FROM trackings
                WHERE type = $1 AND user_id = $2
                ORDER BY timestamp DESC;
            `;
    return (await pool.query(query, [this.type, this.userId])).rows;
  }

  async calculateStreak() {
    const query = `
            SELECT timestamp::date FROM tracking_logs
            WHERE tracking_id = (SELECT id FROM trackings WHERE title = $1 AND user_id = $2)
            ORDER BY timestamp DESC;
        `;
    const logs = (await pool.query(query, [this.title, this.userId])).rows.map(
      (row) => row.timestamp
    );

    let streak = 0,
      maxStreak = 0,
      lastDate = null;
    logs.forEach((date) => {
      if (
        !lastDate ||
        (new Date(lastDate) - new Date(date)) / (1000 * 3600 * 24) === 1
      ) {
        streak++;
      } else {
        maxStreak = Math.max(maxStreak, streak);
        streak = 1;
      }
      lastDate = date;
    });

    maxStreak = Math.max(maxStreak, streak);

    const updateQuery = `
            UPDATE trackings SET streak = $1, max_streak = $2 WHERE title = $3 AND user_id = $4;
        `;
    await pool.query(updateQuery, [streak, maxStreak, this.title, this.userId]);
    return { streak, maxStreak };
  }
}

export default Tracking;
