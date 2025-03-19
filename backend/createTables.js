// import pool from "./db.js";
const pool = require("./db"); // ✅ Use require() instead of import
const createTables = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS trackings (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        type VARCHAR(50) NOT NULL CHECK (type IN ('habit', 'money', 'diet')),
        title VARCHAR(255) NOT NULL,
        frequency VARCHAR(50),
        repeat_interval INT,
        goal INT,
        unit VARCHAR(50),
        streak INT DEFAULT 0,
        max_streak INT DEFAULT 0,
        last_logged_date DATE,
        timestamp TIMESTAMP DEFAULT NOW(),
        status BOOLEAN DEFAULT FALSE
    );

    CREATE TABLE IF NOT EXISTS tracking_logs (
        id SERIAL PRIMARY KEY,
        tracking_id INT REFERENCES trackings(id) ON DELETE CASCADE,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        timestamp TIMESTAMP DEFAULT NOW(),
        quantity INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS money_tracking (
        id SERIAL PRIMARY KEY,
        tracking_id INT REFERENCES trackings(id) ON DELETE CASCADE,
        amount DECIMAL(10,2) NOT NULL,
        category VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS diet_tracking (
        id SERIAL PRIMARY KEY,
        tracking_id INT REFERENCES trackings(id) ON DELETE CASCADE,
        calories INT NOT NULL,
        category VARCHAR(100) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS goals (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT,
        target_count INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS goal_dependencies (
        id SERIAL PRIMARY KEY,
        goal_id INT REFERENCES goals(id) ON DELETE CASCADE,
        tracking_item_id INT REFERENCES trackings(id) ON DELETE CASCADE,
        dependency_type TEXT CHECK (dependency_type IN ('habit_completion', 'frequency_count')) NOT NULL
    );

    ALTER TABLE trackings ADD COLUMN IF NOT EXISTS goal_id INT REFERENCES goals(id) ON DELETE SET NULL;

    CREATE TABLE IF NOT EXISTS to_do_list (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        tracking_id INT REFERENCES trackings(id) ON DELETE CASCADE,
        due_time TIMESTAMP NOT NULL,
        status BOOLEAN DEFAULT FALSE,  -- FALSE means pending, TRUE means completed
        created_at TIMESTAMP DEFAULT NOW()
    );

    ALTER TABLE to_do_list
    ADD COLUMN generated_from TIMESTAMP; 

    ALTER TABLE to_do_list 
    ALTER COLUMN status SET DEFAULT 'PENDING';

    CREATE TABLE milestones (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users(id) ON DELETE CASCADE,
        name TEXT NOT NULL,
        description TEXT,
        goal_type TEXT CHECK (goal_type IN ('DAILY', 'WEEKLY', 'STREAKS')),
        required_value INT NOT NULL, -- Number of tasks/habits/streaks required
        tracking_id INT REFERENCES trackings(id) ON DELETE CASCADE,
        achieved BOOLEAN DEFAULT FALSE,
        achieved_on TIMESTAMP
    );
  `;

  try {
    await pool.query(query);
    console.log("✅ Tables created successfully");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  }
};

// Run the function
createTables();
