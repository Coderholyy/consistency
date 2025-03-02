import React, { useState } from "react";
import axios from "axios";
// import { useSelector } from "react-redux";
import { useUserId } from "hooks/useUserId";
// import { toast } from "react-toastify";

const CreateTracking = () => {
  const userId = useUserId();
  const [formData, setFormData] = useState({
    type: "habit",
    title: "",
    frequency: "daily",
    repeat_interval: 1,
    goal: 1,
    userId,
    unit: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/trackings/add", formData);
      //   toast.success("Tracking item created!");
      setFormData({
        type: "habit",
        title: "",
        frequency: "daily",
        repeat_interval: 1,
        goal: 1,
      });
    } catch {
      //   toast.error("Failed to create tracking item");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Create Tracking</h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />

      <select name="type" value={formData.type} onChange={handleChange}>
        <option value="habit">Habit</option>
        <option value="money">Money</option>
        <option value="diet">Diet</option>
      </select>

      <input
        type="number"
        name="repeat_interval"
        value={formData.repeat_interval}
        onChange={handleChange}
        placeholder="Frequency"
        min="1"
      />

      <input
        type="number"
        name="goal"
        placeholder="Goal"
        value={formData.goal}
        onChange={handleChange}
        min="1"
      />

      <select name="unit" value={formData.unit} onChange={handleChange}>
        <option value="calories">Calories</option>
        <option value="currency">Currency</option>
        <option value="times">Time</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateTracking;
