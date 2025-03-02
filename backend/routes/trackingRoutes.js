import express from "express";
import {
  generateDailyToDoList,
  getLogs,
  getStreak,
  logProgress,
  addTracking,
  getTracking,
} from "../controllers/trackingController.js";

const router = express.Router();

// Get tracking items based on user id
router.get("/:userId/:type", getTracking);

// Add new tracking item
router.post("/add", addTracking);

// Get Logs
router.get("/logs/:userId/:type", getLogs);

// Add log for a tracking item based on title
router.post("/log", logProgress);

// Get streaks
router.get("/streak/:userId/:type/:title", getStreak);

// Get to-do list
router.get("/todo/:userId", generateDailyToDoList);

export default router;
