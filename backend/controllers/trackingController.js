import TrackingFactory from "../models/TrackingFactory.js";

export const getTracking = async (req, res) => {
  try {
    const { userId, type } = req.params;
    const tracker = TrackingFactory.createTracking(type, userId, 10);
    const logs = await tracker.getTracking();
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const addTracking = async (req, res) => {
  try {
    const { userId, type, title, goal, unit, frequency, repeat_interval } =
      req.body;
    const tracking = TrackingFactory.createTracking(
      type,
      userId,
      title,
      goal,
      frequency,
      unit,
      repeat_interval
    );
    const result = await tracking.saveToDatabase();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLogs = async (req, res) => {
  try {
    const { userId, type } = req.params;
    const tracker = TrackingFactory.createTracking(type, userId, 10);
    const logs = await tracker.getLogs();
    res.status(200).json({ success: true, data: logs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const logProgress = async (req, res) => {
  try {
    const { userId, type, title, quantity } = req.body;
    const tracker = TrackingFactory.createTracking(type, userId, title, 10);
    await tracker.logProgress(quantity);
    res
      .status(200)
      .json({ success: true, message: `Logged ${quantity} for ${title}` });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getStreak = async (req, res) => {
  try {
    const { userId, type, title } = req.params;
    const tracker = TrackingFactory.createTracking(type, userId, title, 10);
    const { streak, maxStreak } = await tracker.calculateStreak();
    res.status(200).json({ success: true, streak, maxStreak });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//TDO improve to-do list logic to push based on timestamp
export const generateDailyToDoList = async (req, res) => {
  try {
    const { userId } = req.params;
    const query = `
            SELECT title FROM trackings
            WHERE user_id = $1 AND frequency = 'daily';
        `;
    const result = await pool.query(query, [userId]);
    const tasks = result.rows.map((row) => row.title);
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
