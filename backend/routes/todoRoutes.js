import express from "express";
import { Todo } from "../models/todoModel.js";

const router = express.Router();

// Create a new to-do item
router.post("/", async (req, res) => {
  try {
    const { userId, task, dueDate, isCompleted } = req.body;
    const todo = await Todo.create({ userId, task, dueDate, isCompleted });
    res.status(201).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating to-do", error: error.message });
  }
});

// Get all to-do items for a user
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const todos = await Todo.findAll({ where: { userId } });
    res.status(200).json(todos);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching to-dos", error: error.message });
  }
});

// Update a to-do item
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { task, dueDate, isCompleted } = req.body;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ message: "To-do not found" });

    await todo.update({ task, dueDate, isCompleted });
    res.status(200).json(todo);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating to-do", error: error.message });
  }
});

// Delete a to-do item
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByPk(id);
    if (!todo) return res.status(404).json({ message: "To-do not found" });

    await todo.destroy();
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting to-do", error: error.message });
  }
});

export default router;
