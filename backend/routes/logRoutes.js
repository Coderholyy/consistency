import express from "express";
import { Log } from "../models/logModel.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const log = await Log.create(req.body);
    res.json(log);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:tracking_id", async (req, res) => {
  try {
    const logs = await Log.getByTrackingId(req.params.tracking_id);
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
