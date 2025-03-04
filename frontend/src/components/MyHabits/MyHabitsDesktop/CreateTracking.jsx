import React, { useState } from "react";
import axios from "axios";
import { useUserId } from "hooks/useUserId";
import GenericForm from "../../common/Form";

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
    <GenericForm
      onSubmit={handleSubmit}
      title="Create Tracking"
      fields={[
        {
          name: "title",
          value: formData.title,
          onChange: handleChange,
          placeholder: "Title",
          required: true,
        },
        {
          name: "type",
          value: formData.type,
          type: "select",
          onChange: handleChange,
          options: [
            {
              label: "Habit",
              value: "habit",
            },
            {
              label: "Money",
              value: "money",
            },
            {
              label: "Diet",
              value: "diet",
            },
          ],
        },
        {
          name: "repeat_interval",
          value: formData.repeat_interval,
          onChange: handleChange,
          placeholder: "Frequency",
          type: "number",
          min: "1",
        },
        {
          name: "goal",
          value: formData.goal,
          onChange: handleChange,
          placeholder: "Goal",
          type: "number",
          min: "1",
        },
        {
          name: "unit",
          type: "select",
          value: formData.unit,
          onChange: handleChange,
          options: [
            {
              label: "Calories",
              value: "calories",
            },
            {
              label: "Currency",
              value: "currency",
            },
            {
              label: "Times",
              value: "times",
            },
          ],
        },
      ]}
    >
      <button type="submit">Create</button>
    </GenericForm>
    // <form onSubmit={handleSubmit} className="form">
    //   <h5 className="text-xl font-bold">Create Tracking</h5>
    //   <div className="form">
    //     <input
    //       type="text"
    //       name="title"
    //       value={formData.title}
    //       onChange={handleChange}
    //       placeholder="Title"
    //       required
    //     />

    //     <select name="type" value={formData.type} onChange={handleChange}>
    //       <option value="habit">Habit</option>
    //       <option value="money">Money</option>
    //       <option value="diet">Diet</option>
    //     </select>

    //     <input
    //       type="number"
    //       name="repeat_interval"
    //       value={formData.repeat_interval}
    //       onChange={handleChange}
    //       placeholder="Frequency"
    //       min="1"
    //     />

    //     <input
    //       type="number"
    //       name="goal"
    //       placeholder="Goal"
    //       value={formData.goal}
    //       onChange={handleChange}
    //       min="1"
    //     />

    //     <select name="unit" value={formData.unit} onChange={handleChange}>
    //       <option value="calories">Calories</option>
    //       <option value="currency">Currency</option>
    //       <option value="times">Time</option>
    //     </select>
    //   </div>

    // </form>
  );
};

export default CreateTracking;
