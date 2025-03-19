import cron from "node-cron";
import pool from "../utils/db.js";

const updateTodoList = async () => {
  try {
    const client = await pool.connect();

    // 1️⃣ Mark previous overdue "PENDING" tasks as "MISSED"
    await client.query(`
      UPDATE to_do_list
      SET status = 'MISSED'
      WHERE status = 'PENDING' AND due_date < NOW();
    `);

    // 2️⃣ Insert new tasks into to_do_list
    const query = `
      INSERT INTO to_do_list (user_id, tracking_id, due_date, due_time, status, created_at, generated_from, completed)
      SELECT 
        t.user_id, 
        t.id AS tracking_id, 
        t.next_due_time::DATE AS due_date,  -- Using next_due_time as due_date
        COALESCE(t.next_due_time::TIME, '07:00:00') AS due_time,  -- Default if null
        'PENDING' AS status,
        NOW() AS created_at,
        t.type AS generated_from, -- 'habit_tracker' or 'goal_tracker'
        FALSE AS completed
      FROM trackings t
      WHERE NOW() >= t.next_due_time  -- Only add tasks that are due
      AND NOT EXISTS (
        SELECT 1 FROM to_do_list td 
        WHERE td.tracking_id = t.id 
        AND td.due_date = t.next_due_time::DATE
      );
    `;

    await client.query(query);

    // 3️⃣ Update next_due_time in trackings based on repeat_interval
    await client.query(`
      UPDATE trackings 
      SET next_due_time = next_due_time + INTERVAL '1 day' * repeat_interval
      WHERE NOW() >= next_due_time;
    `);

    console.log("✅ To-Do List Updated");

    client.release();
  } catch (error) {
    console.error("❌ Error updating to-do list:", error);
  }
};

// Schedule the cron job to run daily at midnight
cron.schedule("0 0 * * *", updateTodoList);

export default updateTodoList;
