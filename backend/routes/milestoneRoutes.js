import express from "express";
import { Milestone } from "../models/milestoneModel.js";

const router = express.Router();

// Create a new milestone
router.post("/", async (req, res) => {
  try {
    const { userId, title, description, targetDate, progress } = req.body;
    const milestone = await Milestone.create({
      userId,
      title,
      description,
      targetDate,
      progress,
    });
    res.status(201).json(milestone);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating milestone", error: error.message });
  }
});

// Get all milestones for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const milestones = await Milestone.findAll({ where: { userId } });
    res.status(200).json(milestones);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching milestones", error: error.message });
  }
});

// Update a milestone
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, targetDate, progress } = req.body;
    const milestone = await Milestone.findByPk(id);
    if (!milestone)
      return res.status(404).json({ message: "Milestone not found" });

    await milestone.update({ title, description, targetDate, progress });
    res.status(200).json(milestone);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating milestone", error: error.message });
  }
});

// Delete a milestone
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const milestone = await Milestone.findByPk(id);
    if (!milestone)
      return res.status(404).json({ message: "Milestone not found" });

    await milestone.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting milestone", error: error.message });
  }
});

export default router;
