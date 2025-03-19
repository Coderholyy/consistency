import pool from "./db.js";
// const pool = require("./db"); // ✅ Use require() instead of import
const createTables = async () => {
  const query = `
   CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    passwordhash TEXT NOT NULL
);

CREATE TABLE goals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    userid INTEGER NOT NULL,
    FOREIGN KEY (userid) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE trackings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('habit', 'money', 'diet', 'task')),
    title VARCHAR(255) NOT NULL,
    frequency TEXT CHECK (frequency IN ('daily', 'weekly', 'monthly', 'yearly')),
    repeat_interval INTEGER,
    goal BOOLEAN DEFAULT FALSE,
    streak INTEGER DEFAULT 0,
    max_streak INTEGER DEFAULT 0,
    last_logged_date TIMESTAMP,
    timestamp TIMESTAMP DEFAULT NOW(),
    status BOOLEAN DEFAULT TRUE,
    goal_id INTEGER,
    unit TEXT,
    current_streak INTEGER DEFAULT 0,
    missed_streaks INTEGER DEFAULT 0,
    delayed_streaks INTEGER DEFAULT 0,
    next_due_time TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE SET NULL
);

CREATE TABLE to_do_list (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    tracking_id INTEGER NOT NULL,
    due_time TIMESTAMP,
    status TEXT CHECK (status IN ('pending', 'completed', 'overdue')),
    created_at TIMESTAMP DEFAULT NOW(),
    generated_from TEXT,
    due_date TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tracking_id) REFERENCES trackings(id) ON DELETE CASCADE
);

CREATE TABLE diet_tracking (
    id SERIAL PRIMARY KEY,
    tracking_id INTEGER NOT NULL,
    calories INTEGER NOT NULL,
    category VARCHAR(100) NOT NULL,
    FOREIGN KEY (tracking_id) REFERENCES trackings(id) ON DELETE CASCADE
);

CREATE TABLE money_tracking (
    id SERIAL PRIMARY KEY,
    tracking_id INTEGER NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    category VARCHAR(100) NOT NULL,
    FOREIGN KEY (tracking_id) REFERENCES trackings(id) ON DELETE CASCADE
);

CREATE TABLE goal_dependencies (
    id SERIAL PRIMARY KEY,
    goal_id INTEGER NOT NULL,
    tracking_item_id INTEGER NOT NULL,
    dependency_type TEXT CHECK (dependency_type IN ('habit_completion', 'frequency_count')),
    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE,
    FOREIGN KEY (tracking_item_id) REFERENCES trackings(id) ON DELETE CASCADE
);

CREATE TABLE milestones (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    goal_type TEXT CHECK (goal_type IN ('DAILY', 'WEEKLY', 'MONTHLY')),
    required_value INTEGER NOT NULL,
    tracking_id INTEGER NOT NULL,
    achieved BOOLEAN DEFAULT FALSE,
    achieved_on TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (tracking_id) REFERENCES trackings(id) ON DELETE CASCADE
);

CREATE TABLE tracking_logs (
    id SERIAL PRIMARY KEY,
    tracking_id INTEGER NOT NULL,
    log_time TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (tracking_id) REFERENCES trackings(id) ON DELETE CASCADE
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
