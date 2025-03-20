import express from "express";
import pool from "../db.js";
import { getAuthUser } from "../util.js";

const router = express.Router();

router.get("/", getAuthUser, async (req, res) => {
  const authUser = req.user;

  const findGoalsQuery = {
    text: "SELECT * FROM goals where userID = $1",
    values: [authUser.id],
  };

  const queryRes = await pool.query(findGoalsQuery).catch(() => {
    return res
      .status(401)
      .send([{ param: "read error", msg: "Error fetching goals" }]);
  });

  const AllGoals = queryRes.rows;
  res.json({ success: true, data: AllGoals });
});

router.post("/create", getAuthUser, async (req, res) => {
  const authUser = req.user;
  const { goalName } = req.body;

  const createGoalQuery = {
    text: "INSERT INTO goals (name, userID) VALUES ($1, $2)",
    values: [goalName, authUser.id],
  };

  await pool.query(createGoalQuery).catch(() => {
    return res
      .status(401)
      .json({
        error: "Not created",
        data: [{ param: "create error", msg: "Error creating goal" }],
      });
  });
  res.status(200).json({ success: true, data: { goalName } });
});

router.put("/update/:id", getAuthUser, async (req, res) => {
  const authUser = req.user;
  const { goalName } = req.body;
  const goalID = req.params.id;

  const updateGoalQuery = {
    text: "UPDATE goals SET name = $1 WHERE userID = $2 AND id = $3",
    values: [goalName, authUser.id, goalID],
  };

  await pool.query(updateGoalQuery).catch(() => {
    return res.status(401).json({ error: "Error updating goal" });
  });
  res.status(200).json({ success: true, data: { goalName, goalID } });
});

router.delete("/delete/:id", getAuthUser, async (req, res) => {
  const authUser = req.user;
  const goalID = req.params.id;

  const deleteGoalQuery = {
    text: "DELETE from goals WHERE id = $1 AND userID = $2",
    values: [goalID, authUser.id],
  };

  await pool.query(deleteGoalQuery).catch(() => {
    return res.status(401).json({ error: "Error deleting goal" });
  });
  res.status(200).json({ success: true, data: { goalID } });
});

export default router;
